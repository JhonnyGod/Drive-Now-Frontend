// components/ui/Card.tsx
import React from 'react';


export const Card = ({ children, className = '' }) => {
  return (
    <div className={`bg-white border border-gray-200 shadow-md rounded-lg p-4 ${className}`}>
      {children}
    </div>
  );
};

export const CardContent = ({
  children,
  className = '',
}) => {
  return <div className={`p-4 ${className}`}>{children}</div>;
};


