import { test as base } from "@playwright/test";
import { GaragePage } from "../pageObjects/garagePage";

type MyFixture = {
  garagePage: GaragePage;
};

export const test = base.extend<MyFixture>({
  garagePage: async ({ page }, use) => {
    const garagePage = new GaragePage(page);
    garagePage.addAudiCar();
    garagePage.deleteCar();
    await use(garagePage);
  },
});
export { expect } from "@playwright/test";
