import React from "react";
import "../NavigationItems/NavigationItems.css";
import NavigationItem from "../NavigationItems/NavigationItem/NavigationItem";
import Aux from "../../../hoc/Aux";

const NavigationItems = props => (
  <ul className="NavigationItems">
    <NavigationItem link="/" exact>
      Burger Builder
    </NavigationItem>

    {props.isAuth ? (
      <Aux>
        <NavigationItem link="/orders">Orders</NavigationItem>
        <NavigationItem link="/logout">Logout</NavigationItem>
      </Aux>
    ) : (
      <NavigationItem link="/auth">Authentication</NavigationItem>
    )}
  </ul>
);

export default NavigationItems;
