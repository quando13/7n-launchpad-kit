# 7N Launchpad Workflow

Đưa học viên từ "tôi có kiến thức" → sản phẩm số live + hệ thống bán hàng tự động trong 7 ngày.

## Tổng quan

| | |
|---|---|
| **Kích hoạt khi** | Học viên nói: "bắt đầu launchpad", "làm sản phẩm số", "7n", "7 ngày", hoặc hỏi cách tạo/bán sản phẩm số từ đầu |
| **Skills sử dụng** | 7n-product-positioning → 7n-offer-design → 7n-landing-page-writer → 7n-payment-setup → 7n-ebook-builder → 7n-content-planner |
| **Thời gian** | 7 ngày (có thể rút ngắn còn 3–4 ngày nếu tập trung) |
| **Output cuối** | Landing page live + ebook hoàn chỉnh + hệ thống tự nhận tiền & giao hàng + lịch 30 bài content |

## Điều kiện bắt đầu

Không cần nhiều — chỉ cần:
- Có kiến thức/kỹ năng muốn đóng gói (nghề nghiệp, phương pháp, hành trình cá nhân)
- Có tài khoản ngân hàng Việt Nam (để liên kết SePay)
- Có máy tính (để Claude deploy lên Vercel)

---

## Quy tắc vận hành Workflow

1. **Không bỏ bước** — mỗi bước tạo ra output cho bước tiếp. Thiếu là hỏng chain.
2. **Lưu file output sau mỗi bước** — Claude nhắc học viên lưu trước khi chuyển tiếp.
3. **Xong mới chuyển** — không chạy song song 2 bước cùng lúc.
4. **Claude tự đọc output bước trước** — không cần học viên giải thích lại.

---

## Các bước

### Bước 1 — Định vị & Sản phẩm
**Skill:** `7n-product-positioning` · Thời gian: 1–2 giờ

**Mục tiêu:** Xác định ngách, validate nhu cầu, chọn 1 sản phẩm để làm.

**Claude làm:** Hỏi học viên kể về bản thân → phân tích ngách → validate 3 tiêu chí → gợi ý 5 sản phẩm → tuyên bố định vị.

**Checkpoint — trước khi chuyển B2:**
```
✅ Đã chọn 1 sản phẩm cụ thể (tên + format + đối tượng)
✅ Đã có tuyên bố định vị rõ ràng
✅ Lưu output thành: b1-dinh-vi.md (hoặc copy vào ghi chú)
```

---

### Bước 2 — Thiết kế Offer
**Skill:** `7n-offer-design` · Thời gian: 1–2 giờ

**Mục tiêu:** Biến sản phẩm thành offer có giá trị xếp chồng, đảm bảo, khan hiếm — chấm điểm 42.

**Claude làm:** Đọc B1 → draft offer luôn → 2 lượt confirm → xuất offer hoàn chỉnh + Value Equation Audit + điểm 42.

**Checkpoint — trước khi chuyển B3:**
```
✅ Offer có đủ: chuyển hóa + value stack + đảm bảo + khan hiếm
✅ Điểm offer ≥ 35/42 (nếu thấp hơn → tối ưu trước)
✅ Lưu output thành: b2-offer.md
```

---

### Bước 3 — Landing Page
**Skill:** `7n-landing-page-writer` · Thời gian: 1–3 giờ

**Mục tiêu:** Tạo file HTML landing page deploy được, có cấu trúc tâm lý 10 section.

**Claude làm:** Đọc B2 → hỏi visual reference (tùy chọn) → tạo HTML → tự deploy lên Vercel CLI → trả về link live.

> ⚠️ Bước này Claude tự deploy — học viên chỉ cần xác nhận tên project.
> ⚠️ Chưa nhúng QR thanh toán — sẽ làm ở B4.

**Checkpoint — trước khi chuyển B4:**
```
✅ Landing page đang live trên Vercel (có URL thật)
✅ Xem được trên điện thoại
✅ Lưu URL: https://[tên-project].vercel.app
```

---

### Bước 4 — Hệ thống thanh toán
**Skill:** `7n-payment-setup` · Thời gian: 2–4 giờ

**Mục tiêu:** SePay nhận tiền → Vercel webhook xử lý → Resend gửi email sản phẩm → Telegram báo đơn.

