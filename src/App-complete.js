import React, { useState } from "react";
import { createRoot } from "react-dom/client";

function App() {
  const [price, setPrice] = useState(400);
  const [quantity, setQuantity] = useState(10);
  const [tradeType, setTradeType] = useState("buy");
  const [amount, setAmount] = useState(0);
  const [cash, setCash] = useState(10000);
  const [errorMessage, setErrorMessage] = useState("");
  const [day, setDay] = useState(1);
  const [history, setHistory] = useState([]);

  function simulateAction() {
    if (tradeType === "buy" && cash >= price * amount) {
      if (amount > 0) {
        setQuantity(parseInt(quantity, 10) + parseInt(amount, 10));
        setCash(cash - price * amount);
        setHistory([
          <div key={day}>
            Day {day}: Bought {amount} $SPY at {price}
          </div>,
          ...history
        ]);
      }
    } else if (tradeType === "buy") {
      setErrorMessage("Insufficient funds!");
      return;
    } else if (tradeType === "sell" && amount <= quantity) {
      if (amount > 0) {
        setQuantity(quantity - amount);
        setCash(cash + price * amount);
        setHistory([
          <div key={day}>
            Day {day}: Sold {amount} $SPY at {price}
          </div>,
          ...history
        ]);
      }
    } else {
      setErrorMessage("Insufficient stock quantity!");
      return;
    }

    // After orders are in
    setPrice(price + 5 * (0.5 - Math.random()));
    setAmount(0);
    setDay(day + 1);
  }

  function onTradeTypeChange(e) {
    setTradeType(e.target.value);
  }

  function onAmountChange(e) {
    setAmount(e.target.value);
  }

  return (
    <>
      <h1>Trading Simulator</h1>
      <h2>Day: {day}</h2>

      <table>
        <tbody>
          <tr>
            <th>Stock</th>
            <th>Price</th>
            <th>Quantity</th>
            <th>Value</th>
            <th>Action</th>
            <th>Amount</th>
          </tr>
          <tr>
            <td>$SPY</td>
            <td>{price.toFixed(2)}</td>
            <td>{quantity}</td>
            <td>{(price * quantity).toFixed(2)}</td>
            <td>
              <select value={tradeType} onChange={onTradeTypeChange}>
                <option value="buy">Buy</option>
                <option value="sell">Sell</option>
              </select>
            </td>
            <td>
              <input value={amount} onChange={onAmountChange}></input>
            </td>
          </tr>
        </tbody>
      </table>

      <button onClick={simulateAction}>Simulate!</button>
      <div>Cash: {cash.toFixed(2)}</div>
      <div>Total: {(cash + price * quantity).toFixed(2)}</div>
      <div>{errorMessage}</div>
      <div>{history}</div>
    </>
  );
}

const container = document.getElementById("root");
const root = createRoot(container);
root.render(<App />);
