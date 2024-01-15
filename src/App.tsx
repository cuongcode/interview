import React, { useState } from 'react';
import { Wall, Button } from './components';

const BUYCOL = [
  {price: 42000, number: 15},
  {price: 41000, number: 14},
  {price: 40000, number: 12},
  {price: 39000, number: 10},
  {price: 38000, number: 9},
]
const SELLCOL = [
  {price: 37000, number: 15},
  {price: 36000, number: 9},
  {price: 35000, number: 17},
  {price: 34000, number: 13},
  {price: 33000, number: 8},
]

function App() {
const [buyCol, setBuyCol] = useState(BUYCOL)
const [sellCol, setSellCol] = useState(SELLCOL)
const [buyPrice, setBuyPrice] = useState(0)
const [sellPrice, setSellPrice] = useState(0)
const [buyCount, setBuyCount] = useState(0)
const [sellCount, setSellCount] = useState(0)

const _onAddBuy = () => {
  _onAddPriceLevel(buyPrice, buyCount, buyCol, setBuyCol)
}

const _onAddSell = () => {
  _onAddPriceLevel(sellPrice, sellCount, sellCol, setSellCol)
}

const _onAddPriceLevel = (price:any, count:any, col:any, setCol:any) => {
  if (price > 0 && count > 0 ) {
    const buyPriceLevels = col.map((priceLevel:any)=>priceLevel.price)
    if (buyPriceLevels.includes(price)) {
      const updatedBuyCol =  col.map((priceLevel:any) => {
        if (price === priceLevel.price) {
          return (
            {...priceLevel, number: priceLevel.number + count}
          )
        }
        return priceLevel
      })
      setCol(updatedBuyCol)
    } else {
      const updatedBuyCol = [...col, {price: price, number: count}]
      updatedBuyCol.sort((a, b) => {
        return b.price - a.price
      })
      setCol(updatedBuyCol)
    }
  }
  return
}

  return (
    <div className="p-10 bg-background-black text-white h-screen">
      <div className='flex flex-col'>
        <div>Price</div>
        <input type="number" className='border border-gray-200 text-gray-500' value={buyPrice} onChange={(e) => setBuyPrice(Number(e.target.value))}/>
        <div>Quantity</div>
        <input type="number" className='border border-gray-200 text-gray-500' value={buyCount} onChange={(e) => setBuyCount(Number(e.target.value))}/>
        <Button preset='success' text='Buy' onClick={_onAddBuy} />
      </div>

      <div className='flex flex-col'>
        <div>Price</div>
        <input type="number" className='border border-gray-200 text-gray-500' value={sellPrice} onChange={(e) => setSellPrice(Number(e.target.value))}/>
        <div>Quantity</div>
        <input type="number" className='border border-gray-200 text-gray-500' value={sellCount} onChange={(e) => setSellCount(Number(e.target.value))}/>
        <Button preset='error' text='Sell' onClick={_onAddSell} />
      </div>

      <div className=''> 
        <Wall col={buyCol} preset='buy'/>
        <Wall col={sellCol} preset='sell'/>
      </div>
    </div>
  );
}

export default App;