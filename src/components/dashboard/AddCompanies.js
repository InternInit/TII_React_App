import React from "react";
import styled from "styled-components";
import { Input } from "antd";
import SearchCompanytab from "./SearchCompanytab.js";
import { Collapse, Checkbox, Pagination } from "antd";
import { Col as AntCol, Row as AntRow } from "antd";
import QueueAnim from "rc-queue-anim";
import { withRouter } from "react-router";
import { filter } from "underscore";
import Companytab from "./Companytab.js";

const { Search } = Input;
const { Panel } = Collapse;

//Formatting
const formGutter = [16, 16];
const checkGutter = [8, 8];
const standardSpan = 24;
const thirdSpan = standardSpan / 3;

const ModuleContainer = styled.div`
  background: white;
  border-radius: 10px;
  padding: 3%;
`;

const Row = styled.div`
  margin-bottom: 22px;
  display: flex;
  flex-direction: row;
  align-items: flex-start;
`;

const Button = styled.div`
  color: white;
  background-color: #bcdfff;
  font-size: 18px;
  border-radius: 2px;
  width: 100px;
  height: 36px;
  display: flex;
  align-self: center;
  align-items: center;
  justify-content: center;
  box-shadow: 1px 3px 1px #d9d9d9;
  :hover {
    cursor: pointer;
    background-color: #a6c5e0;
  }
`;

const industry = [
  "General Business",
  "Consulting",
  "Finance or Accounting",
  "Media or Tellecommunications",
  "Real Estate",
  "Engineering",
  "Science Research",
  "Computer Science",
  "Biotechnology",
  "Vocational",
  "Political",
  "Marketing"
];

let Info = [
  { name: "Apple", industry: "Computer Science" },
  { name: "Facebook", industry: "Computer Science" },
  { name: "Github", industry: "Computer Science" },
  { name: "Grindr", industry: "Consulting" },
  { name: "Grubhub", industry: "Real Estate" },
  { name: "Hello Brandon", industry: "Media or Tellecommunications" },
  { name: "Hubspot", industry: "Marketing" },
  { name: "Joseph Zhang", industry: "General Business" },
  { name: "LinkedIn", industry: "General Business" },
  { name: "Microsoft", industry: "Computer Science" },
  { name: "NASA", industry: "Engineering" },
  { name: "Netflix", industry: "Media or Tellecommunications" },
  { name: "qgy type letters", industry: "Political" },
  { name: "Tesla", industry: "Biotechnology" },
  { name: "Tinder", industry: "Vocational" },
  { name: "Desk", industry: "Political" },
  { name: "Table", industry: "Marketing" },
  { name: "Chair", industry: "Political" },
  { name: "Mouse", industry: "Real Estate" },
  { name: "Mousepad", industry: "Finance or Accounting" },
  { name: "Moniter", industry: "Media or Tellecommunications" },
  { name: "Laptop", industry: "Consulting" },
  { name: "Charger", industry: "Computer Science" },
  { name: "iPhone 8", industry: "Real Estate" },
  { name: "Brandon Lu", industry: "Engineering" },
  { name: "dwasdwasdwas", industry: "Science Research" },
  { name: "Poop", industry: "General Business" },
  { name: "Hehehehe", industry: "Vocational" },
  { name: "Hahahaha", industry: "Biotechnology" },
  { name: "WHOOOOOO", industry: "Consulting" },
  { name: "Company Name", industry: "Finance or Accounting" },
  { name: "lets GO", industry: "Political" },
];

// BUG: THIS NEEDS TO BE REPLACED BY THE REACT STORE
let pinnedCompanies = [
  { name: "This", industry: "Computer Science" },
  { name: "is", industry: "Computer Science" },
  { name: "Pinned", industry: "Computer Science" },
  { name: "Company", industry: "Consulting" },
  { name: "Grubhub", industry: "Real Estate" }
];

class AddCompanies extends React.Component {
  constructor(props) {
    super(props);
    this.myRef = React.createRef();
    this.state = {
      search: "",
      industries: industry,
      companies: [],
      page: '0',
      mergedIndustry:
        "General BusinessConsultingFinance or AccountingMedia or TellecommunicationsReal EstateEngineeringScience ResearchComputer ScienceBiotechnologyVocationalPoliticalMarketing",

    };
    this.searchCompany = this.searchCompany.bind(this);
    this.filterIndustries = this.filterIndustries.bind(this);
    this.mergeIndustries = this.mergeIndustries.bind(this);
    this.handlePageChange = this.handlePageChange.bind(this);

  }

