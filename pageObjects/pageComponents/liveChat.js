exports.LiveChat = class LiveChat {
  constructor(page) {
    this.page = page;
    this.chatWidgetMinimized = page.locator('#chat-widget-minimized');
    this.chatWidgetMaximized = page.locator('.lc-q6m7l2-appear-done');
    this.messageButton = page.locator('.esv0owm2');
  }
};
