import React, { useState, FC } from "react";
import { Wall, Button, BaseInput, Text } from "./components";
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
  const [User1, setUser1] = useState({btc: 13, usdt: 1000000})
  const [User2, setUser2] = useState({btc: 20, usdt: 2000000})
  const [User3, setUser3] = useState({btc: 5, usdt: 3000000})
  const [User4, setUser4] = useState({btc: 18, usdt: 1500000})
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

      <div className="flex flex-col bg-bluetheme-60 p-4 rounded-md mt-5 w-72 gap-3">
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
    </div>
  );
}

export default App;

interface InputSectionProps {
  price: any; 
  count: any; 
  onAdd: any; 
  setPrice: any; 
  setCount: any; 
  text: any; 
  preset: any;
  btc?: any;
  usdt?: any;
}

const InputSection:FC<InputSectionProps> = (props) => {
  const {price, count, onAdd, setPrice, setCount, text, preset, btc, usdt} = props

  return (
    <div className="flex flex-col gap-2">
    <BaseInput
      value={price}
      placeholder="Price"
      onChange={(e) => setPrice(e.target.value.replace(/\D/g, ""))}
      suffix="USDT"
    />
    <BaseInput
      value={count}
      placeholder="Amount"
      onChange={(e) => setCount(e.target.value.replace(/\D/g, ""))}
      suffix="BTC"
    />
    <div className="flex items-center justify-between">
      <Text preset="p4" text="Total"/>
      <Text preset="p4" text={((+price)*(count)).toString()} />
    </div>
    <div className="flex items-center justify-between">
      <Text preset="p5" text="Available"/>
      {btc ? 
        <Text preset="p5" text={btc}/>
      : null }
      {usdt ? 
        <Text preset="p5" text={usdt}/>
      : null }
    </div>
    <Button className="mt-2" preset={preset} text={text} onClick={onAdd} disabled={price === '' || count === ''}/>
  </div>
  );
};

const SwitchButton = ({preset, text, isBuy, onClick}:{preset:keyof typeof SwitchButtonPreset; text:string; isBuy:boolean, onClick:any}) => {
  const SwitchButtonPreset = {
    buy: clsx("w-1/2 flex items-center justify-center text-p2 border-t-4", isBuy ? 'border-t-success-100': ''),
    sell: clsx("w-1/2 flex items-center justify-center text-p2 border-t-4", !isBuy ? 'border-t-error-100': '')
  }
  return (
    <button onClick={onClick} className={SwitchButtonPreset[preset]}>{text}</button>
  );
};