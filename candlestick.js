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

// round up the above min and max grid markers so that we can use that number for plotting the grid.
// rounded to the nearest 5th.
let gridMin = Math.round(min/5) * 5;
let gridMax = Math.round(max/5) * 5;

// Now that we are able to estimate the height of the Y axis via the max and min price markers, we want to determine the width of the X axis.
// TODO: determine the width of X axis. This should be easier since we want a fixed width able to accomodate for a 100 data points of a daily chart. If each candle bar width is probably 5px, and the gap between each candle is x then we multiply 100 into 5+x to get the canvas.width. If there isn't enough data, then the chart should have a minimum of 600px.

// Once we have a width and a height for our grid, let's plot them + mark the legends. Make sure that we have access to data by now, because the grid size will be hard to determine without max and min prices within a 100 days.
// TODO: plot the grid and grid markers. 

// Now that we have a grid that can comfortably accomodate our candlesticks, we want to actually plot the data.
// TODO: create a function that can plot the entire data (100 points max). This will require not only figuring out how to determine the sizes of the rectangles but also the position on the grid. It will also need to plot the H and L for each candle too. Figure out the functions for creating the rectangles, and then creating the HL wicks.