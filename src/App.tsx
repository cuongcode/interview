import React, { useState, FC } from "react";
import { Wall, Button, BaseInput, Text, InputSection, SwitchButton, UserBoard } from "./components";
import { BUYCOL, SELLCOL, USERS } from "./constants/constants";
import { clsx } from "clsx";

function App() {
  const [users, setUsers] = useState(USERS)
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
    <div className="flex flex-col gap-2 items-center p-10 bg-bluetheme-100 text-white min-h-screen">
      <div className="flex w-72 items-center justify-between">
        <SwitchButton preset="buy" text="Buy" isBuy={isBuy} onClick={()=>setIsBuy(true)}/>
        <SwitchButton preset="sell" text="Sell" isBuy={isBuy} onClick={()=>setIsBuy(false)}/>
      </div>
      {isBuy ? 
        <InputSection text='Buy' preset='success' price={buyPrice} count={buyCount} onAdd={_onAddBuy} setPrice={setBuyPrice} setCount={setBuyCount}/>
      : 
        <InputSection text='Sell' preset='error' price={sellPrice} count={sellCount} onAdd={_onAddSell} setPrice={setSellPrice} setCount={setSellCount}/>
      }

      <div className="flex flex-col bg-bluetheme-60 p-4 rounded-md w-72 gap-3 mt-5">
        <div className="grid grid-cols-[80px_1fr]">
          <Text preset="p4" text="Price" className="font-thin"/>
          <Text preset="p4" text="Amount"className="font-thin"/>
          <Text preset="p6" text="USDT"className="font-thin"/>
          <Text preset="p6" text="BTC"className="font-thin"/>
        </div>
        <Wall col={buyCol} preset="buy" />
        <Text preset="p3" text="37500" className="text-success-60"/>
        <Wall col={sellCol} preset="sell" />
      </div>

      <UserBoard users={users} className="mt-5"/>
    </div>
  );
}

export default App;

