exports.Header = class Header {
  constructor(page) {
    this.page = page;
    this.headerLogo = page.locator('.ammenu-logo-desktop');
    this.searchField = page.locator('div.amsearch-wrapper-input:nth-child(5) > input:nth-child(1)');
    this.contactUsButton = page.locator('.desktop-phone-number__contact');
    this.headerPhoneButton = page.locator('.desktop-phone-number__icon');
    this.switchStoreButton = page.locator('#switcher-language-trigger');
    this.availableStores = page.locator('.switcher-dropdown');
    this.loginButton = page.locator('.customer-login-link');
    this.shoppingCartIcon = page.locator('.showcart');
    this.shoppingCartCounter = page.locator('.counter-number');
    this.checkoutButton = page.locator('#top-cart-btn-checkout');
    this.viewCartButton = page.locator('.block-actions');
  }

  async getCartCounter() {
    const cartCounter = await this.shoppingCartCounter.innerText();
    return cartCounter;
  }

  async goToCheckout() {
    await this.shoppingCartIcon.click();
    await this.checkoutButton.isVisible();
    await this.checkoutButton.click();
  }

  async viewCart() {
    await this.shoppingCartIcon.click();
    await this.viewCartButton.isVisible();
    await this.viewCartButton.click();
  }
};
