import React from "react";
import "./Input.css";

const Input = props => {
  let inputElement = null;
  const inputClasses = ["InputElement"];

  if (props.invalid && props.shouldValidate && props.touched) {
    inputClasses.push("Invalid");
  }
  switch (props.elementtype) {
    case "input":
      inputElement = (
        <input
          className={inputClasses.join(" ")}
          {...props.elementconfig}
          value={props.value}
          onChange={props.changed}
        />
      );
      break;
    case "select":
      inputElement = (
        <select
          className={inputClasses.join(" ")}
          value={props.value}
          onChange={props.changed}
        >
          {props.elementconfig.options.map(option => (
            <option key={option.value} value={option.value}>
              {option.displayValue}
            </option>
          ))}
        </select>
      );
      break;
    case "textarea":
      inputElement = (
        <textarea
          className={inputClasses.join(" ")}
          {...props}
          value={props.value}
          onChange={props.changed}
        />
      );
      break;
    default:
      inputElement = (
        <input
          className={inputClasses.join(" ")}
          {...props}
          value={props.value}
          onChange={props.changed}
        />
      );
  }

  let validationError = null;
  if (props.invalid && props.touched) {
    validationError = <p>Please enter a valid value!</p>;
  }

  return (
    <div className="Input">
      <label className="Label">{props.label}</label>
      {validationError}
      {inputElement}
    </div>
  );
};

export default Input;
