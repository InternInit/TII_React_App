import React from "react";
import { Form, Input, Button, message, Upload } from "antd";
import { InboxOutlined } from "@ant-design/icons";
import "../App.css";

//React Routing
import { BrowserRouter as Router, Link } from 'react-router-dom';
import { withRouter } from 'react-router'

//Object Destructuring
const { TextArea } = Input;
const { Dragger } = Upload;

//Handles file uploading
const props = {
  name: "file",
  accept: ".doc,.docx,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document, .pdf, application/pdf",
  multiple: true,

};

class pageEssays extends React.Component {

  formRef = React.createRef();


  componentDidMount() {
    this.getUserData()
  }

  constructor(props) {
    super(props);
    this.routeChange = this.routeChange.bind(this);
  }

  state = {
    fileListCL: [],
    fileListPortfolio: []
  };

  render() {
    return (
      <div style={{ marginTop: "40px", width: "100%" }}>
        <h1 style={{ textAlign: "left" }}>Written Work</h1>
        <p>We'd like to learn more about you!</p>

        <Form
          name="pageEssays"
          initialValues={{
            remember: true
          }}
          layout="vertical"
          align="left"
          width="100%"
          onFinish={this.onFinish}
          ref={this.formRef}
        >
          {/**Industry response */}
          <Form.Item
            key="industryEssay"
            name="industryEssay"
            label={this.boldify("Why do you want to apply to this industry?")}
            rules={this.validationRules("response")}
          >
            <TextArea autoSize={{ minRows: 5 }} />
          </Form.Item>

          {/**leadership response */}
          <Form.Item
            key="leadership"
            name="leadership"
            label={this.boldify(
              "What are your leadership roles in your extracurriculars and what have they taught you?"
            )}
            rules={this.validationRules("response")}
          >
            <TextArea autoSize={{ minRows: 5 }} />
          </Form.Item>

          {/**extra information response */}
          <Form.Item
            key="extra"
            name="extra"
            label={this.boldify(
              "Is there anything more about you that we should know?"
            )}
            rules={this.validationRules("response")}
          >
            <TextArea autoSize={{ minRows: 5 }} />
          </Form.Item>

          {/**Cover Letter */}
          <Form.Item
            name="CoverLetter"
            key="CoverLetter"
            label={this.boldify("Cover Letter (Optional)")}
          >
            <Dragger {...props} style={{ width: "250px", height: "30px" }} customRequest={this.customRequestCL} onChange={this.onChangeCL} fileList={this.state.fileListCL}>
              <h1 style={{ color: "blue" }}>
                <InboxOutlined />
              </h1>
              <h5>Click or Drag Files to Upload Here</h5>
            </Dragger>
          </Form.Item>

          {/**Portfolio */}
          <Form.Item
            name="Portfolio"
            key="Portfolio"
            label={this.boldify("Portfolio (Optional)")}
          >
            <Dragger {...props} style={{ width: "250px", height: "30px" }} customRequest={this.customRequestPortfolio} onChange={this.onChangePortfolio} fileList={this.state.fileListPortfolio}>
              <h1 style={{ color: "blue" }}>
                <InboxOutlined />
              </h1>
              <h5>Click or Drag Files to Upload Here</h5>
            </Dragger>
          </Form.Item>

          {/*Save and Continue or Next*/}
          <Form.Item>
            <Button
              className="back-button"
              type="primary"
              htmlType="button"
              onClick={this.backHandler}
            >
              Previous
            </Button>
            <Button
              className="next-button"
              type="primary"
              htmlType="submit"
            >
              Next
            </Button>
          </Form.Item>
        </Form>
      </div>
    );
  }
  //Functions
  //THIS NEEDS TO BE FIXED ASAP!!!
  handleChange = event => {
    this.setState({ otherIndustry: event.target.value });
    console.log(this.state);
  };

  validationRules = (inputName, type) => [
    {
      required: true,
      message: "Please input your " + inputName,
      type: type
    }
  ];

  onFinish = values => {
    console.log('FinishedPageEssays:', values);
    this.props.updateData(values, "2")
    this.routeChange('/References')
  };

  backHandler = () => {
    this.props.updateData(this.formRef.current.getFieldsValue(), "2")
    this.routeChange("/Personal")

  }

  customRequestCL = ({ onSuccess, onError, file }) => {
    setTimeout(() => {
      onSuccess(file)
      const source = "CoverLetter"
      let currentFileList = this.state.fileListCL
      currentFileList.push(file)
      this.setState({fileListCL:currentFileList})
      this.props.uploadFile(file, source);
    }, 100);

  };

  onChangeCL = (info) => {
    const { status } = info.file;
    if (status === "removed") {
      let currentFileList = this.state.fileListCL
      let index = currentFileList.indexOf(info.file)
      if(index > -1){
          currentFileList.splice(index,1)
      }
      this.setState({fileListCL:currentFileList})

    }
    if (status === "done") {
      message.success(`${info.file.name} file uploaded successfully.`);
    } else if (status === "error") {
      message.error(`${info.file.name} file upload failed.`);
    }

    this.props.updateData(this.formRef.current.getFieldsValue(), "2")

  }

  customRequestPortfolio = ({ onSuccess, onError, file }) => {
    setTimeout(() => {
      onSuccess(file)
      const source = "Portfolio"
      let currentFileList = this.state.fileListPortfolio
      currentFileList.push(file)
      this.setState({fileListPortfolio:currentFileList})
      this.props.uploadFile(file, source);
    }, 100);

  };

  onChangePortfolio = (info) => {
    const { status } = info.file;
    if (status === "removed") {
      let currentFileList = this.state.fileListPortfolio
      let index = currentFileList.indexOf(info.file)
      if(index > -1){
          currentFileList.splice(index,1)
      }
      this.setState({fileListPortfolio:currentFileList})

    }
    if (status === "done") {
      message.success(`${info.file.name} file uploaded successfully.`);
    } else if (status === "error") {
      message.error(`${info.file.name} file upload failed.`);
    }

    this.props.updateData(this.formRef.current.getFieldsValue(), "2")

  }

  getUserData = async () => {
    let token = await this.props.getJwt()
    fetch("/get_user_data", {
      method: "POST",
      headers: {
        "Authorization": "Bearer " + JSON.parse(JSON.stringify(token)),
      },
      body: 2
    }).then(response => response.json()).then(data => {
      let parsedData = JSON.parse(data)
      if (parsedData !== "No Info") {
        console.log(parsedData)
        this.formRef.current.setFieldsValue(parsedData)

        let fileListCL = parsedData.CoverLetter.fileList
        let fileListPortfolio = parsedData.Portfolio.fileList

        for (var i = 0; i < fileListCL.length; i++) {
          fileListCL[i].status = "done"
        }

        for (var i = 0; i < fileListPortfolio.length; i++) {
          fileListPortfolio[i].status = "done"
        }
        this.setState({fileListCL:fileListCL})
        this.setState({fileListPortfolio:fileListPortfolio})
      }

    });
  }

  boldify = text => <strong>{text}</strong>;

  routeChange = (path) => {
    console.log(path)
    if (path === '/Personal') {
      this.props.clickTwo()
    }
    else {
      this.props.clickFour()
    }
    this.props.history.push(path);
  }
}
export default withRouter(pageEssays);
