# PROMPT: Xây dựng website demo TroNest (React + Tailwind CSS)

## 1. Vai trò và mục tiêu

Bạn là một Senior Frontend Developer kiêm UI/UX Designer. Hãy xây dựng **website demo TroNest**, một nền tảng hỗ trợ sinh viên và người đi làm **tìm phòng trọ** hoặc **tìm bạn ở ghép**.

**Mục tiêu sản phẩm:** Một website demo có giao diện hoàn chỉnh và các chức năng cốt lõi hoạt động được, đủ để 8–10 khách hàng mục tiêu trải nghiệm, thực hiện nhiệm vụ và đưa ra phản hồi để nhóm cải thiện sản phẩm.

**Thông điệp thương hiệu:** *"Không chỉ là tìm trọ, đây còn là nơi tìm bạn!"*

---

## 2. Ràng buộc kỹ thuật (BẮT BUỘC)

- **Chỉ frontend, chạy local.** Không backend, không database thật, không gọi API bên ngoài.
- **Công nghệ:** React (khuyến nghị Vite) + Tailwind CSS + Shadcn/UI + Lucide Icons.
- **Routing:** dùng `react-router-dom`.
- **Quản lý state:** React Context hoặc `useReducer` (không cần Redux).
- **Font chữ** Plus Jakarta Sans.
- **Tỷ lệ bo góc thống nhất** rounded-lg.
- **Lưu dữ liệu:** dữ liệu mẫu (mock data) nằm trong file `.js`/`.json` trong `src/data/`. Dữ liệu người dùng tạo mới (tin phòng, hồ sơ, yêu cầu kết nối, tin nhắn) lưu trong state và **đồng bộ với `localStorage`** để không mất khi tải lại trang. Cần có nút "Đặt lại dữ liệu demo" (ví dụ ở footer hoặc trang Admin).
- **Ảnh minh họa:** dùng ảnh placeholder (ví dụ Unsplash URL cố định hoặc gradient/SVG), không yêu cầu upload ảnh thật. Ở form đăng tin có thể cho nhập URL ảnh hoặc chọn ảnh mẫu.
- **Không** xây dựng hệ thống tài khoản phức tạp. Đăng nhập/phân quyền được mô phỏng bằng tài khoản demo.
- Code sạch, chia component rõ ràng, có comment ngắn ở những chỗ logic quan trọng.
- Hướng dẫn chạy: `npm install` rồi `npm run dev`.

---

## 3. Nhận diện thương hiệu và giao diện

| Hạng mục | Chi tiết |
|---|---|
| Tên website | **TroNest** |
| Phong cách | Hiện đại, thân thiện, tối giản, dễ sử dụng |
| Màu chủ đạo | Màu đỏ đô Mã HEX: #700404 |
| Màu phụ | Màu vàng chanh Mã HEX: #FFF012 |
| Màu nền | Trắng ngà `#F4F7F9` |
| Logo | Tạo logo đơn giản bằng SVG (biểu tượng ngôi nhà/tổ ấm + chữ "TroNest"). Nhấn vào logo để về trang chủ. |

**Yêu cầu:**

- Khai báo màu trong `tailwind.config.js` (ví dụ `navy`, `teal`, `ivory`) và dùng nhất quán toàn site.
- Thiết kế **responsive**, hiển thị tốt trên máy tính và điện thoại (mobile-first, navbar thu gọn thành menu hamburger trên màn hình nhỏ).
- Phù hợp với sinh viên và người đi làm trẻ: bo góc mềm, khoảng trắng thoáng, icon rõ ràng (dùng `lucide-react`).
- Có trạng thái hover, focus, disabled cho nút và input; có empty state khi không có kết quả lọc.
- Mọi văn bản giao diện bằng **tiếng Việt**.

---

## 4. Thanh điều hướng (Navbar)

Thanh điều hướng chung gồm:

1. **Logo** — nhấn để về trang chủ.
2. **Tìm phòng**
3. **Tìm bạn ở ghép**
4. **Đăng nhập / Đăng ký** (mô phỏng bằng tài khoản demo; sau khi đăng nhập hiển thị tên người dùng và nút Đăng xuất; có thêm mục **Kết nối** và, với Admin, mục **Quản trị**)

**Quy tắc hiển thị nút hành động:**

