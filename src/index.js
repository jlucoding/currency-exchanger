import $ from 'jquery';
import 'bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import './css/styles.css';
import  ExchangeRateService  from './services/exchange-rate-service.js';


$(document).ready(function() {
  $('#form').submit(function(event) {
    event.preventDefault();
    
  });
});