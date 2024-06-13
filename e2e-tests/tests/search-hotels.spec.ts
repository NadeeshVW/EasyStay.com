import { test, expect } from "@playwright/test";

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

test("should show hotel search result", async({page})=>{
    await page.goto(UI_URL);

    await page.getByPlaceholder("Where are you going?").fill("indore");
    await page.getByRole("button", {name: "Search"}).click();

    await expect(page.getByText("Hotels found in indore")).toBeVisible();
    await expect(page.getByText("abcd")).toBeVisible();
});
