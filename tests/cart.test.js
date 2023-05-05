const { test, expect } = require('@playwright/test');
const { HomePage } = require('../pageObjects/homePage');
const { ProductListingPage } = require('../pageObjects/productListingPage');
const { AddToCartPopup } = require('../pageObjects/pageComponents/addToCartPopup');
const { getUrlByEnv } = require('../helpers/urls');
const { CategoryPage } = require('../pageObjects/categoryPage');
const { CartPage } = require('../pageObjects/cartPage');
const { ProductDetailsPage } = require('../pageObjects/productDetailPage');
const { Header } = require('../pageObjects/pageComponents/header');

test.describe('Search Functionality', async () => {
  const url = await getUrlByEnv();
  const category = 'Bestsellers';
  const subCategory = 'Bestsellers - Netten';

  test.beforeEach(async ({ page }) => {
    const homePage = new HomePage(page);
    const categoryPage = new CategoryPage(page);
    const productListingPage = new ProductListingPage(page);
    const addToCartPopup = new AddToCartPopup(page);
    const productDetailsPage = new ProductDetailsPage(page);
    await page.goto(url);
    await homePage.chooseCategory(category);
    await categoryPage.pageTitle.isVisible();
    await categoryPage.chooseSubCategory(subCategory);
    await productListingPage.goToProductDetailsPage(2);
    await productDetailsPage.addProductToCart();
    await page.waitForLoadState('networkidle');
    await addToCartPopup.goToCart();
  });

  test('products counter should be 1 by default', async ({ page }) => {
    const cartPage = new CartPage(page);
    await expect(cartPage.productsCount).toHaveValue('1');
  });

  test('products counter should be increased by "+" button clicking', async ({ page }) => {
    const cartPage = new CartPage(page);
    await cartPage.increaseProductCounter();
    await expect(cartPage.productsCount).toHaveValue('2');
  });

  test('products counter should be decreased by "-" button clicking', async ({ page }) => {
    const cartPage = new CartPage(page);
    await cartPage.increaseProductCounter();
    await cartPage.decreaseProductCounter();
    await expect(cartPage.productsCount).toHaveValue('1');
  });

  test('products price should be multiplied by 2 by "+" button clicking', async ({ page }) => {
    const cartPage = new CartPage(page);
    const basePrice = await cartPage.getProductsPrice();
    await cartPage.increaseProductCounter();
    const changedPrice = await cartPage.getProductsPrice();
    await expect(changedPrice).toBe(basePrice * 2);
  });

  test('should display an empty cart page after removing all products', async ({ page }) => {
    const cartPage = new CartPage(page);
    await cartPage.removeAllProductsButton.click();
    await expect(cartPage.emptyCartTitle).toHaveText('Winkelwagen');
    await expect(cartPage.emptyCartPlaceholder).toHaveText('U heeft geen artikelen in uw winkelwagen.');
  });

  test('products count should be able to set manually', async ({ page }) => {
    const cartPage = new CartPage(page);
    const basePrice = await cartPage.getProductsPrice();
    await cartPage.setProductCounter('5');
    const changedPrice = await cartPage.getProductsPrice();
    await expect(changedPrice).toBe(basePrice * 5);
  });

  test('cart icon should display actual count', async ({ page }) => {
    const cartPage = new CartPage(page);
    const header = new Header(page);
    await page.waitForLoadState('networkidle');
    const baseProductsCounterIcon = await header.getCartCounter();
    await expect(baseProductsCounterIcon).toBe('1');
    await cartPage.setProductCounter('5');
    await cartPage.cartSummary.isEnabled();
    const changedProductsCounterIcon = await header.getCartCounter();
    await expect(changedProductsCounterIcon).toBe('5');
  });
});
