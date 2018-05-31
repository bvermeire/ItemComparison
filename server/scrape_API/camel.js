const puppeteer = require('puppeteer');

//module.exports = { scrape: async function () { return await scraping(); } }
module.exports = async function(url) {
//let scrapebooks = async function (url){
   const browser = await puppeteer.launch({headless: true});
    const page = await browser.newPage();
    await page.goto(url);
    await page.waitFor(2000);
    await page.click('#qcCmpButtons > button');
    await page.waitFor(4000);
    let result = await page.evaluate(extractSpan);
    browser.close();
    return result[2];

}

function extractSpan() {
    const extractedElements = document.querySelectorAll('span');
    const items = [];
    for (let element of extractedElements) {
      items.push(element.innerText);
    }
    return items;
  }
