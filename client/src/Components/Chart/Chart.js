import React, { useEffect } from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import styles from "./Chart.module.css";

function Chart({ selectedMonths, month, barChartData }) {
  const chartData = barChartData?.map((data) => ({
    range: `${data.min} - ${data.max !== null ? data.max : "9999999"}`,
    items: data.products,
  }));

  return (
    <div className={styles.charts_container}>
      <div className={styles.charts_heading}>
        Bar Chart Stats -{" "}
        {
          selectedMonths.find((selectedMonth) => selectedMonth.id === month)
            .value
        }
      </div>
      <ResponsiveContainer width="100%" height={400}>
        {barChartData.length === 0 ? (
          <div className={styles.loading}>Loading..</div>
        ) : (
          <BarChart
            width={500}
            height={300}
            data={chartData}
            margin={{
              top: 5,
              right: 30,
              left: 20,
              bottom: 5,
            }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="range" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar dataKey="items" fill="#8884d8" />
          </BarChart>
        )}
      </ResponsiveContainer>
    </div>
  );
}

export default Chart;
