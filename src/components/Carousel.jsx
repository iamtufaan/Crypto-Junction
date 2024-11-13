import React, { useContext, useEffect, useState } from "react";
import "react-alice-carousel/lib/alice-carousel.css";
import { Coin } from "../context/CryptoContext";
import axios from "axios";
import AliceCarousel from "react-alice-carousel";
import { Link, useNavigate } from "react-router-dom";
import { TrendingCoins } from "../config/api";

const Carousel = () => {
  const { currency, symbol } = useContext(Coin); 
  const [trending, setTrending] = useState([]);
const navigate=useNavigate()
  const fetchTrendingCoin = async () => {
    try {
      const { data } = await axios.get(TrendingCoins(currency));
      setTrending(data);
      // console.log(data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchTrendingCoin();
  }, [currency]);

  const responsive = {
    0: { items: 2 },
    512: { items: 4 },
  };

  const items = trending.map((coin) => {
    const priceChange = coin.price_change_percentage_24h;
    const priceChangeColor = priceChange >= 0 ? "text-green-500" : "text-red-500";
 
    const numberWithCommas =(x)=>{
        return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  
    }
    return (
      <div
        className="flex flex-col items-center gap-5 cursor-pointer m-1 p-1"
        onClick={() => navigate(`/coin/${coin.id}`)}
        key={coin.id}>
        <img src={coin.image} alt={coin.name} className="h-20 sm:h-32" />
        <div className=" text-center">
          <div>
            <span className="uppercase font-semibold">{coin.symbol}</span>
            <span className={`${priceChangeColor} font-medium`}>
              {priceChange >= 0 ? "+" : ""}
              {priceChange?.toFixed(2)}%
            </span>
          </div>
          <span className="font-medium text-lg">
            {symbol} {numberWithCommas(coin.current_price.toFixed(2))}
          </span>
        </div>
      </div>
    );
  });

  return (
    <div className="w-full h-[50%] flex items-center">
      <AliceCarousel
        mouseTracking
        infinite
        autoPlayInterval={1000}
        animationDuration={1500}
        disableDotsControls
        responsive={responsive}
        autoPlay
        disableButtonsControls
        items={items}
      />
    </div>
  );
};

export default Carousel;
