import React from 'react';
import './styles.scss';

export type TButtonProps = React.PropsWithChildren<
  React.ButtonHTMLAttributes<HTMLButtonElement>
>;
const ButtonDefault = ({ children, ...props }: TButtonProps) => {
  return (
    <button
      className="bg-blue-500 text-white rounded px-4 py-2 button-custom"
      {...props}
    >
      {' '}
      {children}{' '}
    </button>
  );
};

export default ButtonDefault;
