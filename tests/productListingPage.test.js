const { test, expect } = require('@playwright/test');
const { TopNavBar } = require('../pageObjects/pageComponents/topNavBar');
const { getUrlByEnv } = require('../helpers/urls');
const { ProductListingPage } = require('../pageObjects/productListingPage');

test.describe('Sorting items on product listing page', async () => {
  const url = await getUrlByEnv();
  const tabName = 'Magazijn';
  const itemName = 'Alle magazijnboxen';

  test('Should sort products by price', async ({ page }) => {
    const topNavBar = new TopNavBar(page);
    const productListingPage = new ProductListingPage(page);
    await page.goto(url);
    await topNavBar.goToProductListingPage(tabName, itemName);
    await productListingPage.sortDropdown.isEnabled();
    await productListingPage.chooseSortingOption('Prijs');
    await productListingPage.sortAction.isEnabled();
    const productPricesDesc = await productListingPage.getPricesWithoutTax();
    await productListingPage.sortAction.click();
    await productListingPage.sortAction.isEnabled();
    const productPricesAsc = await productListingPage.getPricesWithoutTax();
    await expect(productPricesAsc).toEqual(productPricesDesc.reverse());
  });

  test('Should sort products by name', async ({ page }) => {
    const topNavBar = new TopNavBar(page);
    const productListingPage = new ProductListingPage(page);
    await page.goto(url);
    await topNavBar.goToProductListingPage(tabName, itemName);
    await productListingPage.sortDropdown.isEnabled();
    await productListingPage.chooseSortingOption('Naam');
    await productListingPage.sortAction.isEnabled();
    const productNamesDesc = await productListingPage.getProductsNames();
    await productListingPage.sortAction.click();
    const productNamesAsc = await productListingPage.getProductsNames();
    await expect(productNamesAsc).toEqual(productNamesDesc.reverse());
  });
});
