import { test } from '@playwright/test';
import { ProductsPage } from '../pages/ProductsPage';

test.describe('Price Range Feature', () => {
    test('Filter products by price range', async ({ page }) => {
        const productsPage = new ProductsPage(page);

        await page.goto('https://practicesoftwaretesting.com/  ');
        await productsPage.setPriceRange();
        await productsPage.verifyPricesAreFiltered();
    });
});