const axios = require("axios");
module.exports = {
  getExchange: async () => {
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
          resolve({
            statusCode: 500,
            exchangeCode: "0107",
            exchangeName: "BCT S.A.",
            origin: url,
            message: error.message,
          });
        });
    });
  },
};
