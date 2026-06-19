# 7N Launchpad Kit

Hệ thống AI hướng dẫn tạo và bán sản phẩm số trong 7 ngày — 6 bước, 6 skills, 1 workflow.

---

## Cách hoạt động

Khi người dùng gõ `/launchpad` hoặc mô tả muốn làm sản phẩm số:
1. Đọc `workflows/7n-launchpad-workflow.md`
2. Xác định đang ở bước nào
3. Đọc skill tương ứng: `skills/{skill-name}/SKILL.md`
4. Dẫn dắt theo flow trong skill — hỏi, draft, confirm, output
5. Nhắc lưu output → chuyển bước tiếp

---

## 6 Bước & Skills

| Bước | Lệnh | Skill | Mục tiêu |
|------|------|-------|----------|
| B1 | `/launchpad b1` | `7n-product-positioning` | Chọn ngách + sản phẩm |
| B2 | `/launchpad b2` | `7n-offer-design` | Thiết kế offer 42 điểm |
| B3 | `/launchpad b3` | `7n-landing-page-writer` | Landing page live trên Vercel |
| B4 | `/launchpad b4` | `7n-payment-setup` | Thanh toán + giao hàng tự động |
| B5 | `/launchpad b5` | `7n-ebook-builder` | Ebook HTML hoàn chỉnh |
| B6 | `/launchpad b6` | `7n-content-planner` | Lịch 30 bài content + prompt bank |

---

## Lệnh

- `/launchpad` — Bắt đầu từ B1 (hoặc tiếp tục nếu đã có context)
- `/launchpad b[N]` — Nhảy thẳng vào bước N (1–6)
- `/launchpad status` — Kiểm tra đã hoàn thành đến đâu

---

## Quy tắc vận hành

- **Ngôn ngữ:** Tiếng Việt toàn bộ — hỏi, hướng dẫn, output đều bằng tiếng Việt
- **Xưng hô:** Gọi người dùng là anh/chị
- **Không hỏi lại những gì đã có** — đọc context bước trước, tự draft trước rồi confirm
- **Thứ tự ưu tiên:** Nếu người dùng mô tả ý định mà không dùng lệnh, map sang bước gần nhất và xác nhận trước khi chạy
- **B5 và B4 linh hoạt** — có thể hoán đổi thứ tự nếu cần

---

## Workflow

Đọc `workflows/7n-launchpad-workflow.md` để biết:
- Checkpoint cần pass trước khi chuyển bước
- File output cần lưu sau mỗi bước
- Cách xử lý tình huống đặc biệt (bỏ bước, đổi thứ tự...)

---

## Tech stack

| Công cụ | Vai trò |
|---------|---------|
| **Vercel CLI** | Deploy landing page — Claude tự chạy lệnh |
| **SePay VietQR** | Nhận thanh toán — học viên thao tác trên dashboard |
| **Resend** | Gửi email sản phẩm tự động |
| **Telegram Bot** | Thông báo đơn hàng real-time |
| **Vercel** | Host cả landing page lẫn ebook — cùng 1 project |
