import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import { Provider } from "react-redux";
import StockPriceList from "./StockPriceList";
import { store } from "./redux/store";
import "./styles.css";
import StockDetails from "./StockDetails";
import Login from "./Login";
import ProtectedRoute from "./ProtectedRoute";
const App = () => {
  return (
    <Provider store={store}>
      <Router>
        <Routes>
          <Route
            path="/"
            element={
              <ProtectedRoute>
                <StockPriceList />
              </ProtectedRoute>
            }
          />
          <Route
            path="/stockdetails/:stockName/:stockPrice"
            element={
              <ProtectedRoute>
                <StockDetails />
              </ProtectedRoute>
            }
          />

          <Route path="/login" element={<Login />} />
        </Routes>
      </Router>
    </Provider>
  );
};

export default App;
