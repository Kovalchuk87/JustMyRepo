exports.ProductDetailsPage = class ProductDetailsPage {
  constructor(page) {
    this.page = page;
    this.sku = page.locator('.col-value');
    this.addToCartButton = page.locator('#product-addtocart-button');
  }

  async addProductToCart() {
    await this.page.waitForLoadState('networkidle');
    await this.addToCartButton.click();
  }
};
