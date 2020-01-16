import React, { ChangeEvent, FormEvent, useRef, useState } from "react";
import { connect } from "react-redux";
import { Cart } from "../../interfaces/cart";
import { purchaseOrder } from "../../net/checkout";
import { RootState } from "../../redux";
import { validateField } from "../../utils";
import "./CheckoutForm.css";
import {
  InfoBox,
  PriceBox,
  PriceBoxSubTotalTd,
  PriceBoxTd
} from "./CheckoutForm.styles";

type Props = {
  cart: Cart;
  dispatch: Function;
};

function CheckoutForm(props: Props) {
  const { cart, dispatch } = props;
  const [state, setState] = useState({
    address: "",
    creditcard: "",
    email: "",
    name: "",
    phone: ""
  });

  const addressErrorRef = useRef(null);
  const addressInputRef = useRef(null);

  const ccErrorRef = useRef(null);
  const ccInputRef = useRef(null);

  const emailErrorRef = useRef(null);
  const emailInputRef = useRef(null);

  const nameErrorRef = useRef(null);
  const nameInputRef = useRef(null);

  const phoneErrorRef = useRef(null);
  const phoneInputRef = useRef(null);

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const input = event.target;
    setState({ ...state, [input.name]: input.value });
  };

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    let validForm = true;

    if (!validateField(addressInputRef, addressErrorRef, 8, 45)) {
      validForm = false;
    }

    if (!validateField(ccInputRef, ccErrorRef, 16, 19)) {
      validForm = false;
    }

    if (!validateField(emailInputRef, emailErrorRef, 8, 45)) {
      validForm = false;
    }

    if (!validateField(nameInputRef, nameErrorRef, 8, 45)) {
      validForm = false;
    }

    if (!validateField(phoneInputRef, phoneErrorRef, 8, 30)) {
      validForm = false;
    }

    if (validForm) {
      dispatch(
        purchaseOrder({
          cart: cart,
          form: state
        })
      );
    }
  };

  return (
    <div className="singleColumn">
      <h2>checkout</h2>
      <p>
        In order to purchase the items in your shopping cart, please provide us
        with the following information:
      </p>
      <br />
      <form className="form-horizontal" onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="name" className={`col-sm-2 control-label`}>
            name
          </label>
          <div className="col-sm-10">
            <input
              ref={nameInputRef}
              type="text"
              className="form-control"
              name="name1"
              maxLength={45}
              placeholder="At least 8 chars and no more than 45 chars"
              size={31}
              onChange={handleChange}
              value={state.name}
            />
          </div>
          <div className="formError" ref={nameErrorRef}>
            Name shoud be at least 8 chars and no more than 45 chars
          </div>
        </div>
        <div className="form-group">
          <label htmlFor="email" className={`col-sm-2 control-label`}>
            email
          </label>
          <div className="col-sm-10">
            <input
              ref={emailInputRef}
              type="email"
              className="form-control"
              name="email"
              maxLength={45}
              placeholder="At least 8 chars and no more than 45 chars"
              size={31}
              onChange={handleChange}
              value={state.email}
            />
          </div>
          <div className="formError" ref={emailErrorRef}>
            Email shoud be at least 8 chars and no more than 45 chars
          </div>
        </div>
        <div className="form-group">
          <label htmlFor="phone" className={`col-sm-2 control-label`}>
            phone
          </label>
          <div className="col-sm-10">
            <input
              ref={phoneInputRef}
              type="text"
              className="form-control"
              name="phone"
              maxLength={45}
              placeholder="At least 8 chars and no more than 30 chars"
              size={31}
              onChange={handleChange}
              value={state.phone}
            />
          </div>
          <div className="formError" ref={phoneErrorRef}>
            Phone shoud be at least 8 chars and no more than 30 chars
          </div>
        </div>
        <div className="form-group">
          <label htmlFor="address" className={`col-sm-2 control-label`}>
            address
          </label>
          <div className="col-sm-10">
            <input
              ref={addressInputRef}
              type="text"
              className="form-control"
              name="address"
              maxLength={45}
              placeholder="At least 8 chars and no more than 45 chars"
              size={31}
              onChange={handleChange}
              value={state.address}
            />
          </div>
          <div className="formError" ref={addressErrorRef}>
            Address shoud be at least 8 chars and no more than 45 chars
          </div>
        </div>
        <div className="form-group">
          <label htmlFor="creditcard" className={`col-sm-2 control-label`}>
            credit card
          </label>
          <div className="col-sm-10">
            <input
              ref={ccInputRef}
              type="text"
              className="form-control"
              name="creditcard"
              maxLength={45}
              placeholder="At least 16 chars and no more than 19 chars"
              size={31}
              onChange={handleChange}
              value={state.creditcard}
            />
          </div>
          <div className="formError" ref={ccErrorRef}>
            Credit card number shoud be at least 16 chars and no more than 19
            chars
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
            A &euro; {surcharge.toFixed(2)} delivery surcharge is applied to all
            purchase orders
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
  );
}

const surcharge = 3;

const mapStateToProps = (state: RootState) => ({
  cart: state.cart
});

export default connect(mapStateToProps)(CheckoutForm);
