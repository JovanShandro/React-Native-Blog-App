import React, { useState } from "react";
import { View, StyleSheet, SafeAreaView, ViewStyle } from "react-native";
import { TabBar, TabView } from "react-native-tab-view";
import LoginRegister from "../components/LoginRegister";

interface Props {
  navigation: any;
}

const LoginScreen: React.FC<Props> = ({ navigation }) => {
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
          renderScene={({ route }) => {
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
        />
      </View>
    </SafeAreaView>
  );
};

interface Style {
  tabView: ViewStyle;
}

const styles = StyleSheet.create<Style>({
  tabView: {
    width: "90%",
    maxWidth: 400,
    height: 450
  }
});
export default LoginScreen;
