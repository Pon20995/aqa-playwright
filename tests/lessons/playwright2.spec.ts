import { test, expect } from "@playwright/test";
import { LoginPage } from "../../pageObjects/loginPage";
import { Header } from "../../components/header";

test.beforeEach(async ({ page }) => {
  //   const loginpage = new LoginPage(page);
  await page.goto("/");
});

test("Test with valid data", async ({ page }) => {
  const loginpage = new LoginPage(page);
  const buttonLogin = await loginpage.buttonLogin();

  await loginpage.loginWithDefaultParams();
  await expect(buttonLogin).toBeVisible();
  await buttonLogin.click();

  //   await page.getByRole("button", { name: "Sign In" }).click();
  //   await page.getByLabel("Email").click();
  //   await page.getByLabel("Email").fill("ozera123456789@gmail.com");
  //   await page.getByLabel("Password").click();
  //   await page.getByLabel("Password").fill("R4gnZxg.J7U7EX");
  //   await page.getByRole("button", { name: "Login" }).click();

  //   await page.getByRole("button", { name: "Add car" }).click();
  //   await page.getByLabel("Brand").selectOption("3: 4");
  //   await page.getByLabel("Model").selectOption("10: 18");
  //   await page.getByLabel("Mileage").click();
  //   await page.getByLabel("Mileage").fill("101010");
  //   await page.getByRole("button", { name: "Add" }).click();

  await expect(page.getByText("Porsche Panamera")).toBeVisible();
  await expect(page.locator("app-car")).toContainText(
    "Update mileage • 11.04.2024"
  );
});

test("Login test with dynamic data", async ({ page }) => {
  const loginpage = new LoginPage(page);
  const header = new Header(page);
  await header.logoVisisble();
  await loginpage.loginWithDynamicData(
    "ozera123456789@gmail.com",
    "R4gnZxg.J7U7EX"
  );
});
