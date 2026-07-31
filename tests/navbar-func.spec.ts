import { test, expect } from "@playwright/test";

test.beforeEach(async ({ page }) => {
  await page.goto("https://automationexercise.com/", { timeout: 60000 });
});

test.describe("testing navbar functionality", () => {
  test("home navigation link", async ({ page }) => {
    const navbarWrapper = page.locator(".shop-menu");
    await navbarWrapper.getByRole("link", { name: "Home" }).click();
    await page.waitForTimeout(3000);

    await expect(page).toHaveURL("https://automationexercise.com/");
    const activeNav = page.getByRole("link", { name: "Home" });
    await expect(activeNav).toHaveAttribute("style", "color: orange;");
  });

  test("products navigation link", async ({ page }) => {
    const navbarWrapper = page.locator(".shop-menu");
    await navbarWrapper.getByRole("link", { name: "Products" }).click();
    await page.waitForTimeout(3000);

    await expect(page).toHaveURL("https://automationexercise.com/products");
    const activeNav = page.getByRole("link", { name: "Products" });
    await expect(activeNav).toHaveAttribute("style", "color: orange;");
  });

  test("cart navigation link", async ({ page }) => {
    const navbarWrapper = page.locator(".shop-menu");
    await navbarWrapper.getByRole("link", { name: "Cart" }).click();
    await page.waitForTimeout(3000);

    await expect(page).toHaveURL("https://automationexercise.com/view_cart");
    const activeNav = page.getByRole("link", { name: "Cart" });
    await expect(activeNav).toHaveAttribute("style", "color: orange;");
  });

  test("signup/login navigation link", async ({ page }) => {
    const navbarWrapper = page.locator(".shop-menu");
    await navbarWrapper.getByRole("link", { name: "Signup / Login" }).click();
    await page.waitForTimeout(3000);

    await expect(page).toHaveURL("https://automationexercise.com/login");
    const activeNav = page.getByRole("link", { name: "Signup / Login" });
    await expect(activeNav).toHaveAttribute("style", "color: orange;");
  });

  test("test cases navigation link", async ({ page }) => {
    const navbarWrapper = await page.locator(".shop-menu");
    await navbarWrapper.getByRole("link", { name: "Test Cases" }).click();
    await page.waitForTimeout(3000);

    await expect(page).toHaveURL("https://automationexercise.com/test_cases");
    const activeNav = page.getByRole("link", { name: "Test Cases" });
    const testCasesLink = navbarWrapper.getByRole("link", {
      name: "Test Cases",
    });
    await expect(testCasesLink).toHaveAttribute("style", "color: orange;");
  });

  test("api navigation link", async ({ page }) => {
    const navbarWrapper = await page.locator(".shop-menu");
    await navbarWrapper.getByRole("link", { name: "API Testing" }).click();
    await page.waitForTimeout(3000);

    await expect(page).toHaveURL("https://automationexercise.com/api_list");
    const activeNav = page.getByRole("link", { name: "API Testing" });
    await expect(activeNav).toHaveAttribute("style", "color: orange;");
  });

  test("video tutor navigation link", async ({ page }) => {
    const navbarWrapper = await page.locator(".shop-menu");
    await navbarWrapper.getByRole("link", { name: "Video Tutorials" }).click();
    await page.waitForTimeout(10000);

    await expect(page).toHaveURL(
      "https://www.youtube.com/c/AutomationExercise",
    );
  });

  test("contact navigation link", async ({ page }) => {
    const navbarWrapper = await page.locator(".shop-menu");
    await navbarWrapper.getByRole("link", { name: "Contact us" }).click();
    await page.waitForTimeout(3000);

    await expect(page).toHaveURL("https://automationexercise.com/contact_us");
    const activeNav = page.getByRole("link", { name: "Contact us" });
    await expect(activeNav).toHaveAttribute("style", "color: orange;");
  });
});
