import clsx from 'clsx';
import { FC } from "react";

interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  text?: string;
  preset: keyof typeof ButtonPreset;
  fetch?: boolean;
}

export const Button:FC<ButtonProps> = (props) => {
  const {text, preset, children, className, onClick, disabled, fetch, ...rest} = props

  return (
    <button
      className={clsx(
        ButtonPreset[preset],
        disabled ? 'opacity-20 disabled:pointer-events-none':'',
        fetch ? 'flex items-center justify-center':'',
        className
      )}
      disabled={disabled}
      {...rest}
    >
      {fetch ? null : text }
      {fetch ? null : children }
    </button>
  );
};

const regularButton = 'rounded-[12px] w-[220px] h-[40px] text-p4 text-white font-medium focus:ring-[2px] focus:ring-offset-2 focus:ring-offset-background-black'

const ButtonPreset = {
  base: '',
  primary: `${regularButton} bg-primary-100 hover:bg-primary-80 focus:ring-primary-100 focus:bg-primary-100`,
  secondary: `${regularButton} bg-secondary-100 hover:bg-secondary-80 focus:ring-secondary-100 focus:bg-secondary-100`,
  success: `${regularButton} bg-success-100 hover:bg-success-80 focus:ring-success-100 focus:bg-success-100`,
  warning: `${regularButton} bg-warning-100 hover:bg-warning-80 focus:ring-warning-100 focus:bg-warning-100`,
  error: `${regularButton} bg-error-100 hover:bg-error-80 focus:ring-error-100 focus:bg-error-100`,
}