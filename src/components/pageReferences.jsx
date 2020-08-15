import React, { Component } from "react";
import { Form, Input, Button, Spin } from "antd";
import { Row, Col } from "antd";
import { MinusCircleOutlined, PlusOutlined } from "@ant-design/icons";
import "../App.css";

//React Routing
import { withRouter } from "react-router";

//Redux
import { connect } from 'react-redux';
import { updateCompletionState, updateCompletionChecklist } from '../redux/actions'

import _ from 'lodash'

//Formatting
const formGutter = [16, 16];
const standardSpan = 24;
const halfSpan = standardSpan / 2;
const formItemLayout = {
  labelCol: {
    xs: { span: 24 },
    sm: { span: 4 }
  },
  wrapperCol: {
    xs: { span: 24 },
    sm: { span: 24 }
  }
};
const formItemLayoutWithOutLabel = {
  wrapperCol: {
    xs: { span: 24, offset: 0 },
    sm: { span: 24, offset: 0 }
  }
};

//Functions
const validationRules = (required, inputName, type, pattern) => [
  {
    required: required,
    message: "Please input your " + inputName,
    type: type,
    pattern: pattern
  }
];
const boldify = text => <strong>{text}</strong>;

//Props
const formItemProps = {
  totalForm: {
    layout: "vertical",
    align: "left",
    className: "pageReferences"
  },
  inputField: function (required, field, label, name, validationType, pattern) {
    return {
      key: [field.fieldKey, name],
      label: boldify(label),
      name: [field.name, name],
      rules: validationRules(
        required,
        label,
        validationType ? validationType : "string",
        pattern
      )
    };
  },
  addButton: {
    type: "dashed",
    size: "large",
    style: { width: "100%", marginTop: "10px", marginBottom: "30px" }
  }
};

const mapStateToProps = state => {
  return {
    completionState: state.completionState,
    completionChecklist: state.completionChecklist
  }
}

const mapDispatchToProps = {
  updateCompletionState,
  updateCompletionChecklist
}

class PageReferences extends Component {
  formRef = React.createRef();

  state = {
    loaded: false
  };

  componentDidMount() {
    this.getUserData();
  }

  componentWillUnmount() {
    this.updateFieldData();
  }

  constructor(props) {
    super(props);
    this.routeChange = this.routeChange.bind(this);
  }
  render() {
    return (
      <div style={{ width: "100%", marginTop: "40px" }}>
        <Spin size="large" spinning={!this.state.loaded}>
          <h1> References</h1>
          <p>
            Add your reference(s) here. This could be someone who has worked with you in the past, a previous employer, teacher, coach, pastor, etc. This should not be a family member.
          </p>
          <Form
            {...formItemProps.totalForm}
            onFinish={this.onFinish}
            ref={this.formRef}
            onValuesChange={this.onValuesChange}
          >
            <Form.List name="Reference">
              {(fields, { add, remove }) => {
                return (
                  <div style={{ marginTop: "40px" }}>
                    {fields.map((field, index) => (
                      <div className="educationBox">
                        <Form.Item
                          {...(index === 0
                            ? formItemLayout
                            : formItemLayoutWithOutLabel)}
                          required={false}
                          key={field.key}
                        >
                          {/**
                          *
                          * Minus Button removes Reference when clicked
                          *
                          */}
                          {this.renderMinusButton(fields, field, remove)}



                          {/**
                            *
                            * First Row of Reference Box
                            *
                            */}
                          <Row gutter={formGutter}>
                            <Col span={halfSpan}>
                              {/**First name of Reference */}
                              <Form.Item
                                {...formItemProps.inputField(
                                  true,
                                  field,
                                  "First Name",
                                  "First Name"
                                )}
                              >
                                <Input />
                              </Form.Item>
                            </Col>
                            <Col span={halfSpan}>
                              {/**Last name of Reference */}
                              <Form.Item
                                {...formItemProps.inputField(
                                  true,
                                  field,
                                  "Last Name",
                                  "Last Name"
                                )}
                              >
                                <Input />
                              </Form.Item>
                            </Col>
                          </Row>



                          {/**
                              *
                              * Second Row of Reference Box
                              *
                              */}

                          <Row gutter={formGutter}>
                            <Col span={halfSpan}>
                              {/**Company of Reference */}
                              <Form.Item
                                {...formItemProps.inputField(
                                  true,
                                  field,
                                  "School/Company",
                                  "School/Company"
                                )}
                              >
                                <Input />
                              </Form.Item>
                            </Col>
                            <Col span={halfSpan}>
                              {/**position within company of Reference */}
                              <Form.Item
                                {...formItemProps.inputField(
                                  true,
                                  field,
                                  "Title",
                                  "Title"
                                )}
                              >
                                <Input />
                              </Form.Item>
                            </Col>
                          </Row>


                          {/**
                           *
                           * School Contact (EMAIL, PHONE NUMBER )
                           *
                           */}
                          <Row gutter={formGutter}>
                            <Col span={halfSpan}>
                              <Form.Item
                                {...formItemProps.inputField(
                                  true,
                                  field,
                                  "Phone Number",
                                  "Phone Number",
                                  "string",
                                  /^(1?([-\s]?\(?\d{3}\)?)[-\s]?)(\d{3})([-\s]?\d{4})$/
                                )}
                                extra="Please input your phone number without any formatting."
                              >
                                <Input />
                              </Form.Item>
                            </Col>
                            <Col span={halfSpan}>
                              <Form.Item
                                {...formItemProps.inputField(
                                  true,
                                  field,
                                  "Email",
                                  "Email",
                                  "email"
                                )}
                              >
                                <Input />
                              </Form.Item>
                            </Col>
                          </Row>
                        </Form.Item>
                      </div>
                    ))}
                    {/**Outside Reference Box */}

                    {/**Add Reference Button */}
                    <Form.Item>
                      <Button
                        {...formItemProps.addButton}
                        onClick={() => {
                          add();
                        }}
                      >
                        <PlusOutlined /> Add Reference
                      </Button>
                    </Form.Item>
                  </div>
                );
              }}
            </Form.List>

            {/**Submit Button */}
            <Form.Item>
              <Button
                className="back-button"
                type="primary"
                htmlType="button"
                onClick={this.backHandler}
              >
                Previous
              </Button>
              <Button className="next-button" type="primary" htmlType="submit">
                Submit
              </Button>
            </Form.Item>
          </Form>
        </Spin>
      </div>
    );
  }

