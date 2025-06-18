import React from 'react';

type TSelectProps = React.PropsWithChildren<
  React.ButtonHTMLAttributes<HTMLSelectElement>
>;

const SelectDefault = ({ children, ...props }: TSelectProps) => {
  return <select {...props}> {children} </select>;
};

export default SelectDefault;
