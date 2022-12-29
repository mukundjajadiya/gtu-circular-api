const path = require("path");
const fs = require("fs/promises");
const { formateDate } = require("../utils/formateDate");

// read file handler
const readFile = async (filePath) => {
  try {
    // return  read all circuler from file and parse to json
    return JSON.parse(await fs.readFile(filePath));
  } catch (error) {
    console.log("[ERROR]", error.message);
  }
};

// get all circular handler
const getAllCircular = async (req, res) => {
  // read all circuler from file
  const filePath = path.join("data", "all_circular.json");
  const allCircular = await readFile(filePath);

  // return all circulars
  return res.status(200).json({
    success: true,
    data: allCircular,
  });
};

// get today or provided date circular date
const getCircular = async (req, res) => {
  try {
    // read all circuler from file
    const filePath = path.join("data", "all_circular.json");
    const allCircular = await readFile(filePath);

    // get date from req
    const circularDate = req.params.date;
   
    // formating date
    const formatedDate = await formateDate(circularDate);

    // filter today circular from all circular
    const todayCircular = allCircular.filter(
      (circular) => circular.date == formatedDate
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
  // getTodayCircular,
};
