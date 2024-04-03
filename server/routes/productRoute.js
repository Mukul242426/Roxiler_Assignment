import express from 'express'
import {getTransactions, initialiseDatabase,getStatistics, getBarChartData, getPieChartData, getCombinedData} from '../controllers/productController.js'

const router=express.Router()

router.get('/initialise',initialiseDatabase)
router.get('/transactions',getTransactions)
router.get('/statistics',getStatistics)
router.get('/chart/bar',getBarChartData)
router.get('/chart/pie',getPieChartData)
router.get('/all',getCombinedData)

export default router;