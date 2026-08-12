import { test, expect } from "@playwright/test";

test.beforeEach(async ({ page }) => {
  await page.goto("https://automationexercise.com/login", { timeout: 60000 });
});

test.describe("login func", () => {
  test("login with valid credentials", async ({ page }) => {
    const loginForm = page.locator("div[class='login-form']");
    await loginForm.locator("input[type='email']").fill("adminnice@gmail.com");
    await loginForm.locator("input[name='password']").fill("adminnice123");
    await loginForm.locator("button[type='submit']").click();

    await expect(page).toHaveURL("https://automationexercise.com/");
    const loggedNav = page.locator("ul[class='nav navbar-nav']");
    await expect(loggedNav.locator("a[href='/logout']")).toBeVisible();
    await expect(loggedNav.locator("a[href='/delete_account']")).toBeVisible();
    const loggedUser = loggedNav.locator("a", { hasText: "Logged in as" });
    await expect(loggedUser).toBeVisible();
    await expect(loggedUser).toContainText("admin");
  });

  test("login with non-registered account", async ({ page }) => {
    const loginForm = page.locator("div[class='login-form']");
    await loginForm
      .locator("input[type='email']")
      .fill("adminnotexist@gmail.com");
    await loginForm.locator("input[name='password']").fill("adminnotexist");
    await loginForm.locator("button[type='submit']").click();

    await expect(page).toHaveURL("https://automationexercise.com/login");
    await expect(
      loginForm.locator("p", {
        hasText: "Your email or password is incorrect!",
      }),
    ).toBeVisible();
  });

  test("login with wrong password", async ({ page }) => {
    const loginForm = page.locator("div[class='login-form']");
    await loginForm.locator("input[type='email']").fill("adminnice@gmail.com");
    await loginForm.locator("input[name='password']").fill("adminnice321");
    await loginForm.locator("button[type='submit']").click();

    await expect(page).toHaveURL("https://automationexercise.com/login");
    await expect(
      loginForm.locator("p", {
        hasText: "Your email or password is incorrect!",
      }),
    ).toBeVisible();
  });

  test("login with invalid email format", async ({ page, browserName }) => {
    const loginForm = page.locator("div[class='login-form']");
    await loginForm.locator("input[type='email']").fill("invalid-email");
    await loginForm.locator("input[name='password']").fill("adminnice123");
    await loginForm.locator("button[type='submit']").click();

    await expect(page).toHaveURL("https://automationexercise.com/login");
    const validationMessage = await loginForm
      .locator("input[type='email']")
      .evaluate((el) => (el as HTMLInputElement).validationMessage);
    if (browserName === "firefox") {
      expect(validationMessage).toContain("Please enter an email address");
    } else {
      expect(validationMessage).toContain(
        "Please include an '@' in the email address.",
      );
    }
  });

  test("login with empty email field", async ({ page, browserName }) => {
    const loginForm = page.locator("div[class='login-form']");
    await loginForm.locator("input[type='email']").fill("");
    await loginForm.locator("input[name='password']").fill("adminnice123");
    await loginForm.locator("button[type='submit']").click();

    await expect(page).toHaveURL("https://automationexercise.com/login");
    const validationMessage = await loginForm
      .locator("input[type='email']")
      .evaluate((el) => (el as HTMLInputElement).validationMessage);
    expect(validationMessage).toContain("Please fill out this field.");
  });

  test("login with empty password field", async ({ page, browserName }) => {
    const loginForm = page.locator("div[class='login-form']");
    await loginForm.locator("input[type='email']").fill("adminnice@gmail.com");
    await loginForm.locator("input[name='password']").fill("");
    await loginForm.locator("button[type='submit']").click();

    await expect(page).toHaveURL("https://automationexercise.com/login");
    const validationMessage = await loginForm
      .locator("input[type='password']")
      .evaluate((el) => (el as HTMLInputElement).validationMessage);
    expect(validationMessage).toContain("Please fill out this field.");
  });

  //webapp tidak memiliki validasi maximum dan minimum length untuk email dan password
});
