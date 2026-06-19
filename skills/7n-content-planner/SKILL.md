---
name: 7n-content-planner
description: >
  Thiết kế hệ thống content 30 ngày để dẫn traffic về trang bán sản phẩm số.
  Tạo ma trận thông điệp chia theo 2 nhóm: giải quyết nỗi đau và giáo dục thị trường.
  Xuất lịch 30 bài chi tiết kèm prompt AI viết sẵn cho từng bài.
  Kích hoạt khi học viên đề cập: "kế hoạch content", "lịch đăng bài", "content 30 ngày",
  "seeding", "quảng bá sản phẩm", "không biết đăng gì", hoặc "bước 6".
  Chạy SAU Bước 2 (7n-offer-design) và Bước 1 (7n-product-positioning).
---

# 7N Content Planner
## Bước 6/6 · Chương trình 7N Launchpad

---

## Mục đích

Giúp học viên đi từ "có sản phẩm" → "có dòng người mua liên tục".

Content ở đây không phải viết cho vui — mà là **content seeding**: mỗi bài là một viên đá nhỏ dẫn đường về trang bán. Mục tiêu của 30 ngày đầu là **1 đơn thanh toán thật**, không phải viral.

---

## Nguyên tắc vận hành

- **Hỏi trước, lên lịch sau** — không tạo lịch generic. Mỗi học viên có ngách, đối tượng, và giọng nói khác nhau.
- **2 nhóm bài chính:** Giải quyết nỗi đau · Giáo dục thị trường. Mọi bài đều thuộc một trong hai.
- **Kèm prompt AI sẵn** — học viên copy vào Claude là viết được bài ngay, không cần nghĩ từ đầu.
- **Mỗi bài viết 2 phần** — theo chuẩn Facebook organic (xem bên dưới).
- Gọi học viên là anh/chị.

---

## Cấu Trúc Bài Đăng Facebook 2 Phần

Facebook hiện không khuyến khích link trong post — thuật toán sẽ hạn chế reach. Vì vậy mọi bài đều viết theo cấu trúc 2 phần:

**Phần 1 — Nội dung chính (đăng trong post)**
- Toàn bộ nội dung: hook → thân bài → insight/bài học
- Kết bằng **CTA dẫn xuống comment**, không đặt link:
  - *"Link + thông tin chi tiết mình để ở bình luận đầu tiên nhé."*
  - *"Bạn muốn xem thêm? Mình ghim link ở comment bên dưới."*
  - *"Đăng ký / tìm hiểu thêm → xem bình luận đầu tiên."*

**Phần 2 — Comment đầu tiên (ghim ngay sau khi đăng)**
- CTA ngắn gọn, rõ ràng
- Đặt link trang bán hoặc link đăng ký
- Có thể thêm: inbox, Zalo, hoặc hướng dẫn bước tiếp theo

Ví dụ Phần 2:
```
👇 Nếu bạn muốn làm ra sản phẩm số đầu tiên trong 7 ngày:

→ Xem chi tiết chương trình tại: [LINK]
→ Hoặc inbox mình từ khoá "7N" để mình gửi thông tin.
```

> **Quy tắc:** Prompt AI luôn yêu cầu xuất đủ 2 phần. Phần 1 không chứa link. Phần 2 không quá 5 dòng.

---

## Flow thực thi

### Khởi động

Khi học viên muốn làm B6, hỏi:

> "Anh/chị đã có file `b2-offer.md` và `b1-dinh-vi.md` chưa? Paste vào đây để mình đọc — mình sẽ dựng lịch content khớp với đúng sản phẩm và đối tượng của anh/chị."

Nếu chưa có file, hỏi 4 câu sau (mỗi câu một lần):

1. **Sản phẩm là gì?** (tên + mô tả ngắn 1 câu)
2. **Khách hàng mục tiêu là ai?** (nhóm người cụ thể, không chung chung)
3. **Nỗi đau lớn nhất họ đang có là gì?** (cái khiến họ mất ngủ)
4. **Anh/chị thường đăng bài trên nền tảng nào?** (Facebook / Instagram / TikTok / LinkedIn / Zalo / khác)

---

### Bước 6.1 — Xác định Core Message

**Bài giảng liên quan:** Ngày 6 — Thiết kế hệ thống nội dung × 30N · Sản phẩm > mô tả sản phẩm > offer

Trước khi lên lịch, xác định **1 thông điệp gốc** xuyên suốt toàn bộ 30 ngày.

Công thức:
```
[Đối tượng] đang [nỗi đau / tình trạng hiện tại].
[Tên sản phẩm] giúp họ [kết quả cụ thể] mà không cần [rào cản phổ biến].
```

