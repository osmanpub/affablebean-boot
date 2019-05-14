import React from "react";
import { Text, View } from "react-native";

export default function Confirmation(props) {
  const { orderRecord } = props.order;

  return (
    <View style={{ padding: 16 }}>
      <Text style={{ fontWeight: "bold" }}>
        Your order has been successfully processed and will be delivered within
        24 hours.
      </Text>
      <Text style={{ paddingTop: 8 }}>
        Please keep a note of your confirmation number:
        {orderRecord.confirmationNumber}
      </Text>
      <Text style={{ paddingTop: 8 }}>
        Thank you for shopping at the Affable Bean Green Grocer!
      </Text>
    </View>
  );
}
