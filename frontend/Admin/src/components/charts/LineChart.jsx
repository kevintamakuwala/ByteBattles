import React from "react";
import { Line } from "react-chartjs-2";
import { Chart as ChartJS } from "chart.js/auto";

const LineChart = ({ chartData }) => {
  const options = {
    scales: {
      x: {
        title: {
          display: true,
          text: "Contests",
        },
      },
      y: {
        title: {
          display: true,
          text: "Number of Users",
        },
        ticks: {
          stepSize: 1,
          beginAtZero: true,
        },
      },
    },
  };

  return <Line data={chartData} options={options} />;
};

export default LineChart;
