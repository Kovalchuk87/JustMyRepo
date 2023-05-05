exports.Footer = class Footer {
  constructor(page) {
    this.page = page;
    this.footerLogo = page.locator('.left-container__logo');
    this.footerWhatsappButton = page.locator('');
    this.footerPhoneButton = page.locator('.left-container__social a[href^="https"]');
  }
};
