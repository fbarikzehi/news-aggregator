import React from 'react';
import { InputProps } from "../types/props";

const Input: React.FC<InputProps> = ({
  id,
  label,
  type = 'text',
  value,
  onChange,
  placeholder,
  disabled = false,
  required = false,
  className = '',
  error,
}) => {
  const inputId = id || `input-${Math.random().toString(36).substring(2, 9)}`; 

  return (
    <div className={`input-wrapper ${className}`}>
      {label && (
        <label htmlFor={inputId} className="input-label">
          {label}
          {required && <span className="input-required"> *</span>}
        </label>
      )}
      <input
        id={inputId}
        type={type}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        disabled={disabled}
        required={required}
        className={`input-field ${error ? 'input-field--error' : ''}`}
        aria-invalid={!!error}
        aria-describedby={error ? `${inputId}-error` : undefined}
      />
      {error && (
        <span id={`${inputId}-error`} className="input-error">
          {error}
        </span>
      )}
    </div>
  );
};

export default Input;