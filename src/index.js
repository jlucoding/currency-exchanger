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

function displayDesiredCurrency(currencyExchangeRate, desiredCurrencyCap){
  $(".showDesiredCurrency").html(`The exchange rate to the desired currency is ${currencyExchangeRate} ${desiredCurrencyCap}`);
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
    ExchangeRateService.getDesiredCurrency(desiredCurrencyCap, amountUSDInNum)
      .then(function(response){
        if (response instanceof Error) {
          throw Error (`${response.message}`);
        }
        
        const desiredCurrencyResponse = Math.round(response.conversion_result);
        
        
        displayDesiredCurrency(desiredCurrencyResponse, desiredCurrencyCap);
      })
      .catch(function(error){
        displayErrors(error.message);
      });
  });
});