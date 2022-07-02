import $ from 'jquery';
import 'bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import './css/styles.css';
import  ExchangeRateService  from './services/exchange-rate-service.js';

function clearFields() {
  $("#amountUSD").val("");
  $("#desiredCurrency").val("");
  $('.showErrors').html("");
}

function displayDesiredCurrency(desiredCurrencyExchangeRate){
  $(".showDesiredCurrency").html(`The exchange rate to the desired currency is ${desiredCurrencyExchangeRate}`);
}

function displayErrors(error) {
  $('.showErrors').text(`${error}`);
}


$(document).ready(function() {
  $('#getCurrencyRate').click(function() {
    let amountUSD = $("#amountUSD").val();
    let amountUSDInNum = parseFloat(amountUSD);
    let desiredCurrency = $("#desiredCurrency").val();
    let desiredCurrencyCap = desiredCurrency.toUpperCase();
    clearFields();
    ExchangeRateService.getDesiredCurrency(desiredCurrency, amountUSD)
      .then(function(response){
        if (response instanceof Error) {
          throw Error (`${response.message}`);
        }
        const desiredCurrencyResponse = (response.conversion_rates[`${desiredCurrencyCap}`])* [`${amountUSDInNum}`];
        
        displayDesiredCurrency(desiredCurrencyResponse);
      })
      .catch(function(error){
        displayErrors(error.message);
      });
  });
});