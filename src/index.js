#!/usr/bin/env node
"use strict";
const argv = require("minimist")(process.argv.slice(2));
// bank codes
// https://www.bccr.fi.cr/sistema-de-pagos/informaci%C3%B3n-general/participantes
async function main() {
  const available = ["coopenae", "bct", "bcr"];
  const query = argv.ex || "";
  // console.log("query", query);
  let exchangeRates = [];
  for (const exch of available) {
    if (exch.includes(query)) {
      exchangeRates.push(await exchanges[exch]());
    }
  }

  console.log(JSON.stringify(exchangeRates, undefined, " "));
}

const exchanges = {
  coopenae: require("./modules/coopenae").getExchange,
  bct: require("./modules/bct").getExchange,
  bcr: require("./modules/bcr").getExchange,
};

main();
