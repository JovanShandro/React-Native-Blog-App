import React from "react";
import { StyleSheet, Text, View, Button } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import {
  createStackNavigator,
  CardStyleInterpolators
} from "@react-navigation/stack";
import Home from "./screens/Home";
import Edit from "./screens/Edit";
import Show from "./screens/Show";
import New from "./screens/New";
import ShowSingle from "./screens/ShowSingle";
import IconTitle from "./components/IconTitle";
import { createStore } from "redux";
import allReducers from "./store/reducers";
import { Provider } from "react-redux";
import { AntDesign } from "@expo/vector-icons";

const store = createStore(allReducers);

const Stack = createStackNavigator();

export default function App() {
  return (
    <Provider store={store}>
      <NavigationContainer>
        <Stack.Navigator
          initialRouteName="Show"
          screenOptions={({ navigation }) => ({
            cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
            headerTitle: props => <IconTitle {...props} />,
            headerStyle: {
              backgroundColor: "#1b1c1d"
            },
            headerTintColor: "#fff",
            headerTitleAlign: "center",
            headerRight: () => (
              <View style={{ marginRight: 15 }}>
                <AntDesign
                  onPress={() => navigation.navigate("New")}
                  name="plus"
                  size={25}
                  color="#fff"
                />
              </View>
            )
          })}
        >
          <Stack.Screen name="Home" component={Home} />
          <Stack.Screen name="New" component={New} />
          <Stack.Screen name="Edit" component={Edit} />
          <Stack.Screen name="Show" component={Show} />
          <Stack.Screen name="ShowSingle" component={ShowSingle} />
        </Stack.Navigator>
      </NavigationContainer>
    </Provider>
  );
}

const styles = StyleSheet.create({});
