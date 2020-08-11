import React, { useState } from "react";
import {
  StyleSheet,
  ScrollView,
  Text,
  TextInput,
  Button,
  View,
  Keyboard,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
  TextStyle,
  ViewStyle
} from "react-native";
import { useDispatch } from "react-redux";
import { useHeaderHeight } from "@react-navigation/stack";
import { fbAddPost } from "../store/actions";
import { currentDate } from "../lib/util";

interface Props {
  navigation: any;
}

const NewScreen: React.FC<Props> = ({ navigation }) => {
  const dispatch = useDispatch();
  const [title, setTitle] = useState("");
  const [image, setImage] = useState("");
  const [description, setDescription] = useState("");

  const headerHeight = useHeaderHeight();

  const handleSubmit = () => {
    dispatch(fbAddPost({ title, description, image, date: currentDate() }));
    navigation.goBack();
  };

  return (
    <KeyboardAvoidingView
      keyboardVerticalOffset={headerHeight}
      behavior={Platform.OS == "ios" ? "padding" : "height"}
      style={[styles.container, styles.whiteBackground]}
    >
      <ScrollView style={styles.container}>
        <TouchableOpacity
          style={styles.container}
          activeOpacity={1}
          onPress={() => Keyboard.dismiss()}
        >
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
                  color="red"
                  title="Cancel"
                  onPress={() => navigation.goBack()}
                />
                <Button color="blue" title="Submit" onPress={handleSubmit} />
              </View>
            </View>
          </View>
        </TouchableOpacity>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

interface Style {
  container: ViewStyle;
  whiteBackground: ViewStyle;
  form: ViewStyle;
  header: ViewStyle;
  section: ViewStyle;
  label: TextStyle;
  input: ViewStyle;
  areaInput: ViewStyle;
  buttons: ViewStyle;
}

const styles = StyleSheet.create<Style>({
  container: {
    flex: 1
  },
  whiteBackground: {
    backgroundColor: "#fff"
  },
  form: {
    flex: 1,
    width: "80%",
    maxWidth: 380,
    alignSelf: "center",
    borderColor: "#1b1c1d83",
    borderRadius: 5,
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
    borderWidth: 1,
    padding: 1,
    borderRadius: 5,
    paddingHorizontal: 10,
    borderColor: "gray",
    marginBottom: 15
  },
  areaInput: {
    borderWidth: 1,
    borderRadius: 5,
    padding: 10,
    textAlignVertical: "top",
    marginBottom: 20
  },
  buttons: {
    flexDirection: "row",
    justifyContent: "space-around"
  }
});

export default NewScreen;
