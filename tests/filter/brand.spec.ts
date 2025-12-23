import { test, expect } from "@playwright/test";
import { BrandPage } from "../../pages/filter/brand.page";

test.describe("By Brand Feature", () => {
  let brandPage: BrandPage;

  test.beforeEach(async ({ page }) => {
    brandPage = new BrandPage(page);
    await page.goto("https://practicesoftwaretesting.com/");
  });

 test("Filter products by brand and verify first product", async ({ page }) => {
   await brandPage.selectBrand("ForgeFlex Tools");

   const brand = await brandPage.getFirstProductBrand();
   expect(brand).toContain("ForgeFlex Tools");
 });

 test("Filter products by brand have no product", async ({ page }) => {
   await brandPage.selectBrand(" 0VLH");

   const productsCount = await brandPage.products.count();
   expect(productsCount).toBe(0);

   const emptyMessage = brandPage.noProductsMsg
   await expect(emptyMessage).toBeVisible();
   
 });



  
 
});
