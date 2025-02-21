import React from 'react';
import { ButtonProps } from "../types/props";


const Button: React.FC<ButtonProps> = ({
  children,
  onClick,
  type = 'button',
  disabled = false,
  variant = 'primary',
  size = 'medium',
  className = '',
}) => {
  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={`btn btn--${variant} btn--${size} ${className}`}
      aria-disabled={disabled}
    >
      {children}
    </button>
  );
};

export default Button;