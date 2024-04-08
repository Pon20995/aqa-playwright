import { expect, type Locator, type Page } from "@playwright/test";
import { Header } from "../components/header";

export class LoginPage {
  private page: Page;
  signInButton: Locator;
  inputEmail: Locator;
  inputPass: Locator;
  header: any;
  constructor(page: Page) {
    this.page = page;
    this.signInButton = page.getByRole("button", { name: "Sign In" });
    this.inputEmail = page.getByLabel("Email");
    this.inputPass = page.getByLabel("Password");
    this.header = new Header(page);
  }

  async buttonLogin(): Promise<Locator> {
    return this.page.getByRole("button", { name: "Login" });
  }

  async loginWithDefaultParams() {
    await this.header.logoVisisble();
    await this.signInButton.click();
    await this.inputEmail.click();
    await this.inputEmail.fill("ozera123456789@gmail.com");
    await this.inputPass.click();
    await this.inputPass.fill("R4gnZxg.J7U7EX");
  }

  async loginWithDynamicData(user: any, pass: any) {
    await this.signInButton.click();
    await this.inputEmail.click();
    await this.inputEmail.fill(user);
    await this.inputPass.click();
    await this.inputPass.fill(pass);
  }
}
