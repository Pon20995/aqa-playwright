import { test, expect } from "@playwright/test";

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
    await page.locator("input#signupName").click();
    await page.locator("input#signupLastName").click();
    await expect(page.locator("input#signupName")).toHaveCSS(
      "border-color",
      "rgb(220, 53, 69)"
    );
    await expect(
      page.locator(".form-group:nth-child(1) .invalid-feedback p")
    ).toHaveText("Name required");
    await page.locator("input#signupEmail").click();
    await expect(page.locator("input#signupLastName")).toHaveCSS(
      "border-color",
      "rgb(220, 53, 69)"
    );
    await expect(
      page.locator(".form-group:nth-child(2) .invalid-feedback p")
    ).toHaveText("Last name required");
    await page.locator("input#signupPassword").click();
    await expect(page.locator("input#signupEmail")).toHaveCSS(
      "border-color",
      "rgb(220, 53, 69)"
    );
    await expect(
      page.locator(".form-group:nth-child(3) .invalid-feedback p")
    ).toHaveText("Email required");
    await page.locator("input#signupRepeatPassword").click();
    await expect(page.locator("input#signupPassword")).toHaveCSS(
      "border-color",
      "rgb(220, 53, 69)"
    );
    await expect(
      page.locator(".form-group:nth-child(4) .invalid-feedback p")
    ).toHaveText("Password required");
    await page.locator("input#signupName").click();
    await expect(page.locator("input#signupRepeatPassword")).toHaveCSS(
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
      await page.locator("input#signupName").fill(name);
      await page.locator("input#signupLastName").click();
      await expect(page.locator("input#signupName")).toHaveCSS(
        "border-color",
        "rgb(220, 53, 69)"
      );
      await expect(
        page.locator(".form-group:nth-child(1) .invalid-feedback p")
      ).toHaveText("Name is invalid");
      await page.locator("input#signupName").clear();
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
      await page.locator("input#signupLastName").fill(lastName);
      await page.locator("input#signupEmail").click();
      await expect(page.locator("input#signupLastName")).toHaveCSS(
        "border-color",
        "rgb(220, 53, 69)"
      );
      await expect(
        page.locator(".form-group:nth-child(2) .invalid-feedback p")
      ).toHaveText("Last name is invalid");
      await page.locator("input#signupLastName").clear();
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
      await page.locator("input#signupEmail").fill(email);
      await page.locator("input#signupPassword").click();
      await expect(page.locator("input#signupEmail")).toHaveCSS(
        "border-color",
        "rgb(220, 53, 69)"
      );
      await expect(
        page.locator(".form-group:nth-child(3) .invalid-feedback p")
      ).toHaveText("Email is incorrect");
      await page.locator("input#signupEmail").clear();
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
      await page.locator("input#signupPassword").fill(password);
      await page.locator("input#signupRepeatPassword").click();
      await expect(page.locator("input#signupPassword")).toHaveCSS(
        "border-color",
        "rgb(220, 53, 69)"
      );
      await expect(
        page.locator(".form-group:nth-child(4) .invalid-feedback p")
      ).toHaveText(
        "Password has to be from 8 to 15 characters long and contain at least one integer, one capital, and one small letter"
      );
      await page.locator("input#signupPassword").clear();
    }

    await page.locator("input#signupPassword").fill("Qwerty123");
    await page.locator("input#signupRepeatPassword").fill("Qwerty 123");
    await expect(page.locator("input#signupRepeatPassword")).toHaveCSS(
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
      await page.locator("input#signupName").fill(data);
      await page.locator("input#signupLastName").click();
      await expect(page.locator("input#signupName")).toHaveCSS(
        "border-color",
        "rgb(220, 53, 69)"
      );
      await expect(
        page.locator(".form-group:nth-child(1) .invalid-feedback p")
      ).toHaveText("Name has to be from 2 to 20 characters long");
      await page.locator("input#signupLastName").fill(data);
      await page.locator("input#signupEmail").click();
      await expect(page.locator("input#signupLastName")).toHaveCSS(
        "border-color",
        "rgb(220, 53, 69)"
      );
      await expect(
        page.locator(".form-group:nth-child(2) .invalid-feedback p")
      ).toHaveText("Last name has to be from 2 to 20 characters long");
      await page.locator("input#signupPassword").fill(data);
      await page.locator("input#signupRepeatPassword").click();
      await expect(page.locator("input#signupPassword")).toHaveCSS(
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
    await page.locator("input#signupName").fill("Harry");
    await page.locator("input#signupLastName").fill("Potter");
    await page.locator("input#signupEmail").fill(userEmail);
    await page.locator("input#signupPassword").fill(userPassword);
    await page.locator("input#signupRepeatPassword").fill(userPassword);

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