Ví dụ:
```
Các bà mẹ sau sinh đang loay hoay giảm cân mà không biết ăn gì.
Ebook "Ăn No Vẫn Gọn" giúp họ lấy lại vóc dáng trong 60 ngày
mà không cần nhịn ăn hay tập gym.
```

Core message này sẽ là la bàn cho mọi bài viết — bài nào viết xong cũng phải hỏi: *"Bài này có dẫn về thông điệp này không?"*

---

### Bước 6.2 — Ma Trận 2 Nhóm Bài

Toàn bộ 30 bài chia theo 2 nhóm chính, tỷ lệ **70/30**:

**Nhóm 1 — Giải Quyết Nỗi Đau (70% = ~21 bài)**

Nói về vấn đề của khách hàng — không bán hàng trực tiếp. Mục tiêu: khiến họ gật đầu "đúng rồi, đây là tôi."

| Loại bài | Mô tả | Tần suất |
|----------|-------|----------|
| **Pain Point** | Kể lại nỗi đau — chạm đúng cảm xúc | 6 bài |
| **Storytelling** | Câu chuyện cá nhân liên quan đến vấn đề | 4 bài |
| **Before / After** | Trước khi có giải pháp vs. sau khi có | 4 bài |
| **Tip & Trick** | Mẹo nhỏ thực dụng — cho đi giá trị miễn phí | 4 bài |
| **Behind the Scene** | Hậu trường làm sản phẩm / quá trình thật | 3 bài |

**Nhóm 2 — Giáo Dục Thị Trường (30% = ~9 bài)**

Giải thích tại sao sản phẩm này tồn tại — xây dựng niềm tin và nhu cầu.

| Loại bài | Mô tả | Tần suất |
|----------|-------|----------|
| **Social Proof** | Kết quả thật, feedback thật, số liệu thật | 3 bài |
| **FAQ** | Trả lời câu hỏi/phản đối phổ biến | 3 bài |
| **Case Study** | 1 ví dụ cụ thể từ A đến Z | 2 bài |
| **Direct Offer** | Bài bán thẳng — giới thiệu sản phẩm + CTA | 1 bài |

---

### Bước 6.3 — Lịch 30 Ngày Chi Tiết

Sau khi có core message và thông tin sản phẩm, tạo bảng lịch theo format:

```
Ngày | Nhóm | Loại bài | Tiêu đề gợi ý | Hook mở đầu
```

**Phân bổ theo tuần:**

- **Tuần 1 (N1–7):** Làm quen — chủ yếu Pain Point + Storytelling. Chưa nhắc sản phẩm trực tiếp.
- **Tuần 2 (N8–14):** Xây trust — Before/After + Tip + Behind Scene. Bắt đầu hé lộ giải pháp.
- **Tuần 3 (N15–21):** Tăng nhiệt — FAQ + Social Proof + Case Study. Dẫn dần về trang bán.
- **Tuần 4 (N22–30):** Chốt — lặp lại Pain mạnh nhất + Direct Offer + kêu gọi hành động rõ.

---

### Bước 6.4 — Prompt AI Cho Từng Loại Bài

Mỗi loại bài kèm 1 prompt mẫu — học viên chỉ cần **điền thông tin vào chỗ trống** rồi dùng với Claude.

---

**PROMPT — Pain Point:**
```
Viết 1 bài đăng Facebook dạng pain point. Xuất đủ 2 phần:

THÔNG TIN:
Đối tượng: [MÔ TẢ NHÓM KHÁCH HÀNG]
Nỗi đau cần chạm: [NỖI ĐAU CỤ THỂ]
Giọng văn: [gần gũi / nghiêm túc / hài hước nhẹ]
Sản phẩm: [TÊN SẢN PHẨM + LINK]

--- PHẦN 1 — NỘI DUNG POST (~150–200 chữ) ---
Cấu trúc:
- Hook: 1 câu hỏi hoặc tình huống khiến người đọc nhận ra ngay bản thân
- Thân: mô tả cảm giác/tình trạng khi đang stuck
- Kết: kết mở, gợi có cách khác — KHÔNG nhắc tên sản phẩm, KHÔNG đặt link
- Dòng cuối: CTA dẫn xuống comment (ví dụ: "Mình để thông tin chi tiết ở bình luận đầu tiên nhé.")

--- PHẦN 2 — COMMENT ĐẦU TIÊN (ghim ngay sau khi đăng, tối đa 5 dòng) ---
- CTA ngắn gọn + link trang bán hoặc hướng dẫn inbox
```

---

