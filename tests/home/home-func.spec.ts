import { test, expect } from "@playwright/test";

test.beforeEach(async ({ page }) => {
  await page.goto("https://automationexercise.com/", { timeout: 60000 });
});

test("home func test", async ({ page }) => {
  await page.locator('a[data-product-id="1"]').nth(0).click();

  const modal = page.locator('div[class="modal-content"]');
  await expect(modal).toBeVisible();
  await expect(modal.getByRole('heading', { name: "Added!" })).toBeVisible();
});
