import { FC } from 'react';
import { Text } from './text';
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
      style={{width: `${(number*10).toString()}px`, maxWidth: '200px'}}
    >
      <Text preset='p4' text={number.toString()}/>
    </div>
  );
};

const CandlePreset = {
  buy: 'bg-success-100',
  sell: 'bg-error-100',
}