import React from "react";
import { Image, StyleSheet, Dimensions } from "react-native";

export function HeaderImage(props: any) {
  return (
    <Image
      source={require("../assets/images/background1.png")}
      style={styles.headerImage}
    />
  );
}

const styles = StyleSheet.create({
  headerImage: {
    position: "absolute",
    top: 0,
    overflow: "hidden",
    minWidth: Dimensions.get("window").width,
    height: Dimensions.get("window").height / 3,
  },
});
