import nodemailer from 'nodemailer';

// Email notifications are optional: if EMAIL_USER / EMAIL_PASS aren't set,
// the app still works and simply skips sending (no crash).
const { EMAIL_USER, EMAIL_PASS, NOTIFY_TO } = process.env;

let transporter = null;
if (EMAIL_USER && EMAIL_PASS) {
  transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 465,
    secure: true,
    auth: { user: EMAIL_USER, pass: EMAIL_PASS },
    // Render's free tier has no outbound IPv6 — force IPv4 to avoid ENETUNREACH.
    family: 4
  });
  console.log('✓ Email notifications enabled');
} else {
  console.log('ℹ Email notifications disabled (set EMAIL_USER & EMAIL_PASS to enable)');
}

export const emailEnabled = () => Boolean(transporter);

// Sends a notification to the owner when a visitor submits the contact form.
export async function sendContactNotification({ name, email, subject, message }) {
  if (!transporter) return;

  const to = NOTIFY_TO || EMAIL_USER;
  const safeSubject = subject?.trim() || '(no subject)';

  await transporter.sendMail({
    from: `"Portfolio Contact" <${EMAIL_USER}>`,
    to,
    replyTo: email, // hitting "Reply" emails the visitor directly
    subject: `📬 New portfolio message from ${name}`,
    text: `New message from your portfolio\n\nName: ${name}\nEmail: ${email}\nSubject: ${safeSubject}\n\n${message}`,
    html: `
      <div style="font-family:Arial,sans-serif;max-width:560px;margin:auto;border:1px solid #eee;border-radius:12px;overflow:hidden">
        <div style="background:#4f46e5;color:#fff;padding:18px 24px;font-size:18px;font-weight:700">
          📬 New Portfolio Message
        </div>
        <div style="padding:24px;color:#222;line-height:1.6">
          <p style="margin:0 0 12px"><strong>Name:</strong> ${name}</p>
          <p style="margin:0 0 12px"><strong>Email:</strong> <a href="mailto:${email}">${email}</a></p>
          <p style="margin:0 0 12px"><strong>Subject:</strong> ${safeSubject}</p>
          <p style="margin:16px 0 6px"><strong>Message:</strong></p>
          <div style="background:#f6f6f9;border-radius:8px;padding:14px;white-space:pre-wrap">${message}</div>
          <p style="margin:20px 0 0;font-size:13px;color:#888">Reply to this email to respond directly to ${name}.</p>
        </div>
      </div>`
  });
}
