import React, { DetailedHTMLProps, InputHTMLAttributes } from 'react';
type TInputProps = React.PropsWithChildren<
  DetailedHTMLProps<InputHTMLAttributes<HTMLInputElement>, HTMLInputElement>
>;

const InputDefault = ({ children, className, ...props }: TInputProps) => {
  return (
    <input
      className={
        className
          ? 'input-default ' + className
          : 'input-default border px-3 py-2 w-full rounded'
      }
      {...props}
    />
  );
};

export default InputDefault;
