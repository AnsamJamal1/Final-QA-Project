import { Page, Locator } from "@playwright/test";

export class CategoryPage {
  readonly page: Page;
  readonly filterCompleted: Locator;
  readonly products: Locator;
  readonly noProductsMsg: Locator;

  constructor(page: Page) {
    this.page = page;
    this.filterCompleted = page.locator('[data-test="filter_completed"]');
    this.products = this.filterCompleted.locator('[data-test="product-name"]');
    this.noProductsMsg = page.locator('[data-test="no-results"]'); 
  }

  async selectCategory(categoryName: string) {
    await this.page.getByLabel(categoryName).check();
  }

  async selectMultipleCategories(categories: string[]) {
    for (const category of categories) {
      await this.page.getByLabel(category).check();
    }
  }

  async getAllProductTitles(): Promise<string[]> {
    await this.products.first().waitFor({ state: "visible" });
    return await this.products.allTextContents();
  }
}