import React, { useState } from 'react';

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
  if (buyPrice > 0 && buyCount > 0 ) {
    const buyPriceLevels = buyCol.map((priceLevel)=>priceLevel.price)
    if (buyPriceLevels.includes(buyPrice)) {
      const updatedBuyCol =  buyCol.map((priceLevel) => {
        if (buyPrice === priceLevel.price) {
          return (
            {...priceLevel, number: priceLevel.number + buyCount}
          )
        }
        return priceLevel
      })
      setBuyCol(updatedBuyCol)
    } else {
      const updatedBuyCol = [...buyCol, {price: buyPrice, number: buyCount}]
      updatedBuyCol.sort((a, b) => {
        return b.price - a.price
      })
      setBuyCol(updatedBuyCol)
    }
  }
  return
}
const _onAddSell = () => {
  console.log(sellPrice)
}

  return (
    <div className="App">

      <div className=''>
        <button onClick={_onAddBuy}>Buy</button>
        <div>Price</div>
        <input type="number" className='border border-gray-200' value={buyPrice} onChange={(e) => setBuyPrice(Number(e.target.value))}/>
        <div>Quantity</div>
        <input type="number" className='border border-gray-200' value={buyCount} onChange={(e) => setBuyCount(Number(e.target.value))}/>
      </div>

      <div>
        <button onClick={_onAddSell}>Sell</button>
        <div>Price</div>
        <input type="number" className='border border-gray-200' value={sellPrice} onChange={(e) => setSellPrice(Number(e.target.value))}/>
        <div>Quantity</div>
        <input type="number" className='border border-gray-200' value={sellCount} onChange={(e) => setSellCount(Number(e.target.value))}/>
      </div>

      <div className='flex flex-col w-fit'> 
        <div className='bg-green-500 flex flex-col'>
          {buyCol.map((row)=> {
            return (
              <div key={row.price} className='flex gap-5'>
                <div>{row.price}</div>
                <div>{row.number}</div>
              </div>
            )
          })}
        </div>
          
        <div className='bg-red-500 flex flex-col'>
          {sellCol.map((row)=> {
            return (
              <div key={row.price} className='flex gap-5'>
                <div>{row.price}</div>
                <div>{row.number}</div>
              </div>
            )
            })}
          </div>
        </div>
    </div>
  );
}

export default App;