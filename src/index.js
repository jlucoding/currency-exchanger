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

function displayDesiredCurrency(currencyExchangeRate, desiredCurrency){

  $(".showDesiredCurrency").html(`The conversion result to the desired currency is ${currencyExchangeRate} ${desiredCurrency}`);
}

function displayErrors(error) {
  $('.showErrors').text(`${error}`);
}


$(document).ready(function() {
  $('#getCurrencyRate').click(function() {
    let amountUSD = $("#amountUSD").val();
    let amountUSDInNum = parseFloat(amountUSD);
    let desiredCurrency = $("#desiredCurrency").val().toUpperCase();
    let unsupportedCurrencyErr = `The desired currency ${desiredCurrency} is currently not supported. Please choose a different one.`;

    clearFields();
    ExchangeRateService.getDesiredCurrency(desiredCurrency, amountUSDInNum)
      .then(function(response){
        if (response instanceof Error) {
          throw Error (`ExchangeRate API error: ${response.message}`);
        }
        
        const desiredCurrencyResponse = Math.round(response.conversion_result);

        if (!desiredCurrencyResponse) {
          displayErrors(unsupportedCurrencyErr);
        } else {
          displayDesiredCurrency(desiredCurrencyResponse, desiredCurrency);
        }
      })
      .catch(function(error){
        displayErrors(error.message);
      });
  });
});