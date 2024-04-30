import { test as setup, expect } from "@playwright/test";

const authFile = "playwright/.auth/user.json";

import { LoginPage } from "../../pageObjects/loginPageDenys";

setup("authorization", async ({ page }) => {
  const loginpage = new LoginPage(page);
  await page.goto("/");
  await loginpage.loginWithDefaultParams();
  await expect(page.getByRole("button", { name: "Add car" })).toBeVisible();

  await page.context().storageState({ path: authFile });
});
