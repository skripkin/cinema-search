import React from "react";
import inputStyles from "./input.module.css";

interface IInputProp {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
}

const Input = ({ value, onChange, placeholder }: IInputProp) => {
  return (
    <input
      className={inputStyles.input}
      value={value}
      onChange={(e) => onChange(e.target.value)}
      placeholder={placeholder}
    />
  );
};

export default Input;
