# GTU Circular Scraper API

This API allows you to scrape and retrieve the latest circulars from Gujarat Technological University (GTU). It offers the following endpoints:

## Endpoints

### 1. /circulars

This endpoint retrieves the latest 50 circulars from GTU. The response is a JSON array containing the following information for each circular:

- `_id`: ID of the circular.
- `date`: The date the circular was published, in the format dd-Month-yyyy.
- `circulars`: [{
  - `link`: The URL of the circular on the GTU website.
  - `text`: Description of the circular.
    }]

### 2. /circulars/DD-MMM-YYYY

This endpoint retrieves the circulars published on a specific date. The date should be provided in the format DD-MMM-YYYY, where DD is the day of the month (two digits), MMM is the short name of the month (ex. December -> Dec), and YYYY is the year (four digits). The response is a JSON array in the same format as the /circulars endpoint.

### 3. /circulars/today

This endpoint retrieves the circulars published on the current day. The response is a JSON array in the same format as the /circulars endpoint.

## Example Usage

Here is an example of how to use the API to retrieve the latest 50 circulars:

```javascript
import axios from "axios";

const apiUrl = "https://gtu-circular-api.onrender.com/api/v1";

async function getCirculars() {
  try {
    const response = await axios.get(`${apiUrl}/circulars`);
    const circulars = response.data;
    console.log(circulars);
  } catch (error) {
    console.error(error);
  }
}
async function getTodayCirculars() {
  try {
    const response = await axios.get(`${apiUrl}/circulars/today`);
    const circulars = response.data;
    console.log(circulars);
  } catch (error) {
    console.error(error);
  }
}
async function getCircularsByDate() {
  try {
    const response = await axios.get(`${apiUrl}/circulars/15-Jan-2021`);
    const circulars = response.data;
    console.log(circulars);
  } catch (error) {
    console.error(error);
  }
}

getCirculars();
getTodayCirculars();
getCircularsByDate();
```
