import React from 'react'
import styles from './Table.module.css'
import toast from 'react-hot-toast'


function Table({transactions,currentPage,setCurrentPage}) {

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
                <td colSpan="7">No transactions found</td>
            </tr>
           ):(transactions?.transactions?.map((transaction, index) => (
          <tr key={transaction?.id} className={styles.transaction_analysis}>
            <td>{transaction?.id}</td>
            <td className={styles.scrollable}>{transaction?.title}</td>
            <td className={styles.scrollable}>
              {transaction?.description}
            </td>
            <td>{transaction?.price ? (Number.isInteger(transaction?.price) ? transaction?.price : transaction?.price?.toFixed(2)):''}</td>
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
  )
}

export default Table
