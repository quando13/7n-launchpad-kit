import { Resend } from 'resend';
import crypto from 'crypto';

const resend = new Resend(process.env.RESEND_API_KEY);

// BẮT BUỘC — tắt bodyParser để đọc raw body, thiếu dòng này HMAC sẽ luôn fail
export const config = { api: { bodyParser: false } };

// Chống duplicate (in-memory — đủ dùng cho launch đầu)
const processedTransactions = new Set();

// Đọc email khách từ nội dung CK: format VID_email@gmail.com
function extractEmail(des = '') {
  const match = des.match(/VID_(.+@.+\..+)/i);
  return match ? match[1] : null;
}

async function withRetry(fn, retries = 3, delay = 1000) {
  for (let i = 0; i < retries; i++) {
    try { return await fn(); }
    catch (err) {
      if (i === retries - 1) throw err;
      await new Promise(r => setTimeout(r, delay * (i + 1)));
    }
  }
}

async function sendTelegram(order) {
  const now = new Date().toLocaleString('vi-VN', { timeZone: 'Asia/Ho_Chi_Minh' });
  const orderNumber = order.transaction_id.slice(-6).toUpperCase();
  const message = [
    `🛒 *ĐƠN HÀNG MỚI #${orderNumber}*`, ``,
    `💰 Thanh toán: ${Number(order.amount).toLocaleString('vi-VN')}đ ✅`,
    `👤 Khách: ${order.customer_name || 'Không rõ'}`,
    `📧 Email: ${order.customer_email}`,
    `📦 Sản phẩm: ${process.env.PRODUCT_NAME || 'Sản phẩm số'}`,
    `💳 Mã GD: ${order.transaction_id}`,
    `⏰ Thời gian: ${now}`, ``,
    `→ Email sản phẩm đã gửi tự động ✉️`,
  ].join('\n');
  await withRetry(() =>
    fetch(`https://api.telegram.org/bot${process.env.TELEGRAM_TOKEN}/sendMessage`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ chat_id: process.env.TELEGRAM_CHAT_ID, text: message, parse_mode: 'Markdown' }),
    }).then(r => { if (!r.ok) throw new Error(`Telegram ${r.status}`); })
  );
}

async function sendEmail(order) {
  const productName = process.env.PRODUCT_NAME || 'Sản phẩm số';
  await withRetry(() =>
    resend.emails.send({
      from: process.env.FROM_EMAIL || 'noreply@resend.dev',
      to: order.customer_email,
      subject: `🎉 ${productName} của bạn đã sẵn sàng!`,
      html: `
        <div style="font-family:sans-serif;max-width:520px;margin:0 auto;padding:32px;">
          <h2>Cảm ơn ${order.customer_name || 'bạn'} đã mua hàng! 🙌</h2>
          <p>Đây là link tải sản phẩm của bạn:</p>
          <a href="${process.env.PRODUCT_LINK}"
             style="display:inline-block;padding:14px 28px;background:#bd3a11;
                    color:#fff;text-decoration:none;font-weight:800;border-radius:8px;">
            📥 Nhận sản phẩm ngay
          </a>
          <p style="color:#666;font-size:14px;margin-top:24px;">
            Mã GD: <strong>${order.transaction_id}</strong><br>
            Liên hệ: <a href="mailto:${process.env.SUPPORT_EMAIL}">${process.env.SUPPORT_EMAIL}</a>
          </p>
        </div>`
    })
  );
}

export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).end();

  // 1. Đọc raw body — bắt buộc để HMAC khớp với SePay
  const rawBody = await new Promise((resolve, reject) => {
    let data = '';
    req.on('data', chunk => data += chunk);
    req.on('end', () => resolve(data));
    req.on('error', reject);
  });

  const body = JSON.parse(rawBody);

  // 2. Timing-safe signature validation
  const signature = req.headers['x-sepay-signature'];
  const hash = crypto.createHmac('sha256', process.env.SEPAY_SECRET || '')
    .update(rawBody)
    .digest('hex');
  const sigBuf  = Buffer.from(signature || '', 'utf8');
  const hashBuf = Buffer.from(hash, 'utf8');
  const isValid = sigBuf.length === hashBuf.length && crypto.timingSafeEqual(sigBuf, hashBuf);
  if (!isValid) return res.status(401).json({ error: 'Invalid signature' });

  // 3. Đọc email — ưu tiên customer_email, fallback đọc từ VID_ trong description
  const { transaction_id, amount, customer_email, customer_name, description } = body;
  const resolvedEmail = customer_email
    || extractEmail(description)
    || extractEmail(transaction_id);

  if (!resolvedEmail) {
    console.error('[webhook] No email found in payload');
    return res.status(400).json({ error: 'No email found' });
  }

  // 4. Chống duplicate
  if (processedTransactions.has(transaction_id))
    return res.status(200).json({ ok: true, note: 'duplicate' });
  processedTransactions.add(transaction_id);

  const order = {
    transaction_id, amount,
    customer_email: resolvedEmail,
    customer_name: customer_name || resolvedEmail.split('@')[0],
  };

  // 5. Chạy song song email + Telegram
  const results = await Promise.allSettled([
    sendEmail(order),
    sendTelegram(order),
  ]);
  results.forEach((r, i) => {
    if (r.status === 'rejected')
      console.error(`[${i === 0 ? 'email' : 'telegram'}] failed:`, r.reason);
  });

  return res.status(200).json({ ok: true });
}
