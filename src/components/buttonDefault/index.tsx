import React from 'react';
import './styles.css';

export type TButtonProps = React.PropsWithChildren<
  React.ButtonHTMLAttributes<HTMLButtonElement>
>;

export const buttonDefaultClassesBase = 'button-custom bg-blue-500 text-white rounded px-4 py-2 hover:bg-sky-700 focus:outline-none focus:ring-2 focus:ring-blue-500 '

const ButtonDefault = ({ children, className, ...props }: TButtonProps) => {
  return (
    <button
      className={
        className
          ? 'button-custom focus:outline-none focus:ring-2 focus:ring-blue-500 ' + className
          : buttonDefaultClassesBase
      }
      {...props}
    >
      {children}
    </button>
  );
};

export default ButtonDefault;
