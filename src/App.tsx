import React, { useState } from "react";
import { Wall, Button, BaseInput } from "./components";
import { clsx } from "clsx";

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
  const [isBuy, setIsBuy] = useState(true)

  const _onAddBuy = () => {
    _onAddPriceLevel(buyPrice, buyCount, buyCol, setBuyCol);
    setBuyPrice("")
    setBuyCount("")
  };

  const _onAddSell = () => {
    _onAddPriceLevel(sellPrice, sellCount, sellCol, setSellCol);
    setSellPrice("")
    setSellCount("")
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
    <div className="flex flex-col gap-2 items-center p-10 bg-background-black text-white min-h-screen">
      <div className="flex w-72 items-center justify-between">
        <button onClick={()=>setIsBuy(true)} className={clsx("w-1/2 flex items-center justify-center text-p2 border-t-4", isBuy ? 'border-t-success-100': '')}>Buy</button>
        <button onClick={()=>setIsBuy(false)} className={clsx("w-1/2 flex items-center justify-center text-p2 border-t-4", !isBuy ? 'border-t-error-100': '')}>Sell</button>
      </div>
      <div className="flex gap-4 max-w-xl">
        {isBuy ? 
        <InputSection text='Buy' preset='success' price={buyPrice} count={buyCount} onAdd={_onAddBuy} setPrice={setBuyPrice} setCount={setBuyCount}/>
        : 
        <InputSection text='Sell' preset='error' price={sellPrice} count={sellCount} onAdd={_onAddSell} setPrice={setSellPrice} setCount={setSellCount}/>
        }
      </div>

      <div className="bg-neutral-800/50 p-2 rounded-md mt-5">
        <Wall col={buyCol} preset="buy" />
        <Wall col={sellCol} preset="sell" />
      </div>
    </div>
  );
}

export default App;

const InputSection = ({price, count, onAdd, setPrice, setCount, text, preset}:{
  price:any, count:any, onAdd:any, setPrice:any, setCount:any, text:any, preset:any
}) => {
  return (
    <div className="flex flex-col gap-5">
    <BaseInput
      title="Price"
      value={price}
      onChange={(e) => setPrice(e.target.value.replace(/\D/g, ""))}
    />
    <BaseInput
      title="Quantity"
      value={count}
      onChange={(e) => setCount(e.target.value.replace(/\D/g, ""))}
    />
    <Button className="mt-2" preset={preset} text={text} onClick={onAdd} disabled={price === '' || count === ''}/>
  </div>
  );
};