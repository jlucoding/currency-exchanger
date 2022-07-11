export default class ExchangeRateService {
  static async getDesiredCurrency(desiredCurrency, amountUSDInNum) {
    return fetch(`https://v6.exchangerate-api.com/v6/${process.env.API_KEY}/pair/USD/${desiredCurrency}/${amountUSDInNum}`)
      .then(function (response) {
        if (!response.ok) {
          throw Error(response.statusText);
        }

        return response.json();
      })
      .catch(function (error) {
        return error.message;
      });
  }
}