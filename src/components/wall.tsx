import { Candle } from './candle'

export const Wall = ({col, preset}:{col:any; preset:any}) => {
    return (
      <div className=''>
      {col.map((row:any)=> {
        return (
          <div key={row.price} className='flex'>
            <div className='w-20'>{row.price}</div>
            <Candle preset={preset} number={row.number}/>
          </div>
        )
      })}
    </div>
    );
  };