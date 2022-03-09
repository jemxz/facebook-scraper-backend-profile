async function scrollToBottom(page) {
    const distance = 1000; // should be less than or equal to window.innerHeight
    const delay = 3000;
    const duration = 20000
    let startTime
    while (await page.evaluate(() => document.scrollingElement.scrollTop + window.innerHeight < document.scrollingElement.scrollHeight)) {
      if(!startTime){
        // Called for the first time
        startTime= Date.now()
      } else if (Date.now() - startTime > duration) {
        // Stop condition, Have duration passed 
        startTime = null;
        return;
      }
      await page.evaluate((y) => { document.scrollingElement.scrollBy(0, y); }, distance);
      await page.waitFor(delay);
    }
  }

module.exports = scrollToBottom