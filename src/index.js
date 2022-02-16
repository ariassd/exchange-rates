#!/usr/bin/env node
"use strict";

const axios = require("axios");
const argv = require("minimist")(process.argv.slice(2));

// bank codes
// https://www.bccr.fi.cr/sistema-de-pagos/informaci%C3%B3n-general/participantes
async function main() {
  const available = ["coopenae", "bct"];
  const query = argv.ex || "";
  // console.log("query", query);
  let exchangeRates = [];
  for (const exch of available) {
    if (exch.includes(query)) {
      exchangeRates.push(await exchanges[exch]());
    }
  }

  console.log(JSON.stringify(exchangeRates));
}

const exchanges = {
  coopenae: async () => {
    return new Promise((resolve, reject) => {
      const url = "https://www.coopenae.cr/coopenae_virtual/TC.aspx";
      axios
        .get(url)
        .then((res) => {
          // console.log(`statusCode: ${res.status}`);
          let html = res.data;

          const buyTemplate =
            /<span id="lbl_compraR" style=".*">(.*?)<\/span>/g;
          const buyValues = buyTemplate.exec(html);
          const buy = buyValues[1];

          const sellTemplate =
            /<span id="lbl_ventaR" style=".*">(.*?)<\/span>/g;
          const sellValues = sellTemplate.exec(html);
          const sell = sellValues[1];

          resolve({
            exchangeCode: "0814",
            exchangeName: "COOPENAE",
            origin: url,
            buy: +buy,
            sell: +sell,
            date: new Date(),
          });
        })
        .catch((error) => {
          reject(error);
        });
    });
  },

  bct: async () => {
    return new Promise((resolve, reject) => {
      const url =
        "https://app001.corporacionbct.com/Tailored.ICBanking.WebApi/api/framework/common/exchangeRates";
      axios
        .get(url)
        .then((res) => {
          const {
            sourceCurrency,
            destinationCurrency,
            official,
            ...exchangeRate
          } = res.data[0];

          resolve({
            exchangeCode: "0107",
            exchangeName: "BCT S.A.",
            origin: url,
            buy: +exchangeRate.buyRate,
            sell: +exchangeRate.sellRate,
            date: new Date(),
          });
        })
        .catch((error) => {
          reject(error);
        });
    });
  },
};

main();
