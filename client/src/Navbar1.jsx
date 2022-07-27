import React, { useState } from "react";
import styles from "./Navbar1.css";
import Primelogo from "./Images/Primelogo.svg";
import LanguageEnLogo from "./Images/Nav1_Language.svg";
import { Link } from "react-router-dom";
import { useEffect } from "react/cjs/react.development";

export const Navbar1 = (props) => {
  let email = "Login";
  if (props.email) {
    email = props.email;
  }

  return (
    <div className={"nav1_mainDiv"}>
      <div className={"nav1_leftDiv_primelogo"}>
        <Link to={"/"}>
          <img className={"nav1_img"} src={Primelogo} alt="" />
        </Link>
      </div>
      <div className={"nav1_rightDiv"}>
        

        <div className={"nav1_rightDiv_signIn"}>
          <Link className={"nav1_rightDiv_signIn_link"} to="/login">
            {email}
          </Link>
        </div>
      </div>
    </div>
  );
};
