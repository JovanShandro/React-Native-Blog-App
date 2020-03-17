import React from "react";
import { StyleSheet, Text, View, Image, Button } from "react-native";

const Show = () => {
  return (
    <View style={styles.container}>
      <View style={styles.post}>
        <Image
          style={styles.image}
          source={{
            uri:
              "https://cdn.thewirecutter.com/wp-content/uploads/2018/07/laptops-under-500-lowres-9990.jpg"
          }}
        />
        <Text style={styles.title}>Newest macbook Pro!!</Text>
        <Text style={styles.description}>
          Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam
          nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat,
          sed diam voluptua...
        </Text>
        <View style={styles.button}>
          <Button color="#9f79ee" title="Read More" />
        </View>
      </View>
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
    shadowOffset: { width: 10, height: 10 },
    shadowColor: "black",
    shadowOpacity: 1,
    elevation: 7,
    borderWidth: 1,
    borderColor: "#0000",
    backgroundColor: "#0000", // invisible color
    width: "80%",
    maxWidth: 325
  },
  image: {
    alignSelf: "center",
    height: 180,
    marginTop: 5,
    width: "95%",
    paddingHorizontal: 10,
    marginTop: 10
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
