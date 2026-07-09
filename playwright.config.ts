import { defineConfig, devices } from '@playwright/test';

const PORT = 3000;

// 本番（GitHub Pages）と同じく、静的エクスポートされた out/ を
// /Portfolio 配下にマウントして配信した状態でテストする
export default defineConfig({
  testDir: './e2e',
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 0,
  reporter: process.env.CI ? [['github'], ['html', { open: 'never' }]] : 'list',
  use: {
    baseURL: `http://localhost:${PORT}`,
    trace: 'on-first-retry',
  },
  projects: [
    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'] },
    },
  ],
  webServer: {
    command:
      'npm run build && rm -rf .e2e-serve && mkdir .e2e-serve && cp -R out .e2e-serve/Portfolio && npx serve .e2e-serve -l 3000',
    url: `http://localhost:${PORT}/Portfolio/`,
    reuseExistingServer: !process.env.CI,
    timeout: 240_000,
  },
});
