import { type Locator, type Page } from "@playwright/test";

export class GaragePage {
  private page: Page;
  addCarButton: Locator;
  garageTitle: Locator;
  carBrandSelector: Locator;
  carModelSelector: Locator;
  mileageInput: Locator;
  addButton: Locator;
  cancelButton: Locator;
  editCarButton: Locator;
  removeCarButton: Locator;
  removeButton: Locator;
  constructor(page: Page) {
    this.page = page;
    this.addCarButton = page.getByRole("button", { name: "Add car" });
    this.garageTitle = page.locator("div.panel-page_heading h1");
    this.carBrandSelector = page.locator("select#addCarBrand");
    this.carModelSelector = page.locator("select#addCarModel");
    this.mileageInput = page.locator("input#addCarMileage");
    this.addButton = page.getByRole("button", { name: "Add" });
    this.cancelButton = page.locator("button.btn.btn-secondary");
    this.editCarButton = page.locator("button.btn-edit");
    this.removeCarButton = page.getByRole("button", { name: "Remove Car" });
    this.removeButton = page.locator("button.btn-danger");
  }

  async addAudiCar() {
    await this.addCarButton.click();
    await this.carBrandSelector.selectOption("Audi");
    await this.carModelSelector.selectOption("TT");
    await this.mileageInput.fill("10000");
    await this.addButton.click();
  }

  async deleteCar() {
    await this.editCarButton.click();
    await this.removeCarButton.click();
    await this.removeButton.click();
  }
}
