import { expect, type Locator, type Page } from "@playwright/test";
import { Header } from "../components/header";

export class RegistrationPage {
  private page: Page;
  inputName: Locator;
  inputLastName: Locator;
  inputEmail: Locator;
  inputPass: Locator;
  reneterPass: Locator;
  registerButton: any;
  header: any;
  constructor(page: Page) {
    this.page = page;
    this.inputName = page.locator("input#signupName");
    this.inputLastName = page.locator("input#signupLastName");
    this.inputEmail = page.locator("input#signupEmail");
    this.inputPass = page.locator("input#signupPassword");
    this.reneterPass = page.locator("input#signupRepeatPassword");
    this.registerButton = page.getByRole("button", { name: "Register" });
    this.header = new Header(page);
  }

  async clickNameInput() {
    await this.inputName.click();
  }
  async clickLastNameInput() {
    await this.inputLastName.click();
  }
  async clickEmailInput() {
    await this.inputEmail.click();
  }
  async clickPassInput() {
    await this.inputPass.click();
  }
  async clickReenterPassInput() {
    await this.reneterPass.click();
  }
  async checkFieldsIfEmpty() {
    await expect(this.inputName).toHaveCSS("border-color", "rgb(220, 53, 69)");
    await expect(
      this.page.locator(".form-group:nth-child(1) .invalid-feedback p")
    ).toHaveText("Name required");
    await expect(this.inputLastName).toHaveCSS(
      "border-color",
      "rgb(220, 53, 69)"
    );
    await expect(
      this.page.locator(".form-group:nth-child(2) .invalid-feedback p")
    ).toHaveText("Last name required");
    await expect(this.inputEmail).toHaveCSS("border-color", "rgb(220, 53, 69)");
    await expect(
      this.page.locator(".form-group:nth-child(3) .invalid-feedback p")
    ).toHaveText("Email required");
    await expect(this.inputPass).toHaveCSS("border-color", "rgb(220, 53, 69)");
    await expect(
      this.page.locator(".form-group:nth-child(4) .invalid-feedback p")
    ).toHaveText("Password required");
    await expect(this.reneterPass).toHaveCSS(
      "border-color",
      "rgb(220, 53, 69)"
    );
    await expect(
      this.page.locator(".form-group:nth-child(5) .invalid-feedback p")
    ).toHaveText("Re-enter password required");
  }
  async checkNameIfInvalid(name) {
    await this.inputName.fill(name);
    await this.inputLastName.click();
    await expect(this.inputName).toHaveCSS("border-color", "rgb(220, 53, 69)");
    await expect(
      this.page.locator(".form-group:nth-child(1) .invalid-feedback p")
    ).toHaveText("Name is invalid");
    await this.inputName.clear();
  }
  async checkLastNameIfInvalid(lastName) {
    await this.inputLastName.fill(lastName);
    await this.inputEmail.click();
    await expect(this.inputLastName).toHaveCSS(
      "border-color",
      "rgb(220, 53, 69)"
    );
    await expect(
      this.page.locator(".form-group:nth-child(2) .invalid-feedback p")
    ).toHaveText("Last name is invalid");
    await this.inputLastName.clear();
  }
  async checkEmailIfInvalid(email) {
    await this.inputEmail.fill(email);
    await this.inputPass.click();
    await expect(this.inputEmail).toHaveCSS("border-color", "rgb(220, 53, 69)");
    await expect(
      this.page.locator(".form-group:nth-child(3) .invalid-feedback p")
    ).toHaveText("Email is incorrect");
    await this.inputEmail.clear();
  }
  async checkPassIfInvalid(password) {
    await this.inputPass.fill(password);
    await this.reneterPass.click();
    await expect(this.inputPass).toHaveCSS("border-color", "rgb(220, 53, 69)");
    await expect(
      this.page.locator(".form-group:nth-child(4) .invalid-feedback p")
    ).toHaveText(
      "Password has to be from 8 to 15 characters long and contain at least one integer, one capital, and one small letter"
    );
    await this.inputPass.clear();
  }
  async checkReenterPassIfInvalid() {
    await this.inputPass.fill("Qwerty123");
    await this.reneterPass.fill("Qwerty 123");
    await expect(this.reneterPass).toHaveCSS(
      "border-color",
      "rgb(220, 53, 69)"
    );
    await expect(
      this.page.locator(".form-group:nth-child(5) .invalid-feedback p")
    ).toHaveText("Passwords do not match");
  }
  async checkFieldsLength(data) {
    await this.inputName.fill(data);
    await this.inputLastName.click();
    await expect(this.inputName).toHaveCSS("border-color", "rgb(220, 53, 69)");
    await expect(
      this.page.locator(".form-group:nth-child(1) .invalid-feedback p")
    ).toHaveText("Name has to be from 2 to 20 characters long");
    await this.inputLastName.fill(data);
    await this.inputEmail.click();
    await expect(this.inputLastName).toHaveCSS(
      "border-color",
      "rgb(220, 53, 69)"
    );
    await expect(
      this.page.locator(".form-group:nth-child(2) .invalid-feedback p")
    ).toHaveText("Last name has to be from 2 to 20 characters long");
    await this.inputPass.fill(data);
    await this.reneterPass.click();
    await expect(this.inputPass).toHaveCSS("border-color", "rgb(220, 53, 69)");
    await expect(
      this.page.locator(".form-group:nth-child(4) .invalid-feedback p")
    ).toHaveText(
      "Password has to be from 8 to 15 characters long and contain at least one integer, one capital, and one small letter"
    );
  }
  async registerWithValidData(userEmail, userPassword) {
    await this.inputName.fill("Harry");
    await this.inputLastName.fill("Potter");
    await this.inputEmail.fill(userEmail);
    await this.inputPass.fill(userPassword);
    await this.reneterPass.fill(userPassword);
    await this.registerButton.click();
    await expect(this.page.locator("div.panel-page_heading h1")).toHaveText(
      "Garage"
    );
  }
}
