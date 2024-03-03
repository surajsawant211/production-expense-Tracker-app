const transactionModel = require("../Models/transactionModel");
const moment = require("moment")
const getallTransactions = async (req, res) => {
    debugger
  try {
    //destructring frequency from req.body
    const { frequency,selectedDate,type } = req.body;
    const transactions = await transactionModel.find({
        ...(frequency !== "custom"
        ? {
            date: {
              $gt: moment().subtract(Number(frequency), "d").toDate(),
            },
          }
        : {
            date: {
              $gte: selectedDate[0],
              $lte: selectedDate[1],
            },
          }),
      userid: req.body.userid,
      ...(type !== "all" && { type }),
    });
    res.status(200).json(transactions);
  } catch (error) {
    console.log(error);
    res.status(500).json(error);
  }
};


const editallTransactions =async(req,res)=>{
    try {
        await transactionModel.findOneAndUpdate({_id:req.body.transactionId},req.body.payload)
        res.status(200).send("Edit Successfully")
    } catch (error) {
        console.log(error);
        res.status(500).json(error);
    }
}


const deleteallTransactions=async(req,res)=>{
    try {
        await transactionModel.findOneAndDelete({_id:req.body.transactionId})
        res.status(200).send("Deleted Successfully")
    } catch (error) {
        console.log(error);
        res.status(500).json(error);
    }
}

const addallTransactions = async (req, res) => {
  try {
    const newTransaction = new transactionModel(req.body);
    await newTransaction.save();
    res.status(201).send("Transaction Created");
  } catch (error) {
    console.log(error);
    res.status(500).json(error);
  }
};

module.exports = { getallTransactions, addallTransactions,editallTransactions ,deleteallTransactions};
