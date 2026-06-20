# Enterprise Automation Testing Framework (Web, Mobile, API, DB)

Framework kiểm thử tự động hóa cấp độ Enterprise, tích hợp toàn diện Web, Native Mobile, API và Database sử dụng **TypeScript**, **Playwright** và **Mobilewright (Mobile Next)**. Được thiết kế tối ưu cho các dự án phát triển phần mềm định hướng **AI-First (AI-Gen)**.

---

## 🛠️ Công Nghệ Áp Dụng (Tech Stack)

1.  **Ngôn ngữ**: [TypeScript](https://www.typescriptlang.org/) (Module NodeNext, Type-safe tuyệt đối).
2.  **Web Testing**: [Playwright](https://playwright.dev/) (Tự động đợi, chạy song song siêu tốc, hỗ trợ Chrome, Firefox, Safari).
3.  **Mobile Testing**: [Mobilewright / Mobile Next](https://mobilewright.dev/) (Framework mobile E2E mới nhất kế thừa cú pháp và tính năng vượt trội của Playwright, giao tiếp qua Accessibility Tree của thiết bị).
4.  **API Testing**: Sử dụng `APIRequestContext` của Playwright, gói gọn trong các lớp Service giúp tái sử dụng dễ dàng.
5.  **Multi-Environment Routing**: `cross-env` kết hợp JSON configuration động cho phép chạy toàn bộ test case chỉ bằng cách truyền cờ môi trường (SIT, STG, DEV).

---

## 📂 Cấu Trúc Dự Án (Project Folder Structure)

```
playwright-enterprise-framework/
├── .agents/                        # Chứa các Agent Skills hướng dẫn cho AI Gen
│   └── skills/
│       └── mobilewright-automation/
│           └── SKILL.md            # Tài liệu định nghĩa hành vi, cú pháp để AI đọc và viết code
├── config/                         # Quản lý cấu hình toàn cục & đa môi trường
│   ├── envs/                       # Dữ liệu môi trường (URLs, Account Credentials, DB connections)
│   │   ├── dev.json
│   │   ├── sit.json
│   │   └── stg.json
│   ├── env.config.ts               # Bộ tải cấu hình động dựa trên biến ENV
│   └── playwright.config.ts        # File cấu hình runner chính của Playwright/Mobilewright
├── src/                            # Mã nguồn chính của Framework
│   ├── core/                       # Các Client kết nối và cấu trúc nền tảng
│   │   ├── api/
│   │   │   └── api.client.ts       # Reusable API Client (tự động xử lý auth token, log request/response)
│   │   ├── database/
│   │   │   └── db.client.ts        # Database helper thực hiện truy vấn SQL xác thực data
│   │   └── base/
│   │       ├── base.page.ts        # Lớp cơ sở cho Web Page Objects
│   │       └── base.screen.ts      # Lớp cơ sở cho Mobile Screens
│   ├── screens/                    # Quản lý Mobile Screen Object Model (POM) - Chia theo APP (không chia theo System)
│   │   ├── customer-app/
│   │   │   └── login.screen.ts
│   │   ├── driver-app/
│   │   │   └── login.screen.ts
│   │   └── merchant-app/
│   │       └── dashboard.screen.ts
│   ├── pages/                      # Quản lý Web Page Object Model (POM) theo hệ thống/tính năng
│   │   └── system-a/
│   │       └── login.page.ts
│   ├── fixtures/
│   │   └── base.fixture.ts
│   └── tests/
│       └── system-a/
│           └── feature-1/
│               ├── api-user.spec.ts
│               ├── web-login.spec.ts
│               ├── hybrid-e2e.spec.ts
│               └── hybrid-multi-app.spec.ts
├── package.json                    # Khai báo thư viện & các kịch bản lệnh chạy test (NPM Scripts)
└── tsconfig.json                   # Cấu hình biên dịch TypeScript & alias đường dẫn (@core, @config...)
```

---

## 🧠 Tối Ưu Hóa Cho AI-First (AI Gen-Friendly)

Dự án này được tối ưu hóa để các AI Assistant (như Copilot, Cursor, Gemini Agent) có thể sinh mã nguồn kiểm thử tự động chính xác 100%:

1.  **Dùng Fixture thay vì Import thủ công**: AI chỉ cần viết:
    ```typescript
    test('Verify login', async ({ webApp, apiClient }) => { ... });
    ```
    Không cần quan tâm đường dẫn import Page Object hay khởi tạo Client, giảm thiểu lỗi biên dịch.
2.  **JSDoc đầy đủ**: Mọi Page Object và hàm dùng chung đều được viết JSDoc rõ ràng làm chỉ dẫn ngữ cảnh cho AI.
3.  **Tích hợp Agent Skill**: Folder `.agents/skills/mobilewright-automation/SKILL.md` chứa định nghĩa cú pháp Mobilewright mới nhất để các AI Agent tự động đọc trước khi sinh code.
4.  **Không dùng Cucumber/BDD**: Loại bỏ lớp Gherkin rườm rà giúp giảm token cost, loại bỏ hoàn toàn hiện tượng AI sinh sai regex Step Definition.

---

## ⚙️ Hướng Dẫn Cài Đặt & Thiết Lập Môi Trường (Setup)

### 1. Chuẩn Bị (Prerequisites)
*   Đã cài đặt [Node.js](https://nodejs.org/) (Khuyến nghị bản LTS v20+).
*   Đã cài đặt Git.
*   (Dành cho Mobile Native) Cài đặt sẵn Android Emulator hoặc iOS Simulator và chạy daemon kết nối thiết bị.

### 2. Kéo Code Về Máy (Clone)
```bash
git clone https://github.com/duyngo91/hsk.git
cd hsk
```

### 3. Cài Đặt Thư Viện (Installation)
```bash
npm install
```

### 4. Cài Đặt Trình Duyệt Playwright
Tải xuống các gói nhân trình duyệt tích hợp của Playwright:
```bash
npx playwright install
```

---

## 🚀 Hướng Dẫn Chạy Thử Nghiệm (Execution)

Đối với các test case tích hợp đa nền tảng có chứa **Native Mobile** (hoặc cả **Web + Mobile**), chúng ta **bắt buộc** phải sử dụng runner của **Mobilewright** (`mobilewright test`) thay vì Playwright gốc (`playwright test`). 
Lý do: `mobilewright test` sẽ quản lý vòng đời của Appium, tự động phát hiện/khởi chạy các trình giả lập (Simulators/Emulators) và thực hiện cài đặt các tệp APK/APP lên thiết bị trước khi chạy.

Các lệnh NPM scripts của dự án đã được định cấu hình tự động sử dụng `mobilewright test`:

*   **Chạy trên môi trường DEV** (Mặc định):
    ```bash
    npm run test:dev
    ```
*   **Chạy trên môi trường SIT**:
    ```bash
    npm run test:sit
    ```
*   **Chạy trên môi trường STAGING (STG)**:
    ```bash
    npm run test:stg
    ```

### Chạy một test case cụ thể:
```bash
npm run test:dev -- tests/system-a/feature-1/hybrid-multi-app.spec.ts
```

### Chạy thủ công bằng CLI trực tiếp (nếu cần):
```bash
npx mobilewright test --config=config/playwright.config.ts
```

### Xem báo cáo kiểm thử (HTML Report):
Để xem báo cáo kiểm thử HTML do Mobilewright tạo ra:
```bash
npx mobilewright show-report
```
