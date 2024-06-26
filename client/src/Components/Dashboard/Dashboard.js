import React, { useEffect, useState } from "react";
import { FRONTEND_URL } from "../../utils/utils";
import axios from "axios";
import styles from "./Dashboard.module.css";
import Table from "../Table/Table";
import Statistics from "../Statistics/Statistics";
import Chart from "../Chart/Chart";
import {data} from '../../constants/data'

function Dashboard() {
  const [searchText, setSearchText] = useState("");
  const [month, setMonth] = useState(3);
  const [transactions, setTransactions] = useState({});
  const [stats, setStats] = useState({});
  const [barChartData, setBarChartData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const selectedMonths = data;

  useEffect(() => {
    const getData = async () => {
      try {
        const response = await axios.get(`${FRONTEND_URL}/transactions`, {
          params: { month, searchText, currentPage },
        });
        console.log(response);
        setTransactions(response.data);
      } catch (error) {
        console.log(error);
      }
    };
    getData();
  }, [month, searchText, currentPage]);

  useEffect(() => {
    const getCombinedData = async () => {
      try {
        const response = await axios.get(`${FRONTEND_URL}/all`, {
          params: { month },
        });
        console.log(response);
        setStats(response.data.results[0]);
        console.log("bar chart", response.data.results[1].results);
        setBarChartData(response.data.results[1].results);
      } catch (error) {
        console.log(error);
      }
    };
    getCombinedData();
  }, [month]);

  const handleMonth = (e) => {
    const selectedMonthName = e.target.value;
    const selectedMonth = selectedMonths.find(
      (month) => month.value === selectedMonthName
    );
    setMonth(selectedMonth.id);
    setCurrentPage(1);
  };

  return (
    <div className={styles.dashboard}>
      <div className={styles.dashboard_heading}>Transactions Dashboard</div>
      <div className={styles.search_container}>
        <input
          type="text"
          name="searchText"
          value={searchText}
          className={styles.input_box}
          onChange={(e) => setSearchText(e.target.value)}
          placeholder="Search Transaction"
        />
        <select
          onChange={handleMonth}
          value={
            selectedMonths.find((selectedMonth) => selectedMonth.id === month)
              .value
          }
          className={styles.dropdown}
        >
          <option value="" disabled>
            Select Month
          </option>
          {selectedMonths.map((selectedMonth) => (
            <option key={selectedMonth.id} value={selectedMonth.value}>
              {selectedMonth.value}
            </option>
          ))}
        </select>
      </div>
      <Table
        transactions={transactions}
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
      />
      <Statistics selectedMonths={selectedMonths} stats={stats} month={month} />
      <Chart
        selectedMonths={selectedMonths}
        month={month}
        barChartData={barChartData}
      />
    </div>
  );
}

export default Dashboard;
