import express from 'express'
import {getTransactions, initialiseDatabase,getStatistics, getBarChartData} from '../controllers/productController.js'

const router=express.Router()

router.get('/initialise',initialiseDatabase)
router.get('/transactions',getTransactions)
router.get('/statistics',getStatistics)
router.get('/chart/bar',getBarChartData)

export default router;