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
import { useDispatch } from "react-redux";
import { fbAddPost } from "../store/actions";
import { currentDate } from "../lib/util";

const { State: TextInputState } = TextInput;

const NewScreen = ({ navigation }) => {
  const dispatch = useDispatch();
  const [title, setTitle] = useState("");
  const [image, setImage] = useState("");
  const [shift, setShift] = useState(new Animated.Value(0));
  const [description, setDescription] = useState("");
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
    dispatch(fbAddPost({ title, description, image, date: currentDate() }));
    navigation.goBack();
  };

  return (
    <Animated.View
      style={[styles.container, { transform: [{ translateY: shift }] }]}
    >
      <ScrollView style={styles.scrollview}>
        <TouchableOpacity activeOpacity={1} onPress={() => Keyboard.dismiss()}>
          <View style={styles.form}>
            <Text style={styles.header}>Create New Post</Text>
            <View style={styles.section}>
              <Text style={styles.label}>Title</Text>
              <TextInput
                style={styles.input}
                onChangeText={text => setTitle(text)}
                value={title}
              />
            </View>
            <View style={styles.section}>
              <Text style={styles.label}>Image</Text>
              <TextInput
                style={styles.input}
                onChangeText={text => setImage(text)}
                value={image}
              />
            </View>
            <View style={styles.section}>
              <Text style={styles.label}>Description</Text>
              <TextInput
                multiline={true}
                style={styles.areaInput}
                onChangeText={text => setDescription(text)}
                value={description}
              />
            </View>
            <View>
              <View style={styles.buttons}>
                <Button
                  style={styles.button}
                  color="red"
                  title="Cancel"
                  onPress={() => navigation.goBack()}
                />
                <Button
                  style={styles.button}
                  color="blue"
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
    borderWidth: 1,
    borderColor: "#1b1c1d83",
    borderRadius: 10,
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
    borderRadius: 20,
    paddingHorizontal: 10,
    borderColor: "gray",
    marginBottom: 15
  },
  areaInput: {
    borderWidth: 0.5,
    borderRadius: 20,
    padding: 10,
    textAlignVertical: "top"
  },
  buttons: {
    flexDirection: "row",
    justifyContent: "space-around"
  },
  button: {
    width: 70
  }
});

export default NewScreen;
