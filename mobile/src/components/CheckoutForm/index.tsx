import React from 'react';
import {Controller, useForm} from 'react-hook-form';
import {Button, StyleSheet, Text, TextInput, View} from 'react-native';
import {connect, useDispatch} from 'react-redux';
import {Cart} from '../../interfaces/cart';
import {FormErrors} from '../../interfaces/ui';
import {purchaseOrder} from '../../net/checkout';
import {RootState} from '../../redux';
import {setFormErrors} from '../../redux/ui';

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
  const {cart, formErrors, setFormErrors} = props;
  const dispatch = useDispatch();
  const {control, handleSubmit, errors} = useForm<FormData>();

  const onChange = (args: Array<any>) => {
    return {
      value: args[0].nativeEvent.text,
    };
  };

  const onSubmit = handleSubmit(({address, creditCard, email, name, phone}) => {
    dispatch(purchaseOrder({address, creditCard, email, name, phone}));
  });

  if (formErrors && Array.isArray(formErrors) && formErrors.length > 0) {
    let msg = '';

    formErrors.forEach(error => {
      msg += `Field "${error.param}" with value "${error.value}" has the following problem:\n"${error.msg}"`;
    });

    setFormErrors([]);

    alert(
      `There was a problem processing your order.\nPlease correct the following errors:\n${msg}`,
    );
  }

  return (
    <View>
      {/* <Text style={{padding: 8}} /> */}
      <View style={{backgroundColor: '#f7f7e9', padding: 16}}>
        <Text>
          In order to purchase the items in your shopping cart, please provide
          us with the following information:
        </Text>
        <Controller
          as={<TextInput />}
          control={control}
          name="name"
          onChange={onChange}
          rules={{required: true, minLength: 3, maxLength: 64}}
          placeholder="Enter your name"
          style={styles.textInput}
        />
        {errors.name && (
          <Text style={styles.error}>
            Name should be between 3 and 64 characters
          </Text>
        )}
        <Controller
          as={<TextInput />}
          control={control}
          name="email"
          onChange={onChange}
          rules={{required: true, minLength: 8, maxLength: 32}}
          placeholder="Enter your email address"
          style={styles.textInput}
        />
        {errors.email && (
          <Text style={styles.error}>
            Email should be between 8 and 32 characters
          </Text>
        )}
        <Controller
          as={<TextInput />}
          control={control}
          name="phone"
          onChange={onChange}
          rules={{required: true, minLength: 8, maxLength: 32}}
          placeholder="Enter your phone number"
          style={styles.textInput}
        />
        {errors.phone && (
          <Text style={styles.error}>
            Phone should be between 8 and 32 characters
          </Text>
        )}
        <Controller
          as={<TextInput />}
          control={control}
          name="address"
          onChange={onChange}
          rules={{required: true, minLength: 8, maxLength: 256}}
          placeholder="Enter your address"
          style={styles.textInput}
        />
        {errors.address && (
          <Text style={styles.error}>
            Address should be between 8 and 256 characters
          </Text>
        )}
        <Controller
          as={<TextInput />}
          control={control}
          name="creditCard"
          onChange={onChange}
          rules={{required: true, minLength: 16, maxLength: 19}}
          placeholder="Enter your credit card number"
          style={styles.textInput}
        />
        {errors.creditCard && (
          <Text style={styles.error}>
            Credit card number should be between 16 and 19 characters
          </Text>
        )}
      </View>
      <View style={{alignItems: 'center'}}>
        <Text style={{paddingTop: 16}}>
          Subtotal: &euro; {cart.subtotal.toFixed(2)}
        </Text>
        <Text>Surcharge: &euro; {surcharge.toFixed(2)}</Text>
        <Text style={{fontWeight: 'bold'}}>
          Total: &euro; {(cart.subtotal + surcharge).toFixed(2)}{' '}
        </Text>
        <Text style={{marginTop: 8}} />
        <Button onPress={handleSubmit(onSubmit)} title="Purchase" />
      </View>
    </View>
  );
}

const surcharge = 3;

const styles = StyleSheet.create({
  error: {
    color: 'red',
    fontWeight: 'bold',
  },
  textInput: {
    borderBottomColor: 'black',
    borderBottomWidth: 1,
    padding: 8,
  },
});

const mapStateToProps = (state: RootState) => ({
  cart: state.cart,
  formErrors: state.ui.formErrors,
});

const mapDispatchToProps = {
  setFormErrors,
};

export default connect(mapStateToProps, mapDispatchToProps)(CheckoutForm);
