import React, { useEffect, useState } from "react";
import { FRONTEND_URL } from "../utils/utils";
import axios from "axios";
import styles from "./Dashboard.module.css";
import toast from 'react-hot-toast'

function Dashboard() {
  const [searchText, setSearchText] = useState("");
  const [month, setMonth] = useState(3);
  const [transactions, setTransactions] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const selectedMonths = [
    {
      id: 1,
      value: "January",
    },
    {
      id: 2,
      value: "February",
    },
    {
      id: 3,
      value: "March",
    },
    {
      id: 4,
      value: "April",
    },
    {
      id: 5,
      value: "May",
    },
    {
      id: 6,
      value: "June",
    },
    {
      id: 7,
      value: "July",
    },
    {
      id: 8,
      value: "August",
    },
    {
      id: 9,
      value: "September",
    },
    {
      id: 10,
      value: "October",
    },
    {
      id: 11,
      value: "November",
    },
    {
      id: 12,
      value: "December",
    },
  ];

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

  const handleMonth = (e) => {
    const selectedMonthName = e.target.value;
    const selectedMonth = selectedMonths.find(
      (month) => month.value === selectedMonthName
    );
    setMonth(selectedMonth.id);
    setCurrentPage(1);
  };

  const handlePrevious=()=>{
    if(currentPage>1){
        setCurrentPage(currentPage-1)
    }
    else{
        toast.error('This is the first page')
    }

  }

  const handleNext=()=>{
    console.log(transactions?.totalPages)
    if(currentPage<transactions?.totalPages){
        setCurrentPage(currentPage+1);
    }
    else{
        toast.error('This is the last page')
    }
  }

  return (
    <div className={styles.dashboard}>
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
      <div className={styles.table_container}>
        <table className={styles.analysis_table}>
          <thead>
            <tr className={styles.table_heading}>
              <th>Id</th>
              <th>Title</th>
              <th>Description</th>
              <th>Price</th>
              <th>Category</th>
              <th>Sold</th>
              <th>Image</th>
            </tr>
          </thead>
          <tbody>
            {transactions?.transactions?.length===0 ? (
                <tr className={styles.no_transactions} style={{textAlign:"center"}}>
                    <td colspan="7">No transactions found</td>
                </tr>
               ):(transactions?.transactions?.map((transaction, index) => (
              <tr key={transaction?.id} className={styles.transaction_analysis}>
                <td>{transaction?.id}</td>
                <td className={styles.scrollable}>{transaction?.title}</td>
                <td className={styles.scrollable}>
                  {transaction?.description}
                </td>
                <td>{transaction?.price}</td>
                <td>{transaction?.category}</td>
                <td>{transaction?.sold ? "Yes" : "No"}</td>
                <td>
                  <img
                    src={transaction?.image}
                    alt="product"
                    className={styles.product_pic}
                  />
                </td>
              </tr>)
            ))}
          </tbody>
        </table>
        <div className={styles.table_footer}>
          <div>Page No: {currentPage}</div>
          <div className={styles.btns}>
            <div className={styles.previous} onClick={handlePrevious}>Previous</div>
            <div>-</div>
            <div className={styles.next} onClick={handleNext}>Next</div>
          </div>
          <div>Per Page: 10</div>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
