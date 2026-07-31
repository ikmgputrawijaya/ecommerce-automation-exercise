import { test, expect } from "@playwright/test";

test.beforeEach(async ({ page }) => {
  await page.goto("https://automationexercise.com/", { timeout: 60000 });
});

test.describe("footer subscription func", () => {
  test("filling correct email format", async ({ page }) => {
    const footer = page.locator("footer");
    await footer.locator("#susbscribe_email").fill("customer@example.com");
    await footer.locator('button[id="subscribe"]').click();

    await expect(footer).toContainText("You have been successfully subscribed");
  });

    test("filling correct email format with uppercase", async ({ page }) => {
    const footer = page.locator("footer");
    await footer.locator("#susbscribe_email").fill("custOMER@eXAmple.COm");
    await footer.locator('button[id="subscribe"]').click();

    await expect(footer).toContainText("You have been successfully subscribed");
  });

  test("filling incorrect email format", async ({ page, browserName }) => {
    const footer = page.locator("footer");
    const formemail = footer.locator("#susbscribe_email");
    await formemail.fill("customer");
    await footer.locator('button[id="subscribe"]').click();

    const validationMessage = await formemail.evaluate(
      (el) => (el as HTMLInputElement).validationMessage,
    );
    if (browserName === "firefox") {
      expect(validationMessage).toContain("Please enter an email address");
    } else {
      expect(validationMessage).toContain("Please include an '@'");
    }
  });

  test("filling empty email", async ({ page }) => {
    const footer = page.locator("footer");
    const formemail = footer.locator("#susbscribe_email");
    await formemail.fill("");
    await footer.locator('button[id="subscribe"]').click();

    const validationMessage = await formemail.evaluate(
      (el) => (el as HTMLInputElement).validationMessage,
    );
    expect(validationMessage).toContain("Please fill out this field");
  });

  test("filling email followed by whitespace before '@'", async ({
    page,
    browserName,
  }) => {
    const footer = page.locator("footer");
    const formemail = footer.locator("#susbscribe_email");
    await formemail.fill("customer @example.com");
    await footer.locator('button[id="subscribe"]').click();

    const validationMessage = await formemail.evaluate(
      (el) => (el as HTMLInputElement).validationMessage,
    );
    if (browserName === "firefox") {
      expect(validationMessage).toContain("Please enter an email address.");
    } else {
      expect(validationMessage).toContain(
        "A part followed by '@' should not contain the symbol ' '.",
      );
    }
  });

    test("filling email followed by whitespace after '@'", async ({
    page,
    browserName,
  }) => {
    const footer = page.locator("footer");
    const formemail = footer.locator("#susbscribe_email");
    await formemail.fill("customer@ example.com");
    await footer.locator('button[id="subscribe"]').click();

    const validationMessage = await formemail.evaluate(
      (el) => (el as HTMLInputElement).validationMessage,
    );
    if (browserName === "firefox") {
      expect(validationMessage).toContain("Please enter an email address.");
    } else {
      expect(validationMessage).toContain(
        "A part following '@' should not contain the symbol ' '.",
      );
    }
  });
});
