import React from 'react';

const LayoutDashboard = ({ children }: React.PropsWithChildren) => {
  return <div>
        <span>aqui é o header do layout</span>
     {children}
        <span>aqui é o footer do layout</span>
      </div>;
};

export default LayoutDashboard;
