// originally by thmsgbrt
const puppeteer = require('puppeteer');
class PuppeteerService {
  browser;
  page;

  async init() {
    this.browser = await puppeteer.launch({
      args: [
        '--no-sandbox',
        '--disable-setuid-sandbox',
        '--disable-infobars',
        '--window-position=0,0',
        '--ignore-certifcate-errors',
        '--ignore-certifcate-errors-spki-list',
        '--incognito',
        '--proxy-server=http=194.67.37.90:3128',
        // TRY:
        '--user-agent="Mozilla/5.0 (Macintosh; Intel Mac OS X 10_12_6) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/65.0.3312.0 Safari/537.36"', //
      ],
      // headless: false,
    });
  }

  /**
   *
   * @param {string} url
   */
  async goToPage(url) {
    if (!this.browser) {
      await this.init();
    }
    this.page = await this.browser.newPage();

    await this.page.setExtraHTTPHeaders({
      'Accept-Language': 'en-US',
    });

    await this.page.goto(url, {
      waitUntil: `networkidle0`,
    });
  }

  async close() {
    await this.page.close();
    await this.browser.close();
  }

  /**
   *
   * @param {string} acc Account to crawl
   * @param {number} n Qty of image to fetch
   */
  async getLatestInstagramPostsFromAccount(acc, n) {
    try {
// !!      const page = `https://dumpor.com/v/${acc}`;
// !!      const page = `https://www.picuki.com/profile/${acc}`;
// !!      await this.goToPage(page);
      const page = await context.newPage(); // !!
      await page.goto("https://www.picuki.com/profile/${acc}/", { // !!
        timeout: 80000, // !!
        }); // !!
 // !!      let previousHeight;

      console.log('acc', acc);
      console.log('page', page);

// !!      previousHeight = await this.page.evaluate(`document.body.scrollHeight`);
// !!      await this.page.evaluate(`window.scrollTo(0, document.body.scrollHeight)`);
      // 🔽 Doesn't seem to be needed
      // await this.page.waitForFunction(`document.body.scrollHeight > ${previousHeight}`);
      // await this.page.waitFor(1000);
      // !! In this version of the code, this.page.waitForSelector() is used
      // !! to wait for the .post-image selector to appear on the page before
      // !! executing this.page.evaluate(). Once the selector is found, the callback
      // !! function passed to this.page.evaluate() is executed to extract the src
      // !! attribute from each image element and return an array of image URLs.
      await page.waitForLoadState("networkidle"); // !!
      console.log("Loaded page!"); // !!
      console.log("Wait for images..."); // !!
      await page.waitForSelector(".post-image", { // !!
        state: "visible", // !!
      });
// !!      await this.page.waitForSelector('post-image');
// !!      const nodes = await this.page.evaluate(() => {
//        const images = document.querySelectorAll(`.content__img`);
// !!        const images = document.querySelectorAll(`post-image`);
     let images;
      const data = await page.evaluate(() => {
        const images: NodeListOf<HTMLImageElement> =
          document.querySelectorAll(".post-image");
        const urls = Array.from(images).map((img) => img.src);

        return urls.slice(0, 3);
      });
      console.log("Got images!");

      console.log("Closing Browser");
      await browser.close();

      return(data)
// !!        return [].map.call(images, img => img.src);
      });

// !!      console.log('nodes', nodes);

// !!      return nodes.slice(0, 3);
    } catch (error) {
      console.log('Error', error);
      process.exit();
    }
  }
}

const puppeteerService = new PuppeteerService();

module.exports = puppeteerService;
