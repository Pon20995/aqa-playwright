import { test, expect } from "../../util/fixtureGarage";

test("Adding and deleting cars", async ({ garagePage, page, context }) => {
  await page.goto("https://qauto.forstudy.space/panel/garage");
  await garagePage.addAudiCar();
  await expect(page.getByRole("list")).toContainText("Audi TT");
  await garagePage.deleteCar();
  await expect(page.locator("p.panel-empty_message")).toHaveText(
    "You don’t have any cars in your garage"
  );
});