**PROMPT — Storytelling:**
```
Viết 1 bài đăng Facebook dạng câu chuyện cá nhân. Xuất đủ 2 phần:

THÔNG TIN:
Chủ đề câu chuyện: [TÌNH HUỐNG / BƯỚC NGOẶT CÁ NHÂN LIÊN QUAN ĐẾN NGÁCH]
Bài học rút ra: [1 CÂU ĐƠN GIẢN]
Kết nối sản phẩm: [có / không]
Sản phẩm: [TÊN + LINK nếu có kết nối]

--- PHẦN 1 — NỘI DUNG POST (~200–250 chữ) ---
Cấu trúc:
- Mở: bối cảnh — đang ở đâu, cảm thấy gì
- Giữa: bước ngoặt xảy ra
- Cuối: bài học + CTA dẫn xuống comment

--- PHẦN 2 — COMMENT ĐẦU TIÊN (tối đa 5 dòng) ---
- Nếu có kết nối sản phẩm: CTA + link
- Nếu không: câu hỏi tương tác hoặc mời chia sẻ
```

---

**PROMPT — Before / After:**
```
Viết 1 bài đăng Facebook dạng before/after. Xuất đủ 2 phần:

THÔNG TIN:
Đối tượng: [NHÓM KHÁCH HÀNG]
Trạng thái TRƯỚC: [MÔ TẢ CỤ THỂ]
Trạng thái SAU: [MÔ TẢ CỤ THỂ]
Cầu nối: [TÊN SẢN PHẨM / PHƯƠNG PHÁP]
Sản phẩm: [TÊN + LINK]

--- PHẦN 1 — NỘI DUNG POST (~150 chữ) ---
Viết như kể câu chuyện người thật, không quảng cáo.
Kết bằng CTA dẫn xuống comment — không đặt link.

--- PHẦN 2 — COMMENT ĐẦU TIÊN (tối đa 5 dòng) ---
CTA + link trang bán hoặc hướng dẫn inbox
```

---

**PROMPT — Tip & Trick:**
```
Viết 1 bài đăng Facebook chia sẻ mẹo thực dụng. Xuất đủ 2 phần:

THÔNG TIN:
Ngách: [CHỦ ĐỀ NGÁCH]
Mẹo: [1 MẸO CỤ THỂ, ÁP DỤNG ĐƯỢC NGAY]
Sản phẩm: [TÊN + LINK]

--- PHẦN 1 — NỘI DUNG POST (~150–180 chữ) ---
- Hook mạnh ở 2 dòng đầu
- Mẹo thực dụng, không chung chung
- Kết bằng câu hỏi tương tác + CTA dẫn xuống comment

--- PHẦN 2 — COMMENT ĐẦU TIÊN (tối đa 5 dòng) ---
CTA + link hoặc hướng dẫn inbox để tìm hiểu thêm
```

---

**PROMPT — FAQ:**
```
Viết 1 bài đăng Facebook dạng Q&A. Xuất đủ 2 phần:

THÔNG TIN:
Câu hỏi/phản đối: [CÂU HỎI THƯỜNG GẶP]
Sản phẩm: [TÊN + LINK]

--- PHẦN 1 — NỘI DUNG POST (~150 chữ) ---
- Mở: "Mình hay được hỏi..."
- Thân: trả lời thật, không né tránh, không hoa mỹ
- Kết: CTA dẫn xuống comment — không đặt link

--- PHẦN 2 — COMMENT ĐẦU TIÊN (tối đa 5 dòng) ---
CTA + link hoặc hướng dẫn inbox
```

---

**PROMPT — Behind the Scene:**
```
Viết 1 bài đăng Facebook dạng hậu trường. Xuất đủ 2 phần:

THÔNG TIN:
Chủ đề hậu trường: [NỘI DUNG MUỐN CHIA SẺ]
Sản phẩm: [TÊN + LINK]

--- PHẦN 1 — NỘI DUNG POST (~180 chữ) ---
- Mở: "Đây là thứ bạn không thấy ở phía trước..."
- Thân: chi tiết thật — quyết định, sai lầm, phát hiện
- Kết: insight rút ra + CTA dẫn xuống comment

--- PHẦN 2 — COMMENT ĐẦU TIÊN (tối đa 5 dòng) ---
CTA + link hoặc hướng dẫn inbox
```

---

**PROMPT — Social Proof:**
```
Viết 1 bài đăng Facebook dạng social proof. Xuất đủ 2 phần:

THÔNG TIN:
Nhân vật: [TÊN/MÔ TẢ HỌC VIÊN]
Kết quả: [SỐ ĐƠN / DOANH THU / THỜI GIAN cụ thể]
Sản phẩm: [TÊN + LINK]

--- PHẦN 1 — NỘI DUNG POST (~160 chữ) ---
Kể như câu chuyện người thật, không quảng cáo.
Không dùng: "tuyệt vời", "phi thường", "không thể tin được".
Kết bằng CTA dẫn xuống comment — không đặt link.

--- PHẦN 2 — COMMENT ĐẦU TIÊN (tối đa 5 dòng) ---
CTA + link trang bán hoặc hướng dẫn inbox
```

