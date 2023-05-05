exports.CheckoutPage = class CheckoutPage {
  constructor(page) {
    this.page = page;
    this.companyRadiobutton = page.locator('.label-type-client__name').first();
    this.privatePersonRadiobutton = page.locator('.label-type-client__name').last();

    this.emailField = page.locator('.amcheckout-wrapper .input-text[name="username"]');
    this.createAccountCheckbox = page.locator('.toggle-create-account');
    this.nameField = page.locator('.input-text[name="firstname"]').first();
    this.surnameField = page.locator('.input-text[name="lastname"]').first();
    this.streetField = page.locator('.input-text[name="street[0]"]').first();
    this.houseNumberField = page.locator('.input-text[name="street[1]"]').first();
    this.postcodeField = page.locator('.input-text[name="postcode"]').first();
    this.phoneField = page.locator('.input-text[name="telephone"]').first();
    this.cityField = page.locator('.input-text[name="city"]').first();
    this.mastercardPaymentRBtn = page.locator('.label[for="multisafepay_mastercard"]');
    this.maestroPaymentRBtn = page.locator('.label[for="multisafepay_maestro"]');
    this.visaPaymentRBtn = page.locator('.label[for="multisafepay_visa"]');
    this.idealPaymentRBtn = page.locator('.label[for="multisafepay_ideal"]');
    this.bancontactPaymentRBtn = page.locator('.label[for="multisafepay_bancontact"]');
    this.sofortPaymentRBtn = page.locator('.label[for="multisafepay_sofort"]');
    this.kbcPaymentRBtn = page.locator('.label[for="multisafepay_kbc"]');
    this.cbcPaymentRBtn = page.locator('.label[for="multisafepay_cbc"]');
    this.bankTransferPaymentRBtn = page.locator('.label[for="banktransfer"]');
    this.payPalPaymentRBtn = page.locator('.label[for="paypal_express"]');

    this.acceptTermsCheckbox = page.locator('.label[for="agreement__1"]');
    this.confirmOrderButton = page.locator('.action.primary.checkout.amasty');

    this.termsButton = page.locator('.action-show');
  }

  async fillPrivatePersonCheckoutForm(email, name, surname, street, houseNumber, postcode, phone, city) {
    await this.emailField.type(email, { delay: 100 });
    await this.nameField.isEditable();
    await this.nameField.type(name, { delay: 100 });
    await this.surnameField.type(surname, { delay: 100 });
    await this.streetField.type(street, { delay: 100 });
    await this.houseNumberField.type(houseNumber, { delay: 100 });
    await this.postcodeField.type(postcode, { delay: 100 });
    await this.phoneField.type(phone, { delay: 100 });
    await this.cityField.type(city, { delay: 100 });
  }
};