- Nút **Đăng tin phòng** chỉ xuất hiện trong trang **Tìm phòng**.
- Nút **Tạo hồ sơ** chỉ xuất hiện trong trang **Tìm bạn ở ghép**.

**Tài khoản demo** (hiển thị gợi ý ngay trên form đăng nhập):

- Người dùng: `user@tronest.demo` / `123456`
- Admin: `admin@tronest.demo` / `admin123`

---

## 5. Các trang và chức năng

### 5.1. Trang chủ (`/`)

- Hero: tên TroNest, thông điệp thương hiệu, giới thiệu ngắn về nền tảng.
- **Hai khu vực nổi bật** dạng card lớn: **Tìm phòng** và **Tìm bạn ở ghép**, mỗi khu có nút dẫn đến chức năng tương ứng.
- Hiển thị một số **phòng trọ nổi bật** và **hồ sơ mẫu nổi bật** (3–4 mục mỗi loại), bấm vào đi đến trang chi tiết.
- Footer đơn giản.

### 5.2. Trang Tìm phòng (`/tim-phong`)

- Danh sách phòng dạng **thẻ (card)**: ảnh, giá thuê, khu vực, thông tin nổi bật (diện tích, tiện ích chính).
- **Tìm kiếm** theo từ khóa (tên/địa chỉ/mô tả).
- **Bộ lọc** theo **khu vực** và **mức giá** (ví dụ: dưới 2tr, 2–3tr, 3–5tr, trên 5tr). Có nút xóa bộ lọc.
- Chỉ hiển thị phòng có trạng thái **đã đăng** và **không bị ẩn**.
- Nút **Đăng tin phòng** (chỉ ở trang này): mở biểu mẫu (modal) gồm tiêu đề, khu vực, địa chỉ, giá thuê, diện tích, tiện ích, mô tả, ảnh, **số điện thoại liên hệ**.
  - Validate các trường bắt buộc, kiểm tra định dạng số điện thoại và giá/diện tích hợp lệ; hiển thị lỗi dưới từng trường.
  - Sau khi gửi: hiển thị **thông báo thành công**, nêu rõ tin **đang chờ Admin duyệt** (trạng thái `pending`), chưa hiện công khai.

### 5.3. Trang Chi tiết phòng (`/phong/:id`)

- Hiển thị: ảnh (gallery đơn giản), giá thuê, địa điểm, diện tích, tiện ích, mô tả phòng.
- Nút **Đặt lịch xem phòng**: mở biểu mẫu nhập **họ tên, số điện thoại/email liên hệ, ngày giờ mong muốn, ghi chú**.
  - Validate trường bắt buộc, không cho chọn thời gian trong quá khứ.
  - Sau khi gửi: hiển thị thông báo **"Đã nhận yêu cầu xem phòng"**. **Không** được hiển thị hay ngụ ý rằng lịch đã được xác nhận; dùng cách diễn đạt như "Chủ phòng sẽ liên hệ lại để xác nhận."

### 5.4. Trang Tìm bạn ở ghép (`/tim-ban-o-ghep`)

- Danh sách **hồ sơ mẫu và hồ sơ do người dùng tạo**, mỗi thẻ gồm: khu vực, ngân sách, thời gian chuyển vào, thói quen sinh hoạt (dạng tag), loại hồ sơ (Đã có phòng / Chưa có phòng).
- **Tìm kiếm và lọc** hồ sơ (khu vực, khoảng ngân sách, loại hồ sơ, thói quen sinh hoạt như giờ giấc, hút thuốc, nuôi thú cưng, nấu ăn…).
- Nút **Tạo hồ sơ** (chỉ ở trang này): mở biểu mẫu tạo hồ sơ ở ghép (mục 5.5).
- **Hồ sơ mới tạo phải xuất hiện ngay trong danh sách** và có thể xem chi tiết, tìm kiếm, lọc **giống hệt hồ sơ mẫu**.
- Nếu hồ sơ đã ở trạng thái **Đã kết nối (Match)** với hồ sơ của người dùng hiện tại, hiển thị huy hiệu tương ứng.

### 5.5. Biểu mẫu tạo hồ sơ ở ghép (modal hoặc trang riêng)

Cho phép chọn **một trong hai trường hợp** (dạng tab hoặc radio card):

**A. Đã có phòng, cần tìm người ở cùng** — nhập:
- Khu vực, giá thuê (cả phòng), chi phí mỗi người, số chỗ còn trống, thông tin phòng (diện tích, tiện ích, mô tả).

