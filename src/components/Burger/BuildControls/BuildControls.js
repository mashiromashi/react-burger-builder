import React from "react";
import "./BuildControls.css";
import BuildControl from "../../Burger/BuildControls/BuildControl/BuildControl";

const controls = [
  { label: "Salad", type: "salad" },
  { label: "Bacon", type: "bacon" },
  { label: "Meat", type: "meat" },
  { label: "Cheese", type: "cheese" }
];

const buildControls = props => (
  <div className="BuildControls">
    <p>
      Current Prices : <strong>{props.price}</strong>
    </p>
    {controls.map(ctrl => (
      <BuildControl
        key={ctrl.label}
        label={ctrl.label}
        added={() => props.ingredientsAdded(ctrl.type)}
        removed={() => props.ingredientsRemoved(ctrl.type)}
        disabled={props.disabled[ctrl.type]}
      />
    ))}
    <button
      className="OrderButton"
      disabled={!props.purchaseable}
      onClick={props.ordered}
    >
      {props.isAuth ? "Order Now" : "Sign Up To Order"}
    </button>
  </div>
);

export default buildControls;
