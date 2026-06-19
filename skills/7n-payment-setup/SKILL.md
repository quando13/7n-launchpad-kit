---
name: 7n-payment-setup
description: >
  Hướng dẫn học viên thiết lập hệ thống bán hàng tối giản: SePay VietQR nhận thanh toán,
  Vercel API Route xử lý webhook, Resend tự động gửi email sản phẩm cho khách,
  Telegram nhận thông báo đơn hàng real-time.
  Dùng skill này sau khi học viên đã có landing page (b3-landing.html) và deploy lên Vercel.
  Kích hoạt khi học viên đề cập: "setup hệ thống bán hàng", "nhúng QR thanh toán",
  "giao file tự động", "thông báo đơn hàng", "sepay", "vietqr", "webhook", hoặc "bước 4".
  Chạy SAU Bước 3 (7n-landing-page-writer).
---

# 7N Payment Setup
## Bước 4/6 · Chương trình 7N Launchpad
## Bảng điều hướng

| Bước | Skill | Mô tả |
|------|-------|--------|
| 1 | `7n-product-positioning` | Định vị & gợi ý sản phẩm |
| 2 | `7n-offer-design` | Thiết kế offer chuyển đổi cao |
| 3 | `7n-landing-page-writer` | Tạo landing page HTML |
| **4** | **`7n-payment-setup`** | **Hệ thống thanh toán + giao hàng tự động** |
| 5 | `7n-ebook-builder` | Đóng gói ebook hoàn chỉnh |
| 6 | `7n-content-planner` | Hệ thống content 30 ngày |

---

## Mục đích

Giúp học viên đi từ "có trang bán" → "hệ thống nhận tiền và giao hàng chạy tự động".

Sau bước này: **khách quét QR → chuyển tiền → nhận email sản phẩm tự động** — anh/chị nhận thông báo Telegram, không cần làm gì thêm.

---

## Nguyên tắc vận hành

- **1 luồng duy nhất** — không có lựa chọn A/B/C. Làm đúng 1 cách, làm đến xong.
- **Hỏi 1 câu tại một thời điểm** — không dump toàn bộ hướng dẫn kỹ thuật cùng lúc.
- **Test thật trước khi ra mắt** — tự mua 1 đơn trước khi mời khách hàng thật.
- Gọi học viên là anh/chị.

---

## Luồng Hệ Thống

```
Khách xem Landing Page (Vercel)
      ↓
Quét QR VietQR → chuyển khoản
      ↓
SePay nhận giao dịch → POST webhook đến Vercel
      ↓
Vercel API Route xác nhận thanh toán hợp lệ
      ↓
[Tự động] Resend gửi email + link sản phẩm cho khách
[Tự động] Telegram báo anh/chị có đơn mới
```

---

## Stack Công Cụ

| Công cụ | Vai trò | Miễn phí |
|---------|---------|----------|
| **SePay** | Nhận thanh toán VietQR | ✓ |
| **Vercel** | Deploy landing page + webhook | ✓ |
| **Resend** | Gửi email sản phẩm tự động | ✓ (3,000 email/tháng) |
| **Telegram** | Thông báo đơn hàng real-time | ✓ |

---

## Flow Thực Thi

### Khởi động

Khi học viên muốn setup Bước 4, xác nhận:

