import { Browser, Page, chromium, expect } from "@playwright/test";

async function globalSetup() {
  const browser: Browser = await chromium.launch();
  const context = await browser.newContext({
    httpCredentials: {
      username: "guest",
      password: "welcome2qauto",
    },
  });
  const page = await context.newPage();

  await page.goto("https://qauto.forstudy.space/panel/garage");
  await page.locator('button:has-text("Sign In")').click();
  await page.fill("input[name='email']", "ozera123456789@gmail.com");
  await page.fill("input[name='password']", "R4gnZxg.J7U7EX");
  await page.locator('button:has-text("Login")').click();
  await expect(page.locator("div.panel-page_heading h1")).toHaveText("Garage");

  await page.context().storageState({ path: "./loginAuth.json" });
  await browser.close();
}

export default globalSetup;
