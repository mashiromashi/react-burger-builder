import React from "react";
import LogoImg from "../../../assets/images/burger-logo.png";
import "./Logo.css";

const logo = props => (
  <div className="LogoClass">
    <img src={LogoImg} alt="myburger" />
  </div>
);

export default logo;
