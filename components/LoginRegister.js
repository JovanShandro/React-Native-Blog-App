import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  TextInput,
  Button,
  View,
  Keyboard,
  TouchableOpacity,
  KeyboardAvoidingView
} from "react-native";
import { useDispatch } from "react-redux";
import { loginUser } from "../store/actions";
import { firebaseAuth } from "../lib/firebase";

const LoginRegister = ({ tab }) => {
  const dispatch = useDispatch();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const handleSubmit = async () => {
    setErrorMessage("");
    if (tab === "Log In") {
      try {
        await firebaseAuth.signInWithEmailAndPassword(email, password);
        dispatch(loginUser());
      } catch (e) {
        /* handle error */
        setErrorMessage(e.message);
      }
    } else if (tab === "Register") {
      try {
        await firebaseAuth.createUserWithEmailAndPassword(email, password);
        dispatch(loginUser());
      } catch (e) {
        /* handle error */
        setErrorMessage(e.message);
      }
    }
  };

  const changeDisplay = {
    display: errorMessage.length ? "flex" : "none"
  };

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
    >
      <TouchableOpacity activeOpacity={1} onPress={() => Keyboard.dismiss()}>
        <View style={styles.form}>
          <Text style={styles.header}>{tab}</Text>
          <Text style={[styles.error, changeDisplay]}>{errorMessage}</Text>
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
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    height: "100%",
    width: "100%",
    maxWidth: 400
  },
  scrollview: {},
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
