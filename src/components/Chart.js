import { Component } from "react";
import axios from "axios";
import Chart from "chart.js/auto";

class ChartComponent extends Component {
  state = {
    stockPrices: [],
  };

  componentDidMount = () => {
    axios
      .get(
        `https://www.alphavantage.co/query?function=TIME_SERIES_DAILY&symbol=MSFT&apikey=demo`
      )
      .then((response) => {
        console.log(response);

        const prices = response.data[`Time Series (Daily)`];

        for (let key in prices) {
          prices[key] = prices[key][`4. close`];
        }

        this.setState({ stockPrices: { ...prices } });
      })
      .catch((err) => {
        console.log(err);
      });
  };

  componentDidUpdate = () => {
    const chart = new Chart(document.getElementById("myChart"), {
      type: "line",
      data: {
        labels: Object.keys(this.state.stockPrices),
        datasets: [
          {
            label: "Preço de fechamento $MSFT",
            backgroundColor: "rgba(235, 99, 132, 0.3)",
            borderColor: "rgb(255, 99, 132)",
            data: Object.values(this.state.stockPrices),
            fill: true,
          },
        ],
      },
    });
  };
  render() {
    return (
      <div>
        <canvas id="myChart"></canvas>
      </div>
    );
  }
}

export default ChartComponent;
