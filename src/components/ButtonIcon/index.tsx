import React from 'react';
import { TButtonProps } from '@/components/buttonDefault';

export type TButtonIconProps = {
  Icon: () => React.ReactNode;
} & TButtonProps;

const ButtonIconDefault = ({ children, Icon, ...props }: TButtonIconProps) => {
  return (
    <div>
      <Icon />
      <button {...props}> {children} </button>;
    </div>
  );
};

export default ButtonIconDefault;
