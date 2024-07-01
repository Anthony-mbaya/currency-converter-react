import React, { useEffect, useState } from "react";
import Axios from "axios";

export const App = () => {
  const [info, setInfo] = useState([]);
  const [amt, setAmt] = useState(0);
  const [result, setResult] = useState(0);
  const [from, setFrom] = useState("usd");
  const [to, setTo] = useState("eur");
  const [options, setOptions] = useState([]);
  //useEffect fetches currency data from an API whenever the from currency changes.
  useEffect(() => {
    Axios.get(
      `https://cdn.jsdelivr.net/npm/@fawazahmed0/currency-api@latest/v1/currencies/${from}.json`
    )
      .then((response) => {
        setInfo(response.data[from]);
      })
      .catch((err) => {
        console.error("Error fetching: ", err);
      });
  }, [from]);
  const convert = () => {
    let rate = info[to];
    setResult(amt * rate);
  };
  //This useEffect updates the available currency options and converts the amount whenever the info state changes.
  useEffect(() => {
    setOptions(Object.keys(info));
    convert();
  }, [info]);
  return (
    <div className="w-fit sm:w-[80%] mx-auto flex flex-col items-center justify-center gap-5 bg-bitcoin bg-cover bg-slate-500 bg-blend-overlay bg-center px-3 py-6 rounded-3xl shadow-black shadow-2xl">
      <h1 className="text-white font-bold text-[1.6em] w-fit mx-auto text-center">Currency Converter</h1>
      <input
        type="number"
        placeholder="Enter Amount"
        onChange={(e) => setAmt(e.target.value)}
        className="text-[1.3em] px-3 py-2 font-bold text-green-500 outline-green-600 rounded-lg text-center"
      />
      <div className="flex flex-col sm:flex-row sm:gap-10 w-fit mx-auto my-6">
      <div className="flex flex-col sm:flex-row-reverse sm:gap-6 ">
      <h4 className="text-center text-white font-bold sm:flex sm:items-center">From</h4>
      <select onChange={(e) => setFrom(e.target.value)} value={from} className="text-green-500 text-[1.3em] text-center uppercase font-bold px-3 py-2 outline-green-600 rounded-lg">
        <option value="" disabled className="text-green-500 font-bold">
          From
        </option>
        {options.map((option) => (
          <option key={option} value={option} className="text-green-500 text-center uppercase">
            {option}
          </option>
        ))}
      </select>
      </div>
      <div className="flex flex-col sm:flex-row sm:gap-6">
      <h4 className="text-center text-white font-bold sm:flex sm:items-center">To</h4>
      <select onChange={(e) => setTo(e.target.value)} value={to} className="text-green-500 text-[1.3em] text-center uppercase font-bold px-3 py-2 outline-green-600 rounded-lg">
        <option value="" disabled>
          To
        </option>
        {options.map((option) => (
          <option value={option} key={option} className="text-green-500 text-center uppercase">
            {option}
          </option>
        ))}
      </select>
      </div>
      </div>
      <button
        onClick={() => {
          convert();
        }}
        className="bg-slate-950 text-white font-bold rounded-md px-4 py-2 shadow-xl focus:border-white focus:border-2 hover:bg-slate-800 "
      >
        Convert
      </button>
      <div className="bg-slate-300 w-full sm:w-fit px-3 flex justify-center items-center py-3 mx-auto rounded-xl text-slate-950 shadow-2xl shadow-black font-bold text-[1.2em] uppercase">{amt + " " + from + " = " + result + " " + to}</div>
    </div>
  );
};
