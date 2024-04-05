import { test, expect } from "@playwright/test";
import RegistrationForm from "../../pageObjects/registrationForm";

const createRegistrationForm = async (page) => {
  const registrationForm = new RegistrationForm(page);

  const nameInput = await registrationForm.getNameInput();
  const lastNameInput = await registrationForm.getLastNameInput();
  const emailInput = await registrationForm.getEmailInput();
  const passwordInput = await registrationForm.getPasswordInput();
  const repeatPasswordInput = await registrationForm.getRepeatPasswordInput();
  const submitButton = await registrationForm.getRegisterButton();

  return {
    nameInput,
    lastNameInput,
    emailInput,
    passwordInput,
    repeatPasswordInput,
    submitButton,
  };
};
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
    const registrationForm = await createRegistrationForm(page);

    await registrationForm.nameInput.click();
    await registrationForm.lastNameInput.click();
    await expect(registrationForm.nameInput).toHaveCSS(
      "border-color",
      "rgb(220, 53, 69)"
    );
    await expect(
      page.locator(".form-group:nth-child(1) .invalid-feedback p")
    ).toHaveText("Name required");
    await registrationForm.emailInput.click();
    await expect(registrationForm.lastNameInput).toHaveCSS(
      "border-color",
      "rgb(220, 53, 69)"
    );
    await expect(
      page.locator(".form-group:nth-child(2) .invalid-feedback p")
    ).toHaveText("Last name required");
    await registrationForm.passwordInput.click();
    await expect(registrationForm.emailInput).toHaveCSS(
      "border-color",
      "rgb(220, 53, 69)"
    );
    await expect(
      page.locator(".form-group:nth-child(3) .invalid-feedback p")
    ).toHaveText("Email required");
    await registrationForm.repeatPasswordInput.click();
    await expect(registrationForm.passwordInput).toHaveCSS(
      "border-color",
      "rgb(220, 53, 69)"
    );
    await expect(
      page.locator(".form-group:nth-child(4) .invalid-feedback p")
    ).toHaveText("Password required");
    await registrationForm.nameInput.click();
    await expect(registrationForm.repeatPasswordInput).toHaveCSS(
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
    const registrationForm = await createRegistrationForm(page);
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
      await registrationForm.nameInput.fill(name);
      await registrationForm.lastNameInput.click();
      await expect(registrationForm.nameInput).toHaveCSS(
        "border-color",
        "rgb(220, 53, 69)"
      );
      await expect(
        page.locator(".form-group:nth-child(1) .invalid-feedback p")
      ).toHaveText("Name is invalid");
      await registrationForm.nameInput.clear();
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
      await registrationForm.lastNameInput.fill(lastName);
      await registrationForm.emailInput.click();
      await expect(registrationForm.lastNameInput).toHaveCSS(
        "border-color",
        "rgb(220, 53, 69)"
      );
      await expect(
        page.locator(".form-group:nth-child(2) .invalid-feedback p")
      ).toHaveText("Last name is invalid");
      await registrationForm.lastNameInput.clear();
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
      await registrationForm.emailInput.fill(email);
      await registrationForm.passwordInput.click();
      await expect(registrationForm.emailInput).toHaveCSS(
        "border-color",
        "rgb(220, 53, 69)"
      );
      await expect(
        page.locator(".form-group:nth-child(3) .invalid-feedback p")
      ).toHaveText("Email is incorrect");
      await registrationForm.emailInput.clear();
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
      await registrationForm.passwordInput.fill(password);
      await registrationForm.repeatPasswordInput.click();
      await expect(registrationForm.passwordInput).toHaveCSS(
        "border-color",
        "rgb(220, 53, 69)"
      );
      await expect(
        page.locator(".form-group:nth-child(4) .invalid-feedback p")
      ).toHaveText(
        "Password has to be from 8 to 15 characters long and contain at least one integer, one capital, and one small letter"
      );
      await registrationForm.passwordInput.clear();
    }

    await registrationForm.passwordInput.fill("Qwerty123");
    await registrationForm.repeatPasswordInput.fill("Qwerty 123");
    await expect(registrationForm.repeatPasswordInput).toHaveCSS(
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
    const registrationForm = await createRegistrationForm(page);
    const wrongLengthData = ["e", "qwertyuiopqwertyuiopq"];
    for (const data of wrongLengthData) {
      await registrationForm.nameInput.fill(data);
      await registrationForm.lastNameInput.click();
      await expect(registrationForm.nameInput).toHaveCSS(
        "border-color",
        "rgb(220, 53, 69)"
      );
      await expect(
        page.locator(".form-group:nth-child(1) .invalid-feedback p")
      ).toHaveText("Name has to be from 2 to 20 characters long");
      await registrationForm.lastNameInput.fill(data);
      await registrationForm.emailInput.click();
      await expect(registrationForm.lastNameInput).toHaveCSS(
        "border-color",
        "rgb(220, 53, 69)"
      );
      await expect(
        page.locator(".form-group:nth-child(2) .invalid-feedback p")
      ).toHaveText("Last name has to be from 2 to 20 characters long");
      await registrationForm.passwordInput.fill(data);
      await registrationForm.repeatPasswordInput.click();
      await expect(registrationForm.passwordInput).toHaveCSS(
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
    const registrationForm = await createRegistrationForm(page);
    await registrationForm.nameInput.fill("Harry");
    await registrationForm.lastNameInput.fill("Potter");
    await registrationForm.emailInput.fill(userEmail);
    await registrationForm.passwordInput.fill(userPassword);
    await registrationForm.repeatPasswordInput.fill(userPassword);

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
