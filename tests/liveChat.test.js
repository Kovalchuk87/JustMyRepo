const { test, expect } = require('@playwright/test');
const { LiveChat } = require('../pageObjects/pageComponents/liveChat');
const { getUrlByEnv } = require('../helpers/urls');

test.describe('Live Chat', async () => {
  const url = await getUrlByEnv();
  test('should display minimized widget', async ({ page }) => {
    const liveChat = new LiveChat(page);
    await page.goto(url);
    await page.waitForLoadState('networkidle');
    await expect(liveChat.chatWidgetMinimized).toBeVisible;
  });

  // Тест падает потому что баг.
  test('should display maximized widget after click', async ({ page }) => {
    const liveChat = new LiveChat(page);
    await page.goto(url);
    await page.waitForLoadState('networkidle');
    await liveChat.chatWidgetMinimized.click();
    await expect(liveChat.messageButton).toBeVisible;
  });
});
