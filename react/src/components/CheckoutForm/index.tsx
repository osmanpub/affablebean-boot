import React from "react";
// import { types, useAlert } from "react-alert";
import { useForm } from "react-hook-form";
import { connect, useDispatch } from "react-redux";
import { Cart } from "../../interfaces/cart";
import { FormErrors } from "../../interfaces/ui";
import { purchaseOrder } from "../../net/checkout";
import { RootState } from "../../redux";
import { setFormErrors } from "../../redux/ui";
import "./CheckoutForm.css";
import {
  InfoBox,
  PriceBox,
  PriceBoxSubTotalTd,
  PriceBoxTd
} from "./CheckoutForm.styles";

type Props = {
  cart: Cart;
  formErrors: Array<FormErrors>;
  setFormErrors: Function;
};

type FormData = {
  address: string;
  creditCard: string;
  email: string;
  name: string;
  phone: string;
};

function CheckoutForm(props: Props) {
  const { cart, formErrors, setFormErrors } = props;
  // Problem with jest - https://github.com/schiehll/react-alert/issues/148
  // const alert = useAlert();
  const dispatch = useDispatch();
  const { register, handleSubmit, errors } = useForm<FormData>();

  const onSubmit = handleSubmit(
    ({ address, creditCard, email, name, phone }) => {
      dispatch(purchaseOrder({ address, creditCard, email, name, phone }));
    }
  );

  if (formErrors && Array.isArray(formErrors) && formErrors.length > 0) {
    let msg = "";

    formErrors.forEach(error => {
      msg += `Field "${error.param}" with value "${error.value}" has the following problem:\n"${error.msg}"`;
    });

    setFormErrors([]);

    alert(
      `There was a problem processing your order.\nPlease correct the following errors:\n${msg}`
    );

    // alert.show(
    //   `There was a problem processing your order.\nPlease correct the following errors:\n${msg}`,
    //   {
    //     timeout: 0,
    //     type: types.ERROR
    //   }
    // );
  }

  return (
    <div className="singleColumn">
      <h2>checkout</h2>
      <p data-cy="checkout-intro" data-testid="checkout-intro">
        In order to purchase the items in your shopping cart, please provide us
        with the following information:
      </p>
      <br />
      <form className="form-horizontal" onSubmit={onSubmit}>
        <div className="form-group">
          <label htmlFor="name" className={`col-sm-2 control-label`}>
            name
          </label>
          <div className="col-sm-10">
            <input
              className="form-control"
              data-cy="checkout-name"
              data-testid="checkout-name"
              name="name"
              placeholder="At least 3 chars and no more than 64 chars"
              size={32}
              ref={register({ required: true, minLength: 3, maxLength: 64 })}
              type="text"
            />
          </div>
          {errors.name && (
            <div className="formError">
              Name shoud be at least 3 chars and no more than 64 chars
            </div>
          )}
        </div>
        <div className="form-group">
          <label htmlFor="email" className={`col-sm-2 control-label`}>
            email
          </label>
          <div className="col-sm-10">
            <input
              className="form-control"
              data-cy="checkout-email"
              data-testid="checkout-email"
              name="email"
              placeholder="At least 8 chars and no more than 32 chars"
              size={32}
              ref={register({ required: true, minLength: 8, maxLength: 32 })}
              type="email"
            />
          </div>
          {errors.email && (
            <div className="formError">
              Email shoud be at least 8 chars and no more than 32 chars
            </div>
          )}
        </div>
        <div className="form-group">
          <label htmlFor="phone" className={`col-sm-2 control-label`}>
            phone
          </label>
          <div className="col-sm-10">
            <input
              className="form-control"
              data-cy="checkout-phone"
              data-testid="checkout-phone"
              name="phone"
              placeholder="At least 8 chars and no more than 32 chars"
              size={32}
              ref={register({ required: true, minLength: 8, maxLength: 32 })}
              type="text"
            />
          </div>
          {errors.email && (
            <div className="formError">
              Phone shoud be at least 8 chars and no more than 32 chars
            </div>
          )}
        </div>
        <div className="form-group">
          <label htmlFor="address" className={`col-sm-2 control-label`}>
            address
          </label>
          <div className="col-sm-10">
            <input
              className="form-control"
              data-cy="checkout-address"
              data-testid="checkout-address"
              name="address"
              placeholder="At least 8 chars and no more than 256 chars"
              size={32}
              ref={register({ required: true, minLength: 8, maxLength: 256 })}
              type="text"
            />
          </div>
          {errors.address && (
            <div className="formError">
              Address shoud be at least 8 chars and no more than 256 chars
            </div>
          )}
        </div>
        <div className="form-group">
          <label htmlFor="creditcard" className={`col-sm-2 control-label`}>
            credit card
          </label>
          <div className="col-sm-10">
            <input
              className="form-control"
              data-cy="checkout-cc"
              data-testid="checkout-cc"
              name="creditCard"
              placeholder="At least 16 chars and no more than 19 chars"
              size={32}
              ref={register({ required: true, minLength: 16, maxLength: 19 })}
              type="text"
            />
          </div>
          {errors.creditCard && (
            <div className="formError">
              Credit card number shoud be at least 16 chars and no more than 19
              chars
            </div>
          )}
        </div>
        <div className="form-group">
          <div className={`col-sm-offset-2 col-sm-10`}>
            <button
              className={`btn btn-primary`}
              data-cy="checkout-submit"
              type="submit"
            >
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
  cart: state.cart,
  formErrors: state.ui.formErrors
});

const mapDispatchToProps = {
  setFormErrors
};

export default connect(mapStateToProps, mapDispatchToProps)(CheckoutForm);
