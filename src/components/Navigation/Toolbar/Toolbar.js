import React from "react";
import "./Toolbar.css";
import Logo from "../../UI/Logo/logo";
import NavigationItems from "../NavigationItems/NavigationItems";
import DrawerToggle from "../../Navigation/SideDrawer/DrawerToggle/DrawerToggle";

const toolbar = props => (
  <header className="Toolbar">
    <DrawerToggle clicked={props.drawerToggleClicked} />
    <div className="Logo">
      <Logo />
    </div>
    <nav className="DesktopOnly">
      <NavigationItems isAuth={props.isAuthenticated} />
    </nav>
  </header>
);

export default toolbar;
