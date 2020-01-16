import React from "react";
import Logo from "../../UI/Logo/logo";
import NavigationItems from "../NavigationItems/NavigationItems";
import "./SideDrawer.css";
import BackDrop from "../../UI/BackDrop/BackDrop";
import Aux from "../../../hoc/Aux";

const SideDrawer = props => {
  let attachClasses = ["SideDrawer", "Close"];
  if (props.open) {
    attachClasses = ["SideDrawer", "Open"];
  }
  return (
    <Aux>
      <BackDrop show={props.open} clicked={props.closed} />
      <div className={attachClasses.join(" ")} onClick={props.closed}>
        <div className="Logo">
          <Logo />
        </div>
        <nav>
          <NavigationItems isAuth={props.isAuthenticated} />
        </nav>
      </div>
    </Aux>
  );
};
export default SideDrawer;
