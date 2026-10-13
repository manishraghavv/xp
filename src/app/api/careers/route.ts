import { NextRequest, NextResponse } from "next/server";
import {
  applicationSchema,
  CV_ALLOWED_EXTENSIONS,
  CV_MAX_BYTES,
} from "@/lib/validations";
import { checkRateLimit } from "@/lib/rate-limit";
import nodemailer from "nodemailer";

const escapeHtml = (value: string) =>
  value.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");

export async function POST(req: NextRequest) {
  try {
    const ip = req.headers.get("x-forwarded-for") || req.headers.get("x-real-ip") || "anonymous";
    const rateCheck = checkRateLimit(ip, 5, 60 * 1000);

    if (!rateCheck.allowed) {
      return NextResponse.json(
        { error: "Too many requests. Please try again after a minute." },
        { status: 429 }
      );
    }

    const form = await req.formData();

    // Check honeypot
    if (form.get("website_bot_trap")) {
      return NextResponse.json({ success: true, message: "Processed" });
    }

    const raw: Record<string, unknown> = {};
    form.forEach((value, key) => {
      if (typeof value === "string") raw[key] = value;
    });
    raw.consent = raw.consent === "true";

    const validationResult = applicationSchema.safeParse(raw);
    if (!validationResult.success) {
      return NextResponse.json(
        { error: "Invalid form data", details: validationResult.error.flatten() },
        { status: 400 }
      );
    }
    const data = validationResult.data;

    const cv = form.get("cv");
    if (!(cv instanceof File) || cv.size === 0) {
      return NextResponse.json({ error: "Please upload your CV / Resume" }, { status: 400 });
    }
    const lowerName = cv.name.toLowerCase();
    if (!CV_ALLOWED_EXTENSIONS.some((ext) => lowerName.endsWith(ext))) {
      return NextResponse.json({ error: "CV must be a PDF, DOC or DOCX file" }, { status: 400 });
    }
    if (cv.size > CV_MAX_BYTES) {
      return NextResponse.json({ error: "CV must be 5 MB or smaller" }, { status: 400 });
    }

    if (process.env.SMTP_HOST && process.env.SMTP_USER && process.env.SMTP_PASS) {
      const transporter = nodemailer.createTransport({
        host: process.env.SMTP_HOST,
        port: Number(process.env.SMTP_PORT) || 587,
        secure: process.env.SMTP_SECURE === "true",
        auth: {
          user: process.env.SMTP_USER,
          pass: process.env.SMTP_PASS,
        },
      });

      const recipient = process.env.NOTIFICATION_EMAIL || "info@xpmindglobal.com";
      const sender = process.env.FROM_EMAIL || "notifications@xpmindglobal.com";
      const subject = `New Career Application — ${data.applyingAs} (${data.fullName})`;

      const rows: [string, string][] = [
        ["Applying as", data.applyingAs],
        ["Full Name", data.fullName],
        ["Email", data.email],
        ["Mobile Number", data.mobile],
        ["Current Location", data.location],
        ["Primary SAP® Area", data.primaryArea],
        ["Total SAP® Experience", data.experience],
        ["Other Modules / Certifications", data.otherModules || "Not provided"],
        ["Availability / Notice Period", data.availability || "Not provided"],
        ["Preferred Work Mode", data.workMode || "Not provided"],
        ["Highest Qualification", data.qualification || "Not provided"],
        ["Year of Passing", data.passingYear || "Not provided"],
        ["LinkedIn Profile", data.linkedin || "Not provided"],
        ["About You / Key Projects", data.about || "Not provided"],
      ];

      await transporter.sendMail({
        from: sender,
        to: recipient,
        replyTo: data.email,
        subject,
        html: `<h2>${escapeHtml(subject)}</h2>
          <table cellpadding="6" style="border-collapse:collapse;font-family:sans-serif;font-size:14px;">
            ${rows
              .map(([k, v]) => `<tr><td><strong>${k}:</strong></td><td>${escapeHtml(v)}</td></tr>`)
              .join("")}
          </table>`,
        attachments: [{ filename: cv.name, content: Buffer.from(await cv.arrayBuffer()) }],
      });
    } else {
      console.log("[CAREER_APPLICATION_SUBMISSION]", {
        timestamp: new Date().toISOString(),
        ...data,
        cv: { name: cv.name, size: cv.size },
      });
    }

    return NextResponse.json({
      success: true,
      message:
        "Application received! Thank you — our team will review your profile and contact you when there's a suitable match.",
    });
  } catch (error: unknown) {
    console.error("Error handling career application:", error);
    return NextResponse.json(
      { error: "Something went wrong. Please email us at info@xpmindglobal.com" },
      { status: 500 }
    );
  }
}
