import { useParams } from "react-router-dom";

const StockDetails = () => {
  const { stockName, stockPrice } = useParams();

  return (
    <div style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        // justifyContent: 'center',
        height: '100vh', /* Set height to cover entire viewport */
        width: '100vw', /* Set width to cover entire viewport */
      }}>
      <h2 style={{ color: 'blue', fontSize: '28px' }}>Stock Details</h2>
      <p style={{ fontWeight: 'bold',fontSize:'18px' }}>Stock Name: {stockName}</p>
      <p style={{ fontStyle: 'italic',fontSize:'18px' }}>Stock Price: {stockPrice}</p>
    </div>
  );
};

export default StockDetails;
