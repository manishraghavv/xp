import { NextRequest, NextResponse } from "next/server";
import { contactFormSchema, modalFormSchema } from "@/lib/validations";
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

    // Attempt validation with either full contact schema or modal schema
    const isContactPage = "landscape" in body;
    const validationResult = isContactPage
      ? contactFormSchema.safeParse(body)
      : modalFormSchema.safeParse(body);

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

      const subject = isContactPage
        ? `New Enquiry — XpmindGlobal Contact Page (${data.company})`
        : `New Enquiry — XpmindGlobal Website Modal (${data.company})`;

      const htmlContent = `
        <h2>${subject}</h2>
        <table cellpadding="6" style="border-collapse:collapse;font-family:sans-serif;font-size:14px;">
          <tr><td><strong>Name:</strong></td><td>${data.firstName} ${data.lastName}</td></tr>
          <tr><td><strong>Email:</strong></td><td><a href="mailto:${data.email}">${data.email}</a></td></tr>
          <tr><td><strong>Phone:</strong></td><td>${data.phone || "Not provided"}</td></tr>
          <tr><td><strong>Company:</strong></td><td>${data.company}</td></tr>
          <tr><td><strong>Service of Interest:</strong></td><td>${data.service}</td></tr>
          ${"landscape" in data && data.landscape ? `<tr><td><strong>Current SAP® Landscape:</strong></td><td>${data.landscape}</td></tr>` : ""}
          <tr><td><strong>Message / Brief:</strong></td><td>${data.message || "Not provided"}</td></tr>
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
      // In development or when credentials are not yet configured in production
      console.log("[CONTACT_FORM_SUBMISSION]", {
        timestamp: new Date().toISOString(),
        ...data,
      });
    }

    return NextResponse.json({
      success: true,
      message: "Thank you! We'll be in touch within 24 business hours.",
    });
  } catch (error: unknown) {
    console.error("Error handling contact form:", error);
    return NextResponse.json(
      {
        error:
          "Something went wrong. Please email us directly at info@xpmindglobal.com",
      },
      { status: 500 }
    );
  }
}
