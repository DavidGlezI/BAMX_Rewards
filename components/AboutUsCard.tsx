import { StyleSheet, View, Text, Image, TouchableOpacity } from "react-native";

import { router } from "expo-router";

export const AboutUsCard = () => {
  const person = require("../assets/images/persona.png");

  return (
    <TouchableOpacity style={styles.rect} onPress={() => router.push("/about")}>
      <>
        <Text style={styles.mainText}>¿Quiénes somos?</Text>
        <Image source={person} style={styles.image} />
      </>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  rect: {
    backgroundColor: "#FFF",
    borderRadius: 20,
    flexShrink: 0,
    margin: 10,
    height: 100,
    padding: 10,
    alignItems: "center",
    justifyContent: "space-evenly",
    shadowColor: "rgba(0, 0, 0, 0.1)",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 1,
    shadowRadius: 4,
    elevation: 4,
    flexDirection: "row",
  },

  mainText: {
    fontSize: 28,
    fontWeight: "bold",
    marginLeft: 10,
  },
  image: {
    flex: 1,
    margin: 5,
    resizeMode: "contain",
  },
});
