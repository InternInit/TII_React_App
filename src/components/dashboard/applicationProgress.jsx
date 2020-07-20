import React, { Component } from "react";
import styled from "styled-components";
import "../../App.css";
import "./dashboard.css";
import "antd/dist/antd.css";
import Checklist from "./checklist.jsx";
import { Progress, Button } from "antd";
import { CheckCircleTwoTone } from "@ant-design/icons";
import QueueAnim from "rc-queue-anim";
import { withRouter } from "react-router";
import { connect } from "react-redux";
import { updateCompletionState } from '../../redux/actions';
import Companytab from './Companytab.js'
import ActiveAppCompanytab from './ActiveAppCompanytab.js'
/*

Container to hold all the progress bars

*/
const ModuleContainer = styled.div`
  background: white;
  border-radius: 10px;
  padding: 3%;
`;

/*

Header for name of the progress module
(e.g. Internship Information, Personal, Essays, References)

*/
const ProgressHeader = styled.h2`
  margin-bottom: 7px;
  display: inline;
  float: left;

  font-weight: bold;
  font-size: 24px;
  line-height: 28px;
  align-items: center;

  color: black;
`;

/*

Header for the percent complete

*/
const PercentHeader = styled.h2`
  display: inline;
  float: right;

  font-weight: bold;
  font-size: 18px;
`;

/*

Link at the bottom of the progress bar to open a custom checklist

*/
const ViewChecklist = styled.p`
  margin-top: 4px;
  margin-bottom: 15px;

  font-family: Roboto;
  font-style: italic;
  font-weight: normal;
  font-size: 14px;
  line-height: 16px;
  align-items: center;
  color: #1890ff;
`;

/*
******************************************
PERCENT COMPLETION ARRAY
[0] == Title Of the Section
[1] == Trail Color
[2] == Stroke Color
[3] == Access code for the state
******************************************
*/
const percentComplete = [
  [
    "Internship Information",
    "#e6f7ff",
    "#1890ff",
    "internshipInfoChecklist"
  ],
  ["Personal", "#fff7e6", "#fa8c16", "personalChecklist"],
  ["Essays", "#fcffe6", "#a0d911", "essayChecklist"],
  ["References", "#f9f0ff", "#722ed1", "referencesChecklist"]
]

const mapStateToProps = state => {
  return {
    completionState: state.completionState,
    completionChecklist: state.completionChecklist
  }
}

const mapDispatchToProps = {
  updateCompletionState
}


// BUG: THIS NEEDS TO BE REPLACED BY THE REACT STORE
let pinnedCompanies = [
  { name: "This", industry: "Computer Science", status: 'pending' },
  { name: "is", industry: "Computer Science", status: 'accepted' },
  { name: "Pinned", industry: "Computer Science", status: 'rejected' },
  { name: "Company", industry: "Consulting", status: 'accepted' },
  { name: "Grubhub", industry: "Real Estate", status: 'pending' }
];


class ApplicationProgress extends Component {
  constructor(props) {
    super(props);
    this.state = {
      internshipInfoChecklist: false,
      personalChecklist: false,
      essayChecklist: false,
      referencesChecklist: false,

    };
  }

  handleClick = section => {
    const {
      internshipInfoChecklist,
      personalChecklist,
      essayChecklist,
      referencesChecklist
    } = this.state;

    switch (section) {
      case "Internship Information":
        this.setState({
          internshipInfoChecklist: !internshipInfoChecklist
        });
        console.log(this.state);
        break;
      case "Personal":
        this.setState({
          personalChecklist: !personalChecklist
        });
        console.log(this.state);
        break;
      case "Essays":
        this.setState({
          essayChecklist: !essayChecklist
        });
        console.log(this.state);
        break;
      case "References":
        this.setState({
          referencesChecklist: !referencesChecklist
        });
        console.log(this.state);
        break;
      default:
        break;
    }
  };

  render() {
    return (
      <React.Fragment>

        {/**
          * 
          * Application Progress
          * 
          */}
        <h1 className="module-name">Application Progress</h1>
        <ModuleContainer>

          {percentComplete.map((section, index) => (
            <React.Fragment>
              {/**
               * Progress Bar Name
               */}
              <ProgressHeader key={section[0] + "pheader"}>
                {section[0]}
              </ProgressHeader>


              {/**
               * Percent Name
               */}
              <PercentHeader>
                {this.props.completionState[index] < 1 ? (
                  this.props.completionState[index] * 100 + "%"
                ) : (
                    <CheckCircleTwoTone
                      style={{ fontSize: "24px" }}
                      twoToneColor="#52c41a"
                    />
                  )}
              </PercentHeader>

              {/**
               * Progress Bar
               */}
              <Progress
                percent={this.props.completionState[index] * 100}
                trailColor="#e6f7ff"
                strokeColor={
                  //section[1] < 100 ? section[3] : "#52c41a"
                  this.props.completionState[index] < 1
                    ? { from: "#108ee9", to: "#87d068" }
                    : "#52c41a"
                }
                strokeWidth="15px"
                status="active"
                showInfo={false}
              />

              {/**
               * Checklist Text
               */}
              <ViewChecklist>
                <a onClick={() => this.handleClick(section[0])}>
                  View Checklist
                </a>
              </ViewChecklist>


              {/**
               * Displaying Checkboxes
               */}
              <div>
                {this.state[section[3]] ? (
                  <Checklist checklist={this.props.completionChecklist} page={index} />
                ) : null}
              </div>

            </React.Fragment>
          ))}
        </ModuleContainer>


        {/**
         *
         * Pinned Companies
         *
         */}
        <h1 className="module-name" style={{ marginTop: "70px" }}>Pinned Companies</h1>
        <QueueAnim
          type={["right", "left"]}
          ease={["easeOutQuart", "easeInOutQuart"]}
        >
          {pinnedCompanies.map((pinnedCompany, index) => (
            <div style={{ marginBottom: "12px" }} key={index}>

              <Companytab
                name={pinnedCompany.name}
                industry={pinnedCompany.industry}
                logo={pinnedCompany.logo}
              />

            </div>
          ))}
        </QueueAnim>


        <h1 className="module-name" style={{ marginTop: "70px" }}>Active Application</h1>
        <QueueAnim
          type={["right", "left"]}
          ease={["easeOutQuart", "easeInOutQuart"]}
        >
          {pinnedCompanies.map((pinnedCompany, index) => (
            <div style={{ marginBottom: "12px" }} key={index}>

              <ActiveAppCompanytab
                name={pinnedCompany.name}
                industry={pinnedCompany.industry}
                logo={pinnedCompany.logo}
                status={pinnedCompany.status}
              />


            </div>
          ))}
        </QueueAnim>








      </React.Fragment>
    );
  }
}

export default withRouter(connect(
  mapStateToProps,
  mapDispatchToProps)(ApplicationProgress));
