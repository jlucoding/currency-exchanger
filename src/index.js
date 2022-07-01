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

function displayDesiredCurrency(desiredCurrency){
  $(".showDesiredCurrency").html(`The exchange rate from ${amountUSD} USD to the desired currency is ${desiredCurrency}`);
}

function displayErrors(error) {
  $('.showErrors').text(`${error}`);
}


$(document).ready(function() {
  $('#amountUSD').click(function() {
    let amountUSD = $("#amountUSD").val();
    let desiredCurrency = $("desiredCurrency").val();
    clearFields();
    ExchangeRateService.getDesiredCurrency(amountUSD)
      .then(function(response){
        if (response instanceof Error) {
          throw Error (`${response.message}`);
        }
        const desiredCurrencyResponse = response.conversion_rates[`${desiredCurrency}`];
        displayDesiredCurrency(desiredCurrencyResponse);
      })
      .catch(function(error){
        displayErrors(error.message);
      });
  });
});