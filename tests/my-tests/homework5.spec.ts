import { test, expect, request } from "@playwright/test";

test("Mock users data", async ({ page, request }) => {
  // Mock the response
  await page.route("**/api/users/profile", async (route) => {
    const json = {
      status: "ok",
      data: {
        userId: 107451,
        photoFilename: "../brands/ford.png",
        name: "New",
        lastName: "User",
      },
    };
    await route.fulfill({ json });
  });

  await page.goto("/panel/garage");
  await expect(page.locator("div.panel-page_heading h1")).toHaveText("Garage");
  await page.goto("/panel/profile");
  await expect(page.locator("div.panel-page_heading h1")).toHaveText("Profile");
  await page.screenshot({ path: "screenshot.png", fullPage: true });
});
