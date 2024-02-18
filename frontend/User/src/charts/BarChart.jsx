import React from "react";
import { Bar } from "react-chartjs-2";
import { Chart as ChartJS } from "chart.js/auto";

const BarChart = ({ chartData }) => {
  const options = {
    scales: {
      y: {
        ticks: {
          stepSize: 4,
          beginAtZero: true,
        },
      },
    },
  };
  return <Bar data={chartData} options={options}/>;
};

export default BarChart;
