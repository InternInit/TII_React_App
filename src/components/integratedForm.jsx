import React, { Component } from "react";
import PageInternshipInformation from "/Users/hongzhenzhang/Desktop/2019-2020/Extracurriculars/TII/TII-app/src/components/pageInternshipInformation.jsx";

class IntegratedForm extends Component {
  state = {
    page: 0,
    internshipInformation: {
      firstName: "",
      lastName: "",
      phone: null,
      email: "",
      addressLine: "",
      city: "",
      usState: "",
      zipcode: "",
      yearOfGraduation: null,
      industry: "",
      unweightedGPA: null,
      weightedGPA: null,
      courses: "",
      Extracurriculars: "",
      daysToWork: null,
      timesToWork: null,
      dateOfStart: null,
      dateOfEnd: null,
      paidUnpaid: null,
      resume: null
    }
  };

  render() {
    return (
      <div>
        <PageInternshipInformation />
      </div>
    );
  }
}

export default IntegratedForm;
