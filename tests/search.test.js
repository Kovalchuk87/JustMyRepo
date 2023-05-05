const { test, expect } = require('@playwright/test');
const { Header } = require('../pageObjects/pageComponents/header');
const { SearchResultPage } = require('../pageObjects/searchResultPage');
const { ProductDetailsPage } = require('../pageObjects/productDetailPage');
const { getUrlByEnv } = require('../helpers/urls');

const products = [{ name: 'box', sku: '70013' }, { name: 'blackstage', sku: '60258 M625001.02' }];

test.describe('Search Functionality', async () => {
  const url = await getUrlByEnv();
  products.forEach((products) => {
    test(`should return pdp as a search results for a product SKU: ${products.sku}`, async ({ page }) => {
      const header = new Header(page);
      const productDetailsPage = new ProductDetailsPage(page);
      await page.goto(url);
      await header.searchField.isEnabled();
      await header.searchField.type(products.sku);
      await header.searchField.press('Enter');
      await expect(productDetailsPage.sku).toContainText(products.sku);
    });
  });

  products.forEach((products) => {
    test(`should return non-empty search results for a product's keyword: ${products.name}`, async ({ page }) => {
      const header = new Header(page);
      const searchResultPage = new SearchResultPage(page);
      await page.goto(url);
      await header.searchField.isEnabled();
      await header.searchField.type(products.name);
      await header.searchField.press('Enter');
      await expect(searchResultPage.searchResultList).not.toHaveCount(0);
    });
  });

  test('Search result page should contain search query in title', async ({ page }) => {
    const header = new Header(page);
    const searchResultPage = new SearchResultPage(page);
    await page.goto(url);
    await header.searchField.isEditable();
    const query = 'box';
    await header.searchField.type(query);
    await header.searchField.press('Enter');
    await searchResultPage.searchResultTitle.isVisible();
    await expect(searchResultPage.searchResultTitle).toContainText(query);
  });

  test('items counter should be equal to founded products', async ({ page }) => {
    const header = new Header(page);
    const searchResultPage = new SearchResultPage(page);
    await page.goto(url);
    await header.searchField.isEnabled();
    await header.searchField.type('box');
    await header.searchField.press('Enter');
    await searchResultPage.itemsFoundedCounter.isVisible();
    const productsCounter = await searchResultPage.getItemsFoundedCounter();
    const itemCounter = await searchResultPage.countItemsInSearchResult();
    await expect(productsCounter).toEqual(itemCounter);
  });
});
