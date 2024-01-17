import React, { useState, FC } from "react";
import { Wall, Button, BaseInput, Text, InputSection, SwitchButton, UserBoard, SelectUserDropdown } from "./components";
import { BUYCOL, SELLCOL, USERS } from "./constants/constants";
import { clsx } from "clsx";
import { ChevronDownIcon } from '@heroicons/react/24/outline'
import { useCheckClickOutside } from "./hooks";
import { sortAsc, sortDes } from "./utils";

function App() {
  const [selectedUser, setSelectedUser] = useState('user1')
  const [users, setUsers] = useState(USERS)
  const [buyCol, setBuyCol] = useState(BUYCOL);
  const [sellCol, setSellCol] = useState(SELLCOL);
  // const [buyCol, setBuyCol] = useState<any>([]);
  // const [sellCol, setSellCol] = useState([]);
  const [buyPrice, setBuyPrice] = useState("");
  const [sellPrice, setSellPrice] = useState("");
  const [buyCount, setBuyCount] = useState("");
  const [sellCount, setSellCount] = useState("");
  const [isBuy, setIsBuy] = useState(true)

  // const _onAddBuy = () => {
  //   _onAddPriceLevel(selectedUser, buyPrice, buyCount, buyCol, setBuyCol);
  //   setBuyPrice("")
  //   setBuyCount("")
  // };

  // const _onAddSell = () => {
  //   _onAddPriceLevel(selectedUser, sellPrice, sellCount, sellCol, setSellCol);
  //   setSellPrice("")
  //   setSellCount("")
  // };
  const _onAddBuy = () => {
    _onBookBuyPrice(selectedUser, buyPrice, buyCount, buyCol, setBuyCol);
    setBuyPrice("")
    setBuyCount("")
  };

  const _onAddSell = () => {
    _onBookSellPrice(selectedUser, sellPrice, sellCount, sellCol, setSellCol);
    setSellPrice("")
    setSellCount("")
  };

  // const _onAddPriceLevel = (
  //   user: string,
  //   priceString: any,
  //   countString: any,
  //   col: any,
  //   setCol: any
  // ) => {
  //   const price = +priceString;
  //   const count = +countString;
  //   if (price > 0 && count > 0) {
  //     const priceLevels = col.map((priceLevel: any) => priceLevel.price);
  //     if (priceLevels.includes(price)) {
  //       const updatedCol = col.map((priceLevel: any) => {
  //         if (price === priceLevel.price) {
  //           return { ...priceLevel, number: priceLevel.number + count };
  //         }
  //         return priceLevel;
  //       });
  //       setCol(updatedCol);
  //     } else {
  //       const updatedCol = [...col, { price: price, number: count }];
  //       updatedCol.sort((a, b) => {
  //         return b.price - a.price;
  //       });
  //       setCol(updatedCol);
  //     }
  //   }
  //   return;
  // };
  const udpateSellUserValue = (user:any, ticket:any, minusAmount: any) => {
    setUsers((prev) => {
      return prev.map((u) => {
        if(u.name === ticket.name) {
          return {...u, btc: u.btc-minusAmount, usdt: u.usdt + (minusAmount*ticket.price)}
        }
        if(u.name === user) {
          return {...u, btc: u.btc+minusAmount, usdt: u.usdt - (minusAmount*ticket.price)}
        }
        return u
      })
    })
  }
  const udpateBuyUserValue = (user:any, ticket:any, plusAmount:any, price: any) => {
    setUsers((prev) => {
      return prev.map((u) => {
        if(u.name === ticket.name) {
          return {...u, btc: u.btc+plusAmount, usdt: u.usdt - (plusAmount*price)}
        }
        if(u.name === user) {
          return {...u, btc: u.btc-plusAmount, usdt: u.usdt + (plusAmount*price)}
        }
        return u
      })
    })
  }
  const _onBookBuyPrice = (
    user: string,
    priceString: any,
    countString: any,
    col: any,
    setCol: any
  ) => {
    const price = +priceString;
    let count = +countString;
    const copySellCol = sortAsc([...sellCol])
    const updatedSellCol = copySellCol.map((ticket) => {
      if (price >= ticket.price && count > 0) {
        count -= ticket.number
        if (count > 0) {
          udpateSellUserValue(user, ticket, ticket.number)
          return {...ticket, number: 0}
        }
        if (count === 0) {
          udpateSellUserValue(user, ticket, ticket.number)
          return {...ticket, number: 0}
        }
        if (count < 0) {
          udpateSellUserValue(user, ticket, ticket.number+count)
          return {...ticket, number: -count}
        }
      }
      return ticket
    })
    setSellCol(updatedSellCol)
    if (count > 0) {
      const updatedBuyCol = sortDes([...buyCol, {name: user, price: priceString, number: count}])
      setBuyCol(updatedBuyCol)
    }
  }
  const _onBookSellPrice = (
    user: string,
    priceString: any,
    countString: any,
    col: any,
    setCol: any
  ) => {
    const price = +priceString;
    let count = +countString;
    const copyBuyCol = sortDes([...buyCol])
    const updatedBuyCol = copyBuyCol.map((ticket) => {
      if (price <= ticket.price && count > 0) {
        count -= ticket.number
        if (count > 0) {
          udpateBuyUserValue(user, ticket, ticket.number, price)
          return {...ticket, number: 0}
        }
        if (count === 0) {
          udpateBuyUserValue(user, ticket, ticket.number, price)
          return {...ticket, number: 0}
        }
        if (count < 0) {
          udpateBuyUserValue(user, ticket, ticket.number+count, price)
          return {...ticket, number: -count}
        }
      }
      return ticket
    })
    setBuyCol(updatedBuyCol)
    if (count > 0) {
      const updatedSellCol = sortAsc([...sellCol, {name: user, price: priceString, number: count}])
      setSellCol(updatedSellCol)
    }
  }

  return (
    <div className="flex flex-col gap-2 items-center p-10 bg-bluetheme-100 text-white min-h-screen">
      <SelectUserDropdown users={users} selectedUser={selectedUser} setSelectedUser={setSelectedUser} className="w-72 mb-3"/>

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
        {/* <Text preset="p3" text="37500" className="text-success-60"/> */}
        <Wall col={sellCol} preset="sell" />
      </div>

      <UserBoard users={users} className="mt-5"/>
    </div>
  );
}

export default App;

