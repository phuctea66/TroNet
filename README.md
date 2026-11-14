# TroNest

Website demo nền tảng hỗ trợ sinh viên và người đi làm **tìm phòng trọ** và **tìm bạn ở ghép** với các tính năng kết nối và nhắn tin mô phỏng.

---

## 1. Cấu trúc thư mục dự án

Toàn bộ cấu trúc thư mục của dự án:

```text
.
├── README.md                           # Hướng dẫn dự án và tài liệu khởi chạy
├── .gitignore                          # Cấu hình bỏ qua file trong git
├── .github/
│   └── workflows/
│       └── deploy.yml                  # CI/CD tự động build và deploy lên GitHub Pages
├── index.html                          # File HTML gốc (Plus Jakarta Sans, viewport chuẩn)
├── package.json                        # Cấu hình dự án, scripts và danh sách dependencies
├── package-lock.json                   # Khóa phiên bản dependencies
├── postcss.config.js                   # Cấu hình PostCSS cho Tailwind CSS
├── tailwind.config.js                  # Cấu hình theme màu (đỏ đô #700404, vàng #FFF012, trắng ngà #F4F7F9)
├── vite.config.js                      # Cấu hình Vite (hỗ trợ cả local lẫn GitHub Pages base path)
├── docs/
│   └── tronest-prompt.md               # File yêu cầu và đặc tả sản phẩm gốc
├── src/
│   ├── App.jsx                         # Component chính: routing, các trang, modal và state
│   ├── main.jsx                        # Điểm khởi chạy React (dùng HashRouter cho tương thích mọi server)
│   ├── index.css                       # Design system, CSS variables, typography và responsive styling
│   ├── data/
│   │   ├── mockRooms.js                # Dữ liệu mẫu danh sách phòng trọ
│   │   ├── mockProfiles.js             # Dữ liệu mẫu hồ sơ ở ghép (cả có phòng và cần tìm phòng)
│   │   └── mockConnections.js          # Dữ liệu mẫu yêu cầu kết nối và tin nhắn chat ban đầu
│   └── utils/
│       ├── compatibility.js            # Thuật toán tính điểm tương thích (0–100%) giữa 2 hồ sơ
│       └── validators.js               # Các hàm kiểm tra tính hợp lệ dữ liệu biểu mẫu
└── .agents/skills/ui-ux-pro-max/       # Bộ công cụ và quy chuẩn UI/UX của dự án
```

---

## 2. Mã nguồn chi tiết các module

Toàn bộ mã nguồn của ứng dụng nằm tại các file sau (đầy đủ 100%, không viết tắt hay dùng `...`):

- **Giao diện & Logic luồng**: [src/App.jsx](src/App.jsx)
- **Khởi chạy React Root**: [src/main.jsx](src/main.jsx)
- **Stylesheet & Design Tokens**: [src/index.css](src/index.css)
- **Dữ liệu phòng trọ**: [src/data/mockRooms.js](src/data/mockRooms.js)
- **Dữ liệu hồ sơ người dùng**: [src/data/mockProfiles.js](src/data/mockProfiles.js)
- **Dữ liệu kết nối & Chat**: [src/data/mockConnections.js](src/data/mockConnections.js)
- **Hàm tính tương thích (Roommate Match)**: [src/utils/compatibility.js](src/utils/compatibility.js)
- **Xác thực biểu mẫu (Validation)**: [src/utils/validators.js](src/utils/validators.js)
- **Prompt yêu cầu gốc**: [docs/tronest-prompt.md](docs/tronest-prompt.md)

---

## 3. Hướng dẫn khởi chạy dự án

### Yêu cầu môi trường
- **Node.js**: Phiên bản `18.0.0` trở lên (khuyên dùng Node `20.x` hoặc `22.x`)
- **Trình quản lý gói**: `npm` (đi kèm Node.js)

---

### Cách 1: Chạy từ mã nguồn có sẵn (Khuyên dùng)

