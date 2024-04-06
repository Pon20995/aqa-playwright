import { test, expect } from "@playwright/test";
import { registrationFormLocators } from "../../pageObjects/registrationForm-draft";

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
  const {
    signupNameInput,
    signupLastNameInput,
    signupEmailInput,
    signupPasswordInput,
    signupRepeatPasswordInput,
  } = registrationFormLocators;

  test("Check the registration fields validation with empty data", async ({
    page,
  }) => {
    await page.locator(signupNameInput).click();
    await page.locator(signupLastNameInput).click();
    await expect(page.locator(signupNameInput)).toHaveCSS(
      "border-color",
      "rgb(220, 53, 69)"
    );
    await expect(
      page.locator(".form-group:nth-child(1) .invalid-feedback p")
    ).toHaveText("Name required");

    await page.locator(signupLastNameInput).click();
    await page.locator(signupEmailInput).click();
    await expect(page.locator(signupLastNameInput)).toHaveCSS(
      "border-color",
      "rgb(220, 53, 69)"
    );
    await expect(
      page.locator(".form-group:nth-child(2) .invalid-feedback p")
    ).toHaveText("Last name required");

    await page.locator(signupEmailInput).click();
    await page.locator(signupPasswordInput).click();
    await expect(page.locator(signupEmailInput)).toHaveCSS(
      "border-color",
      "rgb(220, 53, 69)"
    );
    await expect(
      page.locator(".form-group:nth-child(3) .invalid-feedback p")
    ).toHaveText("Email required");

    await page.locator(signupPasswordInput).click();
    await page.locator(signupRepeatPasswordInput).click();
    await expect(page.locator(signupPasswordInput)).toHaveCSS(
      "border-color",
      "rgb(220, 53, 69)"
    );
    await expect(
      page.locator(".form-group:nth-child(4) .invalid-feedback p")
    ).toHaveText("Password required");

    await page.locator(signupRepeatPasswordInput).click();
    await page.locator(signupNameInput).click();
    await expect(page.locator(signupRepeatPasswordInput)).toHaveCSS(
      "border-color",
      "rgb(220, 53, 69)"
    );
    await expect(
      page.locator(".form-group:nth-child(5) .invalid-feedback p")
    ).toHaveText("Re-enter password required");
  });

  test("Check the registration fields validation with invalid data", async ({
    page,
  }) => {
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
      await page.locator(signupNameInput).fill(name);
      await page.locator(signupLastNameInput).click();
      await expect(page.locator(signupNameInput)).toHaveCSS(
        "border-color",
        "rgb(220, 53, 69)"
      );
      await expect(
        page.locator(".form-group:nth-child(1) .invalid-feedback p")
      ).toHaveText("Name is invalid");
      await page.locator(signupNameInput).clear();
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
      await page.locator(signupLastNameInput).fill(lastName);
      await page.locator(signupEmailInput).click();
      await expect(page.locator(signupLastNameInput)).toHaveCSS(
        "border-color",
        "rgb(220, 53, 69)"
      );
      await expect(
        page.locator(".form-group:nth-child(2) .invalid-feedback p")
      ).toHaveText("Last name is invalid");
      await page.locator(signupLastNameInput).clear();
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
      await page.locator(signupEmailInput).fill(email);
      await page.locator(signupPasswordInput).click();
      await expect(page.locator(signupEmailInput)).toHaveCSS(
        "border-color",
        "rgb(220, 53, 69)"
      );
      await expect(
        page.locator(".form-group:nth-child(3) .invalid-feedback p")
      ).toHaveText("Email is incorrect");
      await page.locator(signupEmailInput).clear();
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
      await page.locator(signupPasswordInput).fill(password);
      await page.locator(signupRepeatPasswordInput).click();
      await expect(page.locator(signupPasswordInput)).toHaveCSS(
        "border-color",
        "rgb(220, 53, 69)"
      );
      await expect(
        page.locator(".form-group:nth-child(4) .invalid-feedback p")
      ).toHaveText(
        "Password has to be from 8 to 15 characters long and contain at least one integer, one capital, and one small letter"
      );
      await page.locator(signupPasswordInput).clear();
    }

    await page.locator(signupPasswordInput).fill("Qwerty123");
    await page.locator(signupRepeatPasswordInput).fill("Qwerty 123");
    await expect(page.locator(signupRepeatPasswordInput)).toHaveCSS(
      "border-color",
      "rgb(220, 53, 69)"
    );
    await expect(
      page.locator(".form-group:nth-child(5) .invalid-feedback p")
    ).toHaveText("Passwords do not match");
  });

  test("Check the registration fields validation with wrong length data", async ({
    page,
  }) => {
    const wrongLengthData = ["e", "qwertyuiopqwertyuiopq"];
    for (const data of wrongLengthData) {
      await page.locator(signupNameInput).fill(data);
      await page.locator(signupLastNameInput).click();
      await expect(page.locator(signupNameInput)).toHaveCSS(
        "border-color",
        "rgb(220, 53, 69)"
      );
      await expect(
        page.locator(".form-group:nth-child(1) .invalid-feedback p")
      ).toHaveText("Name has to be from 2 to 20 characters long");
      await page.locator(signupLastNameInput).fill(data);
      await page.locator(signupEmailInput).click();
      await expect(page.locator(signupLastNameInput)).toHaveCSS(
        "border-color",
        "rgb(220, 53, 69)"
      );
      await expect(
        page.locator(".form-group:nth-child(2) .invalid-feedback p")
      ).toHaveText("Last name has to be from 2 to 20 characters long");
      await page.locator(signupPasswordInput).fill(data);
      await page.locator(signupRepeatPasswordInput).click();
      await expect(page.locator(signupPasswordInput)).toHaveCSS(
        "border-color",
        "rgb(220, 53, 69)"
      );
      await expect(
        page.locator(".form-group:nth-child(4) .invalid-feedback p")
      ).toHaveText(
        "Password has to be from 8 to 15 characters long and contain at least one integer, one capital, and one small letter"
      );
    }
  });

  test("Check the registration with valid data", async ({ page }) => {
    await page.locator(signupNameInput).fill("Harry");
    await page.locator(signupLastNameInput).fill("Potter");
    await page.locator(signupEmailInput).fill(userEmail);
    await page.locator(signupPasswordInput).fill(userPassword);
    await page.locator(signupRepeatPasswordInput).fill(userPassword);

    await page.getByRole("button", { name: "Register" }).click();
    await expect(page.locator("div.panel-page_heading h1")).toHaveText(
      "Garage"
    );
  });

  test("Login with previously registered data", async ({ page }) => {
    await page.getByRole("button", { name: "Close" }).click();
    await page.locator("button.header_signin").click();
    await expect(page.locator("h4.modal-title")).toHaveText("Log in");
    await page.fill("input#signinEmail", userEmail);
    await page.fill("input#signinPassword", userPassword);
    await page.click("div.modal-footer button.btn-primary");
    await expect(page.locator("div.panel-page_heading h1")).toHaveText(
      "Garage"
    );
  });
});
