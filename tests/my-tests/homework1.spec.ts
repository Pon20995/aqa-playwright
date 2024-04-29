import { test, expect } from "@playwright/test";

const loginName = process.env.LOGIN_USERNAME || "";
const loginPass = process.env.LOGIN_PASS || "";

test.beforeEach(async ({ page }) => {
  // Перевикористали конструкцію в конфіг файлі, з заміною в test browser на page
  // const context = await browser.newContext({
  //   httpCredentials: {
  //     username: "guest",
  //     password: "welcome2qauto",
  //   },
  // });
  // const page = await context.newPage();
  await page.goto("/panel/garage");
  await page.locator('button:has-text("Sign In")').click();
  await page.fill("input[name='email']", loginName);
  await page.fill("input[name='password']", loginPass);
  await page.locator('button:has-text("Login")').click();
  await expect(page.locator("div.panel-page_heading h1")).toHaveText("Garage");
});

test.describe(
  "Adding and Deleting check",
  {
    tag: ["@addCar"],
  },
  () => {
    test.describe.configure({ mode: "serial" });

    test("Add car", async ({ page }) => {
      await page.locator('button:has-text("Add car")').click();
      await page.selectOption("select#addCarBrand", "Fiat");
      await page.selectOption("select#addCarModel", "Ducato");
      await page.fill("input[name='mileage']", "300000");
      await page.locator("div.justify-content-end button.btn-primary").click();
      await expect(
        page.locator("div").filter({ hasText: "Car added" }).nth(3)
      ).toHaveText("Car added");
    });

    test("Delete a car", async ({ page }) => {
      if (await page.locator("span.icon-edit").first().isVisible()) {
        await page.locator("button.btn-edit").first().click();
        await page.locator('button:has-text("Remove car")').click();
        await page.locator("button.btn-danger").click();
        await expect(page.locator("p.panel-empty_message")).toHaveText(
          "You don’t have any cars in your garage"
        );
      } else {
        await expect(page.locator("p.panel-empty_message")).toHaveText(
          "You don’t have any cars in your garage"
        );
      }
    });
  }
);
