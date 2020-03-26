import React, { useEffect, useState } from "react";
import { StyleSheet, Text, View, Image, Button, FlatList } from "react-native";
import { useSelector } from "react-redux";
import { firebaseDb, firebaseAuth } from "../store/actions";
import { getPosts } from "../store/actions";
import * as R from "ramda";

const Show = ({ navigation }) => {
  const posts = useSelector(state => state.posts);

  const shortenDesc = desc => {
    if (desc.length <= 155) return desc;
    return desc.slice(0, 155) + "...";
  };

  return (
    <View style={styles.container}>
      {R.isEmpty(posts) ? (
        <View style={styles.noPosts}>
          <Text style={styles.noPostsText}>
            You have no posts for the moment!
          </Text>
        </View>
      ) : (
        <FlatList
          style={{ width: "100%" }}
          data={R.pipe(
            R.toPairs,
            R.map(([id, other]) => R.merge(other, { id })),
            R.sort(R.descend(R.prop("date")))
          )(posts)}
          keyExtractor={item => item}
          renderItem={({ item }) => (
            <View style={styles.post}>
              <Image
                style={styles.image}
                source={{
                  uri: item.image
                }}
              />
              <Text style={styles.title}>{item.title}</Text>
              <Text style={styles.description}>
                {shortenDesc(item.description)}
              </Text>
              <View style={styles.button}>
                <Button
                  color="#9f79ee"
                  title="Read More"
                  onPress={() =>
                    navigation.navigate("ShowSingle", { item: item.id })
                  }
                />
              </View>
            </View>
          )}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center"
  },
  noPosts: {
    flex: 1,
    width: 190,
    alignItems: "center",
    justifyContent: "center"
  },
  noPostsText: {
    fontWeight: "bold",
    fontSize: 23,
    textAlign: "center"
  },
  post: {
    marginTop: 20,
    shadowOffset: { width: 10, height: 10 },
    shadowColor: "black",
    shadowOpacity: 1,
    elevation: 7,
    borderWidth: 1,
    borderColor: "#0000",
    backgroundColor: "#0000",
    width: "80%",
    maxWidth: 325,
    alignSelf: "center",
    marginBottom: 30
  },
  image: {
    alignSelf: "center",
    height: 180,
    width: "95%",
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
  button: {
    marginTop: 15,
    marginBottom: 10,
    width: 130,
    alignSelf: "center"
  }
});

export default Show;
