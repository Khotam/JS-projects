const rateURL =
  'http://data.fixer.io/api/latest?access_key=f68b13604ac8e570a00f7d8fe7f25e1b&format=1';

const swapBtn = document.querySelector('.swap');

const input = document.querySelector('.fromNumber');
const from = document.getElementById('from');
const to = document.getElementById('to');
const resultText = document.querySelector('.resultText');
const result = document.querySelector('.toNumber');

const selects = document.querySelectorAll('select');
const baseCurrency = document.querySelector('.fromNumber').getAttribute('value');

const fetchData = async () => {
  const promise = await fetch(rateURL);
  const data = await promise.json();
  //   console.log(data.rates);
  return data.rates;
};

const render = async obj => {
  for (currency in obj) {
    // if (currency === 'EUR') console.log(currency);
    // console.log(currency);
    const option = document.createElement('option');
    if (currency === 'USD') {
      option.setAttribute('selected', 'selected');
    }
    option.value = currency;
    option.textContent = currency;
    from.appendChild(option);
    to.innerHTML = from.innerHTML;
    // to.appendChild(option);
    // console.log(option);
  }
  document.querySelectorAll("option[value='USD']")[1].removeAttribute('selected');
  document.querySelectorAll("option[value='EUR']")[1].setAttribute('selected', 'selected');

  calculate(selects[0].value, selects[1].value, baseCurrency);
};

const foo = async () => {
  await Promise.all([fetchData()]).then(rates => {
    render(rates[0]);
  });
};

foo();

const calculate = async (from, to, amount) => {
  const ratesObj = await Promise.all([fetchData()]).then(rates => {
    return rates[0];
  });
  const rate = (ratesObj[to] / ratesObj[from]).toFixed(5);
  resultText.textContent = `1 ${from} = ${rate} ${to}`;

  const resultAmount = rate * parseFloat(amount);
  console.log(rate, amount);
  result.setAttribute('value', resultAmount);
  //   console.log(rate);
  //   console.log(from, to);
  //   console.log(ratesObj);
};

selects.forEach(select =>
  select.addEventListener('change', () => {
    calculate(selects[0].value, selects[1].value, baseCurrency);
  })
);

input.addEventListener('input', () => {
  input.setAttribute('value', input.value);
  console.log(input);
  calculate(selects[0].value, selects[1].value, input.value);
  console.log(result);
});

const swap = () => {
  const selects = document.querySelectorAll('select');

  const temp = selects[0].value;
  selects[0].value = selects[1].value;
  selects[1].value = temp;
  calculate(selects[0].value, selects[1].value, input.value);
};

swapBtn.addEventListener('click', swap);