  /**
 *
 * Removing a Reference
 *
 */
  renderMinusButton = (fields, field, remove) => {
    return fields.length > 1 ? (
      <MinusCircleOutlined
        className="dynamic-delete-button"
        style={{
          fontSize: "18px",
          padding: "0 8px 0 0"
        }}
        onClick={() => {
          remove(field.name);
        }}
      />
    ) : null;
  };


  /**
 *
 * When a Reference is added
 *
 */
  onValuesChange = () => {
    let allValues = this.formRef.current.getFieldsValue()

    let completedCount = 0;
    let checklist = [];
    for (var field in allValues) {
      if (allValues.hasOwnProperty(field)) {
        let item = {};
        item.key = field
        if (typeof allValues[field] !== 'undefined' && allValues[field] !== "") {
          completedCount++;
          item.completed = true
        } else {
          item.completed = false
        }
        //console.log(item)
        checklist.push(item)
      }
    }
    let completionPercentage = parseFloat((completedCount / Object.keys(allValues).length).toFixed(2));
    if (completionPercentage !== this.props.completionState[3]) this.props.updateCompletionState(3, completionPercentage)

    if (!_.isEqual(checklist, this.props.completionChecklist[3])) this.props.updateCompletionChecklist(3, checklist)
  }


  /**
   *
   * When "Submit" Button is pressed
   *
   */
  onFinish = values => {
    console.log("FinishRefPage:", values);
    this.props.updateCompletionState(3, 1.0);
    this.props.onSubmit(values, "3");
    this.routeChange("/submission-success");
  };

  /**
 *
 * Updates User data
 *
 */
  updateFieldData = async () => {
    const values = await this.formRef.current.getFieldsValue();

    this.props.updateData(values, "3");

  };

  /**
 *
 * When "Back" Button is pressed
 *
 */
  backHandler = () => {
    this.props.updateData(this.formRef.current.getFieldsValue(), "3");
    this.routeChange("/apply/written-work");
  };


  /**
 *
 * Changing routes (React Router)
 *
 */
  routeChange = path => {
    console.log(path);
    this.props.clickThree();
    this.props.history.push(path);
  };

  /**
   *
   * Retrieving user data
   *
   */
  getUserData = async () => {
    let token = await this.props.getJwt();
    fetch("/api/get_user_data", {
      method: "POST",
      headers: {
        Authorization: "Bearer " + JSON.parse(JSON.stringify(token))
      },
      body: 3
    })
      .then(response => response.json())
      .then(data => {
        let parsedRecv = JSON.parse(data);
        let parsedData = parsedRecv.formData;
        if (parsedRecv !== "No Info") {
          try {
            this.setState({ loaded: true });
            this.formRef.current.setFieldsValue(parsedData);
          } catch (e) { }
        }
        this.setState({ loaded: true });
      });
  };
}

export default withRouter(connect(
  mapStateToProps,
  mapDispatchToProps
)(PageReferences));
