import React from "react";
import { Button, StyleSheet, Text, View } from "react-native";

export default function Footer(props) {
  const styles = StyleSheet.create({
    Button: {
      color: "red"
    }
  });

  function onPressContact() {}

  function onPressPrivacy() {}

  return (
    <View
      style={{
        alignItems: "center",
        flex: 1,
        justifyContent: "center"
      }}
    >
      <View
        style={{
          alignItems: "center",
          flexDirection: "row"
        }}
      >
        <Button
          accessibilityLabel="Privacy"
          onPress={onPressPrivacy}
          style={styles.Button}
          title="Privacy"
        />
        <View style={{ flex: 0.1 }} />
        <Button
          accessibilityLabel="Contact us"
          onPress={onPressContact}
          style={styles.Button}
          title="Contact us"
        />
      </View>
      <View style={{ flex: 0.04 }} />
      <Text>&copy; 2019 the affable bean company</Text>
    </View>
  );
}
