import OverallStat from "../models/OverallStat.js";
import Transaction from "../models/Transaction.js";
import User from "../models/User.js";




export const getUser=async(req,res)=>{
    try{
        const { id } = req.params;
        const user = await User.findById(id);
        res.status(200).json(user);
    }
    catch(error){
        res.status(404).json({ message: error.message });
    }
};
export const testuser=async(req,res)=>{
    try{
        res.status(200).json("hello world");
    }
    catch(error){
        res.status(404).json({ message: error.message });
    }
};


export const getDashboardStats=async(req,res)=>{
    try{
        const currentMonth="November";
        const currentYear = 2021;
    const currentDay = "2021-11-15";

    const transactions = await Transaction.find()
    .sort({ createdOn: -1 })
    .limit(50)
    .lean();

     // Fetch overall statistics for the hardcoded year
     const overallStat = await OverallStat.findOne({ year: currentYear }).lean();
     if (!overallStat) {
        return res.status(404).json({ message: "No statistics found for this year" });
      }

      // Destructure overall statistics
      const {
        totalCustomers,
        yearlyTotalSoldUnits,
        yearlySalesTotal,
        monthlyData,
        dailyData,
        salesByCategory,
      } = overallStat;
    
      const thisMonthStats = monthlyData.find(({ month }) => month === currentMonth) || {};
      const todayStats = dailyData.find(({ date }) => date === currentDay) || {};

      res.status(200).json({
        totalCustomers,
        yearlyTotalSoldUnits,
        yearlySalesTotal,
        monthlyData,
        salesByCategory,
        thisMonthStats,
        todayStats,
        transactions,
      });
    } catch (error) {
      res.status(500).json({ message: "Server Error", error: error.message });
    }
}





