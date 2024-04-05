import { Locator, Page } from "@playwright/test";

export default class RegistrationForm {
  private page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  async getNameInput(): Promise<Locator> {
    return this.page.locator("input#signupName");
  }

  async getLastNameInput(): Promise<Locator> {
    return this.page.locator("input#signupLastName");
  }

  async getEmailInput(): Promise<Locator> {
    return this.page.locator("input#signupEmail");
  }

  async getPasswordInput(): Promise<Locator> {
    return this.page.locator("input#signupPassword");
  }

  async getRepeatPasswordInput(): Promise<Locator> {
    return this.page.locator("input#signupRepeatPassword");
  }

  async getRegisterButton(): Promise<Locator> {
    return this.page.getByRole("button", { name: "Register" });
  }
}
