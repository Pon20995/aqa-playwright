import { test, expect, request } from "@playwright/test";
import { LoginPage } from "../../pageObjects/loginPage";

const loginName = process.env.LOGIN_USERNAME || "";
const loginPass = process.env.LOGIN_PASS || "";

test.beforeEach(async ({ page }) => {
  await page.goto("/panel/garage");
  await page.locator('button:has-text("Sign In")').click();
  await page.fill("input[name='email']", loginName);
  await page.fill("input[name='password']", loginPass);
  await page.locator('button:has-text("Login")').click();
  await expect(page.locator("div.panel-page_heading h1")).toHaveText("Garage");
});

test("Positive check off car adding", async ({ page, request }) => {
  const carData = await request.post("/api/cars", {
    data: {
      carBrandId: 1,
      carModelId: 1,
      mileage: 100001,
    },
    headers: {
      Cookie:
        "sid=s%3ABi3VYIkQrPOCZOTcBQASLIGjQ19tQtja.wZGxVS%2FX4lHLu2WvWl%2FILKmS8JBHkjaOn4cmrGhx%2BGk",
    },
  });
  expect(carData.ok()).toBeTruthy();
  await page.reload();
  await expect(page.getByText("Audi TT")).toContainText("Audi TT");
  const responseBody = await carData.json();
  expect(responseBody).toHaveProperty("status", "ok");
  expect(responseBody.data).toHaveProperty("id");
  expect(responseBody.data).toHaveProperty("mileage", 100001);
  expect(responseBody.data).toHaveProperty("carBrandId", 1);
  expect(responseBody.data).toHaveProperty("carModelId", 1);
  expect(responseBody.data).toHaveProperty("brand", "Audi");
  expect(responseBody.data).toHaveProperty("model", "TT");
  expect(responseBody.data).toHaveProperty("logo", "audi.png");
  await page.locator("button.btn-edit").click();
  await page.getByRole("button", { name: "Remove Car" }).click();
  await page.locator("button.btn-danger").click();
});

test("Negative test case for adding a car with invalid brand", async ({
  page,
  request,
}) => {
  const carData = await request.post("/api/cars", {
    data: {
      carBrandId: 9999,
      carModelId: 1,
      mileage: 50000,
    },
    headers: {
      Cookie:
        "sid=s%3ABi3VYIkQrPOCZOTcBQASLIGjQ19tQtja.wZGxVS%2FX4lHLu2WvWl%2FILKmS8JBHkjaOn4cmrGhx%2BGk",
    },
  });

  expect(carData.ok()).toBeFalsy();
  const responseBody = await carData.json();
  expect(responseBody).toHaveProperty("status", "error");
  expect(responseBody).toHaveProperty("message", "Brand not found");
});

test("Negative test case for adding a car without authentication", async ({
  page,
  request,
}) => {
  const carData = await request.post("/api/cars", {
    data: {
      carBrandId: 1,
      carModelId: 1,
      mileage: 100001,
    },
    headers: {
      Cookie: "",
    },
  });
  expect(carData.ok()).toBeFalsy();
  const responseBody = await carData.json();
  expect(responseBody).toHaveProperty("status", "error");
  expect(responseBody).toHaveProperty("message", "Not authenticated");
});
