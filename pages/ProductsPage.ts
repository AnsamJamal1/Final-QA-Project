import { Page, expect } from '@playwright/test';

export class ProductsPage {
    constructor(private page: Page) {}

    minSlider = this.page.getByRole('slider').first();
    maxSlider = this.page.getByRole('slider').nth(1);
    productPrices = this.page.locator('text=$');

    async setPriceRange() {
        // Move min slider right
        const minBox = await this.minSlider.boundingBox();
        if (!minBox) throw new Error('Min slider not found');
        await this.page.mouse.move(minBox.x + minBox.width / 2, minBox.y + minBox.height / 2);
        await this.page.mouse.down();
        await this.page.mouse.move(minBox.x + minBox.width * 0.4, minBox.y + minBox.height / 2);
        await this.page.mouse.up();

        // Move max slider left
        const maxBox = await this.maxSlider.boundingBox();
        if (!maxBox) throw new Error('Max slider not found');
        await this.page.mouse.move(maxBox.x + maxBox.width / 2, maxBox.y + maxBox.height / 2);
        await this.page.mouse.down();
        await this.page.mouse.move(maxBox.x + maxBox.width * 0.6, maxBox.y + maxBox.height / 2);
        await this.page.mouse.up();

        // wait for filtering
        await this.page.waitForLoadState('networkidle');
    }

    async verifyPricesAreFiltered() {
        const prices = await this.productPrices.allInnerTexts();
        const numericPrices = prices.map(p => Number(p.replace('$', '')));

        expect(numericPrices.length).toBeGreaterThan(0);

        const minPrice = Math.min(...numericPrices);
        const maxPrice = Math.max(...numericPrices);

        // Products are not showing full range anymore
        expect(minPrice).toBeGreaterThan(0);
        expect(maxPrice).toBeLessThan(200);
    }
}
