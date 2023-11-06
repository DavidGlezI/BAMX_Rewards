import { StatusBar } from "expo-status-bar";
import { router } from "expo-router";
import {
  Platform,
  TextInput,
  TouchableHighlight,
  Button,
  StyleSheet,
  Image,
  Dimensions,
} from "react-native";
import React, { useState } from "react";

import { Text, View } from "../components/Themed";
import Colors from "../constants/Colors";

export default function Page() {

  return (
    <View style={styles.container}>
      <Image
        source={require("../assets/images/background.png")}
        style={styles.image}
      />
        <View style={styles.subContainer}>

        <TouchableHighlight style={styles.loginBtn} onPress={() => router.push("/login")}>
          <Text style={styles.buttonText}>Iniciar Sesión</Text>
        </TouchableHighlight>
          <Text style={styles.subTitle} onPress={() => router.push("/register")}>No tienes cuenta? Registrate</Text>
        </View>

    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "flex-end",
    position: "relative",
  },

  buttonText: {
    color: "white",
    textAlign: "center",
    fontSize: 24,
    fontWeight: "700",
  },
  loginBtn: {
    backgroundColor: Colors["light"].tint,
    borderRadius: 40,
    alignSelf: "center",
    justifyContent: "center",
    height: 65,
    width: 270,
  },
  subTitle: {
    textAlign: 'center',
    marginTop: 20,
    fontSize: 16,
    fontWeight: 700,
    color: "#fff"
  },
  subContainer: {
    flex: 1,
    justifyContent: "flex-end",
    marginBottom: 60,
    backgroundColor: 'rgba(52, 52, 52, alpha)'
 },
  image: {
    position: "absolute",
    objectFit: "cover",
    minWidth: Dimensions.get("window").width,
    height: Dimensions.get("window").height,
  },
});
