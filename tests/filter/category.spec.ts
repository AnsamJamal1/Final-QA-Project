import { test, expect } from "@playwright/test";
import { CategoryPage } from "../../pages/filter/category.page";

test.describe("By Category Feature", () => {
  let categoryPage: CategoryPage;

  test.beforeEach(async ({ page }) => {
    categoryPage = new CategoryPage(page);
    await page.goto("https://practicesoftwaretesting.com/");
  });

  test("Filter products by single category", async ({}) => {
    
  await categoryPage.selectCategory("Hammer");

      
  const products = await categoryPage.getAllProductTitles();

  expect(products.length).toBeGreaterThan(0);

    for (const product of products) {
      expect(product.toLowerCase()).toContain("hammer");
    }
  });

  test("Filter products by multiple categories", async ({ page }) => {
    await categoryPage.selectMultipleCategories([
      "Hammer",
      "Screwdriver",
      "Pliers",
    ]);

    const products = await categoryPage.getAllProductTitles();
    expect(products.length).toBeGreaterThan(0);

    for (const product of products) {
      const name = product.toLowerCase();
      expect(
        name.includes("hammer") ||
          name.includes("screwdriver") ||
          name.includes("pliers")
      ).toBeTruthy();
    }
  });


  test("Category with no products shows empty message", async ({ page }) => {
    await categoryPage.selectCategory("Grinder"); 

    await expect(categoryPage.noProductsMsg).toBeVisible();
    await expect(categoryPage.products).toHaveCount(0);
  });


  
});
