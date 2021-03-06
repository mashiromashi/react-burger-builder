import React from "react";
import "./Order.css";

const Order = props => {
  const ingredients = [];

  for (let ingredientsName in props.ingredients) {
    ingredients.push({
      name: ingredientsName,
      amount: props.ingredients[ingredientsName]
    });
  }

  const ingredientsOutput = ingredients.map(ingredient => (
    <span
      key={ingredient.name}
      style={{
        textTransform: "capitalize",
        display: "inline-block",
        margin: "0 8px",
        border: "1px solid #ccc",
        padding: "5px"
      }}
    >
      {ingredient.name}
      {ingredient.amount}
    </span>
  ));

  return (
    <div className="Order">
      <p>Ingredients : {ingredientsOutput}</p>
      <p>
        Prices : <strong>USD {props.price}</strong>
      </p>
    </div>
  );
};

export default Order;
