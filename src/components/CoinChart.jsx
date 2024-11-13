import React, { useContext, useEffect, useState } from "react";
import { Coin } from "../context/CryptoContext";
import axios from "axios";
import { HistoricalChart } from "../config/api";
import Loader from "./Loader";
import { Line } from "react-chartjs-2";

// Import required components from Chart.js
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  Title,
  Tooltip,
  Legend,
  PointElement,
  LineElement,
} from "chart.js";
import { chartDays } from "../config/data";
import SelectButton from "./SelectButton";

// Register the required components
ChartJS.register(
  CategoryScale,
  LinearScale,
  Title,
  Tooltip,
  Legend,
  PointElement,
  LineElement
);

const CoinChart = ({ coin }) => {
  const { loading, setLoading, currency } = useContext(Coin);
  const [historicData, setHistoricData] = useState([]);
  const [days, setDays] = useState(1);

  const fetchHistoricData = async () => {
    try {
      const { data } = await axios.get(
        HistoricalChart(coin.id, days, currency)
      );
      setHistoricData(data.prices);
      console.log(data.prices);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchHistoricData();
  }, [currency, days]);

  return (
    <div>
      {!historicData.length ? (
        <Loader />
      ) : (
        <div className="  w-full  py-10">
          <Line
            data={{
              labels: historicData.map((coin) => {
                let date = new Date(coin[0]);
                let time =
                  date.getHours() > 12
                    ? `${date.getHours() - 12}:${date.getMinutes()} PM`
                    : `${date.getHours()}:${date.getMinutes()} AM`;
                return days === 1 ? time : date.toLocaleString();
              }),
              datasets: [
                {
                  label: `Price (Past ${days} Days) in ${currency}`,
                  data: historicData.map((coin) => coin[1]),
                  borderColor: "#eebc1d",
                },
              ],
            }}
            options={{
              elements: {
                point: {
                  radius: 1,
                },
              },
            }}
          />
          <div className=" flex sm:flex-row  flex-col gap-5 my-5  text-center justify-center">
            {chartDays.map((day) => {
              return (
                <SelectButton
                  key={day.value}
                  onClick={() => setDays(day.value)}
                  selected={day.value === days}>
                  {" "}
                  {day.label}
                </SelectButton>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
};

export default CoinChart;
