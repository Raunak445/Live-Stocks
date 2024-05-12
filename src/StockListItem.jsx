import {useNavigate } from "react-router-dom";

const StockListItem = ({ stockName, stockPrice }) => {
  const navigate = useNavigate();

  const handleClick = () => {
    // Construct the URL with query parameters
    const url = `/stockdetails/${stockName}/${stockPrice}`

    // Navigate to the stockdetails page with the constructed URL
    navigate(url)
  };

  return (
    <div>
      <ul>
        <div onClick={handleClick} className="stock-card">
          <strong>{stockName}</strong>: INR {stockPrice}
        </div>
      </ul>
    </div>
  );
};

export default StockListItem;
