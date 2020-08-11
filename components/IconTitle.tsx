import React from "react";
import { StyleSheet, Text, View, ViewStyle, TextStyle } from "react-native";
import { Entypo } from "@expo/vector-icons";

const IconTitle = () => (
  <View style={styles.container}>
    <Entypo style={{ ...styles.iconAndText }} name="code" />
    <Text style={{ ...styles.iconAndText, ...styles.text }}>Blog App</Text>
  </View>
);

interface Style {
  container: ViewStyle;
  iconAndText: TextStyle;
  text: TextStyle;
}

const styles = StyleSheet.create<Style>({
  container: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center"
  },
  iconAndText: { color: "#fff", fontSize: 18 },
  text: { marginLeft: 10 }
});

export default IconTitle;
