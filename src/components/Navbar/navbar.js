import React from "react";
// importing Styles
import Style from "./navbar.module.css";

const navbar = () => {
  return (
    <nav className={Style.navbar}>
      <div className={Style.navbar_left}>
        <img className={Style.navbar_icon} alt="Icon" 
        src="https://cdn-icons-png.flaticon.com/128/1776/1776704.png"/>
        <h1 className={Style.navbar_title}>PhotoFolio</h1>
      </div>
    </nav>
  );
};

export default navbar;