import React from "react";
import { Layout, Menu, notification } from "antd";

import {
  CheckOutlined,
  CloseOutlined,
  UserOutlined,
  EditOutlined,
  ContainerOutlined,
  TeamOutlined
} from "@ant-design/icons";

//React Routing
import { BrowserRouter as Router, Link } from "react-router-dom";
import { withRouter } from "react-router";

class TiiNav extends React.Component {
  getInitialHighlight = () => {
    switch (this.props.location.pathname) {
      case "/apply/Internship-Info":
        return Array.from("1");
        break;
      case "/apply/Personal":
        return Array.from("2");
        break;
      case "/apply/Written-Work":
        return Array.from("3");
        break;
      case "/apply/References":
        return Array.from("4");
        break;
    }
  };


  componentDidUpdate(prevProps, prevState){
    this.handleClick();
  }


  constructor(props) {
    super(props);
    this.routeChange = this.routeChange.bind(this);
    this.state = {
      //states
      InternIComplete: false,
      PersonalComplete: false,
      EssayComplete: false,
      ReferencesComplete: false,

      //icons
      InternButton: <ContainerOutlined />,
      PersonalButton: <UserOutlined />,
      EssayButton: <EditOutlined />,
      ReferencesButton: <TeamOutlined />,
      TestButton: <CheckOutlined style={{ color: "green" }} />,

      //submission
      SubmitButton: "",
      CanSubmit: false,

      //Styles
      collapseStyle: {
        padding: "8px",
        display: "flex",
        justifyContent: "center",
        color: "gray",
        backgroundColor: "ghostwhite"
      },

      modFlag: false
    };
  }

  render() {
    const { Sider } = Layout;
    let {
      InternButton,
      PersonalButton,
      EssayButton,
      ReferencesButton
    } = this.state;
    let { SubmitButton } = this.state;
    return (
      <Sider //styling the sider
        style={{
          position: "fixed",
          overflow: "initial",
          width: "207px",

          margin: "10px",
          marginTop: "5%"
        }}
      >
        <Menu //Navigation Panel
          theme="light"
          mode="inline"
          defaultSelectedKeys={this.getInitialHighlight()}
          selectedKeys={this.getInitialHighlight()}
        >
          <Menu.Item
            key="1"
            onClick={() => {
              this.routeChange("/apply/Internship-Info");
            }}
          >
            {InternButton}
            <span>Internship Info</span>
          </Menu.Item>

          <Menu.Item
            key="2"
            onClick={() => {
              this.routeChange("/apply/Personal");
            }}
          >
            {PersonalButton}

            <span>Personal</span>
          </Menu.Item>

          <Menu.Item
            key="3"
            onClick={() => {
              this.routeChange("/apply/Written-Work");
            }}
          >
            {EssayButton}
            <Router>
              <span>Written Work</span>
            </Router>
          </Menu.Item>

          <Menu.Item
            key="4"
            onClick={() => {
              this.routeChange("/apply/References");
            }}
          >
            {ReferencesButton}
            <Router>
              <Link to="/apply/References">
                <span>References</span>
              </Link>
            </Router>
          </Menu.Item>
          <Menu.Item
            style={{
              marginTop: "100%",
              display: "flex",
              alignContent: "center",
              justifyContent: "center"
            }}
            key="5"
            onClick={this.handleSubmit} //checks other states before allowing submit
          >
            {SubmitButton}
            <span>Submit</span>
          </Menu.Item>
        </Menu>
      </Sider>
    );
  }

  handleSubmit = () => {
    let {
      InternIComplete,
      EssayComplete,
      ReferencesComplete,
      PersonalComplete
    } = this.state;
    if (
      InternIComplete &&
      EssayComplete &&
      ReferencesComplete &&
      PersonalComplete
    ) {
      // checks to see if all forms are completed
      this.setState({ CanSubmit: true }); //sets canSubmit to true
      notification.open({
        //notification
        message: "Success.",
        description: "Your results have been submitted",
        icon: <CheckOutlined style={{ color: "green" }} />
      });
    } else {
      notification.open({
        message: "Failed.",
        description: "You have to fill all necessary forms.",
        icon: <CloseOutlined style={{ color: "red" }} />
      });
    }
  };

  handleClick = async(e) => {
    //The handleClick function is purely for testing. When you click on the first button, it will set all states to "true"
    let completionState = await this.props.getCompletionState();
    console.log(completionState)


    for (var i = 0; i < completionState.length; i++) {
      switch (i){
        case 0:
          if(completionState[i] === true){
            if(this.state.InternButton.type.render.displayName !== "CheckOutlined"){
              this.setState({InternButton:<CheckOutlined style={{ color: "green" }} />})
            }
          } else {
            if(this.state.InternButton.type.render.displayName !== "ContainerOutlined"){
              this.setState({InternButton: <ContainerOutlined />})
            }
          }
          break;
        case 1:
          this.state.EssayButton = ((completionState[i]) ? <CheckOutlined style={{ color: "green" }} /> : <EditOutlined />)
          break;
        case 2:
          this.state.PersonalButton = ((completionState[i]) ? <CheckOutlined style={{ color: "green" }} /> : <UserOutlined />)
          break;
        case 3:
          this.state.ReferencesButton = ((completionState[i]) ? <CheckOutlined style={{ color: "green" }} /> : <TeamOutlined />)
          break;

      }

    }



  };

  routeChange = path => {
    if (path === "/apply/Internship-Info") {
      this.props.clickOne();
    } else if (path === "/apply/Personal") {
      this.props.clickTwo();
    } else if (path === "/apply/Written-Work") {
      this.props.clickThree();
    } else if (path === "/apply/References") {
      this.props.clickFour();
    }
    this.props.history.push(path);
  };
}
export default withRouter(TiiNav);
