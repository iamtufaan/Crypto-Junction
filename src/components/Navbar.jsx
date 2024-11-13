import React, { useContext } from "react";
import { Coin } from "../context/CryptoContext";
import { Link } from "react-router-dom";

const Navbar = () => {
  const { currency, setCurrency } = useContext(Coin);
  
  return (
    <div className="w-full sm:px-10 px-2 py-3 bg-black flex items-center justify-between">
      <Link to={'/'} className="font-bold sm:text-3xl text-xl text-yellow-500 active:scale-90">
        Crypto Junction
      </Link>

      <div className="space-x-2">
        <select
          value={currency}
          onChange={(e) => setCurrency(e.target.value)}
          className="bg-black border sm:px-3 px-1 py-1 font-semibold cursor-pointer">
          <option value="INR">INR</option>
          <option value="USD">USD</option>
        </select>
        {/* <button className="px-4 py-2 bg-yellow-500 text-black font-bold cursor-pointer active:scale-90 rounded-md">
          Login
        </button> */}
      </div>
    </div>
  );
};

export default Navbar;
