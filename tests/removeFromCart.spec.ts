import {test,expect} from '@playwright/test'
import { ProdPage } from '../pages/ProdPage';
import { CartPage } from '../pages/CartPage';

test('TC3 - Remove product from cart' , async ({ page }) => {
  const productsPage = new ProdPage(page);
  const cartPage = new CartPage(page);

  await productsPage.navigate();
  await productsPage.addProductToCart('Combination Pliers')
  await productsPage.openCart();
  await cartPage.removeItemFromCart('Combination Pliers');
  const itemsCount = await cartPage.getItemsNumber();
  expect(itemsCount).toBe(0);
  
});