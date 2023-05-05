exports.HomePage = class HomePage {
  constructor(page) {
    this.page = page;
    this.nextBannerButton = page.locator('.ambanner-arrow-button.-next');
    this.previuosBannerButton = page.locator('.ambanner-arrow-button.-prev');
    this.ourSolutionsWatchMoreButton = page.locator('css=.slick-active .our-solutions_content_link');
    this.salesWatchMoreButton = page.locator('.salesBig-lists_content__link');
    this.BestsellersNextItemButton = page.locator('//*[strong="Bestsellers of the week"]/ancestor::div[@id="amasty-shopby-product-list"]//ol/button[@class="slick-next icon-arrow-next slick-arrow"]');
  }

  async chooseCategory(category) {
    await this.page.locator(`//a/span[text()="${category}"]`).click();
  }

  async nextBanner() {
    await this.nextBannerButton.click();
    await this.nextBannerButton.toBeVisible();
  }
};
