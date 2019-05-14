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

  purchaseItems = () => {
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
        padding: 8
      }
    });

    return (
      <View>
        <Text style={{ padding: 8 }} />
        <View style={{ backgroundColor: "#f7f7e9", padding: 16 }}>
          <Text>
            In order to purchase the items in your shopping cart, please provide
            us with the following information:
          </Text>
          <TextInput
            onChangeText={name => this.onChange("name1", name)}
            placeholder="Enter your name"
            style={styles.textInput}
            value={this.state.name1}
          />
          <TextInput
            onChangeText={email => this.onChange("email", email)}
            placeholder="Enter your email address"
            style={styles.textInput}
            value={this.state.email}
          />
          <TextInput
            onChangeText={phone => this.onChange("phone", phone)}
            placeholder="Enter your phone number"
            style={styles.textInput}
            value={this.state.phone}
          />
          <TextInput
            onChangeText={address => this.onChange("address", address)}
            placeholder="Enter your home address"
            style={styles.textInput}
            value={this.state.address}
          />
          <TextInput
            onChangeText={creditcard => this.onChange("creditcard", creditcard)}
            placeholder="Enter your credit card number"
            style={styles.textInput}
            value={this.state.creditcard}
          />
        </View>
        <View style={{ alignItems: "center" }}>
          <Text style={{ paddingTop: 16 }}>
            Subtotal: &euro; {cart.subtotal.toFixed(2)}
          </Text>
          <Text>Surcharge: &euro; {surcharge.toFixed(2)}</Text>
          <Text style={{ fontWeight: "bold" }}>
            Total: &euro; {(cart.subtotal + surcharge).toFixed(2)}{" "}
          </Text>
          <Text style={{ marginTop: 8 }} />
          <Button onPress={this.purchaseItems} title="Purchase" />
        </View>
      </View>
    );
  }
}

CheckoutForm.propTypes = {
  cart: PropTypes.object.isRequired
};
