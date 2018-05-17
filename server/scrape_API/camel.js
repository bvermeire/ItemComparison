const puppeteer = require('puppeteer');

function getTitle() {
  if (document.querySelector('meta[property="og:title"]')) {
    return document.querySelector('meta[property="og:title"]').content;
  }
  if (document.querySelector('[itemprop="name"]')) {
    return document.querySelector('[itemprop="name"]').text;
  }
  if (document.querySelector('title')) {
    return document.querySelector('title').text;
  }
  return window.location.href; // Print URL as a fallback
}

module.exports = { run: async function () {
  const browser = await puppeteer.connect({
    browserWSEndpoint: 'wss://chrome.browserless.io'
  });
  const page = await browser.newPage();
  await page.goto('https://es.camelcamelcamel.com/Oneplus-5T-6GB-64GB-SnapdragonTM835/product/B07858T4JY');
  const title = await page.evaluate(getTitle);
  console.log(title);
  browser.close();
}
}