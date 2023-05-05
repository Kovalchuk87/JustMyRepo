exports.SearchResultPage = class SearchResultPage {
  constructor(page) {
    this.page = page;
    this.searchResultList = page.locator('#amasty-shopby-product-list li');
    this.searchResultTitle = page.locator('.base');
    this.itemsFoundedCounter = page.locator('.toolbar-number');
  }

  async getItemsFoundedCounter() {
    const element = await this.itemsFoundedCounter;
    const text = await element.textContent(element);
    const counter = parseInt(text);
    return counter;
  }

  async countItemsInSearchResult() {
    const items = await this.searchResultList.count();
    return items;
  }
};
