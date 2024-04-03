import { AppError } from "../utils/appError.js";
import { Product } from "../models/productModel.js";
import axios from "axios";

export const initialiseDatabase = async (req, res, next) => {
  try {
    const response = await axios.get(
      "https://s3.amazonaws.com/roxiler.com/product_transaction.json"
    );
    console.log(response);

    await Product.insertMany(response.data);
    res.status(200).json({
      success: true,
      message: "Database initialised successfully",
    });
  } catch (error) {
    console.log(error);
    next(AppError(error.message, 404));
  }
};

export const getTransactions = async (req, res, next) => {
  const month = parseInt(req.query.month);
  const { searchText } = req.query;
  const { currentPage = 1 } = req.query;
  const searchPrice = parseFloat(searchText);
  console.log(currentPage);

  try {
    let transactions;
    const pattern =
      month < 10 ? `-${month.toString().padStart(2, "0")}-` : `-${month}-`;
    const query = {
      dateOfSale: { $regex: pattern },
    };
    if (searchText) {
      if (isNaN(searchPrice)) {
        query["$or"] = [
          { title: { $regex: searchText, $options: "i" } },
          { description: { $regex: searchText, $options: "i" } },
        ];
      } else {
        query["price"] = searchPrice;
      }
      console.log(query);
      transactions = await Product.find(query);
    } else {
      console.log(query);
      transactions = await Product.find(query)
        .skip((currentPage - 1) * 10)
        .limit(10);
    }
    res.status(200).json({
      success: true,
      message: "transactions fetched successfully",
      transactions,
    });
  } catch (error) {
    console.log(error);
    next(AppError(error.message, 400));
  }
};

export const getStatistics = async (req, res, next) => {
  const month = parseInt(req.query.month);
  const pattern =
    month < 10 ? `-${month.toString().padStart(2, "0")}-` : `-${month}-`;

  try {
    const transactions = await Product.find({
      dateOfSale: { $regex: pattern },
    });
    let totalSales = 0;
    let totalItemsSold = 0;
    let totalItemsUnSold = 0;

    transactions.forEach((transaction) => {
      totalSales += transaction.sold ? transaction.price : 0;
      totalItemsSold = transaction.sold
        ? totalItemsSold + 1
        : totalItemsSold + 0;
      totalItemsUnSold = transaction.sold
        ? totalItemsUnSold + 0
        : totalItemsUnSold + 1;
    });
    return res.status(200).json({
      success: true,
      message: "statistics fetched successfully",
      totalSales,
      totalItemsSold,
      totalItemsUnSold,
    });
  } catch (error) {
    console.log(error);
    next(AppError(error.message, 404));
  }
};

export const getBarChartData = async (req, res, next) => {
  const month = parseInt(req.query.month);
  const pattern =
    month < 10 ? `-${month.toString().padStart(2, "0")}` : `-${month}-`;

  const priceRanges = [
    { min: 0, max: 100 },
    { min: 101, max: 200 },
    { min: 201, max: 300 },
    { min: 301, max: 400 },
    { min: 401, max: 500 },
    { min: 501, max: 600 },
    { min: 601, max: 700 },
    { min: 701, max: 800 },
    { min: 801, max: 900 },
    { min: 901, max: Infinity },
  ];

  try {
    let results = [];

      for(const range of priceRanges){
      const count = await Product.countDocuments({
        dateOfSale: { $regex: pattern },
        price: { $gte: range.min, $lte: range.max },
      });
      results.push({
        min: range.min,
        max: range.max,
        products: count,
      });
    };
    console.log(results)
    res.status(200).json({
      success: true,
      message: "Bar chart data fetched successfully",
      results
    });
  } catch (error) {
    console.log(error);
    next(AppError(error.message, 404));
  }
};
