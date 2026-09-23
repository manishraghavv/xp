import { NextRequest, NextResponse } from "next/server";
import { trainingInterestSchema } from "@/lib/validations";
import { checkRateLimit } from "@/lib/rate-limit";
import nodemailer from "nodemailer";

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

    const body = await req.json();

    // Check honeypot
    if (body.website_bot_trap) {
      return NextResponse.json({ success: true, message: "Processed" });
    }

    const validationResult = trainingInterestSchema.safeParse(body);

    if (!validationResult.success) {
      return NextResponse.json(
        { error: "Invalid form data", details: validationResult.error.flatten() },
        { status: 400 }
      );
    }

    const data = validationResult.data;

    // Email delivery via Nodemailer if SMTP is configured
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

      const subject = `Training Interest Registration — XPMIND Learning Cell (${data.fullName})`;

      const htmlContent = `
        <h2>${subject}</h2>
        <table cellpadding="6" style="border-collapse:collapse;font-family:sans-serif;font-size:14px;">
          <tr><td><strong>Full Name:</strong></td><td>${data.fullName}</td></tr>
          <tr><td><strong>Email:</strong></td><td><a href="mailto:${data.email}">${data.email}</a></td></tr>
          <tr><td><strong>Designation / Role:</strong></td><td>${data.designation || "Not provided"}</td></tr>
          <tr><td><strong>Programme of Interest:</strong></td><td>${data.programme}</td></tr>
        </table>
      `;

      await transporter.sendMail({
        from: sender,
        to: recipient,
        replyTo: data.email,
        subject,
        html: htmlContent,
      });
    } else {
      console.log("[TRAINING_INTEREST_SUBMISSION]", {
        timestamp: new Date().toISOString(),
        ...data,
      });
    }

    return NextResponse.json({
      success: true,
      message: "Registered! We'll notify you when enrolment opens.",
    });
  } catch (error: unknown) {
    console.error("Error handling training interest form:", error);
    return NextResponse.json(
      {
        error:
          "Something went wrong. Please try again or email us at info@xpmindglobal.com",
      },
      { status: 500 }
    );
  }
}
