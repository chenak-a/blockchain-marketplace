import React, { Component } from "react";
import { Link } from "react-router-dom";
import back from "./images/back.svg";
import homeB from "./images/Vector_1.svg";
import profile from "./images/Profile1.svg";
import store from "./images/Store.svg";
import lo1 from "./images/pro.svg";
import logo from "./images/Union.svg";
import logo1 from "./images/Union2.svg";
import "./App.css";

export class nav extends Component {
  static propTypes = {};

  render() {
    return (
      <nav>
        <Link to="/">
          <img id="home" src={homeB} alt="Logo" />
        </Link>
        <Link to="profile">
          <img id="profile" src={profile} />
        </Link>
        <Link to="Store">
          <img id="store" src={store} />
        </Link>
        <Link to="/">
          <img id="lo1" src={lo1} />
        </Link>
        <Link to="/">
          <img id="logo1" src={logo1} />
        </Link>
        <Link to="/">
          <img id="logo" src={logo} />
        </Link>
      </nav>
    );
  }
}

export default nav;
