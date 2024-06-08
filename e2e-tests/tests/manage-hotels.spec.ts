import { test, expect } from "@playwright/test";
import path from "path";

const UI_URL = "http://localhost:5173/";

test.beforeEach(async ({ page }) => {
  await page.goto(UI_URL);

  //get the sign in button
  await page.getByRole("link", { name: "Sign In" }).click();

  await expect(page.getByRole("link", { name: "Sign In" })).toBeVisible();

  await page.locator("[name=email]").fill("mn@mn.com");
  await page.locator("[name=password]").fill("nadeesh");

  await page.getByRole("button", { name: "Login" }).click();

  await expect(page.getByText("SignIn successfull!")).toBeVisible();
});

test("should allow user to add hotel", async ({ page }) => {
  await page.goto(`${UI_URL}add-hotel`);

  await page.locator('[name="name"]').fill("Test Hotel");
  await page.locator('[name="city"]').fill("Test City");
  await page.locator('[name="country"]').fill("Test Country");
  await page
    .locator('[name="description"]')
    .fill("This is a description for Test Hotel");
  await page.locator('[name="pricePerNight"]').fill("2000");
  await page.selectOption('select[name="starRating"]', "3");
  await page.selectOption('select[name="starRating"]', "3");

  await page.getByText("Budget").click();

  await page.getByLabel("Free Wifi").check();
  await page.getByLabel("Parking").check();

  await page.locator('[name="adultCount"]').fill("2");
  await page.locator('[name="childCount"]').fill("1");

  await page.setInputFiles('[name="imageFiles"]', [
    path.join(__dirname, "files", "1.jpg"),
    path.join(__dirname, "files", "2.jpg"),
  ]);

  await page.getByRole("button", { name: "Save" }).click();
  await expect(page.getByText("Hotel saved!")).toBeVisible();
});

test("should display hotels", async ({ page }) => {
  await page.goto(`${UI_URL}my-hotels`);

  await expect(page.getByText("abcd")).toBeVisible();
  await expect(page.getByText("best hotel")).toBeVisible();
  await expect(page.getByText("indore,INDIA")).toBeVisible();
  await expect(page.getByText("All Inclusive")).toBeVisible();
  await expect(page.getByText("₹ 2600/Night")).toBeVisible();
  await expect(page.getByText("2 adults, 1 children")).toBeVisible();
  await expect(page.getByText("5 Star Rating")).toBeVisible();

  await page.locator('button:text("View Details")');
  await page.locator('button:text("Add Hotel")');
  // await expect(page.getByRole("link",{ name: "View Details"})).toBeVisible();
  // await expect(page.getByRole("link",{ name: "Add Hotel"})).toBeVisible({ timeout: 10000 });
});
