// This file is a starting place for this project. It's not ready for use yet and will need more organization over time.


// sample json data of stock prices - based on an API demo from AlphaVantage.
const json = {
  "Time Series (Daily)": {
    "2018-06-25": {
      "open": "100.0000",
      "high": "100.1100",
      "low": "97.3000",
      "close": "98.3900",
      "volume": "35433333"
    },
    "2018-06-22": {
      "open": "100.4100",
      "high": "100.7700",
      "low": "99.6250",
      "close": "100.4100",
      "volume": "38923105"
    },
    "2018-06-21": {
      "open": "102.0750",
      "high": "102.4600",
      "low": "100.8800",
      "close": "101.1400",
      "volume": "23198188"
    },
    "2018-06-20": {
      "open": "101.3700",
      "high": "102.5200",
      "low": "101.1200",
      "close": "101.8700",
      "volume": "26180792"
    },
    "2018-06-19": {
      "open": "99.6500",
      "high": "101.0000",
      "low": "99.5000",
      "close": "100.8600",
      "volume": "28653087"
    },
    "2018-06-18": {
      "open": "100.0100",
      "high": "101.1100",
      "low": "99.4200",
      "close": "100.8600",
      "volume": "23586037"
    },
    "2018-06-15": {
      "open": "101.5100",
      "high": "101.5300",
      "low": "100.0700",
      "close": "100.1300",
      "volume": "65738585"
    }
  }
};

const timeSeries = json["Time Series (Daily)"]

// create an array of properties from timeSeries
let arr = Object.values(timeSeries);

// In order to work with the price data in an array of objects we have to create a function that takes in an array of objects, and returns an array of values from each element in that array's object.
let arrOfAllPrices = (array) => {
  const output = [];
  for (let i = 0; i < array.length; i++) {
    for (let price in array[i]) {
      // we don't want to include volume data
      if (price !== 'volume') {
        output.push(array[i][price]);
      }
    }
  }
  return output;
};

// the following attempt of a method failed due to producing an array of arrays (since Object.values() produces an array of its own.) If you can produce a more efficient way of producing the result from the above function, that's handy.

// const valuesArray = arr.map((obj) => {
//   let values = Object.values(obj);
//   return values;
// });

// make sure to store the array for use in min/max functions.
const arrayOfProperties = arrOfAllPrices(arr);

// We want the lowest price for our lowest grid marker.
let min = Math.min(...arrayOfProperties);

// We want the highest price available in our data for the appropriate grid height.
let max = Math.max(...arrayOfProperties);

console.log('minimum grid marker:', min);
console.log('maximum grid marker:', max);

// console.log('input array:', arr);
// console.log('values array:', arrOfAllPrices(arr));