import { test, expect, type Page } from "@playwright/test";

let page: Page;

test.beforeAll(async ({ browser }) => {
  page = await browser.newPage();
});

test.afterAll(async () => {
  await page.close();
});

const loginName = "ozera123456789@gmail.com";
const loginPass = "R4gnZxg.J7U7EX";

test.describe("Verification of qauto app", () => {
  test.describe.configure({ mode: "serial" });

  test("Open main page", async ({ page }) => {
    await page.goto("/");
    await page.waitForTimeout(3000);
    await page.locator("button.header_signin").click();

    // Використання змінної для локатора
    // const signInButton = page.locator("button.header_signin");
    // await signInButton.click;
  });

  test("Usage of getByRole", async ({ page }) => {
    await page.goto("/");
    await page.getByRole("button", { name: "Sign In" }).click();
  });

  test("Usage of getByText", async ({ page }) => {
    await page.goto("/");
    await expect(page.getByText("Sign In")).toBeVisible();
  });

  test("Usage of getByLabel", async ({ page }) => {
    await page.goto("/");
    await page.getByRole("button", { name: "Sign In" }).click();
    await expect(page.getByLabel("Email")).toBeVisible();
  });

  test("Usage of fill method", async ({ page }) => {
    await page.goto("/");
    await page.getByRole("button", { name: "Sign In" }).click();
    await page.fill("input[name='email']", loginName);
    await page.locator("input[name='password']").fill(loginPass);
    await page.waitForTimeout(3000);
  });

  test("Usage of fill method and soft assert of pass field", async ({
    page,
  }) => {
    await page.goto("/");
    await page.getByRole("button", { name: "Sign In" }).click();
    await page.fill("input[name='email']", loginName);
    await page.locator("input[name='password']").fill(loginPass);
    await page.locator("input[name='password']").clear();
    await page.getByRole("button", { name: "Login" }).click({ force: true });
    // soft assertion
    await expect
      .soft(page.locator("div.invalid-feedback p"))
      .toContainText("bla-bla");
    await page.locator("input[name='password']").fill(loginPass);
    await page.getByRole("button", { name: "Login" }).click();
    await page.waitForURL("/panel/garage");
    const textOnGaragePage = page.locator(".panel-page h1");
    await textOnGaragePage.waitFor({ state: "visible" });
    await expect(textOnGaragePage).toContainText("Garage");
  });

  test("Usage few selectors", async ({ page }) => {
    await page.goto("/");
    await page.getByRole("button", { name: "Sign In" }).click();
    await page.fill("input[name='email']", loginName);
    await page.fill("input[name='password']", loginPass);
    await page
      .locator('button:has-text("SignIn"), button:has-text("Login")')
      .click();
    await page.waitForURL("/panel/garage");
    await page.waitForTimeout(3000);
    await expect(page).toHaveScreenshot("main-page.png"); // Перший раз фейлиться

    // await expect (page.locator(".panel-page h1")).toHaveScreenshot("main-page.png")

    // const buttonLocator = page.locator("button");
    // await buttonLocator.filter({ hasText: "Login" }).click();

    // // locators in locators
    // const footerModal = page.locator("modal-footer");
    // const registerButton = footerModal.locator(".btn-link");
    // await registerButton.click();
  });
});
