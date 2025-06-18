import React from 'react';

type TInputProps = React.PropsWithChildren<
  React.ButtonHTMLAttributes<HTMLInputElement>
>;

const InputDefault = ({ children, ...props }: TInputProps) => {
  return <input {...props}> {children} </input>;
};

export default InputDefault;
