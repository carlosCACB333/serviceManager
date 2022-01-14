import { ChartOptions } from "chart.js";

export const charOption: ChartOptions = {
  responsive: true,

  maintainAspectRatio: true,
  plugins: {
    legend: {
      display: false,
    },
  },
  interaction: {
    intersect: true,
    mode: "index",
  },

  //   scales: {
  //     y: {
  //       grid: {
  //         drawBorder: false,
  //         display: true,
  //         drawOnChartArea: true,
  //         drawTicks: false,
  //         borderDash: [5, 10],
  //       },
  //       ticks: {
  //         display: true,
  //         padding: 15,
  //         font: {
  //           weight: "bold",
  //           style: "normal",
  //           lineHeight: 1,
  //         },
  //       },
  //     },
  //     x: {
  //       grid: {
  //         drawBorder: false,
  //         display: false,
  //         drawOnChartArea: false,
  //         drawTicks: false,
  //         borderDash: [5, 5],
  //       },
  //       ticks: {
  //         display: true,
  //         color: "#b2b9bf",
  //         padding: 15,
  //         font: {
  //           weight: "bold",
  //           style: "normal",
  //           lineHeight: 2,
  //         },
  //       },
  //     },
  //   },
};

export const monthLabel = [
  "Enero",
  "Febrero",
  "Marzo",
  "Abril",
  "Mayo",
  "Junio",
  "Julio",
  "Agosto",
  "Setiembre",
  "Octubre",
  "Noviembre",
  "Diciembre",
];
