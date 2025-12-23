import { Page , Locator , expect} from "@playwright/test";

export class ProductsPage{
    
    readonly page: Page;
    readonly cartIcon : Locator;
    readonly addToCart : Locator;
    readonly cartQuantityBadge : Locator;
    readonly productNames : Locator;
    readonly productPrices : Locator;

    constructor(page: Page) {
        this.page = page;
        this.cartIcon = page.locator('[data-test="nav-cart"]');
        this.addToCart = page.locator('[data-test="add-to-cart"]');
        this.cartQuantityBadge = page.locator('[data-test="cart-quantity"]');
        this.productNames = page.locator('.card-title');
        this.productPrices = page.locator('.card-price');

    }

    async navigate(){
        await this.page.goto('https://practicesoftwaretesting.com/')
    }



    async getCartCount(): Promise<number> {
        if ((await this.cartQuantityBadge.count()) === 0) return 0;

        const num = await this.cartQuantityBadge.textContent();
        return parseInt(num || '0');
    }


    async productClick(productName: string) {
        const productCard = this.page.locator('.card').filter({ hasText: productName });
        await expect(productCard).toBeVisible({ timeout: 10000 });
        await productCard.click();
    }



    async addProductToCart(productName: string) {
        
        const cartCount = await this.getCartCount();
        await this.productClick(productName);

        await expect(this.addToCart).toBeVisible({ timeout: 10000 });
        await this.addToCart.click();

        await expect(this.cartQuantityBadge).toHaveText((cartCount + 1).toString(), { timeout: 10000 });

    }


    async openCart(){
        await this.cartIcon.click();
          await expect(this.page.locator('table tbody tr').first()).toBeVisible({ timeout: 10000 });

    }

    async getProductNames(): Promise<string[]> {
        return await this.productNames.allTextContents();
    }

     
    async getProductPrices(): Promise<string[]> {
        return await this.productPrices.allTextContents();
    }

    async sortBy(criteria: 'name' | 'price'){
        const sortDropdown = this.page.locator('select[data-test="sort"]'); 
        switch (criteria) {
            case 'name':
                await sortDropdown.selectOption({label : 'Name (A - Z)'});
                break;
            case 'price':
                await sortDropdown.selectOption({label : 'Price (High - Low)'});
                break;
        }
    }

}
