import clsx from "clsx";

export const SwitchButton = ({preset, text, isBuy, onClick}:{preset:keyof typeof SwitchButtonPreset; text:string; isBuy:boolean, onClick:any}) => {
    const SwitchButtonPreset = {
      buy: clsx("w-1/2 flex items-center justify-center text-p2 border-t-4", isBuy ? 'border-t-success-100': ''),
      sell: clsx("w-1/2 flex items-center justify-center text-p2 border-t-4", !isBuy ? 'border-t-error-100': '')
    }
    return (
      <button onClick={onClick} className={SwitchButtonPreset[preset]}>{text}</button>
    );
  };