**B. Chưa có phòng, muốn tìm người thuê chung** — nhập:
- Ngân sách, khu vực muốn thuê, thời gian dự kiến chuyển vào.

**Cả hai trường hợp đều có:**
- Thông tin **thói quen sinh hoạt** (giờ ngủ/dậy, hút thuốc, nuôi thú cưng, nấu ăn, mức độ gọn gàng, khách đến chơi…).
- **Số điện thoại liên hệ.**
- Tên/biệt danh hiển thị, giới thiệu ngắn.

**Yêu cầu:**
- Validate trường bắt buộc theo từng trường hợp (form đổi trường theo lựa chọn).
- Sau khi gửi: hiển thị **thông báo thành công**, lưu hồ sơ vào dữ liệu demo của frontend (state + `localStorage`) và hiển thị trên trang Tìm bạn ở ghép.
- Người dùng có thể mở hồ sơ vừa tạo để xem chi tiết và trải nghiệm các chức năng kết nối.

### 5.6. Trang Chi tiết hồ sơ (`/ho-so/:id`)

- Hiển thị: nhu cầu tìm bạn ở ghép, ngân sách, khu vực, thời gian chuyển vào, thói quen sinh hoạt (và thông tin phòng nếu thuộc trường hợp A).
- **Điểm tương thích** (0–100%) giữa hồ sơ này và hồ sơ của người dùng hiện tại, kèm **danh sách tiêu chí phù hợp / chưa phù hợp** (khu vực, ngân sách, thời gian chuyển vào, từng thói quen). Viết hàm tính điểm tách riêng, dễ đọc và dễ chỉnh trọng số.
  - Nếu người dùng chưa có hồ sơ: hiển thị gợi ý "Tạo hồ sơ để xem độ tương thích".
- Nút **Gửi yêu cầu kết nối** để mô phỏng việc tìm người ở cùng. **Không mở khung chat ngay khi gửi yêu cầu.**
- Trạng thái nút thay đổi theo quan hệ giữa hai hồ sơ:

| Trạng thái | Nút hiển thị |
|---|---|
| Chưa kết nối | Gửi yêu cầu kết nối |
| Đã gửi, chờ phản hồi | Đang chờ phản hồi (disabled) |
| Đã được chấp nhận (Match) | Nhắn tin |
| Bị từ chối | Hiển thị trạng thái đã bị từ chối (cho phép gửi lại hoặc không, tùy bạn chọn và ghi chú rõ) |

### 5.7. Tính năng Kết nối và Chat mô phỏng

**Luồng kết nối:**

1. Bấm **Gửi yêu cầu kết nối** → hiển thị **popup** cho nhập **lời nhắn mở đầu** (bắt buộc, có giới hạn ký tự) và nút xác nhận gửi.
2. Sau khi gửi, yêu cầu chuyển sang **Đang chờ phản hồi**. **Người dùng không thể mở chat khi yêu cầu chưa được chấp nhận.**
3. Có **khu vực "Kết nối"** (trang `/ket-noi`) với hai tab: **Yêu cầu đã gửi** và **Yêu cầu nhận được**.
   - Ở tab "Yêu cầu nhận được" có nút **Chấp nhận** và **Từ chối**.
   - Để người dùng test được cả hai chiều, cung cấp dữ liệu mẫu có sẵn vài yêu cầu nhận được, và có nút/tùy chọn **mô phỏng đối phương phản hồi** (chấp nhận/từ chối) cho yêu cầu đã gửi.
4. Khi yêu cầu được **chấp nhận** → hai hồ sơ chuyển sang **Đã kết nối (Match)**; nút trên hồ sơ đổi thành **Nhắn tin**.

**Chat mô phỏng:**

- Khung chat mở được từ nút **Nhắn tin** (hoặc từ danh sách kết nối đã Match).
- Hiển thị **tin nhắn mẫu** ban đầu (ví dụ lời nhắn mở đầu và vài tin phản hồi).
- Gửi **tin nhắn giả lập** ngay trên giao diện (tin của người dùng hiển thị tức thì, có thể có phản hồi tự động mẫu sau 1–2 giây).
- Tin nhắn lưu trong state/`localStorage`.

### 5.8. Khu vực Admin đơn giản (`/admin`) (Không cần chức năng này)

