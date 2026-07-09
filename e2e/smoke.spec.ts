import { expect, test as base, type Page } from '@playwright/test';

const BASE_PATH = '/Portfolio';

const path = (p: string): string => `${BASE_PATH}${p}`;

// ハンバーガーメニューも<nav>のため、ページ番号ボタン「1」を持つnavをページネーションとみなす
const paginationNav = (page: Page) =>
  page.locator('nav').filter({ has: page.getByRole('button', { name: '1', exact: true }) });

// 各テストでコンソールエラーと未捕捉例外を収集し、最後にゼロであることを検証する
const test = base.extend<{ errors: string[] }>({
  errors: async ({ page }, use) => {
    const errors: string[] = [];
    page.on('pageerror', (error) => {
      errors.push(`pageerror: ${error.message}`);
    });
    page.on('console', (msg) => {
      if (msg.type() === 'error') {
        errors.push(`console error: ${msg.text()}`);
      }
    });
    await use(errors);
  },
});

test.describe('smoke', () => {
  test('Home page renders', async ({ page, errors }) => {
    await page.goto(path('/'));
    await expect(page.getByText('ACHA IKEDA')).toBeVisible();
    await expect(page.getByText('DESIGNER & DEVELOPER')).toBeVisible();
    expect(errors).toEqual([]);
  });

  test('Work page renders with thumbnails', async ({ page, errors }) => {
    await page.goto(path('/work'));
    await expect(page.getByText('SHOWING WEB APPLICATIONS')).toBeVisible();

    const workLinks = page.locator(`a[href^="${BASE_PATH}/work/"]`);
    expect(await workLinks.count()).toBeGreaterThan(0);

    // サムネイル画像が実際に読み込まれていること（basePath切れの検知）
    // next/imageは遅延読み込みのため、スクロールして表示させてから確認する
    const firstImage = workLinks.first().locator('img');
    await firstImage.scrollIntoViewIfNeeded();
    await expect(firstImage).toBeVisible();
    await expect
      .poll(() => firstImage.evaluate((img) => (img as HTMLImageElement).naturalWidth))
      .toBeGreaterThan(0);
    expect(errors).toEqual([]);
  });

  test('Work detail page renders', async ({ page, errors }) => {
    await page.goto(path('/work/clicker-empire-game'));
    await expect(page.getByText('CLICKER EMPIRE GAME')).toBeVisible();
    await expect(page.getByRole('link', { name: 'WEBSITE' })).toBeVisible();
    await expect(page.getByRole('link', { name: 'BACK' })).toBeVisible();
    expect(errors).toEqual([]);
  });

  test('Sketch Book page renders with pagination', async ({ page, errors }) => {
    await page.goto(path('/sketch-book'));
    await expect(page.getByText('SHOWING GENERATIVE ARTS')).toBeVisible();

    const sketchLinks = page.locator(`a[href^="${BASE_PATH}/sketch-book/"]`);
    expect(await sketchLinks.count()).toBeGreaterThan(0);
    // ハンバーガーメニューのnavと区別するため、ページ番号ボタンを持つnavを対象にする
    await expect(paginationNav(page)).toBeVisible();
    expect(errors).toEqual([]);
  });

  test('Sketch Book pagination navigates to page 2', async ({ page, errors }) => {
    await page.goto(path('/sketch-book'));
    const pageTwoButton = paginationNav(page).getByRole('button', { name: '2', exact: true });
    await pageTwoButton.click();

    await expect(page).toHaveURL(/page=2/);
    await expect(
      paginationNav(page).getByRole('button', { name: '2', exact: true }),
    ).toBeDisabled();
    expect(
      await page.locator(`a[href^="${BASE_PATH}/sketch-book/"]`).count(),
    ).toBeGreaterThan(0);
    expect(errors).toEqual([]);
  });

  test('Sketch detail page renders a p5 canvas', async ({ page, errors }) => {
    await page.goto(path('/sketch-book/rotation-02'));
    await expect(page.getByText('ROTATION 2')).toBeVisible();
    await expect(page.locator('canvas').first()).toBeVisible();
    await expect(page.getByRole('link', { name: 'BACK' })).toBeVisible();
    expect(errors).toEqual([]);
  });

  test('Info page renders', async ({ page, errors }) => {
    await page.goto(path('/info'));
    await expect(page.getByRole('link', { name: 'CONTACT' })).toBeVisible();
    await expect(page.getByRole('link', { name: 'GitHub' })).toBeVisible();
    expect(errors).toEqual([]);
  });
});
