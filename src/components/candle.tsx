import { FC } from 'react';
import clsx from 'clsx';

interface CandleProps {
  number: number;
  preset: keyof typeof CandlePreset
}

export const Candle:FC<CandleProps> = (props) => {
  const {number, preset} = props
  return (
    <div
      className={clsx('opacity-60', CandlePreset[preset])}
      style={{width: `${(number*10).toString()}px`}}
    >
      {number}
    </div>
  );
};

const CandlePreset = {
  buy: 'bg-success-100',
  sell: 'bg-error-100',
}