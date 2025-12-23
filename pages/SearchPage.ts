import { Page, Locator} from "@playwright/test";

export class SearchPage {
  readonly searchInput: Locator;
  readonly searchButton: Locator;
  readonly productTitles: Locator;
  readonly searchCaption :Locator;
  readonly clearButton:Locator

  constructor(private page: Page) {
    this.page = page;
    this.searchInput = page.locator('[data-test="search-query"]');
    this.searchButton = page.locator('[data-test="search-submit"]');
    this.productTitles = page.locator('[data-test="product-name"]');
    this.searchCaption = page.locator('[data-test="search-caption"]');
    this.clearButton = page.locator('[data-test="search-reset"]');
  }

  async searchFor(productName: string) {
    await this.searchInput.click();
    await this.page.waitForTimeout(2000);
    await this.searchInput.fill(productName);
    await this.page.waitForTimeout(2000);
    await this .searchButton.click(); 
    await this.page.waitForTimeout(2000);
  }
   async clear(productName:string){
    
    await this.searchInput.click();
    await this.page.waitForTimeout(2000);
    await this.searchInput.fill(productName);
    await this.page.waitForTimeout(2000);
    await this.clearButton.click();
    await this.page.waitForTimeout(2000);

   }

  async getFirstProductTitle() {
    
      return await this.productTitles.first().textContent();
  }
}