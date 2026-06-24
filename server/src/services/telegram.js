// Telegram alert for new contact-form messages.
//
// Sends an instant push to your phone via the Telegram Bot HTTP API (port 443) —
// works on Render's free tier and is completely free. Optional: if the env vars
// aren't set, the app runs normally and just skips the alert.
//
// Env:
//   TELEGRAM_BOT_TOKEN – from @BotFather
//   TELEGRAM_CHAT_ID   – your chat id (numeric)

const { TELEGRAM_BOT_TOKEN, TELEGRAM_CHAT_ID } = process.env;

if (TELEGRAM_BOT_TOKEN && TELEGRAM_CHAT_ID) {
  console.log('✓ Telegram alerts enabled');
} else {
  console.log('ℹ Telegram alerts disabled (set TELEGRAM_BOT_TOKEN & TELEGRAM_CHAT_ID to enable)');
}

export const telegramEnabled = () => Boolean(TELEGRAM_BOT_TOKEN && TELEGRAM_CHAT_ID);

// Escape user text so it can't break Telegram's HTML formatting.
const esc = (s = '') => String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');

export async function sendTelegramAlert({ name, email, subject, message }) {
  if (!telegramEnabled()) return;

  const text =
    `📬 <b>New Portfolio Message</b>\n\n` +
    `👤 <b>Name:</b> ${esc(name)}\n` +
    `✉️ <b>Email:</b> ${esc(email)}\n` +
    `📌 <b>Subject:</b> ${esc(subject?.trim() || '(none)')}\n\n` +
    `💬 ${esc(message)}`;

  const res = await fetch(`https://api.telegram.org/bot${TELEGRAM_BOT_TOKEN}/sendMessage`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      chat_id: TELEGRAM_CHAT_ID,
      text,
      parse_mode: 'HTML',
      disable_web_page_preview: true
    })
  });

  if (!res.ok) {
    const detail = await res.text().catch(() => '');
    throw new Error(`Telegram ${res.status}: ${detail}`);
  }
}
