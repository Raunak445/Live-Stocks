import { useEffect, useRef, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchStocks } from "./redux/slice/liveStocks";
import StockListItem from "./StockListItem";
import InfiniteScroll from "react-infinite-scroll-component";
// import { current } from "@reduxjs/toolkit";

const StockPriceList = () => {
  const dispatch = useDispatch();
  const { isLoading, data, isError, currentPage, totalPages } = useSelector(
    (state) => state.stocks
  );
  const [page, setPage] = useState(1);
  const [allData, setAllData] = useState([]);
  const [hasMore, setHasMore] = useState(true);
  const initialFetch = useRef(true); // Use useRef to track initial fetch
  //persists across multiple renders

  useEffect(() => {
    // note the for use this is that /1 endpoint was being requested multiple times due to re-render
    console.log("totalPages", totalPages);
    if (initialFetch.current) {
      // Check if it's the initial fetch
      initialFetch.current = false; // Set initialFetch to false after the first fetch
      // dispatch(fetchStocks(1));
      return; // Skip the initial fetch
    }

    dispatch(fetchStocks(page));
  }, [dispatch, page]);


  useEffect(() => {
    // Fetch data for each page from 1 to currentPage
    const intervalId = setInterval(() => {
      for (let i = 1; i <= page; i++) {
        dispatch(fetchStocks(i));
      }
    },10000);
    return () => clearInterval(intervalId);
  }, [page]);

  useEffect(() => {
    if (data && Object.keys(data).length > 0) {
      setAllData((prevData) => {
        // Case 1: When prevData is empty
        if (prevData.length === 0) {
          return [data]; // If prevData is empty, return an array with the new data
        }

        // Case 2: When prevData is not empty
        const newData = [...prevData]; // Create a copy of previous data array
        let newDataAdded = false; // Flag to track if data is added to newData

        Object.entries(data).forEach(([key, value]) => {
          // Check if the key exists in prevData
          const existingPageIndex = newData.findIndex((pageData) =>
            pageData.hasOwnProperty(key)
          );
          if (existingPageIndex !== -1) {
            // Create a new object for the existing page and update its data
            newData[existingPageIndex] = {
              ...newData[existingPageIndex],
              [key]: value,
            };
          } else {
            // Add a new object to newData with the key-value pair
            newData.push({ [key]: value });
            newDataAdded = true;
          }
        });

        // If data was not added to newData, return prevData
        if (!newDataAdded) {
          return prevData;
        }

        return newData;
      });

      // setAllData((prevData)=>[...prevData,data])

      // Concatenate new data with existing data
      setHasMore(currentPage < totalPages); // Update hasMore based on currentPage and totalPages
    }
  }, [data, currentPage, totalPages]);

  const fetchNextPage = () => {
    if (!isLoading && currentPage < totalPages) {
      setPage(page + 1); // Increment page number
    }
  };

  return (
    <div className="wrapper">
      <h2>Stock Prices</h2>
      <InfiniteScroll
        dataLength={allData.length} // Use allData length instead of data length
        next={fetchNextPage}
        hasMore={hasMore}
        loader={
        page<=totalPages &&
        <h4>Loading...</h4>}
        endMessage={<p>No more stocks to load</p>}
        scrollableTarget="scrollableDiv"
      >
        {allData.map((pageData, index) =>
          Object.entries(pageData).map(([stockName, stockPrice]) => (
            <StockListItem
              key={`${stockName}_${index}`}
              stockName={stockName}
              stockPrice={stockPrice}
            />
          ))
        )}
      </InfiniteScroll>
    </div>
  );
};

export default StockPriceList;
