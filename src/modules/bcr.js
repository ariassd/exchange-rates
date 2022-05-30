const axios = require("axios");
module.exports = {
  getExchange: async () => {
    return new Promise((resolve, reject) => {
      const url =
        "https://www.bancobcr.com/wps/proxy/http/bcrrestgen-app:24000/rest/api/v1/bcr-informativo/tipo-cambio/obtener/dolares";
      axios
        .get(url)
        .then((res) => {
          const data = res.data;
          resolve({
            statusCode: 200,
            exchangeCode: "0152",
            exchangeName: "BCR S.A.",
            origin: url,
            buy: +data.compra.substring(0, 6),
            sell: +data.venta.substring(0, 6),
            date: new Date(),
          });
        })
        .catch((error) => {
          resolve({
            statusCode: 500,
            exchangeCode: "0152",
            exchangeName: "BCR S.A.",
            origin: url,
            message: error.message,
          });
        });
    });
  },
};
