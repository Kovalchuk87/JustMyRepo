const { test, expect } = require('@playwright/test');
const { ContactUS } = require('../pageObjects/contactUS');
const { Header } = require('../pageObjects/pageComponents/header');
const { getUrlByEnv } = require('../helpers/urls');

test.describe('Contact us form', async () => {
  const url = await getUrlByEnv();
  test('Contact us form should proceed to success message', async ({ page }) => {
    const contactUS = new ContactUS(page);
    const header = new Header(page);
    await page.goto(url);
    await header.contactUsButton.click();
    await page.waitForLoadState('networkidle');
    await contactUS.sendContactMessage('Alessandro TestUser', 'aaa@aa.aa', '+0000000001', 'This  message was created by automated test!');
    await expect(contactUS.successMessage).toBeVisible();
  });
});