Khi bạn hoặc người khác đã có mã nguồn dự án (sau khi `git clone` hoặc giải nén thư mục), chỉ cần thực hiện 2 bước:

```bash
# Bước 1: Cài đặt toàn bộ thư viện dependencies
npm install

# Bước 2: Khởi chạy môi trường phát triển local
npm run dev
```

Sau khi chạy lệnh trên, terminal sẽ hiển thị địa chỉ truy cập local:
```text
  VITE v5.4.11  ready in ~300 ms

  ➜  Local:   http://localhost:5173/
  ➜  Network: use --host to expose
```

👉 Mở trình duyệt và truy cập: **`http://localhost:5173`**

---

### Cách 2: Đóng gói bản Production (Build & Preview)

Để kiểm tra bản đóng gói sản phẩm trước khi đưa lên môi trường hosting:

```bash
# Biên dịch mã nguồn thành file tĩnh trong thư mục dist/
npm run build

# Chạy server thử nghiệm bản build
npm run preview
```

---

### (Tham khảo) Các bước đã dùng để thiết lập dự án ban đầu

Nếu cần tái tạo lại toàn bộ cấu trúc dự án từ một thư mục trống:

```bash
# 1. Khởi tạo template React với Vite
npm create vite@latest TroNet -- --template react
cd TroNet

# 2. Cài đặt các dependencies cần thiết
npm install react-router-dom lucide-react clsx tailwind-merge

# 3. Cài đặt công cụ giao diện Tailwind CSS
npm install -D tailwindcss postcss autoprefixer
npx tailwindcss init -p
```

---

## 4. Tài khoản Demo có sẵn

Hệ thống có sẵn các tài khoản demo để người dùng trải nghiệm đầy đủ các phân quyền:

| Loại tài khoản | Email đăng nhập | Mật khẩu | Quyền hạn và tính năng |
|---|---|---|---|
| **Người dùng (User)** | `user@tronest.demo` | `123456` | Alex Nguyen: Xem phòng, đặt lịch, tạo hồ sơ, gửi/nhận kết nối và chat trực tiếp |
| **Quản trị viên (Admin)** | `admin@tronest.demo` | `admin123` | Jamie (Admin): Truy cập trang Quản trị (`#/admin`), duyệt/từ chối tin đăng, ẩn/khôi phục tin |

> **Mẹo:** Trên trang Đăng nhập (`#/login`), có sẵn 2 nút bấm nhanh **Quick Demo Sign In** cho User và Admin giúp đăng nhập chỉ với 1 click mà không cần gõ phím.

---

## 5. Các lưu ý & Giả định kỹ thuật

1. **Frontend-Only & Mock Data**: Ứng dụng chạy hoàn toàn ở frontend, không yêu cầu cơ sở dữ liệu thật hay API server bên ngoài.
2. **Lưu trữ `localStorage`**: Dữ liệu phòng mới đăng, hồ sơ mới tạo, yêu cầu kết nối và tin nhắn chat được tự động đồng bộ vào `localStorage` của trình duyệt. Tải lại trang (F5) không bị mất dữ liệu.
3. **Nút Reset dữ liệu**: Ở chân trang (Footer), có nút **"Reset demo data"** cho phép khôi phục lại dữ liệu mẫu gốc ban đầu bất cứ lúc nào.
4. **Định tuyến `HashRouter`**: Ứng dụng sử dụng `HashRouter` (`#/rooms`, `#/roommates`,...) giúp website hoạt động mượt mà trên tất cả các loại static host (GitHub Pages, Vercel, Netlify, Apache, Nginx) mà không bao giờ gặp lỗi 404 khi người dùng tải lại trang.
5. **Responsive**: Giao diện hiển thị tối ưu trên cả máy tính (desktop), máy tính bảng (tablet) và điện thoại di động (mobile-first), đáp ứng đầy đủ tiêu chuẩn trợ năng WCAG 2.2 AA.