> "Anh/chị đã có:
> ① Landing page deploy lên Vercel chưa? (Bước 3)
> ② Tài khoản SePay đã liên kết ngân hàng chưa? (my.sepay.vn)
> ③ Ebook đã deploy lên Vercel chưa? (Link dạng: https://[project].vercel.app/ebook.html)"

→ Xác nhận xong dẫn theo thứ tự bên dưới.

---

### Bước 4.1 — Liên kết ngân hàng lên SePay

**Ai làm:** Học viên tự làm trên SePay dashboard — Claude không tự làm được vì cần đăng nhập ngân hàng.

1. Vào **my.sepay.vn** → **Ngân hàng** → **Thêm ngân hàng**
2. Chọn ngân hàng → nhập số TK → xác thực OTP
3. Sau khi liên kết thành công → SePay theo dõi TK qua API Banking

**Nếu học viên đã liên kết rồi** → bỏ qua, chuyển sang 5.2.

---

### Bước 4.2 — Cấu hình Webhook trên SePay

**Ai làm:** Học viên thao tác trên SePay, Claude nhận Secret và add vào Vercel.

1. Vào **my.sepay.vn** → menu trái → **Tích hợp WebHooks**
2. Nhấn **Thêm webhook** → điền URL:
   ```
   https://[tên-project].vercel.app/api/webhook
   ```
3. Chọn sự kiện: `Giao dịch thành công`
4. Nhấn **Lưu** → SePay hiển thị **Webhook Secret**
5. Copy Secret → paste cho Claude

→ Claude tự add `SEPAY_SECRET` vào Vercel env + deploy lại.

---

### Bước 4.3 — Setup Resend + Telegram

*(Xem phần bên dưới — Claude tự làm toàn bộ)*

---

### Bước 4.5 — Thêm Form Email + QR Động vào Landing Page

**Tại sao cần form email?**
QR tĩnh không biết email khách → không giao được sản phẩm tự động.
Form thu email trước → QR sinh với email nhúng vào nội dung CK → webhook đọc được.

**Luồng:**
```
Khách bấm "Mua ngay"
      ↓
Popup form: nhập Email
      ↓
JavaScript sinh QR động:
qr.sepay.vn?acc=[STK]&bank=[NH]&amount=[GIÁ]&des=VID_[email]
      ↓
Khách quét → chuyển khoản
      ↓
SePay phát hiện → webhook
      ↓
Webhook đọc email từ des → gửi sản phẩm
```

**Claude cập nhật `index.html` thêm:**
- Popup/modal form thu email
- JavaScript sinh QR URL từ email nhập vào
- Hiển thị QR + hướng dẫn nội dung CK
- Deploy lại lên Vercel tự động

**Format nội dung CK chuẩn:**
```
des = VID_[email] — ví dụ: VID_caotribao@gmail.com
```
Giới hạn 50 ký tự → nếu email dài, dùng: `VID_[phần trước @]`

**Cập nhật webhook.js để đọc email từ des:**
```javascript
// Thay vì đọc customer_email từ body:
const email = req.body.customer_email
  || extractEmailFromDes(req.body.description);

function extractEmailFromDes(des = '') {
  const match = des.match(/VID_(.+)/i);
  return match ? match[1] : null;
}
```

---

### Chi tiết A — Tạo Tài Khoản Resend

1. Truy cập **resend.com** → Sign up (dùng email)
2. Vào **API Keys** → Create API Key → đặt tên `7n-launchpad`
3. Copy API Key — lưu lại ngay, chỉ hiện 1 lần
4. (Tuỳ chọn) Verify domain để email không vào spam — hoặc dùng email mặc định `onboarding@resend.dev` để test trước

---

### Chi tiết B — Setup Telegram Bot

1. Mở Telegram → tìm **@BotFather** → nhắn `/newbot`
2. Đặt tên bot → đặt username (kết thúc bằng `bot`)
3. BotFather trả về **Bot Token** — lưu lại: `7123456789:AAF...`
4. Nhắn `/start` với bot vừa tạo để kích hoạt
5. Lấy **Chat ID** — truy cập trên browser:
   ```
   https://api.telegram.org/bot[TOKEN]/getUpdates
   ```
   Tìm giá trị `"id"` trong `"chat"` — đó là Chat ID.

**Test nhanh** — dán URL này vào browser:
```
https://api.telegram.org/bot[TOKEN]/sendMessage?chat_id=[CHAT_ID]&text=Test+OK
```
Nếu Telegram báo tin → setup thành công.

---

### Chi tiết C — Tạo Vercel API Route (Webhook)

**Claude tự tạo file này** — không cần học viên viết code.

Tạo 2 file trong project:

**`/api/webhook.js`** — Đã tích hợp từ biz-payment + biz-notification:
- ✅ Raw body parsing — HMAC tính trên raw string, không qua JSON.parse/stringify
- ✅ `export const config` — tắt bodyParser của Vercel (bắt buộc, thiếu là 401)
- ✅ Timing-safe signature validation (chống giả mạo)
- ✅ Đọc email từ nội dung CK: `VID_email@gmail.com` (vì QR động nhúng email vào des)
- ✅ Chống duplicate transaction — ⚠️ dùng in-memory Set (reset khi Vercel cold start, đủ dùng cho launch đầu)
- ✅ Retry tự động 3 lần nếu Telegram/email lỗi
- ✅ Chạy song song email + Telegram (nhanh hơn)

```javascript
import { Resend } from 'resend';
import crypto from 'crypto';

const resend = new Resend(process.env.RESEND_API_KEY);

// ⚠️ BẮT BUỘC — tắt bodyParser để đọc raw body, thiếu dòng này HMAC sẽ luôn fail
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
  await withRetry(() =>
    resend.emails.send({
      from: 'noreply@resend.dev',
      to: order.customer_email,
      subject: '🎉 Sản phẩm của bạn đã sẵn sàng!',
      html: `
        <div style="font-family:sans-serif;max-width:520px;margin:0 auto;padding:32px;">
          <h2>Cảm ơn ${order.customer_name || 'bạn'} đã mua hàng! 🙌</h2>
          <p>Đây là link tải sản phẩm của bạn:</p>
          <a href="${process.env.PRODUCT_LINK}"
             style="display:inline-block;padding:14px 28px;background:#84cc16;
                    color:#0e0e1e;text-decoration:none;font-weight:800;border-radius:100px;">
            📥 Tải sản phẩm ngay
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
    .update(rawBody)   // ← phải dùng rawBody, không phải JSON.stringify(body)
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
      console.error(`[${i===0?'email':'telegram'}] failed:`, r.reason);
  });

  return res.status(200).json({ ok: true });
}
```

**`/.env.example`** — Template biến môi trường:
```
SEPAY_SECRET=your_sepay_webhook_secret
RESEND_API_KEY=re_xxxxxxxxxxxxxxxxxxxxxxxxxxxx
TELEGRAM_TOKEN=7123456789:AAFxxxxxxxx
TELEGRAM_CHAT_ID=123456789
PRODUCT_LINK=https://[project].vercel.app/ebook.html
PRODUCT_NAME=Tên sản phẩm của anh/chị
SUPPORT_EMAIL=caotribao@gmail.com
```

**Tạo file `.env` trong project** (không commit lên git):

```
RESEND_API_KEY=re_xxxxxxxxxxxx
SEPAY_SECRET=your_sepay_webhook_secret
TELEGRAM_TOKEN=7123456789:AAF...
TELEGRAM_CHAT_ID=123456789
PRODUCT_LINK=https://[project].vercel.app/ebook.html
PRODUCT_NAME=Tên sản phẩm của anh/chị
SUPPORT_EMAIL=anh@email.com
```

**Thêm vào Vercel Environment Variables:**
- Vào Vercel Dashboard → Project → Settings → Environment Variables
- Thêm từng biến từ file `.env` vào đây
- Deploy lại

---

### Bước 4.6 — Test Giả Lập Toàn Bộ

```
Checklist test — bắt buộc trước khi ra mắt:
□ Mở landing page trên điện thoại → QR hiển thị đúng
□ Quét QR bằng app ngân hàng → thông tin đúng (số tiền, nội dung CK)
□ Chuyển khoản thật (dùng đúng số tiền sản phẩm)
□ Nhận thông báo Telegram trong vòng 1 phút
□ Email sản phẩm về đúng hòm thư → link tải mở được
□ Trải nghiệm toàn bộ đúng như khách hàng thật
```

---

## Xử Lý Sự Cố

**Webhook không trigger:**
→ Kiểm tra URL webhook trong SePay có đúng không (phải là HTTPS)
→ Vào Vercel → Functions → xem log lỗi

**Telegram không nhận thông báo:**
→ Test lại URL `getUpdates` — xác nhận Chat ID đúng
→ Kiểm tra `TELEGRAM_TOKEN` và `TELEGRAM_CHAT_ID` trong Vercel env

**Email không đến:**
→ Kiểm tra spam/junk
→ Xác nhận `RESEND_API_KEY` đúng trong Vercel env
→ Thử gửi test email thẳng từ Resend dashboard

**Chữ ký không khớp (401 Invalid signature):**
→ Kiểm tra `SEPAY_SECRET` — phải copy đúng từ SePay, không có khoảng trắng thừa

**Link sản phẩm không mở được:**
→ Kiểm tra URL Vercel đúng format: `https://[project].vercel.app/ebook.html`
→ Đảm bảo file `ebook.html` đã có trong folder trước khi deploy
→ Test link trong tab ẩn danh trước khi ra mắt

---

## Đầu Ra Bước Này

Lưu `b4-ban-hang.md`:

```markdown
# B4 — Hệ Thống Bán Hàng

## Thông tin thanh toán
- Ngân hàng: [...]
- Số tài khoản: [...]
- Nội dung CK chuẩn: [...]
- URL QR: [https://qr.sepay.vn/img?...]

## Webhook
- URL: https://[project].vercel.app/api/webhook
- SePay đã cấu hình: ✓ / ✗

## Resend
- API Key đã thêm vào Vercel env: ✓ / ✗
- Email test gửi thành công: ✓ / ✗

## Telegram
- Bot: @[username]
- Thông báo test nhận được: ✓ / ✗

## Kết quả test giả lập
- Ngày test: [...]
- Kết quả: ✓ Toàn bộ pipeline chạy / ✗ Cần fix: [...]
```

---

## Bước Tiếp Theo

→ **B5 — Thiết kế & đóng gói sản phẩm** (`7n-ebook-builder`)
Nhắn: *"Tôi muốn đóng gói sản phẩm B5"* + paste `b2-offer.md`

---

*7N Launchpad Kit · Solobiz · B4 Payment Setup · v2.0*
