const cheerio = require("cheerio");
const axios = require("axios");

const { Circular } = require("../model/Circular");
const { formateDate } = require("./formateDate");

const scrapeCircular = async () => {
  try {
    console.log("\n[INFO] Fetching web content...");
    const response = await axios.get("https://www.gtu.ac.in/Circular.aspx");
    console.log("[INFO] Fetched successfully.");
    const $ = cheerio.load(response.data);

    $("#student-corner > .most-popular-post").each(async (i, el) => {
      const href = $(".d-block > a:nth-child(2)", el).attr("href");
      const text = $(".d-block > a:nth-child(2)", el).text();
      const date = $(
        `#ContentPlaceHolder1_lvCircular_lblUploadDate_${i}`,
        el
      ).text();

      const newCircular = {
        link: href,
        text: text,
      };

      const query = {
        date: await formateDate(date),
        "circulars.link": { $ne: newCircular.link },
        "circulars.text": { $ne: newCircular.text },
      };

      const update = {
        $addToSet: { circulars: newCircular },
      };

      const options = {
        upsert: true, // create the document if it doesn't exist
        new: true, // return the updated document
        setDefaultsOnInsert: true, // apply the default values defined in the schema
      };

      try {
        await Circular.findOneAndUpdate(query, update, options);
      } catch (error) {
        // console.log("[ERROR]", error.message);
        return;
      }
    });
    console.log("\n[INFO] All circular add to db successfully.");
  } catch (error) {
    console.log("[ERROR]", error.message);
  }
};

module.exports = { scrapeCircular };
