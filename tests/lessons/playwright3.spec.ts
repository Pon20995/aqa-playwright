import { test, expect } from "./util/fixtures";

test("test", async ({ loginPage, page }) => {
  await loginPage.openPage();
  await loginPage.loginWithDefaultParams();
  await page.screenshot();
  await expect(page.getByRole("list")).toContainText("Porsche Panamera");
});
