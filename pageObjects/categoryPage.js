class CategoryPage {
  constructor(page) {
    this.page = page;
    this.pageTitle = page.locator('.base');
  }

  async chooseSubCategory(subCategory) {
    await this.page.locator(`//div[text()="${subCategory}"]`).click();
  }
}

module.exports = { CategoryPage };
