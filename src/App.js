import "./styles.css";
import { useState } from "react";

/**
 * Welcome! We are going to go through a comprehensive demo
 * of how to create components, interactions, and manage state
 * in React.
 *
 * 1. Create a table with one stock
 * 2. Add button to simulate random price
 * 3. Buy/Sell buttons
 * 4. Update portfolio values, quantity
 * 5. Cash, validate buy and sell orders
 * 6. Day counter
 * 7. Order history
 * 8. More stocks?
 * 9. Search bar
 * 10. How do we make this look better?
 *
 * NOTE: if you are having trouble following along, please
 * check out: `index-complete.js` for the full working demo.
 */
export default function App() {
  /** getter function :reads the value of state
   * setter function :lets you change the value of state
   * initial value
   */
  const initialValue = 100;
  const [tradeType, setTradeType] = useState("buy");
  const [price, setPrice] = useState(initialValue);
  const [quantity, setQuantity] = useState(0);
  const [shares, setShares] = useState(10);
  const [cash, setcash] = useState(1000);
  const [errormsg, setErrorMsg] = useState("");
  const [days, setDays] = useState(1);
  const [history, setHistory] = useState([]);

  function simulate() {
    setErrorMsg("");
    let quantityInt = parseInt(quantity);
    //are you buying or selling
    if (tradeType === "buy" && quantity > 0 && cash > quantityInt * price) {
      setShares(parseInt(shares) + parseInt(quantity));
      setcash(cash - quantityInt * price);
      const message = `Day${days}:Bought ${quantityInt} $SSPY at ${price.toFixed(
        2
      )}`;
      setHistory([<div>{message}</div>, ...history]);
      console.log("buy shares");
    }
    if (tradeType === "buy" && cash > quantityInt * price) {
      setErrorMsg("Canot buy");
    } else if (tradeType === "sell" && shares >= quantityInt) {
      setShares(parseInt(shares) - parseInt(quantity));
      setcash(cash + quantityInt * price);
      const message = `Day${days}:sold ${quantityInt} $SSPY at ${price.toFixed(
        2
      )}`;
      setHistory([<div>{message}</div>, ...history]);
      console.log("sell shares");
    }
    if (tradeType === "sell" && shares < quantityInt) {
      setErrorMsg("cannot sell");
    }
    setDays(days + 1);
    //update portfolio accordingly
    setPrice(price + 5 * (0.5 - Math.random()));
  }

  function onTradeTypeChanged(event) {
    setTradeType(event.target.value);
    console.log(event.target.value);
  }
  function onQuantityChange(event) {
    setQuantity(event.target.value);
  }

  return (
    <>
      <h1>Trading Simulator</h1>
      <h2>Days: {days}</h2>
      <table>
        <tbody>
          <tr>
            <th>stock</th>
            <th>price</th>
            <th>Shares</th>
            <th>Total</th>
            <th>Action</th>
            <th>Quantity</th>
          </tr>

          <tr>
            <td>$SPY</td>
            <td>{price.toFixed(2)}</td>
            <td>{shares}</td>
            <td>${(shares * price).toFixed(2)}</td>
            <td>
              <select value={tradeType} onChange={onTradeTypeChanged}>
                <option value="buy">Buy</option>
                <option value="sell">Sell</option>
              </select>
            </td>
            <td>
              <input value={quantity} onChange={onQuantityChange}></input>
            </td>
          </tr>
        </tbody>
      </table>
      <button onClick={simulate}>Simulate</button>
      <br></br>
      Cash:{cash.toFixed(2)}
      <br></br>
      History:<div>{history}</div>
      <br></br>
      {tradeType},{quantity}
      <br></br>
      {errormsg}
    </>
  );
}
