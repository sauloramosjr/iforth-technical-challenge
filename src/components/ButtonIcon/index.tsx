import React from 'react';
import { TButtonProps } from '@/components/ButtonDefault';

export type TButtonIconProps = {
  Icon: () => React.ReactNode;
} & TButtonProps;

const ButtonDefault = ({ children, Icon, ...props }: TButtonIconProps) => {
  return (
    <div>
      <Icon />
      <button {...props}> {children} </button>;
    </div>
  );
};

export default ButtonDefault;
