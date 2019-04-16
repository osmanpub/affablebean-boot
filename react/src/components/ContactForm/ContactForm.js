import React, { Component } from "react";
import { sendFeedback } from "../../net/contact";
import {} from "./ContactForm.styles";
import "./ContactForm.css";
import { validateField } from "../../utils";

export class ContactForm extends Component {
  constructor(props) {
    super(props);

    this.state = {
      email: "",
      mag: "",
      name1: "",
      subjectId: ""
    };

    this.emailErrorRef = React.createRef();
    this.emailInputRef = React.createRef();

    this.msgErrorRef = React.createRef();
    this.msgInputRef = React.createRef();

    this.nameErrorRef = React.createRef();
    this.nameInputRef = React.createRef();

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event) {
    const input = event.target;
    this.setState({
      [input.name]: input.value
    });
  }

  handleSubmit(event) {
    event.preventDefault();
    const { dispatch } = this.props;
    let validForm = true;

    if (!validateField(this.emailInputRef, this.emailErrorRef, 8, 45)) {
      validForm = false;
    }

    if (!validateField(this.msgInputRef, this.msgErrorRef, 8, 45)) {
      validForm = false;
    }

    if (!validateField(this.nameInputRef, this.nameErrorRef, 8, 45)) {
      validForm = false;
    }

    if (validForm) {
      // dispatch(
      //   purchaseOrder({
      //     cart: cart,
      //     form: this.state
      //   })
      // );
    }
  }

  render() {
    const { subjects } = this.props;
    const subjectsList = subjects.map(subject => (
      <select name="subject_sel" className="form-control">
        {/* <option th:each="subject : ${subjects}" th:value="${subject.id}" 
        th:text="#{co__${subject.name}__}">
      </option> */}
      </select>
    ));

    return (
      <div className="singleColumn">
        <div>
          <h2>Contact Us Form</h2>
          <p>
            You can use this form for any comments or questions about our
            company or brands.
            <br />
            For general enquiries please call toll free on 1-800-BEANS-R-US
          </p>
        </div>
        <div>
          <p>(* Asterisks indicate required field)</p>
        </div>
        <form className="form-horizontal" onSubmit={this.handleSubmit}>
          <div className="form-group">
            <label htmlFor="subject_sel" className={`col-sm-2 control-label`}>
              subject
            </label>
            <div className="col-sm-10">{subjectsList}</div>
          </div>
          <div className="form-group">
            <div className={`col-sm-offset-2 col-sm-10`}>
              <button type="submit" className={`btn btn-primary`}>
                send feedback
              </button>
            </div>
          </div>
        </form>
      </div>
    );
  }
}
