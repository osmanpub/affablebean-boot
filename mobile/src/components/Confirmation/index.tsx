import React from 'react';
import {Text, View} from 'react-native';
import {Order} from '../../interfaces/purchase';

type Props = {
  order: Order;
};

export default function Confirmation(props: Props) {
  const {orderRecord} = props.order;

  return (
    <View style={{padding: 16}}>
      <Text style={{fontWeight: 'bold'}} testID="confirm-success">
        Your order has been successfully processed and will be delivered within
        24 hours.
      </Text>
      <Text style={{paddingTop: 8}} testID="confirm-number">
        Please keep a note of your confirmation number:
        {orderRecord.confirmationNumber}
      </Text>
      <Text style={{paddingTop: 8}}>
        Thank you for shopping at the Affable Bean Green Grocer!
      </Text>
    </View>
  );
}
