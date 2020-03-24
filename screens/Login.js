import React, { useState } from "react";
import { View, StyleSheet, Text, SafeAreaView } from "react-native";
import { TabBar, TabView, SceneMap } from "react-native-tab-view";
import LoginRegister from "../components/LoginRegister";

const renderTabBar = props => (
  <TabBar
    {...props}
    indicatorStyle={{ color: "green" }}
    style={{ color: "pink" }}
  />
);

const LoginScreen = ({ navigation }) => {
  const [index, setIndex] = useState(0);
  const [routes] = useState([
    { key: "login", title: "Login" },
    { key: "register", title: "Register" }
  ]);

  return (
    <SafeAreaView
      style={{ flex: 1, alignItems: "center", justifyContent: "center" }}
    >
      <View style={styles.tabView}>
        <TabView
          navigationState={{ index, routes }}
          renderScene={({ route, focused }) => {
            switch (route.key) {
              case "login":
                return <LoginRegister tab="Log In" navigation={navigation} />;
              case "register":
                return <LoginRegister tab="Register" navigation={navigation} />;
            }
          }}
          renderTabBar={props => (
            <TabBar
              {...props}
              indicatorStyle={{ backgroundColor: "#dee5e4" }}
              style={{ backgroundColor: "#1b1c1d" }}
            />
          )}
          onIndexChange={setIndex}
          tabStyle={{ color: "red" }}
        />
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  tabView: {
    width: "90%",
    maxWidth: 400,
    height: 450
  }
});
export default LoginScreen;
