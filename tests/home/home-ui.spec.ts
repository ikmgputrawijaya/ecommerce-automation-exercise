import { test, expect } from "@playwright/test";

test.beforeEach(async ({ page }) => {
  await page.goto("https://automationexercise.com/", { timeout: 60000 });
});

test("home UI test", async ({ page }) => {
  const logo = page.locator('img[alt="Website for automation practice"]');
  const navbar = page.locator('div[class="shop-menu pull-right"]');
  const slider = page.locator('div[id="slider-carousel"]');
  const panelCatProducts = page.locator(
    'div[class="panel-group category-products"]',
  );
  const panelBrands = page.locator('div[class="brands_products"]');
  const featuresItems = page.locator('div[class="features_items"]');
  const recommendedItems = page.locator('div[class="recommended_items"]');
  const footer = page.locator('footer[id="footer"]');

  await expect(logo).toBeVisible();
  await expect(navbar).toBeVisible();
  await expect(logo).toHaveAttribute("src", "/static/images/home/logo.png");
  await expect(slider).toBeVisible();
  await expect(panelCatProducts).toBeVisible();
  await expect(panelBrands).toBeVisible();
  await expect(featuresItems).toBeVisible();
  await expect(recommendedItems).toBeVisible();
  await expect(footer).toBeVisible();
});
