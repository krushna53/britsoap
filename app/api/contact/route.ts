import { NextRequest, NextResponse } from "next/server";
import * as XLSX from "xlsx";
import nodemailer from "nodemailer";
import fs from "fs";
import path from "path";

const EXCEL_PATH = path.join(process.cwd(), "data", "contact-submissions.xlsx");

function saveToExcel(entry: Record<string, string>) {
  let wb: XLSX.WorkBook;
  let ws: XLSX.WorkSheet;

  const headers = ["Date", "Name", "Email", "Phone", "Company", "Subject", "Message"];

  // Ensure the data directory exists
  const dir = path.dirname(EXCEL_PATH);
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }

  if (fs.existsSync(EXCEL_PATH)) {
    wb = XLSX.readFile(EXCEL_PATH);
    ws = wb.Sheets["Submissions"];
  } else {
    wb = XLSX.utils.book_new();
    ws = XLSX.utils.aoa_to_sheet([headers]);
    XLSX.utils.book_append_sheet(wb, ws, "Submissions");
  }

  const row = [
    new Date().toLocaleString("en-IN", { timeZone: "Asia/Kolkata" }),
    entry.name,
    entry.email,
    entry.phone,
    entry.company,
    entry.subject,
    entry.message,
  ];

  XLSX.utils.sheet_add_aoa(ws, [row], { origin: -1 });
  const buffer = XLSX.write(wb, { type: "buffer", bookType: "xlsx" });
  fs.writeFileSync(EXCEL_PATH, buffer);
}

async function sendEmailNotification(entry: Record<string, string>) {
  const user = process.env.SMTP_USER;
  const pass = process.env.SMTP_PASS;

  if (!user || !pass) return;

  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: { user, pass },
  });

  await transporter.sendMail({
    from: `"BritSoap Website" <${user}>`,
    to: user,
    subject: `New Enquiry: ${entry.subject || "Contact Form"} — ${entry.name}`,
    html: `
      <div style="font-family:sans-serif;max-width:600px;margin:auto;border:1px solid #e5e7eb;border-radius:8px;overflow:hidden;">
        <div style="background:#2A328B;padding:20px 24px;">
          <h2 style="color:#fff;margin:0;font-size:18px;">New Contact Form Submission</h2>
        </div>
        <div style="padding:24px;background:#fff;">
          <table style="width:100%;border-collapse:collapse;font-size:14px;">
            ${[
              ["Name", entry.name],
              ["Email", entry.email],
              ["Phone", entry.phone || "—"],
              ["Company", entry.company || "—"],
              ["Subject", entry.subject],
            ]
              .map(
                ([label, value]) => `
              <tr>
                <td style="padding:8px 12px;font-weight:600;color:#374151;width:110px;vertical-align:top;border-bottom:1px solid #f3f4f6">${label}</td>
                <td style="padding:8px 12px;color:#6b7280;border-bottom:1px solid #f3f4f6">${value}</td>
              </tr>`
              )
              .join("")}
            <tr>
              <td style="padding:8px 12px;font-weight:600;color:#374151;vertical-align:top;">Message</td>
              <td style="padding:8px 12px;color:#6b7280;white-space:pre-wrap;">${entry.message}</td>
            </tr>
          </table>
        </div>
        <div style="background:#f9fafb;padding:12px 24px;font-size:12px;color:#9ca3af;text-align:center;">
          BritSoap Machinery — britsoap@gmail.com
        </div>
      </div>
    `,
  });
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { name, email, phone, company, subject, message } = body;

    if (!name || !email || !message) {
      return NextResponse.json({ error: "Missing required fields." }, { status: 400 });
    }

    const entry = { name, email, phone: phone || "", company: company || "", subject: subject || "", message };

    saveToExcel(entry);
    await sendEmailNotification(entry);

    return NextResponse.json({ success: true });
  } catch (err) {
    const message = err instanceof Error ? err.message : "Failed to save submission.";
    console.error("Contact form error:", message);
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