- Truy cập bằng **tài khoản demo Admin**; người dùng thường truy cập sẽ bị chặn/chuyển hướng.
- Hiển thị **danh sách tin phòng đang chờ duyệt** với nút **Duyệt tin** và **Từ chối**.
- Khi **Duyệt**: tin chuyển sang trạng thái **đã đăng** và hiển thị trên trang Tìm phòng.
- Cho phép **Ẩn/Hiện** tin đăng phòng **mà không xóa tin**, đồng thời có thể **khôi phục** các tin đã ẩn.
- Có tab/bộ lọc theo trạng thái: Chờ duyệt, Đã đăng, Đã ẩn, Đã từ chối.

---

## 6. Mô hình dữ liệu gợi ý

```js
// Room
{ id, title, area, address, price, size, amenities: [], description,
  images: [], contactPhone, status: 'pending'|'published'|'rejected', hidden: false }

// RoommateProfile
{ id, ownerId, displayName, type: 'has-room'|'need-room',
  area, budget, moveInDate, habits: {},
  // chỉ khi type = 'has-room':
  roomRent, costPerPerson, slotsLeft, roomInfo,
  phone, intro }

// ConnectionRequest
{ id, fromProfileId, toProfileId, message, status: 'pending'|'accepted'|'rejected', createdAt }

// ChatMessage
{ id, connectionId, senderProfileId, text, createdAt }
```

Chuẩn bị dữ liệu mẫu: tối thiểu **8–10 phòng** (đa dạng khu vực và mức giá, có vài tin ở trạng thái chờ duyệt) và **8–10 hồ sơ ở ghép** (cả hai loại), ví dụ khu vực tại Hà Nội (Thanh Xuân, Cầu Giấy, Đống Đa, Hà Đông, Nam Từ Liêm…).

---

## 7. Cấu trúc thư mục gợi ý

```
tronest/
├── src/
│   ├── components/   # Navbar, Footer, RoomCard, ProfileCard, Modal, Toast, FormField...
│   ├── pages/        # Home, FindRoom, RoomDetail, FindRoommate, ProfileDetail, Connections, Chat, Admin, Login
│   ├── context/      # AuthContext, DataContext
│   ├── data/         # mockRooms.js, mockProfiles.js, mockConnections.js
│   ├── utils/        # compatibility.js, validators.js, storage.js
│   └── App.jsx
├── tailwind.config.js
└── package.json
```

---

## 8. Yêu cầu chất lượng

- Các **nút bấm, bộ lọc và biểu mẫu chính đều phải hoạt động**.
- Mọi biểu mẫu **kiểm tra trường bắt buộc** và **hiển thị thông báo sau khi gửi** (toast hoặc modal thành công).
- Giao diện nhất quán, không có lỗi console, không có link chết.
- Kiểm tra hiển thị tốt ở các độ rộng 360px, 768px, 1280px.
- Có thể dùng thử trọn vẹn các luồng chính mà không cần giải thích thêm.

---

## 9. Các luồng cần kiểm thử (để khách hàng thực hiện nhiệm vụ)

1. Tìm một phòng theo khu vực + mức giá → xem chi tiết → đặt lịch xem phòng.
2. Đăng tin phòng → đăng nhập Admin → duyệt tin → thấy tin xuất hiện ở trang Tìm phòng.
3. Admin ẩn một tin phòng rồi khôi phục lại.
4. Tạo hồ sơ ở ghép (cả hai trường hợp) → thấy hồ sơ xuất hiện trong danh sách, xem chi tiết, tìm kiếm và lọc được.
5. Xem điểm tương thích → gửi yêu cầu kết nối → thấy trạng thái "Đang chờ phản hồi" và không mở được chat.
6. Chấp nhận một yêu cầu nhận được → trạng thái Match → bấm Nhắn tin → gửi tin nhắn.

---

## 10. Cách bạn nên làm việc

1. Tóm tắt ngắn kế hoạch và cấu trúc dự án trước khi viết code.
2. Cung cấp **đầy đủ code** cho từng file (không viết tắt, không để "...").
3. Đưa các lệnh khởi tạo (Vite + Tailwind + react-router-dom + lucide-react) và hướng dẫn chạy local.
4. Cuối cùng liệt kê ngắn gọn những giả định bạn đã đặt ra (nếu có).
