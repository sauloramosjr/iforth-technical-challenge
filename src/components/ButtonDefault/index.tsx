import React from 'react';
import './styles.css';

export type TButtonProps = React.PropsWithChildren<
  React.ButtonHTMLAttributes<HTMLButtonElement>
>;
const ButtonDefault = ({ children, className, ...props }: TButtonProps) => {
  return (
    <button
      className={
        className
          ? 'button-custom ' + className
          : 'button-custom bg-blue-500 text-white rounded px-4 py-2 w-100'
      }
      {...props}
    >
      {children}
    </button>
  );
};

export default ButtonDefault;
