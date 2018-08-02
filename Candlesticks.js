class Candlesticks {
  constructor(options) {
    // options to receive in form of an object. See below for example.
    this.options = options;
    this.canvas = options.canvas;
    this.ctx = this.canvas.getContext("2d");
    this.timeSeries = options.data["Time Series (Daily)"];
    this.scale = options.gridScale;
    this.properties = Object.values(this.timeSeries);

    // create an array of properties from timeSeries
    this.arrOfAllPrices = array => {
      const output = [];
      for (let i = 0; i < array.length; i++) {
        for (let price in array[i]) {
          // we don't want to include volume data
          if (price !== "volume") {
            output.push(array[i][price]);
          }
        }
      }
      return output;
    };

    // helper function for drawing a line on canvas.
    this.drawLine = (ctx, startX, startY, endX, endY, color) => {
      this.ctx.save();
      this.ctx.strokeStyle = color;
      this.ctx.beginPath();
      this.ctx.moveTo(startX, startY);
      this.ctx.lineTo(endX, endY);
      this.ctx.stroke();
      this.ctx.restore();
    };
  }

  draw() {
    const prices = this.arrOfAllPrices(this.properties);
    // determine Maximum value of price on Y axis:
    // We want the lowest/highest price from our list of prices first:
    let min = Math.min(...prices);
    let max = Math.max(...prices);
    // round up the above min and max grid markers so that we can use that number for plotting our grid.
    // rounded to the nearest determined scale.
    let gridMin = Math.round(min / this.scale) * this.scale;
    let gridMax = Math.round(max / this.scale) * this.scale;
    
    const canvasActualHeight = this.canvas.height - this.options.padding * 2;
    const canvasActualWidth = this.canvas.width - this.options.padding * 2;

    // draw a grid
    let axisInterval = (gridMax - gridMin) / this.scale;
    let gridValue = gridMin;
    let counter = 0;
    while (gridValue <= gridMax) {
      let gridY =
        canvasActualHeight * (1 - (counter / axisInterval)) + this.options.padding;
      this.drawLine(
        this.ctx,
        0,
        gridY,
        this.canvas.width,
        gridY,
        this.options.gridColor
      );

      //writing grid markers
      this.ctx.save();
      this.ctx.fillStyle = this.options.gridColor;
      this.ctx.font = "bold 10px Arial";
      this.ctx.fillText(`${gridValue}.00`, 0, gridY - 2);
      this.ctx.restore();

      gridValue += this.options.gridScale;
      counter += 1;
    }
  }
}

// declare a variable with your HTML Canvas tag and set the dimensions:
let myCanvas = document.getElementById("stockChart");

myCanvas.width = 600;
myCanvas.height = 350;

// sample chart options:
const msftDaily = {
  canvas: myCanvas,
  padding: 10,
  gridScale: 5,
  gridColor: "grey",
  data: json
};

// how to instantiate a candlestick chart:
let myChart = new Candlesticks(msftDaily);
myChart.draw();