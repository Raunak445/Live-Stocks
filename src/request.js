import axios from 'axios'
import  { load } from 'cheerio'

export async function getStockPrices() {
//   const stockPrices = {};

const ticker="INFY"
  try {
   
      const url = `https://www.google.com/finance/quote/${ticker}:NSE`;
      const response = await axios.get(url);
      const $ = load.load(response.data);

      const class1 = "YMlKec fxKbKc";
      const priceText = $(`.${class1}`).text().trim();
      const price = parseFloat(priceText.substring(1).replace(',', ''));

      console.log(price)
      console.log("ran")


  } catch (error) {
    console.error('Error fetching stock prices:', error.message);
    return null;
  }
}


