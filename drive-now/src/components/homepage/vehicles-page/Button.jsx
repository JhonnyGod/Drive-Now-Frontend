// components/ui/Button.tsx
import React from 'react';

export const Button = ({
  children,
  onClick,
  className = '',
  variant = 'primary',
  size = 'medium',
}) => {
  const baseStyles = 'transition-all duration-300 ease-in-out transform hover:scale-105';
  const variantStyles = variant === 'primary' 
    ? 'bg-sky-500 hover:bg-sky-600 text-white' 
    : 'bg-white text-sky-500 hover:bg-sky-100';
  
  const sizeStyles = size === 'small'
    ? 'px-3 py-2 text-sm'
    : size === 'large'
    ? 'px-6 py-3 text-lg'
    : 'px-4 py-2 text-base';

  return (
    <button
      onClick={onClick}
      className={`rounded-md ${baseStyles} ${variantStyles} ${sizeStyles} ${className}`}
    >
      {children}
    </button>
  );
};


