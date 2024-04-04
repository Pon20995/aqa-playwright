import { test, expect } from "@playwright/test";

test("Add car", async ({ browser }) => {
  const context = await browser.newContext({
    httpCredentials: {
      username: "guest",
      password: "welcome2qauto",
    },
  });
  const page = await context.newPage();
  await page.goto("/panel/garage");
  await page.locator('button:has-text("Sign In")').click();
  await page.fill("input[name='email']", "ozera123456789@gmail.com");
  await page.fill("input[name='password']", "R4gnZxg.J7U7EX");
  await page.locator('button:has-text("Login")').click();
  await expect(page.locator("div.panel-page_heading h1")).toHaveText("Garage");
  await page.locator('button:has-text("Add car")').click();
  await page.selectOption("select#addCarBrand", "Fiat");
  await page.selectOption("select#addCarModel", "Ducato");
  await page.fill("input[name='mileage']", "300000");
  await page.locator("div.justify-content-end button.btn-primary").click();
  await expect(
    page.locator("div").filter({ hasText: "Car added" }).nth(3)
  ).toHaveText("Car added");
});

test("Delete a car", async ({ browser }) => {
  const context = await browser.newContext({
    httpCredentials: {
      username: "guest",
      password: "welcome2qauto",
    },
  });
  const page = await context.newPage();
  await page.goto("/panel/garage");
  await page.locator('button:has-text("Sign In")').click();
  await page.fill("input[name='email']", "ozera123456789@gmail.com");
  await page.fill("input[name='password']", "R4gnZxg.J7U7EX");
  await page.locator('button:has-text("Login")').click();
  await expect(page.locator("div.panel-page_heading h1")).toHaveText("Garage");
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
