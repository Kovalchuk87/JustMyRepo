exports.ContactUS = class ContactUS {
  constructor(page) {
    this.page = page;
    this.nameField = page.locator('#name');
    this.emailField = page.locator('#email');
    this.phoneField = page.locator('#telephone');
    this.commentField = page.locator('#comment');
    this.submitButton = page.locator('.submit').first();
    this.successMessage = page.locator('.message-success');
  }

  async sendContactMessage(name, email, phone, comment) {
    await this.nameField.fill(name);
    await this.emailField.fill(email);
    await this.phoneField.fill(phone);
    await this.commentField.fill(comment);
    await this.submitButton.click();
  }
};
