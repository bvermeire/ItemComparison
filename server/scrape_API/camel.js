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
    // console.log('result 0 is: ' + result[0])
    // console.log('result 1 is: ' + result[1])
    // console.log('result 2 is: ' + result[2])
    // console.log('result 3 is: ' + result[3])
    return result[3];

}

function extractSpan() {
    const extractedElements = document.querySelectorAll('span');
    const items = [];
    for (let element of extractedElements) {
      items.push(element.innerText);
    }
    return items;
  }
