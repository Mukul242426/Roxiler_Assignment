import express from 'express'
import {getTransactions, initialiseDatabase} from '../controllers/productController.js'

const router=express.Router()

router.get('/initialise',initialiseDatabase)
router.get('/transactions',getTransactions)

export default router;