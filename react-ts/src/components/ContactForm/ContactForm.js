import React, { Component } from "react";
import { Link } from "react-router-dom";
import { sendFeedback } from "../../net/contact";
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

    this.subjectErrorRef = React.createRef();
    this.subjectInputRef = React.createRef();

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
    let validForm = true;

    if (!validateField(this.emailInputRef, this.emailErrorRef, 8, 45)) {
      validForm = false;
    }

    if (!validateField(this.msgInputRef, this.msgErrorRef, 8, 256)) {
      validForm = false;
    }

    if (!validateField(this.nameInputRef, this.nameErrorRef, 8, 45)) {
      validForm = false;
    }

    if (!validateField(this.subjectInputRef, this.subjectErrorRef, 1, 1)) {
      validForm = false;
    }

    if (validForm) {
      sendFeedback({
        email: this.emailInputRef.current.value,
        msg: this.msgInputRef.current.value,
        name: this.nameInputRef.current.value,
        subjectId: this.subjectInputRef.current.value
      });

      this.emailInputRef.current.value = "";
      this.msgInputRef.current.value = "";
      this.nameInputRef.current.value = "";
      this.subjectInputRef.current.value = "";
    }
  }

  render() {
    const { subjects } = this.props;
    const subjectsList = subjects.items.map(subject => (
      <option key={subject._links.self.href} value={subject.id}>
        {subject.name}
      </option>
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
            <div className="col-sm-10">
              <select
                ref={this.subjectInputRef}
                name="subject_sel"
                className="form-control"
              >
                {subjectsList}
              </select>
              <div className="formError" ref={this.subjectErrorRef}>
                Select a subject
              </div>
            </div>
          </div>
          <div className="form-group">
            <label htmlFor="name" className={`col-sm-2 control-label`}>
              name
            </label>
            <div className="col-sm-10">
              <input
                ref={this.nameInputRef}
                type="text"
                className="form-control"
                name="name1"
                maxLength="45"
                placeholder="At least 8 chars and no more than 45 chars"
                size="31"
                onChange={this.handleChange}
                value={this.state.name}
              />
            </div>
            <div className="formError" ref={this.nameErrorRef}>
              Name shoud be at least 8 chars and no more than 45 chars
            </div>
          </div>
          <div className="form-group">
            <label htmlFor="email" className={`col-sm-2 control-label`}>
              email
            </label>
            <div className="col-sm-10">
              <input
                ref={this.emailInputRef}
                type="email"
                className="form-control"
                name="email"
                maxLength="45"
                placeholder="At least 8 chars and no more than 45 chars"
                size="31"
                onChange={this.handleChange}
                value={this.state.email}
              />
            </div>
            <div className="formError" ref={this.emailErrorRef}>
              Email shoud be at least 8 chars and no more than 45 chars
            </div>
          </div>
          <div className="form-group">
            <label htmlFor="msg" className={`col-sm-2 control-label`}>
              message
            </label>
            <div className="col-sm-10">
              <textarea
                ref={this.msgInputRef}
                className="form-control"
                name="msg"
                cols="25"
                rows="5"
                onChange={this.handleChange}
                value={this.state.msgl}
              />
            </div>
            <div className="formError" ref={this.msgErrorRef}>
              Message shoud be at least 8 chars and no more than 256 chars
            </div>
          </div>
          <div className="form-group">
            <div className={`col-sm-offset-2 col-sm-10`}>
              <button type="submit" className={`btn btn-primary`}>
                send feedback
              </button>
            </div>
          </div>
        </form>
        <div>
          <br />
          <h3>Privacy</h3>
          <p>
            This website is owned and controlled by:
            <br />
            <br /> The Affable Bean Company Limited <br />
            Registered office: AffableBean House, Roast Drive, <br /> Pothead,
            POT123, BeanieLand
          </p>
          <p>(hereinafter referred to as "AffableBean")</p>

          <p>
            AffableBean is responsible for the processing of any information
            collected by or on behalf of AffableBean on or via this website. All
            such information will be processed in accordance with our&nbsp;
            <Link to="/privacy">privacy policy</Link>.
          </p>
        </div>
      </div>
    );
  }
}
