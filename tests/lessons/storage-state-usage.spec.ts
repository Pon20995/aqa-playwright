import { test, expect, request } from "@playwright/test";

test("check garage page", async ({ page, request }) => {
  //To monitor requests
  page.on("request", (request) =>
    console.log(">>", request.method(), request.url())
  );
  page.on("response", (response) =>
    console.log("<<", response.status(), response.url())
  );
  const responsePromise = page.waitForResponse("**/api/cars");

  // // Abort based on the request type (images)
  // await page.route("**/*.{png,jpg,jpeg}", (route) => route.abort());

  // // Delete header
  // await page.route("**/api/cars", async (route) => {
  //   const headers = route.request().headers();
  //   delete headers["X-Secret"];
  //   await route.continue({ headers });
  // });

  // Mock the response
  await page.route("**/api/cars", async (route) => {
    const json = {
      status: "ok",
      data: [
        {
          id: 138525,
          carBrandId: 3,
          carModelId: 11,
          initialMileage: 30000,
          updatedMileageAt: "2024-04-30T21:56:05.000Z",
          carCreatedAt: "2024-04-30T21:56:05.000Z",
          mileage: 30000,
          brand: "Ford",
          model: "Fiesta",
          logo: "ford.png",
        },
      ],
    };
    await route.fulfill({ json });
  });

  await page.goto("/panel/garage");
  await expect(page.locator("div.panel-page_heading h1")).toHaveText("Garage");
  await page.screenshot({ path: "screenshot.png", fullPage: true });
  // const response = await responsePromise;
  const cars = await request.get("/api/cars");
  expect(cars.ok()).toBeTruthy();
  console.log(await cars.text());
});
