exports.AddToCartPopup = class AddToCartPopup {
  constructor(page) {
    this.page = page;
    this.confirmBox = page.locator('div#confirmBox');
    this.successText = page.locator('span.title');
    this.goToCartButton = page.locator('.button.am-btn-right');
  }

  async goToCart() {
    await this.page.waitForLoadState('networkidle');
    await this.goToCartButton.click({ timeout: 5000 });
  }
};
