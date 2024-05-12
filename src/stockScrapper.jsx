import axios from 'axios'
import  { load } from 'cheerio'

export async function getStockPrices(tickers) {
  const stockPrices = {};

  try {
    for (const ticker of tickers) {
      const url = `https://www.google.com/finance/quote/${ticker}:NSE`;
      const response = await axios.get(url);
      const $ = load.load(response.data);

      const class1 = "YMlKec fxKbKc";
      const priceText = $(`.${class1}`).text().trim();
      const price = parseFloat(priceText.substring(1).replace(',', ''));

      stockPrices[ticker] = price;
    }

    return stockPrices;
  } catch (error) {
    console.error('Error fetching stock prices:', error.message);
    return null;
  }
}


