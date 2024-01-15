import clsx from "clsx";
import type { FC, ReactNode } from "react";
import React from "react";

interface BaseInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  value?: string;
  title?: string;
  placeholder?: string;
  errorText?: ReactNode | string;
  className?: string;
  onChange?: React.ChangeEventHandler<HTMLInputElement>;
  disabled?: boolean;
  prefix?: string;
}

export const BaseInput: FC<BaseInputProps> = (props) => {
  const {
    value,
    title,
    placeholder,
    errorText,
    className,
    onChange,
    disabled,
    prefix,
    ...rest
  } = props;
  return (
    <div className="flex flex-col w-32">
      <div className="text-sm">{title}</div>
      <div
        className={clsx(
          "flex items-center gap-2 overflow-hidden border border-gray-700 rounded-sm",
          className
        )}
      >
        {prefix ? (
          <div className="flex flex-1 items-center justify-center self-stretch bg-main-bbg px-4 text-sm font-light">
            {prefix}
          </div>
        ) : null}
        <input
          type="text"
          placeholder={placeholder}
          className="min-w-0 w-full bg-transparent p-1 text-sm outline-none font-light placeholder:text-sm"
          value={value}
          onChange={onChange}
          disabled={disabled}
          {...rest}
        />
      </div>
    </div>
  );
};
