import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { View, StyleSheet, Alert } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import {
  createStackNavigator,
  CardStyleInterpolators
} from "@react-navigation/stack";
import Edit from "./screens/Edit";
import Show from "./screens/Show";
import New from "./screens/New";
import Login from "./screens/Login";
import ShowSingle from "./screens/ShowSingle";
import IconTitle from "./components/IconTitle";
import { MaterialCommunityIcons, AntDesign } from "@expo/vector-icons";
import { logoutUser, clearPosts, firebaseEvents } from "./store/actions";
import { firebaseAuth } from "./lib/firebase";

const Stack = createStackNavigator();

export default function Navigator() {
  const dispatch = useDispatch();
  const isLoggedIn = useSelector(store => store.auth.isLoggedIn);

  useEffect(() => {
    firebaseAuth.onAuthStateChanged(function(user) {
      if (user) {
        // user is signed in
        dispatch(firebaseEvents());
      } else {
        //user is signing out
        dispatch(clearPosts());
      }
    });
  }, []);

  const handleLogout = () => {
    Alert.alert(
      "Confirm",
      "Are you sure you want to log out?",
      [
        {
          text: "Cancel",
          style: "cancel"
        },
        {
          text: "OK",
          onPress: () => {
            firebaseAuth.signOut();
            dispatch(logoutUser());
          },
          style: "destructive"
        }
      ],
      { cancelable: false }
    );
  };

  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={({ navigation }) => ({
          cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
          headerTitle: props => <IconTitle {...props} />,
          headerStyle: {
            backgroundColor: "#1b1c1d"
          },
          headerTintColor: "#fff",
          headerTitleAlign: "center",
          headerRight: () => (
            <View style={styles.headerRight}>
              <MaterialCommunityIcons
                onPress={handleLogout}
                name="account-minus-outline"
                size={25}
                color="#fff"
              />
              <AntDesign
                style={{ marginLeft: 15 }}
                name="plus"
                color="#fff"
                size={25}
                onPress={() => navigation.navigate("New")}
              />
            </View>
          )
        })}
      >
        {!isLoggedIn ? (
          <Stack.Screen
            name="Login"
            component={Login}
            options={{ headerRight: null }}
          />
        ) : (
          <>
            <Stack.Screen name="Show" component={Show} />
            <Stack.Screen name="New" component={New} />
            <Stack.Screen name="Edit" component={Edit} />
            <Stack.Screen name="ShowSingle" component={ShowSingle} />
          </>
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  headerRight: {
    marginRight: 10,
    flexDirection: "row"
  }
});
