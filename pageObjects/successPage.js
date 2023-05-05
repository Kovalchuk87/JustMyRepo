exports.SuccessPage = class SuccessPage {
  constructor(page) {
    this.page = page;
    this.pageTitle = page.locator('.base');
    this.orderNumber = page.locator('.success-messages p span').first();
    this.shippingAdress = page.locator('.box-order-shipping-address .box-content address');
    this.billingAdress = page.locator('.box-order-billing-address .box-content address');
    this.returnToShopButton = page.locator('.continue');
  }
};
