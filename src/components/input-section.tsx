import { FC } from "react";
import { BaseInput } from "./input";
import { Text } from "./text";
import { Button } from "./button";

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
  
export const InputSection:FC<InputSectionProps> = (props) => {
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
      <Button preset={preset} text={text} onClick={onAdd} disabled={price === '' || count === ''}/>
    </div>
    );
  };