---

**PROMPT — Case Study:**
```
Viết 1 bài đăng Facebook dạng case study. Xuất đủ 2 phần:

THÔNG TIN:
Nhân vật: [MÔ TẢ NGƯỜI THẬT]
Hành trình: [TÓM TẮT TỪNG BƯỚC A→Z]
Kết quả: [SỐ LIỆU CỤ THỂ]
Sản phẩm: [TÊN + LINK]

--- PHẦN 1 — NỘI DUNG POST (~200 chữ) ---
- Mở: giới thiệu nhân vật + tình trạng ban đầu
- Giữa: họ làm gì, theo thứ tự
- Cuối: kết quả + CTA dẫn xuống comment

--- PHẦN 2 — COMMENT ĐẦU TIÊN (tối đa 5 dòng) ---
CTA + link trang bán hoặc hướng dẫn inbox
```

---

**PROMPT — Direct Offer:**
```
Viết 1 bài đăng Facebook giới thiệu sản phẩm trực tiếp. Xuất đủ 2 phần:

THÔNG TIN:
Tên sản phẩm: [TÊN]
Giá: [GIÁ]
Chuyển hóa: [TRƯỚC → SAU]
Value stack (3 điểm nổi bật): [LIỆT KÊ]
Link: [URL]

--- PHẦN 1 — NỘI DUNG POST (~180 chữ) ---
- Hook: pain point mạnh nhất
- Giới thiệu: tên + chuyển hóa + value ngắn gọn
- Kết: CTA dẫn xuống comment — KHÔNG đặt link trực tiếp
- Tone: tự tin, không van xin, không spam

--- PHẦN 2 — COMMENT ĐẦU TIÊN (tối đa 5 dòng) ---
Giá + link trang bán rõ ràng + hướng dẫn inbox nếu có câu hỏi
```

---

## Đầu ra bước này

Sau khi hoàn tất B6, lưu `b6-content.md`:

```markdown
# B6 — Hệ Thống Content 30 Ngày

## Core Message
[1 đoạn tổng hợp thông điệp gốc]

## Nền tảng đăng bài chính
[Facebook / Instagram / TikTok / LinkedIn / Zalo]

## Lịch 30 Ngày

| Ngày | Nhóm | Loại bài | Tiêu đề | Hook mở đầu |
|------|------|----------|---------|-------------|
| 1    | Nỗi đau | Pain Point | ... | ... |
| 2    | Nỗi đau | Storytelling | ... | ... |
...

## Prompt Bank
[Lưu lại 6 prompt đã điền thông tin — dùng lại cho các bài sau]
```

---

## Bước tiếp theo

Sau khi hoàn tất B6 — bộ hệ thống 6 bước đã hoàn chỉnh:

```
✅ B1 — Định vị & sản phẩm
✅ B2 — Offer
✅ B3 — Landing page
✅ B4 — Hệ thống bán hàng
✅ B5 — Sản phẩm đóng gói
✅ B6 — Content 30 ngày
```

> **Việc còn lại:** Đăng bài ngày đầu tiên. Không phải tiếp tục chuẩn bị.

---

## Câu hỏi thường gặp

**"Tôi chưa có social proof / feedback vì chưa có khách — bài Social Proof viết gì?"**
Dùng kết quả của chính anh/chị (nếu anh/chị từng áp dụng phương pháp này cho bản thân), hoặc dùng case study giả định có ghi chú rõ "ví dụ minh họa". Feedback thật sẽ có sau khi có khách đầu tiên — lúc đó thay vào.

**"30 ngày phải đăng mỗi ngày không?"**
Không bắt buộc hằng ngày — quan trọng là có **lịch cố định** và **giữ được nhịp**. 4–5 bài/tuần là đủ để thuật toán nhận diện và khán giả nhớ mặt.

**"Nền tảng nào hiệu quả nhất?"**
Không có câu trả lời chung. Hiệu quả nhất là nền tảng anh/chị đã có sẵn khán giả quen — dù nhỏ. Đừng bắt đầu từ con số 0 trên nền tảng mới khi sản phẩm chưa có đơn đầu tiên.

**"Bài viết phải dài không?"**
Không. Bài 100–200 chữ + ảnh đúng chủ đề thường hiệu quả hơn bài dài 500 chữ không có hook. Ưu tiên hook mạnh ở 2 dòng đầu — đó là thứ quyết định người ta có đọc tiếp không.

---

*7N Launchpad Kit · Solobiz · B6 Content Planner · v1.0*
