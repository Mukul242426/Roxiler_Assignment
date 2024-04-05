import React from 'react'
import styles from './Statistics.module.css'

function Statistics({selectedMonths,stats,month}) {
  return (
    <div className={styles.statistics_container}>
    <div className={styles.statistics}>
      <div className={styles.stats_heading}>
        Statistics -{" "}
        {
          selectedMonths.find((selectedMonth) => selectedMonth.id === month)
            .value
        }
      </div>
      <div className={styles.stats_box}>
        <div className={styles.sales}>
          Total Sales
          <div>
            {stats?.totalSales  ? (Number.isInteger(stats?.totalSales) ? stats?.totalSales: stats?.totalSales.toFixed(2)): "Loading.."}
          </div>
        </div>

        <div className={styles.sales}>
          Total Items Sold
          <div>{stats?.totalItemsSold ? stats?.totalItemsSold :'Loading..'}</div>
        </div>
        <div className={styles.sales}>
          Total Items Not Sold
          <div>{stats?.totalItemsUnSold ? stats?.totalItemsUnSold:'Loading..'}</div>
        </div>
      </div>
    </div>
  </div>
  )
}

export default Statistics
