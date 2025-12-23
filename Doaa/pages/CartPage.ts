import { Page , Locator , expect} from "@playwright/test";

export class CartPage{
    
    readonly page: Page;
    readonly cartItems: Locator;


    constructor(page: Page) {
        this.page = page;
        this.cartItems = page.locator('table tbody tr');
    }

    async getItemsNumber(){
        return await this.cartItems.count();
    }

    async removeItemFromCart(productName: string) {
        const itemRow = this.page.locator('table tbody tr').filter({ hasText: productName });
        await expect(itemRow).toBeVisible({ timeout: 10000 }); 
        const deleteButton = itemRow.locator('.btn.btn-danger');
        await expect(deleteButton).toBeVisible({ timeout: 10000 }); 
        await deleteButton.click();
        await expect(itemRow).toHaveCount(0, { timeout: 10000 });
    }

}