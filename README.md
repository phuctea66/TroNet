# TroNest

Frontend demo giúp sinh viên và người đi làm tìm phòng trọ, tìm bạn ở ghép và trải nghiệm các luồng kết nối mô phỏng.

## 1. Kế hoạch và cấu trúc dự án

Triển khai giao diện responsive bằng React + Vite, dùng React Router cho điều hướng, Tailwind CSS cho cấu hình giao diện và Lucide cho biểu tượng. Dữ liệu mẫu nằm trong `src/data/`; dữ liệu người dùng tạo được lưu trong `localStorage`.


```text
.
├── README.md
├── .gitignore
├── .github/workflows/deploy.yml # Build và deploy GitHub Pages
├── index.html
├── package.json
├── package-lock.json
├── postcss.config.js
├── tailwind.config.js
├── vite.config.js
├── docs/
│   └── tronest-prompt.md   # Prompt/yêu cầu sản phẩm gốc
├── src/
│   ├── App.jsx             # Trang, routing, các luồng giao diện và localStorage
│   ├── main.jsx            # Điểm khởi chạy React
│   ├── index.css           # Style responsive và token giao diện
│   ├── data/
│   │   ├── mockRooms.js
│   │   ├── mockProfiles.js
│   │   └── mockConnections.js
│   └── utils/
│       ├── compatibility.js
│       └── validators.js
└── .agents/skills/ui-ux-pro-max/ # Skill UI/UX của project
```


## 2. Mã nguồn đầy đủ

Mã nguồn đầy đủ của ứng dụng được lưu trong các file sau, không rút gọn bằng dấu `...`:

- Ứng dụng, routing, component và state: [src/App.jsx](src/App.jsx)
- Điểm khởi chạy: [src/main.jsx](src/main.jsx)
- Giao diện responsive: [src/index.css](src/index.css)
- Dữ liệu phòng: [src/data/mockRooms.js](src/data/mockRooms.js)
- Dữ liệu hồ sơ: [src/data/mockProfiles.js](src/data/mockProfiles.js)
- Kết nối và tin nhắn mẫu: [src/data/mockConnections.js](src/data/mockConnections.js)
- Công thức tương thích: [src/utils/compatibility.js](src/utils/compatibility.js)
- Kiểm tra biểu mẫu: [src/utils/validators.js](src/utils/validators.js)
- Prompt yêu cầu gốc: [docs/tronest-prompt.md](docs/tronest-prompt.md)
- Skill giao diện: [.agents/skills/ui-ux-pro-max/SKILL.md](.agents/skills/ui-ux-pro-max/SKILL.md)
- Cấu hình project: [package.json](package.json), [tailwind.config.js](tailwind.config.js), [postcss.config.js](postcss.config.js), [vite.config.js](vite.config.js)

## 3. Khởi tạo và chạy local

Lệnh khởi tạo project React + Vite và cài các thư viện được sử dụng:

```bash
npm create vite@latest tronest -- --template react
cd tronet
npm install
npm install react-router-dom lucide-react
npm install -D tailwindcss postcss autoprefixer
npx tailwindcss init -p
```

Project hiện tại đã có cấu hình và dependency. Để chạy local:

```bash
npm install
npm run dev
```

Vite sẽ in địa chỉ local trong terminal, thường là `http://localhost:5173`. Tạo bản production bằng `npm run build`.


### Tài khoản demo

- User: `user@tronest.demo` / `123456`
- Admin: `admin@tronest.demo` / `admin123`

## 4. Giả định

- Đây là frontend demo, không có backend hoặc cơ sở dữ liệu thật; mỗi trình duyệt/thiết bị có dữ liệu `localStorage` riêng.
- Người dùng yêu cầu UI bằng tiếng Anh, nên nội dung giao diện dùng tiếng Anh dù prompt gốc có phần yêu cầu tiếng Việt.
- Đăng nhập, quyền Admin, yêu cầu kết nối và chat chỉ mô phỏng.
- Ảnh phòng và avatar dùng URL minh họa; dữ liệu tạo/phê duyệt không đồng bộ giữa các thiết bị.
- Nút **Reset demo data** ở chân trang khôi phục dữ liệu mẫu trên thiết bị hiện tại.
