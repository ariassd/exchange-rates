const axios = require("axios");
module.exports = {
  getExchange: async () => {
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
            statusCode: 200,
            exchangeCode: "0814",
            exchangeName: "COOPENAE",
            origin: url,
            buy: +buy,
            sell: +sell,
            date: new Date(),
          });
        })
        .catch((error) => {
          resolve({
            statusCode: 500,
            exchangeCode: "0814",
            exchangeName: "COOPENAE",
            origin: url,
            message: error.message,
          });
        });
    });
  },
};
