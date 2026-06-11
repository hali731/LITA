import {
  getRevenueByDayService,
  getRevenueByMonthService,
  getBestSellerService,
  getDashboardSummaryService,
} from "../services/analytics.service.js";

// REVENUE BY DAY
export const getRevenueByDay = async (req, res) => {
  try {
    const { filter } = req.query;

    const data = await getRevenueByDayService(filter);

    res.json({
      success: true,
      data,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};
// REVENUE BY MONTH
export const getRevenueByMonth = async (req, res) => {
  try {
    const data = await getRevenueByMonthService();

    res.json({
      success: true,
      data,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

// BEST SELLER
export const getBestSeller = async (req, res) => {
  try {
    const data = await getBestSellerService();

    res.json({
      success: true,
      data,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

// DASHBOARD SUMMARY
export const getDashboardSummary = async (req, res) => {
  try {
    const data = await getDashboardSummaryService();

    res.json({
      success: true,
      data,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};