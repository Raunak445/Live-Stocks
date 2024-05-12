import requests
from bs4 import BeautifulSoup
import json

def get_stock_prices(tickers):
    stock_prices = {}

    for ticker in tickers:
        url = f'https://www.google.com/finance/quote/{ticker}:NSE'
        response = requests.get(url)
        soup = BeautifulSoup(response.text, 'html.parser')
        price_element = soup.find(class_="YMlKec fxKbKc")
        if price_element:
            price_text = price_element.text.strip()
            price = float(price_text[1:].replace(",", ""))
            stock_prices[ticker] = price

    return stock_prices

def main():
    tickers = ['INFY', 'RELIANCE', 'TCS', 'HDFCBANK', 'HDFC', 'ITC', 'WIPRO', 'HCLTECH', 'ICICIBANK', 'KOTAKBANK']
    stock_prices = get_stock_prices(tickers)

    with open('stock_prices.json', 'w') as f:
        json.dump(stock_prices, f)

if __name__ == "__main__":
    main()
