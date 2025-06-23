import React from 'react';
import ButtonDefault, { TButtonProps } from '../buttonDefault';

export type TButtonIconProps = {
  Icon: () => React.ReactNode;
} & TButtonProps;

const ButtonIconDefault = ({
  children,
  Icon,
  className,
  ...props
}: TButtonIconProps) => {
  return (
    <ButtonDefault
      {...props}
      className={
        className
          ? 'button-custom ' + className
          : 'button-custom flex gap-2 bg-blue-500 text-white rounded px-4 py-2 hover:bg-sky-700'
      }
    >
      <Icon />
      {children}
    </ButtonDefault>
  );
};

export default ButtonIconDefault;
