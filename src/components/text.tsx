import { FC, ReactNode } from "react";
import clsx from "clsx";

const textPreset = {
  h1: 'text-h1 font-bold',
  h2: 'text-h2 font-bold',
  h3: 'text-h3 font-bold',
  h4: 'text-h4 font-bold',
  h5: 'text-h5 font-bold',
  h6: 'text-p1 font-bold',

  p1b: 'text-p1 font-semibold',
  p2b: 'text-p2 font-semibold',
  p3b: 'text-p3 font-semibold',
  p4b: 'text-p4 font-semibold',
  p5b: 'text-p5 font-semibold',
  p6b: 'text-p6 font-semibold',

  p1: 'text-p1',
  p2: 'text-p2',
  p3: 'text-p3',
  p4: 'text-p4',
  p5: 'text-p5',
  p6: 'text-p6',
}

export const Text:FC<TextProps> = (props) => {
  const {text, className, children, preset} = props
  return (
    <div className={clsx(textPreset[preset], className)}>
      {text || children}
    </div>
  );
};

type TextPresets = keyof typeof textPreset;
interface TextProps {
  text?: string;
  children?: ReactNode;
  className?: string;
  preset: TextPresets;
}