  render() {
    let { search, mergedIndustry } = this.state;
    let { companies, page } = this.state;

    //Filtering function for industries
    let industrySearch = Info.filter(company => {
      return (
        mergedIndustry.toLowerCase().indexOf(company.industry.toLowerCase()) !== -1
      );
    });

    //Filtering function for company names
    let filteredInfo = industrySearch.filter(company => {
      return company.name.toLowerCase().indexOf(search.toLowerCase()) !== -1;
    });

    return (
      <div style={{ paddingBottom: "50%" }}>
        <h1 className="module-name">Pinned Companies</h1>



        {/**
         *
         * Pinned Companies
         *
         */}
        <QueueAnim
          type="scale"
          ease={["easeOutQuart", "easeInOutQuart"]}
        >
          {pinnedCompanies.map((pinnedCompany, index) => (
            <div style={{ marginBottom: "12px" }} key={index}>


              <SearchCompanytab
                key={pinnedCompany.name}
                name={pinnedCompany.name}
                industry={pinnedCompany.industry}
                logo="filler"
                image="filler"
                description="filler"
                location="filler"
              />



            </div>
          ))}
        </QueueAnim>




        <h1 className="module-name" style={{ marginTop: "100px" }} ref={this.myRef}>
          Search Companies
        </h1>

        {/**
         *
         * Search bar
         *
         */}
        <Search
          placeholder="Search Company Name"
          allowClear="true"
          size="large"
          onChange={value => this.searchCompany(value)}
          style={{ width: "100%", marginBottom: "20px" }}
        />




        {/**
         *
         * Filter by industries Collapse Tab
         *
         */}
        <Row style={{ width: '100%' }} >
          <Collapse defaultActiveKey={["0"]} expandIconPosition="right"
          >
            <Panel header="Filter by Industry">
              <AntRow gutter={formGutter}>
                <AntCol span={standardSpan}>
                  <Checkbox.Group
                    onChange={value => this.filterIndustries(value)}
                  >
                    <AntRow gutter={checkGutter}>
                      {industry.map(industry => (
                        <AntCol span={thirdSpan}
                          style={{
                            display: 'flex',
                            alignItems: 'flex-start',
                          }}>

                          <Checkbox
                            key={industry}
                            value={industry}
                            style={{
                              lineHeight: "32px",
                              marginLeft: '25%'

                            }}
                          >
                            {industry}
                          </Checkbox>
                        </AntCol>
                      ))}
                    </AntRow>
                  </Checkbox.Group>
                </AntCol>
              </AntRow>
            </Panel>
          </Collapse>
        </Row>




        {/**
         *
         * Mapping of search results
         *
         */}
        <QueueAnim type="scale" ease={["easeOutQuart", "easeInOutQuart"]}>
          {filteredInfo.slice(page, page + 20).map((company, index) => (
            <div style={{ marginBottom: "12px" }} key={index}>
              <SearchCompanytab
                key={company.name}
                name={company.name}
                industry={company.industry}
                logo="filler"
                image="filler"
                description="filler"
                location="filler"
              />


            </div>
          ))}
        </QueueAnim>
        <Pagination current={parseInt(page) + 1} total={filteredInfo.length} onChange={pageChange => this.handlePageChange(pageChange - 1)} pageSize={20} />





      </div >
    );
  }

  componentDidMount = () => {
    for (let i = 1; i < 109; i++) {
      fetch("https://rawg-video-games-database.p.rapidapi.com/games/" + i, {
        method: "GET",
        headers: {
          "x-rapidapi-host": "rawg-video-games-database.p.rapidapi.com",
          "x-rapidapi-key": "24cc20e856msh686f79ed61d6951p112e88jsn8082d8031701",
          "entries": 109
        }
      })
        .then(response => {
          return response.json();
        })
        .then(result => {
          this.state.companies.push(result);
        })
        .catch(err => {
          console.log(err);
        });
    }
    console.log(this.state.companies)
  }


  //handles pagination bar change
  handlePageChange = (pageChange) => {
    this.setState({ page: pageChange * 20 })
    window.scrollTo(0, this.myRef.current.offsetTop - 25)
  }


  //Handles search bar changes
  searchCompany = (event) => {
    this.setState({ search: event.target.value.substring(0, 20), page: 0 });
  }



  //Filtering industry checkboxes
  filterIndustries = (event) => {
    this.setState({ industries: event }, this.stateCallback);
  }



  //Logging info in console
  stateCallback = () => {
    console.log(this.state.industries);
    this.mergeIndustries();
  }



  //Sending information to filter function
  mergeIndustries = () => {
    let { industries } = this.state;
    let tempVar = "";
    //Creates a variable with all desired industries
    industries.map(industry => (tempVar += industry));
    //Sets the industries state to the temporary variable
    this.setState({ mergedIndustry: tempVar, page: 0 });

    //Handles 'all industries'
    if (tempVar === "") {
      this.setState({
        page: 0,
        mergedIndustry:
          "General BusinessBusinessConsultingFinance or AccountingMedia or TellecommunicationsReal EstateEngineeringScience ResearchComputer ScienceBiotechnologyVocationalPoliticalMarketing"
      });
    }
  }


}
export default withRouter(AddCompanies);
