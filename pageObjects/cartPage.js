exports.CartPage = class CartPage {
  constructor(page) {
    this.page = page;
    this.goToCheckoutButton = page.locator('li .checkout');
    this.cartSummary = page.locator('.grand.totals.incl');
    this.productsCount = page.locator('//input[@class="input-text qty" and @value]');
    this.productsPrice = page.locator('.cart-price .price').last();
    this.increaseCountButton = page.locator('.increaseQty').first();
    this.decreaseCountButton = page.locator('.decreaseQty').first();
    this.removeAllProductsButton = page.locator('.action-delete');
    this.emptyCartTitle = page.locator('.base');
    this.emptyCartPlaceholder = page.locator('.cart-empty p').first();
  }

  async goToCheckout() {
    await this.page.waitForLoadState('networkidle');
    const enabled = await this.page.getByRole('tablist').first().isEnabled();
    await this.goToCheckoutButton.click();
  }

  async getProductsPrice() {
    const price = await this.productsPrice.innerText();
    const slicedPrice = price.slice(2).replace(',', '.');
    return Number(slicedPrice);
  }

  async increaseProductCounter() {
    await this.increaseCountButton.waitFor('visible');
    await this.increaseCountButton.click();
    await this.page.waitForTimeout(500);
    await this.page.waitForLoadState('networkidle');
  }

  async decreaseProductCounter() {
    await this.decreaseCountButton.waitFor('visible');
    await this.decreaseCountButton.click();
    await this.page.waitForTimeout(500);
    await this.page.waitForLoadState('networkidle');
  }

  async setProductCounter(value) {
    await this.productsCount.fill(value);
    await this.page.keyboard.press('Enter');
    await this.page.waitForTimeout(500);
    await this.page.waitForLoadState('networkidle');
  }
};
