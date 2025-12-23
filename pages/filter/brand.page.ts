import { Page, Locator } from "@playwright/test";

export class BrandPage {
  readonly products: Locator;
  readonly noProductsMsg: Locator;

  constructor(private page: Page) {
    this.page = page;
    this.products = page.locator(".container[data-test=filter_completed] a");
    this.noProductsMsg = page.locator('[data-test="no-results"]'); 
  }

  async selectBrand(brandName: string) {
    await this.page.getByText(brandName).click();
    await this.page.waitForTimeout(2000);
  }

  async selectMultipleBrands(brands: string[]) {
    for (const brand of brands) {
      await this.selectBrand(brand);
    }
  }

  async getFirstProductBrand(): Promise<string | null> {
    await this.products.first().click();
    await this.page.waitForTimeout(2000);
    const brand = await this.page
      .locator('span[aria-label="brand"]')
      .textContent();
    return brand;
  }
}
