var { URL_LIST } = require('../scrape_API/scrapeVariables')
module.exports  = async function(datatest) {
    var datareturned = {
        differentsitesandcolums :datatest.priceperurlday.length,
        sitesnames: [],
        itemname: datatest.itemname,
        wantedprice: datatest.wantedprice,
        columcount: [],
        chartlabel: [],
        columdata: []
    }
    for (var i=0;i<datatest.priceperurlday.length;i++){
      if(datatest.priceperurlday[i].url.indexOf(URL_LIST.book) == -1){
        datareturned.sitesnames.push(datatest.priceperurlday[i].url)
        datareturned.columcount.push(datatest.priceperurlday[i].priceonday.length)
        for(var j=0;j<datatest.priceperurlday[i].priceonday.length;j++){
            datareturned.chartlabel.push(datatest.priceperurlday[i].priceonday[j].date)
            datareturned.columdata.push(datatest.priceperurlday[i].priceonday[j].price)
        }
      } else if (datatest.priceperurlday[i].url.indexOf(URL_LIST.book) !== -1){
        datareturned.differentsitesandcolums = datareturned.differentsitesandcolums-1
      }
    }
    return(datareturned)
}