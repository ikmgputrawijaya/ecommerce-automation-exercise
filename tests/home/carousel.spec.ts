import { test, expect } from "@playwright/test";

test.beforeEach(async ({ page }) => {
  await page.goto("https://automationexercise.com/", { timeout: 60000 });
});

test.describe("Carousel functionality", () => {
  test("Autoslide carousel", async ({ page }) => {
    const activeSlide = await page
      .locator("#slider-carousel .item.active img")
      .getAttribute("src");
    await page.waitForTimeout(9000); //sesuaikan waktu slide otomatis
       
    await expect(
      page.locator("#slider-carousel .item.active img"),
    ).toHaveAttribute("src", "/static/images/home/girl3.jpg");
    // await expect(async () => {
    //   const currentSlide = await page
    //     .locator("#slider-carousel .item.active img")
    //     .getAttribute("src[/static/images/home/girl2.jpg]");
    //   expect(currentSlide).toBe(activeSlide);
    // }); //.toPass({ timeout: 9000 });
  });

  test("Carousel next button", async ({ page }) => {
    const firstSrc = await page
      .locator("#slider-carousel .item.active img")
      .getAttribute("src");
    await page.locator("a.right.control-carousel").click();
    await page.waitForTimeout(2000);

    await expect(
      page.locator("#slider-carousel .item.active img"),
    ).toHaveAttribute("src", "/static/images/home/girl1.jpg");
  });

  // test('debug carousel', async ({ page }) => {
  //   for (let i = 0; i < 5; i++) {
  //     const src = await page
  //       .locator('#slider-carousel .item.active img')
  //       .getAttribute('src');
  //     console.log(i, src);
  //     await page.waitForTimeout(3000);
  //   }
  // });
});
