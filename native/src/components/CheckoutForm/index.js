import React, { Component } from "react";
import PropTypes from "prop-types";
import { purchaseOrder } from "../../net/checkout";
import { Button, StyleSheet, Text, TextInput, View } from "react-native";
import { validateField } from "../../utils";

export default class CheckoutForm extends Component {
  constructor(props) {
    super(props);

    this.state = {
      address: "",
      creditcard: "",
      email: "",
      name1: "",
      phone: ""
    };
  }

  onChange = (name, value) => {
    this.setState({
      [name]: value
    });
  };

  submitForm = () => {
    event.preventDefault();
    const { dispatch, cart } = this.props;
    let validForm = true;

    if (!validateField(this.addressInputRef, this.addressErrorRef, 8, 45)) {
      validForm = false;
    }

    if (!validateField(this.ccInputRef, this.ccErrorRef, 16, 19)) {
      validForm = false;
    }

    if (!validateField(this.emailInputRef, this.emailErrorRef, 8, 45)) {
      validForm = false;
    }

    if (!validateField(this.nameInputRef, this.nameErrorRef, 8, 45)) {
      validForm = false;
    }

    if (!validateField(this.phoneInputRef, this.phoneErrorRef, 8, 30)) {
      validForm = false;
    }

    if (validForm) {
      dispatch(
        purchaseOrder({
          cart: cart,
          form: this.state
        })
      );
    }
  };

  render() {
    const { cart } = this.props;
    const surcharge = 3;

    const styles = StyleSheet.create({
      textInput: {
        borderBottomColor: "black",
        borderBottomWidth: 1,
        padding: 16
      }
    });

    return (
      <View>
        <Text style={{ padding: 8 }} />
        <View style={{ backgroundColor: "#f7f7e9" }}>
          <Text style={{ padding: 16 }}>
            In order to purchase the items in your shopping cart, please provide
            us with the following information:
          </Text>
          <TextInput
            onChangeText={name => this.onChange("name1", name)}
            placeholder="Enter your name"
            style={styles.textInput}
            value={this.state.name1}
          />
        </View>
      </View>
      //   <div className="singleColumn">
      //     <h2>checkout</h2>
      //     <p>
      //       In order to purchase the items in your shopping cart, please provide
      //       us with the following information:
      //     </p>
      //     <br />
      //     <form className="form-horizontal" onSubmit={this.handleSubmit}>
      //       <div className="form-group">
      //         <label htmlFor="name" className={`col-sm-2 control-label`}>
      //           name
      //         </label>
      //         <div className="col-sm-10">
      //           <input
      //             ref={this.nameInputRef}
      //             type="text"
      //             className="form-control"
      //             name="name1"
      //             maxLength="45"
      //             placeholder="At least 8 chars and no more than 45 chars"
      //             size="31"
      //             onChange={this.handleChange}
      //             value={this.state.name}
      //           />
      //         </div>
      //         <div className="formError" ref={this.nameErrorRef}>
      //           Name shoud be at least 8 chars and no more than 45 chars
      //         </div>
      //       </div>
      //       <div className="form-group">
      //         <label htmlFor="email" className={`col-sm-2 control-label`}>
      //           email
      //         </label>
      //         <div className="col-sm-10">
      //           <input
      //             ref={this.emailInputRef}
      //             type="email"
      //             className="form-control"
      //             name="email"
      //             maxLength="45"
      //             placeholder="At least 8 chars and no more than 45 chars"
      //             size="31"
      //             onChange={this.handleChange}
      //             value={this.state.email}
      //           />
      //         </div>
      //         <div className="formError" ref={this.emailErrorRef}>
      //           Email shoud be at least 8 chars and no more than 45 chars
      //         </div>
      //       </div>
      //       <div className="form-group">
      //         <label htmlFor="phone" className={`col-sm-2 control-label`}>
      //           phone
      //         </label>
      //         <div className="col-sm-10">
      //           <input
      //             ref={this.phoneInputRef}
      //             type="text"
      //             className="form-control"
      //             name="phone"
      //             maxLength="45"
      //             placeholder="At least 8 chars and no more than 30 chars"
      //             size="31"
      //             onChange={this.handleChange}
      //             value={this.state.phone}
      //           />
      //         </div>
      //         <div className="formError" ref={this.phoneErrorRef}>
      //           Phone shoud be at least 8 chars and no more than 30 chars
      //         </div>
      //       </div>
      //       <div className="form-group">
      //         <label htmlFor="address" className={`col-sm-2 control-label`}>
      //           address
      //         </label>
      //         <div className="col-sm-10">
      //           <input
      //             ref={this.addressInputRef}
      //             type="text"
      //             className="form-control"
      //             name="address"
      //             maxLength="45"
      //             placeholder="At least 8 chars and no more than 45 chars"
      //             size="31"
      //             onChange={this.handleChange}
      //             value={this.state.address}
      //           />
      //         </div>
      //         <div className="formError" ref={this.addressErrorRef}>
      //           Address shoud be at least 8 chars and no more than 45 chars
      //         </div>
      //       </div>
      //       <div className="form-group">
      //         <label htmlFor="creditcard" className={`col-sm-2 control-label`}>
      //           credit card
      //         </label>
      //         <div className="col-sm-10">
      //           <input
      //             ref={this.ccInputRef}
      //             type="text"
      //             className="form-control"
      //             name="creditcard"
      //             maxLength="45"
      //             placeholder="At least 16 chars and no more than 19 chars"
      //             size="31"
      //             onChange={this.handleChange}
      //             value={this.state.creditcard}
      //           />
      //         </div>
      //         <div className="formError" ref={this.ccErrorRef}>
      //           Credit card number shoud be at least 16 chars and no more than 19
      //           chars
      //         </div>
      //       </div>
      //       <div className="form-group">
      //         <div className={`col-sm-offset-2 col-sm-10`}>
      //           <button type="submit" className={`btn btn-primary`}>
      //             submit purchase
      //           </button>
      //         </div>
      //       </div>
      //     </form>
      //     <InfoBox>
      //       <ul>
      //         <li>Next-day delivery is guaranteed</li>
      //         <li>
      //           A &euro; {surcharge.toFixed(2)} delivery surcharge is applied to
      //           all purchase orders
      //         </li>
      //       </ul>
      //       <PriceBox>
      //         <tbody>
      //           <tr>
      //             <PriceBoxTd>subtotal:</PriceBoxTd>
      //             <PriceBoxSubTotalTd className="checkoutPriceColumn">
      //               &euro; {cart.subtotal.toFixed(2)}
      //             </PriceBoxSubTotalTd>
      //           </tr>
      //           <tr>
      //             <PriceBoxTd>surcharge:</PriceBoxTd>
      //             <PriceBoxSubTotalTd className="checkoutPriceColumn">
      //               &euro; {surcharge.toFixed(2)}
      //             </PriceBoxSubTotalTd>
      //           </tr>
      //           <tr>
      //             <PriceBoxTd>total:</PriceBoxTd>
      //             <PriceBoxSubTotalTd className="checkoutPriceColumn">
      //               &euro; {(cart.subtotal + surcharge).toFixed(2)}
      //             </PriceBoxSubTotalTd>
      //           </tr>
      //         </tbody>
      //       </PriceBox>
      //     </InfoBox>
      //   </div>
    );
  }
}

CheckoutForm.propTypes = {
  cart: PropTypes.object.isRequired
};
