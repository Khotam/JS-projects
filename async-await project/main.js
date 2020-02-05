const axios = require('axios');

const rateURL =
  'http://data.fixer.io/api/latest?access_key=f68b13604ac8e570a00f7d8fe7f25e1b&format=1';
const countriesURL = 'https://restcountries.eu/rest/v2/currency/${currencyCode}';

// 1. getExchangeRate
const getExchangeRate = async (fromCurrency, toCurrency) => {
  try {
    const response = await axios.get(rateURL);
    const rates = response.data.rates;
    const exchangeRate = rates[toCurrency] / rates[fromCurrency];
    return exchangeRate;
  } catch (error) {
    console.log(error);
  }
};

// 2. getCountries

const getCountries = async currencyCode => {
  try {
    const countries = await axios.get(`https://restcountries.eu/rest/v2/currency/${currencyCode}`);
    return countries.data.map(country => {
      return country.name;
    });
  } catch (error) {
    console.log(error);
  }
};

// 3. Convert Currency
const convertCurrency = async (fromCurrency, toCurrency, amount) => {
  let exchangeRate;
  let countries;

  await Promise.all([getExchangeRate(fromCurrency, toCurrency), getCountries(toCurrency)]).then(
    ([exchangeRateValue, countriesValue]) => {
      exchangeRate = exchangeRateValue;
      countries = countriesValue;
    }
  );

  const convertedAmount = (amount * exchangeRate).toFixed(2);

  return `${amount} ${fromCurrency} is worth ${convertedAmount} ${toCurrency}. You can spend converted money in the following countries: ${countries}`;
};

convertCurrency('USD', 'UZS', 10)
  .then(msg => console.log(msg))
  .catch(error => console.log(error.message));
