import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import Home from "./screens/Home";
import Edit from "./screens/Edit";
import Show from "./screens/Show";
import New from "./screens/New";
import IconTitle from "./components/IconTitle";
import { createStore } from "redux";
import allReducers from "./store/reducers";
import { Provider } from "react-redux";

const store = createStore(allReducers);

const Stack = createStackNavigator();

const options = {
  headerTitle: props => <IconTitle {...props} />,
  headerStyle: {
    backgroundColor: "#1b1c1d"
  },
  headerTintColor: "#fff",
  headerTitleAlign: "center"
};

export default function App() {
  return (
    <Provider store={store}>
      <NavigationContainer>
        <Stack.Navigator initialRouteName="Show">
          <Stack.Screen name="Home" component={Home} options={options} />
          <Stack.Screen name="New" component={New} options={options} />
          <Stack.Screen name="Edit" component={Edit} options={options} />
          <Stack.Screen name="Show" component={Show} options={options} />
        </Stack.Navigator>
      </NavigationContainer>
    </Provider>
  );
}

const styles = StyleSheet.create({});
