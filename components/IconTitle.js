import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { Entypo } from "@expo/vector-icons";

const IconTitle = () => {
  return (
    <View style={styles.container}>
      <Entypo style={{ ...styles.iconAndText, ...styles.icon }} name="code" />
      <Text style={{ ...styles.iconAndText, ...styles.text }}>Blog App</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center"
  },
  iconAndText: { color: "#fff", fontSize: 18 },
  icon: {},
  text: { marginLeft: 10 }
});

export default IconTitle;
