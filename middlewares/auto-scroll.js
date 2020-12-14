async function scrollToBottom(page) {
    const distance = 1000; // should be less than or equal to window.innerHeight
    const delay = 3000;
    while (await page.evaluate(() => document.scrollingElement.scrollTop + window.innerHeight < document.scrollingElement.scrollHeight)) {
      await page.evaluate((y) => { document.scrollingElement.scrollBy(0, y); }, distance);
      await page.waitFor(delay);
    }
  }

module.exports = scrollToBottom