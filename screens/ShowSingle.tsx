import React from "react";
import {
  StyleSheet,
  ScrollView,
  Text,
  View,
  Image,
  Button,
  TextStyle,
  ImageStyle,
  ViewStyle
} from "react-native";
import { useSelector, useDispatch } from "react-redux";
import { fbDeletePost } from "../store/actions";
import { RootState } from "../lib/types";

interface Props {
  route: {
    params: { item: number };
  };
  navigation: any;
}

const ShowSingle: React.FC<Props> = ({ route, navigation }) => {
  const { item } = route.params;
  const post = useSelector((store: RootState) => store.posts[item]);
  const dispatch = useDispatch();

  return (
    <View style={styles.container}>
      {typeof post != "undefined" ? (
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
                  onPress={() => navigation.navigate("Edit", { item })}
                />
              </View>
              <View style={styles.singleButton}>
                <Button
                  color="red"
                  title="Delete"
                  onPress={() => {
                    (dispatch(fbDeletePost(item)) as any).then(() => {
                      navigation.goBack();
                    });
                  }}
                />
              </View>
            </View>
          </View>
        </ScrollView>
      ) : (
        <Text></Text>
      )}
    </View>
  );
};

interface Style {
  container: ViewStyle;
  post: ViewStyle;
  image: ImageStyle;
  title: TextStyle;
  description: TextStyle;
  buttons: ViewStyle;
  singleButton: ViewStyle;
  scroll: ViewStyle;
}

const styles = StyleSheet.create<Style>({
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
