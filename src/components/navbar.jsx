//Standard React Import
import React, { Component } from "react";

//CSS Imports
import "antd/dist/antd.css";
import "../App.css";

//Ant Design Imports
import { Menu } from "antd";

//Logo Import
import Logo from "../TII-logo.png";

//React Router
import { Link } from "react-router-dom";
import { withRouter } from "react-router";

class Navbar extends Component {
  constructor(props) {
    super(props);
    this.routeChange = this.routeChange.bind(this);
    this.state = {
      current: this.getCurrentKey()
    };
  }

  getCurrentKey = () => {
    if (window.location.pathname.includes("apply/")) {
      return "apply";
    }
    let defaultKey = window.location.pathname;
    let newDefaultKey = defaultKey.replace("/", "");
    return newDefaultKey;
  };

  //Click Handler
  handleClick = e => {
    console.log("click ", e);
    this.setState({
      current: e.key
    });
  };

  routeChange = path => {
    this.props.history.push(path);
  };

  render() {
    return (
      <Menu
        onClick={this.handleClick}
        selectedKeys={[this.state.current]}
        mode="horizontal"
      >
        {/*Moved the logo to a Fragment instead of a menu item to prevent
          random clicking until the dashboard is implemented in the next
          version*/}
        <React.Fragment>
          <img className="TII-logo" alt="Tii-logo" src={Logo} />
        </React.Fragment>

        {/*
          Dashboard route for implementation in the next version.

          <Menu.Item key="dashboard">
          <Link to="/dashboard">Dashboard</Link>
        </Menu.Item>

        */}
        <Menu.Item
          key="how-to-apply"
          onClick={() => {
            this.routeChange("/how-to-apply");
          }}
        >
          How to Apply
        </Menu.Item>
        <Menu.Item key="apply">
          <Link to="/apply/Internship-Info/">Apply</Link>
        </Menu.Item>

        <Menu.Item
          key="logout"
          onClick={() => {
            this.props.logout();
          }}
        >
          Logout
        </Menu.Item>

        {/*
          Special submission route for choosing schools to be implemented
          in the next version.

          <Menu.Item key="submit">Submit</Menu.Item>
          */}
      </Menu>
    );
  }
}

export default withRouter(Navbar);
