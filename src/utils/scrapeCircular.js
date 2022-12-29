const cheerio = require("cheerio");
const axios = require("axios");
const { getDb } = require("../config/db");

const scrapeCircular = async () => {
  const db = await getDb();
  const collection = db.collection("circulars");
  try {
    const allCircular = [];

    console.log("\n[INFO] Fetching web content...");

    const response = await axios.get("https://www.gtu.ac.in/Circular.aspx");

    console.log("[INFO] Fetched successfully.");

    const $ = cheerio.load(response.data);

    $("#student-corner > .most-popular-post").each((i, el) => {
      const href = $(".d-block > a:nth-child(2)", el).attr("href");
      const text = $(".d-block > a:nth-child(2)", el).text();
      const date = $(
        `#ContentPlaceHolder1_lvCircular_lblUploadDate_${i}`,
        el
      ).text();
      const circular = {
        index: i + 1,
        date,
        link: href,
        text,
      };
      allCircular.push(circular);
    });

    // delete all old circulars
    await collection.deleteMany({});
    console.log("\n[INFO] All documents deleted successfully.");

    // add all new circulars
    await collection.insertMany(allCircular);
    console.log("\n[INFO] All circular add to db successfully.");
  } catch (error) {
    console.log("[ERROR]", error.message);
    return;
  }
};

module.exports = { scrapeCircular };
