import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  ScrollView,
  TextInput,
  Button,
  View,
  Keyboard,
  KeyboardAvoidingView,
  TouchableOpacity,
  Platform,
  ViewStyle,
  TextStyle
} from "react-native";
import { useSelector, useDispatch } from "react-redux";
import { fbUpdatePost } from "../store/actions";
import { useHeaderHeight } from "@react-navigation/stack";
import { RootState } from "../lib/types";

interface Props {
  route: {
    params: { item: number };
  };
  navigation: any;
}

const Edit: React.FC<Props> = ({ route, navigation }) => {
  const { item } = route.params;
  const post = useSelector((store: RootState) => store.posts[item]);
  const dispatch = useDispatch();
  const [title, setTitle] = useState(post.title);
  const [image, setImage] = useState(post.image);
  const [description, setDescription] = useState(post.description);

  const handleSubmit = () => {
    dispatch(fbUpdatePost(item, { title, description, image }));
    navigation.goBack();
  };

  const headerHeight = useHeaderHeight();

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
            <Text style={styles.header}>Edit Post</Text>
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
    maxWidth: 380,
    alignSelf: "center",
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
    borderWidth: 1,
    padding: 1,
    borderRadius: 5,
    paddingHorizontal: 10,
    borderColor: "gray",
    marginBottom: 15
  },
  areaInput: {
    borderWidth: 0.5,
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

export default Edit;