**Học viên làm (cần thao tác thủ công):**
- Liên kết ngân hàng lên SePay (cần OTP)
- Tạo API key Resend
- Tạo Telegram bot + lấy Chat ID
- Cấu hình webhook URL trên SePay dashboard

**Claude làm:** Tạo `api/webhook.js` hoàn chỉnh → add env vars lên Vercel → thêm email form + QR động vào landing page → deploy lại → test giả lập.

**Checkpoint — trước khi chuyển B5:**
```
✅ Đã nhận thông báo Telegram từ test
✅ Đã nhận email sản phẩm từ test
✅ Landing page có popup form + QR động hoạt động
✅ Lưu thông tin: b4-ban-hang.md
```

---

### Bước 5 — Đóng gói Ebook
**Skill:** `7n-ebook-builder` · Thời gian: 3–6 giờ

**Mục tiêu:** Biến kiến thức thô thành file HTML ebook hoàn chỉnh — sidebar nav, checklist, visual diagrams.

**Claude làm:** Thu thập nguyên liệu → bộ câu hỏi 4 nhóm → outline → research layer → draft từng chương với visual → xuất HTML hoàn chỉnh.

**Sau khi có ebook:**
- Đặt `ebook.html` vào cùng folder với `index.html`
- Claude deploy lại Vercel → link tự động là: `https://[project].vercel.app/ebook.html`
- Cập nhật `PRODUCT_LINK` trong Vercel env = link ebook trên Vercel

**Checkpoint — trước khi chuyển B6:**
```
✅ ebook.html mở đẹp tại https://[project].vercel.app/ebook.html
✅ Test trong tab ẩn danh — hiển thị đúng, không hiện source code
✅ Webhook gửi đúng link ebook cho khách
✅ Lưu: b5-ebook.md (ghi URL Vercel của ebook)
```

---

### Bước 6 — Content 30 Ngày
**Skill:** `7n-content-planner` · Thời gian: 1–2 giờ

**Mục tiêu:** Lịch 30 bài seeding dẫn traffic về trang bán — kèm prompt AI viết sẵn cho từng loại bài.

**Claude làm:** Đọc B1 + B2 → xác định Core Message → ma trận 70/30 → lịch 30 ngày đầy đủ → prompt bank điền sẵn thông tin sản phẩm.

**Checkpoint — hoàn thành launchpad:**
```
✅ Có lịch 30 ngày với tiêu đề + hook từng bài
✅ Có prompt bank sẵn sàng dùng với Claude
✅ Lưu: b6-content.md
✅ Bài đăng đầu tiên: ĐĂNG NGAY — không chuẩn bị thêm
```

---

## Trạng thái hoàn thành

```
✅ B1 — Định vị & sản phẩm         → b1-dinh-vi.md
✅ B2 — Offer                       → b2-offer.md
✅ B3 — Landing page live           → https://[project].vercel.app
✅ B4 — Hệ thống thanh toán tự động → b4-ban-hang.md
✅ B5 — Ebook đóng gói              → b5-ebook.md + vercel.app/ebook.html
✅ B6 — Content 30 ngày             → b6-content.md
```

**Việc còn lại duy nhất:** Đăng bài ngày 1. Không phải tiếp tục chuẩn bị.

---

## Xử lý tình huống thường gặp

**Học viên muốn bỏ qua một bước:**
> "Bước [X] cần output từ bước trước để hoạt động đúng. Nếu bỏ qua, bước tiếp sẽ hỏi lại từ đầu và mất nhiều thời gian hơn. Mình khuyến nghị làm đủ — mỗi bước chỉ 1–2 giờ."

**Học viên muốn làm B5 trước B4:**
> "Hoàn toàn được — B5 (ebook) không phụ thuộc B4 (payment). Làm B5 xong thì quay lại B4, chỉ cần cập nhật PRODUCT_LINK vào Vercel env là xong."

**Học viên đã có landing page sẵn:**
> "Tốt — bỏ qua B3. Chuyển thẳng B4, mình chỉ cần URL Vercel project để thêm webhook vào."

**Học viên chưa có tài khoản ngân hàng SePay hỗ trợ:**
> "Trong lúc chờ approve, làm B5 (ebook) trước. B4 có thể hoàn thiện sau khi tài khoản sẵn sàng."

---

*7N Launchpad Workflow · v1.0 · Dành cho bộ skill 7n-launchpad-kit*
