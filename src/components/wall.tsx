import { Candle } from './candle'
import { Text } from './text'
import clsx from 'clsx';

export const Wall = ({col, preset}:{col:any; preset:any}) => {
    return (
      <div className=''>
      {col.map((row:any)=> {
        return (
          <div key={row.price} className='grid grid-cols-[80px_1fr] overflow-clip'>
            <Text preset='p4' className={clsx('w-20', preset === 'buy' ? 'text-success-80' : '', preset === 'sell' ? 'text-error-80' : '')}>{row.price}</Text>
            <Candle preset={preset} number={row.number}/>
          </div>
        )
      })}
    </div>
    );
  };