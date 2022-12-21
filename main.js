// Get the form element and the converted amount element
const form = document.querySelector('form');
const convertedAmount = document.querySelector('#convertedAmount');

// Add an event listener to the form's submit event
form.addEventListener('submit', (event) => {
  // Prevent the form from submitting
  event.preventDefault();

  // Get the amount and currency codes from the form
  const amount = document.querySelector('#amount').value;
  const fromCurrency = document.querySelector('#from').value;
  const toCurrency = document.querySelector('#to').value;

  fetch('https://api.exchangerate.host/latest?base=' + fromCurrency)
  .then((response) => {
    // Convert the response to JSON
    return response.json();
  })
  .then((data) => {
    // Calculate the converted amount
    const rate = data.rates[toCurrency];
    const converted = amount * rate;
    // Update the converted amount element with the result
    convertedAmount.textContent = converted.toFixed(2);
  })
  .catch((error) => {
    // Handle any errors that may occur
    console.error(error);
    convertedAmount.textContent = 'An error occurred';
  });

});


// Get the from and to select elements
const fromSelect = document.querySelector('#from');
const toSelect = document.querySelector('#to');

// Make an API call to get the list of currencies
fetch('https://api.exchangerate.host/symbols')
  .then((response) => {
    // Convert the response to JSON
    return response.json();
  })
  .then((data) => {
    // Get the list of currency codes
    const currencies = data.symbols;
    // console.log(currencies)
    // Create an option element for each currency code
    for (const code in currencies) {
        console.log(code)
      const option = document.createElement('option');
      option.value = code;
      option.textContent = code;
      // Add the option element to the from and to select elements
      fromSelect.appendChild(option.cloneNode(true));
      toSelect.appendChild(option.cloneNode(true));
    }
  })
  .catch((error) => {
    // Handle any errors that may occur
    console.error(error);
  });


// // Get the from and to select elements
// const fromSelect = document.querySelector('#from');
// const toSelect = document.querySelector('#to');

// // Make an API call to get the list of currencies
// fetch('https://api.exchangerate.host/currencies')
//   .then((response) => {
//     // Convert the response to JSON
//     return response.json();
//   })
//   .then((data) => {
//     // Get the list of currency codes
//     const currencies = data.currencies;
//     // Create an option element for each currency code
//     for (const code in currencies) {
//       const option = document.createElement('option');
//       option.value = code;
//       option.textContent = currencies[code];
//       // Add the option element to the from and to select elements
//       fromSelect.appendChild(option.cloneNode(true));
//       toSelect.appendChild(option.cloneNode(true));
//     }
//   })
//   .catch((error) => {
//     // Handle any errors that may occur
//     console.error(error);
//   });
