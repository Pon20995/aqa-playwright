import { expect, type Locator, type Page } from "@playwright/test";

export class Header {
  logoInHeader: Locator;
  constructor(page: Page) {
    this.logoInHeader = page.locator("a.header_logo");
  }

  async logoVisisble() {
    await expect(this.logoInHeader).toBeVisible;
  }
}
