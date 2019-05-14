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
      phone: "",
      validForm: true
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

    if (!validateField(this.state.address.length, 8, 45)) {
      validForm = false;
    }

    if (!validateField(this.state.creditcard.length, 16, 19)) {
      validForm = false;
    }

    if (!validateField(this.state.email.length, 8, 45)) {
      validForm = false;
    }

    if (!validateField(this.state.name1.length, 8, 45)) {
      validForm = false;
    }

    if (!validateField(this.state.phone.length, 8, 30)) {
      validForm = false;
    }

    if (validForm) {
      dispatch(
        purchaseOrder({
          cart: cart,
          form: this.state
        })
      );
    } else {
      this.setState({ validForm: false });
    }
  };

  render() {
    const { cart } = this.props;
    const surcharge = 3;

    const styles = StyleSheet.create({
      error: {
        backgroundColor: "red",
        color: "white",
        fontWeight: "bold",
        padding: 8
      },
      textInput: {
        borderBottomColor: "black",
        borderBottomWidth: 1,
        padding: 8
      }
    });

    const validForm = this.state.validForm;

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
          {!validForm && (
            <Text style={styles.error}>
              Name should be between 8 and 45 characters
            </Text>
          )}
          <TextInput
            onChangeText={email => this.onChange("email", email)}
            placeholder="Enter your email address"
            style={styles.textInput}
            value={this.state.email}
          />
          {!validForm && (
            <Text style={styles.error}>
              Email should be between 8 and 45 characters
            </Text>
          )}
          <TextInput
            onChangeText={phone => this.onChange("phone", phone)}
            placeholder="Enter your phone number"
            style={styles.textInput}
            value={this.state.phone}
          />
          {!validForm && (
            <Text style={styles.error}>
              Phone number should be between 8 and 30 characters
            </Text>
          )}
          <TextInput
            onChangeText={address => this.onChange("address", address)}
            placeholder="Enter your home address"
            style={styles.textInput}
            value={this.state.address}
          />
          {!validForm && (
            <Text style={styles.error}>
              Address should be between 8 and 45 characters
            </Text>
          )}
          <TextInput
            onChangeText={creditcard => this.onChange("creditcard", creditcard)}
            placeholder="Enter your credit card number"
            style={styles.textInput}
            value={this.state.creditcard}
          />
          {!validForm && (
            <Text style={styles.error}>
              Credit card number should be between 16 and 19 characters
            </Text>
          )}
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
          {!validForm && (
            <Text style={styles.error}>Check your form for errors!</Text>
          )}
        </View>
      </View>
    );
  }
}

CheckoutForm.propTypes = {
  cart: PropTypes.object.isRequired
};
