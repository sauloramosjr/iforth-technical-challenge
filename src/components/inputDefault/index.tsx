import React, { DetailedHTMLProps, InputHTMLAttributes } from 'react';
type TInputProps = React.PropsWithChildren<
  DetailedHTMLProps<InputHTMLAttributes<HTMLInputElement>, HTMLInputElement>
> & { error?: boolean };

const InputDefault = ({
  children,
  className,
  error,
  ...props
}: TInputProps) => {
  return (
    <input
      className={
        className
          ? 'input-default border px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 rounded ' +
            className +
            `${error && 'border-red-500'}`
          : 'input-default border px-3 py-2 w-full rounded focus:outline-none focus:ring-2 focus:ring-blue-500 ' +
            `${error && ' border-red-500'}`
      }
      {...props}
    />
  );
};

export default InputDefault;
