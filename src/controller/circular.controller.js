const { Circular } = require("../model/Circular");
const { formateDate } = require("../utils/formateDate");

// get all circular handler
const getAllCircular = async (req, res) => {
  // read all circuler from db
  try {
    const allCircular = await Circular.find(
      {},
      { date: 1, _id: 1, circulars: 1 }
    );

    // return all circulars
    return res.status(200).json({
      success: true,
      data: allCircular,
    });
  } catch (error) {
    console.log("[ERROR]", error.message);
  }
};

// get today or provided date circular date
const getCircular = async (req, res) => {
  try {
    // get date from req
    const circularDate = req.params.date;

    // formating date
    const formatedDate = await formateDate(circularDate);

    // filter today circular from all circular
    const todayCircular = await Circular.find(
      { date: formatedDate },
      { date: 1, _id: 1, circulars: 1 }
    );

    // return success res
    return res.status(200).json({
      success: true,
      data: todayCircular,
    });
  } catch (error) {
    console.log("[ERROR]", error.message);
  }
};

module.exports = {
  getAllCircular,
  getCircular,
};
