const puppeteer = require('puppeteer');

//module.exports = { scrape: async function () { return await scraping(); } }
module.exports = async function(url) {
//let scrapebooks = async function (url){
   const browser = await puppeteer.launch({headless: true});
    const page = await browser.newPage();
    await page.goto(url);
    await page.click('#default > div > div > div > div > section > div:nth-child(2) > ol > li:nth-child(1) > article > div.image_container > a > img');
    await page.waitFor(1000);
    let result = await page.evaluate(() => {
        let title = document.querySelector('h1').innerText;
        let price = document.querySelector('.price_color').innerText;

        return {
            title,
            price
        }

    });
    browser.close();
    return result;

}

