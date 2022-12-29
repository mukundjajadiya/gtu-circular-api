const cheerio = require("cheerio");
const axios = require("axios");
const path = require("path");
const fs = require("fs/promises");

const scrapeCircular = async () => {
  try {
    const allCircular = [];

    const filePath = path.join("data", "all_circular.json");
    console.log("[INFO] 'data' Directory created.");
    console.log("[INFO] Fetching web content...");

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

    await fs.writeFile(filePath, JSON.stringify(allCircular));
  } catch (error) {
    console.log("[ERROR]", error.message);
    return;
  }
};

module.exports = { scrapeCircular };
