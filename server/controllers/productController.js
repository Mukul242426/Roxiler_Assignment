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
  const { text } = req.query;
  const {currentPage}=req.query;

  try {
    const pattern =
      month < 10 ? `-${month.toString().padStart(2, "0")}-` : `-${month}-`;
    const query = { 
        dateOfSale: { $regex: pattern } };
    if (text) {
      query["$or"] = [
        { title: { $regex: text, $options: "i" } },
        { description: { $regex: text, $options: "i" } },
        // { price: { $regex: text, $options: "i" } },
      ];
    }
    console.log(query);
    const transactions = await Product.find(query).skip((currentPage-1)*10).limit(10);
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
