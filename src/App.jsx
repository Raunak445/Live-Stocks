import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import { Provider } from 'react-redux';
import StockPriceList from './StockPriceList';
import {store} from './redux/store';
import './styles.css'
import StockDetails from './StockDetails';

const App = () => {
  return (
    <Provider store={store}>
    <Router>
      <Routes>
      <Route path='/' element={<StockPriceList />} />
      <Route path='/stockdetails/:stockName/:stockPrice' element={<StockDetails />} />
      </Routes>
    </Router>
  </Provider>
  );
};

export default App;
