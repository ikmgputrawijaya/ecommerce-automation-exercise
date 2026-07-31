import { test, expect } from "@playwright/test";

test.beforeEach(async ({ page }) => {
  await page.goto("https://automationexercise.com/", { timeout: 60000 });
});

test.describe("adding product to the cart", () => {
  test("checking modal chart", async ({ page }) => {
    await page.locator('a[data-product-id="1"]').nth(0).click();

    const modal = page.locator('div[class="modal-content"]');
    await expect(modal).toBeVisible();
    await expect(modal.getByRole("heading", { name: "Added!" })).toBeVisible();
  });

  test("checking cart after adding product", async ({ page }) => {
    await page.locator('a[data-product-id="1"]').nth(0).click();
    const modal = page.locator('div[class="modal-content"]');
    await modal.getByRole("link", { name: "View Cart" }).click();

    await expect(page).toHaveURL("https://automationexercise.com/view_cart");
    await expect(
      page.locator('table[class="table table-condensed"]'),
    ).toBeVisible();
    await expect(page.locator('tr[id="product-1"]')).toBeVisible();
  });
});

test.describe("testing category products", () => {
  test("checking category products dropdown", async ({ page }) => {
    const categoryProducts = page.locator('div[class="panel-group category-products"]');
    await categoryProducts.getByRole("link", { name: "Women" }).click();
    
    
    const categoryDropdown = page.locator('div[class="panel panel-default"]');
    await expect(categoryDropdown.locator('#Women.panel-collapse.in ')).toBeVisible();

    const womanCategory = page.locator('#Women.panel-collapse.in');
    for (const idcategory of [1, 2, 7]) {
      await expect(womanCategory.locator(`a[href="/category_products/${idcategory}"]`)).toBeVisible();
    }
  });

  test("checking category products links", async ({ page }) => {
    const categoryProducts = page.locator('div[class="panel-group category-products"]');
    await categoryProducts.getByRole('link', { name: "Women" }).click();
    const womanCategory = page.locator('#Women.panel-collapse.in');
    await womanCategory.getByRole('link', { name: "Dress" }).click();
    await page.waitForTimeout(5000);

    
    await expect(page).toHaveURL("https://automationexercise.com/category_products/1")
    const breadcrumbs = page.locator('div[class="breadcrumbs"]');
    await expect(breadcrumbs).toBeVisible();
    await expect(breadcrumbs.locator('ol.breadcrumb')).toContainText("Women > Dress");
  })
});
