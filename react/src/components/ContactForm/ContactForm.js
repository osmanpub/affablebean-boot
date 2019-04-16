import React, { Component } from "react";
import { sendFeedback } from "../../net/contact";
import {
  InfoBox,
  PriceBox,
  PriceBoxTd,
  PriceBoxSubTotalTd
} from "./ContactForm.styles";
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
    const { dispatch, cart } = this.props;
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
    const { cart, subjects } = this.props;
    const subjectsList = subjects.map(subject => (
      <select name="subject_sel" className="form-control">
        {/* <option th:each="subject : ${subjects}" th:value="${subject.id}" 
        th:text="#{co__${subject.name}__}">
      </option> */}
      </select>
    ));

    return (
      <div>
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
              <label htmlFor="phone" className={`col-sm-2 control-label`}>
                phone
              </label>
              <div className="col-sm-10">
                <input
                  ref={this.phoneInputRef}
                  type="text"
                  className="form-control"
                  name="phone"
                  maxLength="45"
                  placeholder="At least 8 chars and no more than 30 chars"
                  size="31"
                  onChange={this.handleChange}
                  value={this.state.phone}
                />
              </div>
              <div className="formError" ref={this.phoneErrorRef}>
                Phone shoud be at least 8 chars and no more than 30 chars
              </div>
            </div>
            <div className="form-group">
              <label htmlFor="address" className={`col-sm-2 control-label`}>
                address
              </label>
              <div className="col-sm-10">
                <input
                  ref={this.addressInputRef}
                  type="text"
                  className="form-control"
                  name="address"
                  maxLength="45"
                  placeholder="At least 8 chars and no more than 45 chars"
                  size="31"
                  onChange={this.handleChange}
                  value={this.state.address}
                />
              </div>
              <div className="formError" ref={this.addressErrorRef}>
                Address shoud be at least 8 chars and no more than 45 chars
              </div>
            </div>
            <div className="form-group">
              <label htmlFor="creditcard" className={`col-sm-2 control-label`}>
                credit card
              </label>
              <div className="col-sm-10">
                <input
                  ref={this.ccInputRef}
                  type="text"
                  className="form-control"
                  name="creditcard"
                  maxLength="45"
                  placeholder="At least 16 chars and no more than 19 chars"
                  size="31"
                  onChange={this.handleChange}
                  value={this.state.creditcard}
                />
              </div>
              <div className="formError" ref={this.ccErrorRef}>
                Credit card number shoud be at least 16 chars and no more than
                19 chars
              </div>
            </div>
            <div className="form-group">
              <div className={`col-sm-offset-2 col-sm-10`}>
                <button type="submit" className={`btn btn-primary`}>
                  submit purchase
                </button>
              </div>
            </div>
          </form>
          <InfoBox>
            <ul>
              <li>Next-day delivery is guaranteed</li>
              <li>
                A &euro; {surcharge.toFixed(2)} delivery surcharge is applied to
                all purchase orders
              </li>
            </ul>
            <PriceBox>
              <tbody>
                <tr>
                  <PriceBoxTd>subtotal:</PriceBoxTd>
                  <PriceBoxSubTotalTd className="checkoutPriceColumn">
                    &euro; {cart.subtotal.toFixed(2)}
                  </PriceBoxSubTotalTd>
                </tr>
                <tr>
                  <PriceBoxTd>surcharge:</PriceBoxTd>
                  <PriceBoxSubTotalTd className="checkoutPriceColumn">
                    &euro; {surcharge.toFixed(2)}
                  </PriceBoxSubTotalTd>
                </tr>
                <tr>
                  <PriceBoxTd>total:</PriceBoxTd>
                  <PriceBoxSubTotalTd className="checkoutPriceColumn">
                    &euro; {(cart.subtotal + surcharge).toFixed(2)}
                  </PriceBoxSubTotalTd>
                </tr>
              </tbody>
            </PriceBox>
          </InfoBox>
        </div>
      </div>
    );
  }
}
