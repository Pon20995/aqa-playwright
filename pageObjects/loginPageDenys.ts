import { expect, type Page, type Locator } from "@playwright/test";

export class LoginPage {
  private page: Page;
  signInButton: Locator;
  inputEmail: Locator;
  inputPass: Locator;
  logoInHeader: Locator;
  loginButtonForm: Locator;
  constructor(page: Page) {
    this.page = page;
    this.signInButton = page.getByRole("button", { name: "Sign In" });
    this.inputEmail = page.getByLabel("Email");
    this.inputPass = page.getByLabel("Password");
    this.logoInHeader = page.locator("a.header_logo");
    this.loginButtonForm = page.getByRole("button", { name: "Login" });
  }

  async openPage() {
    await this.page.goto("/");
  }

  async buttonLogin(): Promise<Locator> {
    return this.page.getByRole("button", { name: "Login" });
  }

  async loginWithDefaultParams() {
    await expect(this.logoInHeader).toBeVisible();
    await this.signInButton.click();
    await this.inputEmail.click();
    await this.inputEmail.fill("ozera123456789@gmail.com");
    // click input for password
    await this.inputPass.click();
    await this.inputPass.fill("R4gnZxg.J7U7EX");
    await this.loginButtonForm.click();
  }

  async loginWithDynamicData(userD: any, passD: any) {
    await this.signInButton.click();
    await this.inputEmail.click();
    await this.inputEmail.fill(userD);
    // click input for password
    await this.inputPass.click();
    await this.inputPass.fill(passD);
  }
}
