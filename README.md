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
├── .github/
│   └── workflows/
│       └── playwright.yml          # GitHub Actions CI Workflow
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
│   ├── global-setup.ts             # Hook khởi động toàn cục (chạy 1 lần trước khi test)
│   ├── global-teardown.ts          # Hook dọn dẹp toàn cục (chạy 1 lần sau khi test xong)
│   └── playwright.config.ts        # File cấu hình runner chính của Playwright/Mobilewright
├── src/                            # Mã nguồn chính của Framework
│   ├── core/                       # Các Client kết nối và cấu trúc nền tảng
│   │   ├── api/
│   │   │   └── api.client.ts       # Reusable API Client (tự động xử lý auth token, log request/response)
│   │   ├── database/
│   │   │   └── db.client.ts        # Database helper thực hiện truy vấn SQL xác thực data
│   │   ├── reporters/
│   │   │   └── custom.reporter.ts  # Bộ sinh báo cáo kiểm thử tùy biến & tích hợp Slack/Teams
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
│   ├── utils/                      # Các tiện ích hỗ trợ dùng chung (Date, String, Logger...)
│   │   ├── date.util.ts            # Xử lý định dạng & cộng trừ ngày tháng
│   │   ├── string.util.ts          # Tiện ích sinh dữ liệu ngẫu nhiên (email, phone, text)
│   │   ├── logger.util.ts          # Bộ ghi log ghi nhận kết quả ra console & tệp tin
│   │   └── index.ts                # Barrel export hỗ trợ import dễ dàng (@utils)
│   ├── fixtures/
│   │   └── base.fixture.ts
│   └── tests/
│       └── system-a/
│           └── feature-1/
│               ├── api-user.spec.ts
│               ├── web-login.spec.ts
│               ├── hybrid-e2e.spec.ts
│               └── hybrid-multi-app.spec.ts
├── Jenkinsfile                     # Cấu hình Jenkins Declarative Pipeline cho CI/CD
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

---

## 🔄 Vòng Đời Kiểm Thử & Tiện Ích Mở Rộng (Framework Lifecycle & Extensions)

### 1. Global Setup & Teardown (Cấu hình một lần)
Dự án hỗ trợ thực thi các tác vụ chuẩn bị và dọn dẹp trước/sau toàn bộ tiến trình kiểm thử:
*   **[global-setup.ts](file:///e:/Project/auto/playwright/config/global-setup.ts)**: Chạy một lần duy nhất trước khi bất kỳ worker nào khởi động. Dùng để kiểm tra kết nối database, khởi chạy các emulator, xác thực health-check backend.
*   **[global-teardown.ts](file:///e:/Project/auto/playwright/config/global-teardown.ts)**: Chạy một lần sau khi toàn bộ bài kiểm thử hoàn tất. Dùng để đóng các pool kết nối, tổng hợp thông số báo cáo.

### 2. Bộ Ghi Log Hợp Nhất & Các Tiện Ích Dùng Chung (`@utils`)
Toàn bộ tiện ích dùng chung được đặt trong `src/utils/` và import nhanh qua alias `@utils`:
*   **Logger (`Logger`)**: Phân cấp log rõ ràng (`info`, `warn`, `error`, `debug`). Tự động gắn nhãn timestamp và lưu trữ đồng thời ra màn hình console và file nhật ký cục bộ tại `logs/execution.log`.
*   **Date Utility (`DateUtil`)**: Định dạng ngày tháng (`YYYY-MM-DD`, `DD-MM-YYYY`), dịch chuyển thời gian (cộng/trừ ngày) và lấy unix timestamp.
*   **String Utility (`StringUtil`)**: Sinh ngẫu nhiên dữ liệu đầu vào (random string, random email, random phone number) phục vụ điền form động.

*Ví dụ sử dụng:*
```typescript
import { Logger, StringUtil, DateUtil } from '@utils';

// Log thông tin
Logger.info('Khởi tạo tài khoản kiểm thử mới...');

// Sinh dữ liệu ngẫu nhiên
const randomEmail = StringUtil.generateRandomEmail();
const futureDate = DateUtil.formatDate(DateUtil.addDays(new Date(), 7));
```

### 3. Bộ Sinh Báo Cáo Tùy Biến (Custom Reporter)
Tệp **[custom.reporter.ts](file:///e:/Project/auto/playwright/src/core/reporters/custom.reporter.ts)** được cắm trực tiếp vào cấu hình runner giúp theo dõi tiến độ chạy chi tiết từng bước kiểm thử (`onTestBegin`, `onStepBegin`, `onTestEnd`). Có sẵn hook tích hợp để gửi thông báo tự động lên các kênh chat nhóm (Slack/Microsoft Teams) khi phát hiện lỗi.

### 4. Tích Hợp Hệ Thống CI/CD (Continuous Integration)
Dự án được định cấu hình sẵn sàng để tích hợp vào các pipeline tự động hóa:
*   **GitHub Actions (`.github/workflows/playwright.yml`)**: Tự động kích hoạt khi có Pull Request hoặc Push lên nhánh chính. Thực hiện setup môi trường, cache node modules, cài trình duyệt, chạy test và tải kết quả HTML Report lên GitHub Artifacts.
*   **Jenkins Pipeline (`Jenkinsfile`)**: Định nghĩa luồng pipeline declarative chuẩn, hỗ trợ chạy cài đặt độc lập, chạy bộ test trên môi trường chỉ định và tự động publish HTML Report trực tiếp lên Jenkins build portal.
