import { test, expect } from "@playwright/test";
import { RegistrationPage } from "../../pageObjects/registrationPage";
import { LoginPage } from "../../pageObjects/loginPage";

let userEmail = "";
let userPassword = "";

test.beforeAll(async () => {
  userEmail = `ozera123456789+${Date.now()}@gmail.com`;
  userPassword = "Password1";
});

test.beforeEach(async ({ page }) => {
  await page.goto("/panel/garage");
  await page.locator('button:has-text("Sign In")').click();
  await page.locator('button:has-text("Registration")').click();
  await expect(page.getByRole("heading", { name: "Registration" })).toHaveText(
    "Registration"
  );
});

test.describe("Validation of registartion form", () => {
  test.describe.configure({ mode: "serial" });

  test("Check the registration fields validation with empty data", async ({
    page,
  }) => {
    const registrationpage = new RegistrationPage(page);
    await registrationpage.clickNameInput();
    await registrationpage.clickLastNameInput();
    await registrationpage.clickEmailInput();
    await registrationpage.clickPassInput();
    await registrationpage.clickReenterPassInput();
    await registrationpage.clickNameInput();
    await registrationpage.checkFieldsIfEmpty();
  });

  test("Check the registration fields validation with invalid data", async ({
    page,
  }) => {
    const registrationpage = new RegistrationPage(page);
    const incorrectNames = [
      "Іван",
      "Pet-ro",
      "Mar ia",
      "J7ohn",
      "Li#ana",
      "123",
      "@#!",
      " Olexander",
      "Olexander ",
      "   ",
    ];
    for (const name of incorrectNames) {
      await registrationpage.checkNameIfInvalid(name);
    }

    const incorrectLastNames = [
      "Шевченко",
      "Kvitk_a",
      "Ukrain ka",
      "5Tychyna",
      "123",
      "@#!",
      " Osnovyanenko",
      "Dibrova ",
      "   ",
    ];
    for (const lastName of incorrectLastNames) {
      await registrationpage.checkLastNameIfInvalid(lastName);
    }

    const incorrectEmails = [
      "user@domain",
      "user@domain.",
      "user@.domain.com",
      "user@domain..com",
      "user@domain@.com",
      "user@domain.",
      "user@domain.com@",
      "user@domain..com",
      "user@domaincom",
      "user@domain,com",
      "user(domain.com",
      "user@domain.com ",
      " user@domain.com",
      "    ",
    ];
    for (const email of incorrectEmails) {
      await registrationpage.checkEmailIfInvalid(email);
    }

    const incorrectPass = [
      "1qwertY",
      "1qwertY1qwertY1qwertY",
      "1qwerty1qwerty",
      "qwertYqwertY",
      "12345678",
      "pa$$w0rd",
      "PASSWORD",
    ];
    for (const password of incorrectPass) {
      await registrationpage.checkPassIfInvalid(password);
    }

    await registrationpage.checkReenterPassIfInvalid();
  });

  test("Check the registration fields validation with wrong length data", async ({
    page,
  }) => {
    const registrationpage = new RegistrationPage(page);
    const wrongLengthData = ["e", "qwertyuiopqwertyuiopq"];
    for (const data of wrongLengthData) {
      await registrationpage.checkFieldsLength(data);
    }
  });

  test("Check the registration with valid data", async ({ page }) => {
    const registrationpage = new RegistrationPage(page);
    await registrationpage.registerWithValidData(userEmail, userPassword);
  });

  test("Login with previously registered data", async ({ page }) => {
    const loginpage = new LoginPage(page);
    await page.getByRole("button", { name: "Close" }).click();
    await loginpage.loginWithDynamicData(userEmail, userPassword);
    await page.click("div.modal-footer button.btn-primary");
    await expect(page.locator("div.panel-page_heading h1")).toHaveText(
      "Garage"
    );
  });
});
