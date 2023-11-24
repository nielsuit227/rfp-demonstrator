import React from "react";
import { Bar } from "react-chartjs-2";
import "chart.js/auto";

const MethodsBarChart = () => {
  // Generate hours labels
  const hours = Array.from({ length: 24 }, (_, i) => `${i}:00`);

  // Generate data and background colors
  const methodsData = [];
  const backgroundColors = [];

  for (let i = 0; i < 24; i++) {
    // Simulate error condition
    const isErrorHour = i === 8 || i === 17;
    const methodsCount = isErrorHour
      ? Math.random() * 50
      : Math.random() * 10 + 50;

    methodsData.push(methodsCount);
    backgroundColors.push(isErrorHour ? "red" : "#0F4879");
  }

  const data = {
    labels: hours,
    datasets: [
      {
        label: "Completed methods last 24h",
        data: methodsData,
        backgroundColor: backgroundColors,
      },
    ],
  };

  const options = {
    maintainAspectRatio: false,
    aspectRatio: 1.5,
    scales: {
      x: {
        title: {
          display: true,
          text: "Time",
        },
      },
      y: {
        beginAtZero: true,
        title: {
          display: true,
          text: "Completed Methods",
        },
      },
    },
  };

  return <Bar data={data} options={options} />;
};

export default MethodsBarChart;
