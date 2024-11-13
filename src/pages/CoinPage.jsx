import React, { useContext, useEffect, useState } from "react";
import { Coin } from "../context/CryptoContext";
import { SingleCoin } from "../config/api";
import axios from "axios";
import { useParams } from "react-router-dom";
import Loader from "../components/Loader";
import CoinChart from "../components/CoinChart";

const CoinPage = () => {
  const { id } = useParams();
  const { currency, symbol } = useContext(Coin);
  const [coin, setCoin] = useState(null);

  const fetchSingleCoin = async () => {
    try {
      const { data } = await axios.get(SingleCoin(id));
      setCoin(data);
      console.log(data);
    } catch (error) {
      console.error("Error fetching coin data:", error);
    }
  };

  useEffect(() => {
    fetchSingleCoin();
  }, [currency, id]);
  const numberWithCommas = (x) => {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  };
  if (!coin) return <Loader />;

  return (
    <div className="w-full min-h-screen flex  justify-between lg:flex-row flex-col gap-5 ">
      {/* Coin Information */}
      <div className="flex flex-col items-center text-center p-4 lg:w-[500px] w-full  lg:border-r h-fit">
        <img
          src={coin.image.large}
          alt={coin.name}
          className="md:h-52 md:w-52 mb-4"
        />
        <h1 className="text-6xl font-bold">{coin.name}</h1>
        <h1 className="text-3xl text-gray-400 font-bold">
          {coin.symbol.toUpperCase()}
        </h1>
        {/* <p className="text-lg text-gray-500">
          {symbol} {coin.market_data.current_price[currency.toLowerCase()]}
        </p> */}
        <p className="mt-2">{coin.description.en.split(". ")[0]}</p>

        <div className="mt-4  flex sm:flex-row flex-col lg:flex-col lg:gap-2  items-center gap-1 sm:gap-10">
          <h2 className="text-xl font-semibold text-start">
            Rank: <span className="font-normal">{coin.market_cap_rank}</span>
          </h2>
          <h2 className="text-xl font-semibold text-start">
            Current Price:{" "}
            <span className="font-normal">
              {symbol}{" "}
              {numberWithCommas(
                coin.market_data.current_price[currency.toLowerCase()]
              )}
            </span>
          </h2>
          <h2 className="text-xl font-semibold text-start">
            Market Cap:{" "}
            <span className="font-normal">
              {symbol}{" "}
              {coin.market_data.market_cap[currency.toLowerCase()]
                .toLocaleString()
                .slice(0, -6)}
              M
            </span>
          </h2>
        </div>
      </div>

      {/* Additional Content Placeholder */}
      <div className="w-full text-yellow-600  ">
        <CoinChart coin={coin} />
      </div>
    </div>
  );
};

export default CoinPage;
