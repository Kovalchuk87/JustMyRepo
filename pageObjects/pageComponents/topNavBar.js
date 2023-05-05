class TopNavBar {
  constructor(page) {
    this.page = page;
  }

  mainMenuTab(tabName) {
    return this.page.locator(`//*[text()='${tabName}']//ancestor::a[@class='ammenu-link']`);
  }

  mainMenuItem(itemName) {
    return this.page.locator(`//div[@class='ammenu-text-block']/*[text()='${itemName}']`);
  }

  async goToProductListingPage(tabName, itemName) {
    await this.page.waitForLoadState('networkidle');
    await this.mainMenuTab(tabName).hover();
    await this.mainMenuItem(itemName).click();
  }
}

module.exports = { TopNavBar };
