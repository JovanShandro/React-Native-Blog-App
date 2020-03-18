import React from "react";
import {
  StyleSheet,
  ScrollView,
  Text,
  View,
  Image,
  Button
} from "react-native";
import { useSelector } from "react-redux";

const ShowSingle = ({ route, navigation }) => {
  const { item } = route.params;
  const post = useSelector(store => store.posts[item]);

  return (
    <View style={styles.container}>
      <ScrollView style={styles.scroll}>
        <View style={styles.post}>
          <Image
            style={styles.image}
            source={{
              uri: post.image
            }}
          />
          <Text style={styles.title}>{post.title}</Text>
          <Text style={styles.description}>{post.description}</Text>
          <View style={styles.buttons}>
            <View style={styles.singleButton}>
              <Button
                color="orange"
                title="Edit"
                onPress={() => navigation.navigate("Edit")}
              />
            </View>
            <View style={styles.singleButton}>
              <Button color="red" title="Delete" onPress={() => {}} />
            </View>
          </View>
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center"
  },
  post: {
    marginTop: 20,
    width: "80%",
    maxWidth: 355,
    alignSelf: "center"
  },
  image: {
    alignSelf: "center",
    height: 180,
    width: "100%",
    paddingHorizontal: 10,
    marginTop: 15
  },
  title: {
    fontWeight: "bold",
    fontSize: 18,
    paddingHorizontal: 10,
    paddingTop: 5,
    alignSelf: "center"
  },
  description: {
    textAlign: "center",
    paddingHorizontal: 10,
    paddingTop: 15
  },
  buttons: {
    marginTop: 15,
    marginBottom: 10,
    width: "100%",
    flexDirection: "row",
    justifyContent: "space-around",
    marginBottom: 50
  },
  singleButton: {
    width: 70
  },
  scroll: {
    width: "100%"
  }
});

export default ShowSingle;
