import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  Text,
  TextInput,
  Button,
  View,
  Keyboard,
  TouchableOpacity,
  ScrollView,
  Dimensions,
  Animated,
  UIManager
} from "react-native";
import { useSelector, useDispatch } from "react-redux";
import { loginUser } from "../store/actions";
import { firebaseAuth } from "../lib/firebase";

const { State: TextInputState } = TextInput;

const LoginRegister = ({ navigation, tab }) => {
  const dispatch = useDispatch();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const [shift, setShift] = useState(new Animated.Value(0));
  const [AreaInputHeight, setAreaInputHeight] = useState(0);

  let keyboardDidShowSub, keyboardDidHideSub;

  useEffect(() => {
    keyboardDidShowSub = Keyboard.addListener(
      "keyboardDidShow",
      handleKeyboardDidShow
    );
    keyboardDidHideSub = Keyboard.addListener(
      "keyboardDidHide",
      handleKeyboardDidHide
    );

    return () => {
      keyboardDidShowSub.remove();
      keyboardDidHideSub.remove();
    };
  }, []);

  const handleKeyboardDidShow = event => {
    const { height: windowHeight } = Dimensions.get("window");
    const keyboardHeight = event.endCoordinates.height;
    const currentlyFocusedField = TextInputState.currentlyFocusedField();
    UIManager.measure(
      currentlyFocusedField,
      (originX, originY, width, height, pageX, pageY) => {
        const fieldHeight = height;
        const fieldTop = pageY;
        const gap = windowHeight - keyboardHeight - (fieldTop + fieldHeight);
        if (gap >= 0) {
          return;
        }
        Animated.timing(shift, {
          toValue: gap,
          duration: 1000,
          useNativeDriver: true
        }).start();
      }
    );
  };

  const handleKeyboardDidHide = () => {
    Animated.timing(shift, {
      toValue: 0,
      duration: 1000,
      useNativeDriver: true
    }).start();
  };

  const handleSubmit = () => {
    setErrorMessage("");
    console.log(tab, tab === "Register");
    if (tab === "Log In") {
      firebaseAuth
        .signInWithEmailAndPassword(email, password)
        .then(() => {
          dispatch(loginUser());
        })
        .catch(error => setErrorMessage(error.message));
    } else if (tab === "Register") {
      firebaseAuth
        .createUserWithEmailAndPassword(email, password)
        .then(() => {
          dispatch(loginUser());
        })
        .catch(error => setErrorMessage(error.message));
    }
  };

  const changeDisplay = () => {
    return {
      display: errorMessage.length ? "flex" : "none"
    };
  };

  return (
    <Animated.View
      style={[styles.container, { transform: [{ translateY: shift }] }]}
    >
      <ScrollView style={styles.scrollview}>
        <TouchableOpacity activeOpacity={1} onPress={() => Keyboard.dismiss()}>
          <View style={styles.form}>
            <Text style={styles.header}>{tab}</Text>
            <Text style={[styles.error, changeDisplay()]}>{errorMessage}</Text>
            <View style={styles.section}>
              <Text style={styles.label}>Email</Text>
              <TextInput
                style={styles.input}
                onChangeText={text => setEmail(text)}
                value={email}
              />
            </View>
            <View style={styles.section}>
              <Text style={styles.label}>Password</Text>
              <TextInput
                secureTextEntry={true}
                style={styles.input}
                onChangeText={text => setPassword(text)}
                value={password}
              />
            </View>

            <View>
              <View style={styles.buttons}>
                <Button
                  style={styles.button}
                  color="#1b1c1d"
                  title="Submit"
                  onPress={handleSubmit}
                />
              </View>
            </View>
          </View>
        </TouchableOpacity>
      </ScrollView>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
    height: "100%"
  },
  scrollview: {
    width: "100%",
    maxWidth: 400
  },
  form: {
    width: "80%",
    maxWidth: 380,
    alignSelf: "center",
    padding: 20,
    marginVertical: 30
  },
  header: {
    fontWeight: "bold",
    fontSize: 23,
    textAlign: "center",
    marginBottom: 20
  },
  section: {
    marginBottom: 10
  },
  label: {
    fontSize: 16,
    marginBottom: 10
  },
  input: {
    borderWidth: 0.5,
    padding: 1,
    borderRadius: 10,
    paddingHorizontal: 10,
    borderColor: "gray",
    marginBottom: 15
  },
  buttons: {
    alignItems: "center",
    marginTop: 10
  },
  error: {
    width: 300,
    color: "red",
    fontSize: 15,
    textAlign: "center",
    alignSelf: "center",
    marginBottom: 15
  }
});

export default LoginRegister;
