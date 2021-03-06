import React from "react";
import Aux from "../../../hoc/Aux";
import Button from "../../UI/Button/Button";

const orderSummary = props => {
  const ingredientSummay = Object.keys(props.ingredients).map(igKey => {
    return (
      <li key={igKey}>
        <span style={{ textTransform: "capitalize" }}>{igKey} </span>:
        {props.ingredients[igKey]}
      </li>
    );
  });
  return (
    <Aux>
      <h3>Your Order</h3>
      <p>A delicious burger with the following ingredients:</p>
      <ul>{ingredientSummay}</ul>
      <p>
        <strong>Total Price : {props.price}</strong>
      </p>
      <p>Continue to checkout?</p>
      <Button btnType="Danger" clicked={props.purchaseCancelled}>
        Cancel
      </Button>
      <Button btnType="Success" clicked={props.purchaseContinued}>
        Continue
      </Button>
    </Aux>
  );
};

export default orderSummary;
