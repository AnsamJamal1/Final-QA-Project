import {test , expect} from '@playwright/test'
import {ProductsPage} from '../pages/ProuductsPage'
import {CartPage} from '../pages/CartPage'

test.describe('Shoping tests' , () => {

  let productsPage: ProductsPage;
  let cartPage: CartPage;

  test.beforeEach(async ({ page }) => {

    productsPage = new ProductsPage(page);
    cartPage = new CartPage(page);

    await productsPage.navigate();

  });

  
  test.afterEach(async ({ page }) => {

    await page.close(); 

  });

  test('TC1 - Add product to cart' , async () => {
    await productsPage.addProductToCart('Bolt Cutters');
  });

  test('TC2 - Verify product appears in cart' , async () => {
    await productsPage.addProductToCart('Bolt Cutters'); 
    await productsPage.openCart(); 

    const itemsCount = await cartPage.getItemsNumber();
    expect(itemsCount).toBeGreaterThan(0);

  });


  
})



