var { URL_LIST } = require('./scrapeVariables')
var bookscrape = require('./bookstoscrape')
var camelscrape = require('./camel')
var PriceOnDay = require("../models/priceonday");

module.exports = async function(url, itemInfo, i) {
    if (url.indexOf(URL_LIST.book) !== -1){
        test = await bookscrape(url)
        // console.log(test)
    } else if (url.indexOf(URL_LIST.camel) !== -1){
        const process = async (priceOnday, itemInfo) => {
            const camelresult = await camelscrape(url)
            // console.log('this should be price:'+ camelresult)
            // const camelresult = "319,00" //"1,329.05€"
            // convert resul to of . to nothing and , to .
            const camelresultUS = await usToEuCurrencyFormat(camelresult)    
            // assign to priceonday 
            // console.log(isNaN(camelresultUS))
            priceOnday.price = camelresultUS
            itemInfo.currentPrice = camelresultUS
            // console.log(isNaN(itemInfo.currentPrice))
            // push to item
            itemInfo.priceperurlday[i].priceonday.push(priceOnday)
            return camelresultUS
        }
        // to add result to item
        priceOnday = new PriceOnDay()
        await process(priceOnday, itemInfo)
        
        // check lowest price     
        await checkPrice(itemInfo)

        // save to database
        try {
            await itemInfo.save();
          } catch (err) {
            console.log(err)
        }
        

        // check if it is lowest price and modify

    }
}
async function usToEuCurrencyFormat(input) {
    return parseFloat(input.replace(/[,.]/g, function (x) { return x == "." ? "" : "."; })); 
}
async function checkPrice(itemInfo){
    if (itemInfo.lowestPrice > itemInfo.currentPrice ||itemInfo.lowestPrice==0){
        itemInfo.lowestPrice = itemInfo.currentPrice
    }
    return itemInfo
}
