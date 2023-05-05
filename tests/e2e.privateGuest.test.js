const { test, expect, defineConfig } = require('@playwright/test');
const { getUrlByEnv } = require('../helpers/urls');
const { HomePage } = require('../pageObjects/homePage');
const { CategoryPage } = require('../pageObjects/categoryPage');
const { ProductListingPage } = require('../pageObjects/productListingPage');
const { AddToCartPopup } = require('../pageObjects/pageComponents/addToCartPopup');
const { CartPage } = require('../pageObjects/cartPage');
const { CheckoutPage } = require('../pageObjects/checkoutPage');
const { SuccessPage } = require('../pageObjects/successPage');
const { ProductDetailsPage } = require('../pageObjects/productDetailPage');

test.describe('Complete order as guest private person', async () => {
  const url = await getUrlByEnv();
  const category = 'Bestsellers';
  const subCategory = 'Bestsellers - Netten';

  test('Success page with user data should be displayed after ordering', async ({ page }) => {
    const homePage = new HomePage(page);
    const categoryPage = new CategoryPage(page);
    const productListingPage = new ProductListingPage(page);
    const addToCartPopup = new AddToCartPopup(page);
    const productDetailsPage = new ProductDetailsPage(page);
    const cartPage = new CartPage(page);
    const checkoutPage = new CheckoutPage(page);
    const successPage = new SuccessPage(page);

    const email = 'test@email.com';
    const name = 'Automated';
    const surname = 'Test';
    const street = 'Zwaarveld';
    const houseNumber = '33';
    const postalCode = '9220';
    const phone = '+32(0)52411083';
    const city = 'Hamme';

    await page.goto(url);
    await homePage.chooseCategory(category);
    await categoryPage.pageTitle.isVisible();
    await categoryPage.chooseSubCategory(subCategory);
    await productListingPage.goToProductDetailsPage(2);
    await productDetailsPage.addProductToCart();
    await addToCartPopup.goToCart();
    await cartPage.goToCheckout();
    await checkoutPage.privatePersonRadiobutton.isEnabled();
    await checkoutPage.privatePersonRadiobutton.click();
    await checkoutPage.fillPrivatePersonCheckoutForm(email, name, surname, street, houseNumber, postalCode, phone, city);
    await checkoutPage.createAccountCheckbox.isVisible();
    await checkoutPage.createAccountCheckbox.click();
    await checkoutPage.bankTransferPaymentRBtn.click();
    await checkoutPage.termsButton.evaluate((button) => button.remove());// to reach checkbox
    await checkoutPage.acceptTermsCheckbox.click();
    await checkoutPage.confirmOrderButton.isEnabled();
    await checkoutPage.confirmOrderButton.click();
    await successPage.returnToShopButton.isEnabled();
    await expect.soft(successPage.pageTitle).toHaveText('Bedankt voor uw aankoop!');
    await successPage.orderNumber.isVisible();
    await expect(successPage.orderNumber).toContainText(/[0-9]+/);
    await expect(successPage.shippingAdress).toContainText(name && surname && street && houseNumber && postalCode && city && phone);
    await expect(successPage.billingAdress).toContainText(name && surname && street && houseNumber && postalCode && city && phone);
  });
});
