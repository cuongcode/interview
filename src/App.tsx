import React, { useState } from "react";
import { Wall, Button, BaseInput } from "./components";

const BUYCOL = [
  { price: 42000, number: 15 },
  { price: 41000, number: 14 },
  { price: 40000, number: 12 },
  { price: 39000, number: 10 },
  { price: 38000, number: 9 },
];
const SELLCOL = [
  { price: 37000, number: 15 },
  { price: 36000, number: 9 },
  { price: 35000, number: 17 },
  { price: 34000, number: 13 },
  { price: 33000, number: 8 },
];

function App() {
  const [buyCol, setBuyCol] = useState(BUYCOL);
  const [sellCol, setSellCol] = useState(SELLCOL);
  const [buyPrice, setBuyPrice] = useState("");
  const [sellPrice, setSellPrice] = useState("");
  const [buyCount, setBuyCount] = useState("");
  const [sellCount, setSellCount] = useState("");

  const _onAddBuy = () => {
    _onAddPriceLevel(buyPrice, buyCount, buyCol, setBuyCol);
  };

  const _onAddSell = () => {
    _onAddPriceLevel(sellPrice, sellCount, sellCol, setSellCol);
  };

  const _onAddPriceLevel = (
    priceString: any,
    countString: any,
    col: any,
    setCol: any
  ) => {
    const price = +priceString;
    const count = +countString;
    if (price > 0 && count > 0) {
      const buyPriceLevels = col.map((priceLevel: any) => priceLevel.price);
      if (buyPriceLevels.includes(price)) {
        const updatedBuyCol = col.map((priceLevel: any) => {
          if (price === priceLevel.price) {
            return { ...priceLevel, number: priceLevel.number + count };
          }
          return priceLevel;
        });
        setCol(updatedBuyCol);
      } else {
        const updatedBuyCol = [...col, { price: price, number: count }];
        updatedBuyCol.sort((a, b) => {
          return b.price - a.price;
        });
        setCol(updatedBuyCol);
      }
    }
    return;
  };

  return (
    <div className="flex flex-col gap-3 items-center p-10 bg-background-black text-white h-screen">
      <div className="flex gap-3 max-w-xl">
        <div className="flex flex-col gap-3">
          <BaseInput
            title="Price"
            value={buyPrice}
            onChange={(e) => setBuyPrice(e.target.value.replace(/\D/g, ""))}
          />
          <BaseInput
            title="Quantity"
            value={buyCount}
            onChange={(e) => setBuyCount(e.target.value.replace(/\D/g, ""))}
          />
          <Button preset="success" text="Buy" onClick={_onAddBuy} />
        </div>

        <div className="flex flex-col gap-3">
          <BaseInput
            title="Price"
            value={sellPrice}
            onChange={(e) => setSellPrice(e.target.value.replace(/\D/g, ""))}
          />
          <BaseInput
            title="Quantity"
            value={sellCount}
            onChange={(e) => setSellCount(e.target.value.replace(/\D/g, ""))}
          />
          <Button preset="error" text="Sell" onClick={_onAddSell} />
        </div>
      </div>

      <div className="bg-neutral-800/50 p-2 rounded-md">
        <Wall col={buyCol} preset="buy" />
        <Wall col={sellCol} preset="sell" />
      </div>
    </div>
  );
}

export default App;
