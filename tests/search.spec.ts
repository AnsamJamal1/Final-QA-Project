import { test, expect } from "@playwright/test";
import { SearchPage } from "../pages/SearchPage";
import * as dotenv from "dotenv";

dotenv.config();


test.describe("Search Feature", () => {
  let searchPage: SearchPage;

 
  test.beforeEach(async ({ page }) => {
    searchPage = new SearchPage(page);
    await page.goto("https://practicesoftwaretesting.com/");
  });

  
  const existingProduct = process.env.SEARCH_EXISTING || "hammer";
  const nonExistingProduct = process.env.SEARCH_NOT_EXISTING || "mayar";

  test("Search for existing product", async ({ page }) => {
    await searchPage.searchFor(existingProduct);
    await page.waitForTimeout(2000);

    await expect(page.locator('[data-test="search-caption"]')).toHaveText(
      `Searched for: ${existingProduct}`
    );

    const firstTitle = await searchPage.getFirstProductTitle();
    expect(firstTitle?.toLowerCase()).toContain(existingProduct);
  });

  test("Search for non-existing product", async ({ page }) => {
    await searchPage.searchFor(nonExistingProduct);

    await expect(page.locator('[data-test="search-caption"]')).toHaveText(
      `Searched for: ${nonExistingProduct}`
    );

    await expect(page.getByText("There are no products found.")).toBeVisible();

    const products = page.locator('[data-test="product-name"]');
    await expect(products).toHaveCount(0);
  });

  test("Search with empty input stays on home page", async ({ page }) => {
    
    await searchPage.searchFor("");

    await expect(
      page.locator('[data-test="search-caption"]')
    ).not.toBeVisible();
    

  });

  test("Clear search input using X button", async ({ page }) => {
    await searchPage.clear(existingProduct);
    await expect(searchPage.searchInput).toHaveValue("");
    await expect(
      page.locator('[data-test="search-caption"]')
    ).not.toBeVisible();

   
  });

  
});