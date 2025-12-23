import {test  , expect} from '@playwright/test'
import {ProductsPage} from '../pages/ProuductsPage'
import {CartPage} from '../pages/CartPage'

test.describe('Sorting tests' , () => {

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



  test('TC4 - Sort products A - Z' , async ({ page }) => {
      await productsPage.sortBy('name'); 

      const productNames = (await productsPage.getProductNames()).map(name => name.trim());
      const sortedNames = [...productNames].sort(); 
      expect(productNames).toEqual(sortedNames);


  });


  test('TC5 - Sort by price High - Low' , async ({ page }) => {
      await productsPage.sortBy('price'); 

      const productPrices = await productsPage.getProductPrices();
      const numericPrices = productPrices.map(p => parseFloat(p.replace('$',''))); 
      const sortedPrices = [...numericPrices].sort((a,b) => b - a); 
      expect(numericPrices).toEqual(sortedPrices);


  });


})