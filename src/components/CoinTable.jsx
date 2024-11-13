import React, { useContext, useEffect, useState } from "react";
import { Coin } from "../context/CryptoContext";
import Loader from "./Loader";
import axios from "axios";
import { CoinList } from "../config/api";
import { useNavigate } from "react-router-dom";

const CoinTable = () => {
  const [coin, setCoin] = useState([]);
  const { setLoading, loading, currency, symbol } = useContext(Coin);
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const coinsPerPage = 10; // Number of coins per page
  const navigate = useNavigate();

  const fetchCoin = async () => {
    setLoading(true);
    try {
      const { data } = await axios.get(CoinList(currency));
      setCoin(data);
      setLoading(false);
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCoin();
  }, [currency]);

  const handleSearch = () => {
    return coin.filter(
      (c) =>
        c.name.toLowerCase().includes(search.toLowerCase()) ||
        c.symbol.toLowerCase().includes(search.toLowerCase())
    );
  };

  // Helper function to add commas to numbers for readability
  const numberWithCommas = (x) => {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  };

  // Handle pagination
  const handlePageChange = (newPage) => {
    setPage(newPage);
  };

  const filteredCoins = handleSearch();
  const totalPages = Math.ceil(filteredCoins.length / coinsPerPage);
  const displayCoins = filteredCoins.slice(
    (page - 1) * coinsPerPage,
    page * coinsPerPage
  );

  return (
    <>
      {loading ? (
        <Loader />
      ) : (
        <div className="w-full sm:w-[90%] mx-auto py-5 px-2">
          <h1 className="text-center font-bold sm:text-3xl text-xl">
            Cryptocurrency Prices by Market Cap
          </h1>

          <input
            type="text"
            placeholder="Search here..."
            className="w-full my-4 px-3 py-3 rounded-lg outline-none font-semibold bg-transparent border border-gray-600"
            onChange={(e) => setSearch(e.target.value)}
          />

          {/* Responsive table */}
          <div className="overflow-x-auto">
            <table className="w-full border border-gray-300 rounded-lg shadow-md">
              <thead>
                <tr className="text-[12px] sm:text-base bg-yellow-500 text-black">
                  <th className="sm:px-12 px-5 py-3 border-b font-semibold text-start">Coin</th>
                  <th className="px-2 sm:px-6 py-3 border-b font-semibold text-center">Price</th>
                  <th className="px-2 sm:px-6 py-3 border-b font-semibold text-center">24h Change</th>
                  <th className="px-2 sm:px-6 py-3 border-b font-semibold text-center">Market Cap</th>
                </tr>
              </thead>
              <tbody>
                {displayCoins.map((coin) => {
                  const priceChangeColor = coin.price_change_percentage_24h >= 0
                    ? "text-green-500"
                    : "text-red-500";

                  return (
                    <tr
                      key={coin.id}
                      className="border-t text-xs sm:text-sm hover:bg-slate-700 cursor-pointer active:scale-90"
                      onClick={() => navigate(`/coin/${coin.id}`)}
                    >
                      <td className="px-2 sm:px-6 py-4 whitespace-nowrap text-left">
                        <div className="flex items-center">
                          <img
                            src={coin.image}
                            alt={coin.name}
                            className="h-8 w-8 sm:h-16 sm:w-16 rounded-full mr-2"
                          />
                          <div>
                            <span className="font-bold text-xs sm:text-sm">
                              {coin.symbol.toUpperCase()}
                            </span>
                            <span className="text-gray-400 block text-xs sm:text-sm">
                              {coin.name.slice(0, 12)}
                            </span>
                          </div>
                        </div>
                      </td>
                      <td className="px-2 sm:px-6 py-4 text-start">
                        {symbol} {numberWithCommas(coin.current_price.toFixed(2))}
                      </td>
                      <td
                        className={`px-2 sm:px-6 py-4 text-center font-medium ${priceChangeColor}`}
                      >
                        {coin.price_change_percentage_24h?.toFixed(2)}%
                      </td>
                      <td className="px-2 sm:px-6 py-4 text-center">
                        {symbol} {(coin.market_cap / 1e6).toLocaleString()}M
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>

          {/* Pagination Controls */}
          <div className="flex justify-center items-center space-x-4 mt-6">
            <button
              onClick={() => handlePageChange(page - 1)}
              disabled={page === 1}
              className="px-3 py-1 bg-gray-300 rounded-md disabled:opacity-50"
            >
              Previous
            </button>

            <span className="font-semibold">
              Page {page} of {totalPages}
            </span>

            <button
              onClick={() => handlePageChange(page + 1)}
              disabled={page === totalPages}
              className="px-3 py-1 bg-gray-300 rounded-md disabled:opacity-50"
            >
              Next
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default CoinTable;
