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

export default function ModalScreen() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isFocused, setIsFocused] = useState(false);
  const [isFocused2, setIsFocused2] = useState(false);

  const handleLogin = () => {
    router.replace("/promotions");
    console.log(`Logging in with email: ${email} and password: ${password}`);
  };

  return (
    <View style={styles.container}>
      <Image
        source={require("../assets/images/background1.png")}
        style={styles.image}
      />
      <View style={styles.loginContaier}>
        <Text style={styles.title}  >Iniciar sesión</Text>
        <Text style={styles.subTitle} onPress={() => router.replace("/register")}>o Únete a BAMX</Text>
        <TextInput
          placeholder="Correo Electrónico"
          value={email}
          onChangeText={(text) => setEmail(text)}
          style={[
            styles.input,
            { borderColor: isFocused2 ? Colors["light"].tint : "#CCCCCC" },
          ]}
          onFocus={() => setIsFocused2(true)}
          onBlur={() => setIsFocused2(false)}
        />
        <TextInput
          style={[
            styles.input,
            { borderColor: isFocused ? Colors["light"].tint : "#CCCCCC" },
          ]}
          placeholder="Contraseña"
          value={password}
          onChangeText={(text) => setPassword(text)}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          secureTextEntry
        />
        <TouchableHighlight style={styles.loginBtn} onPress={handleLogin}>
          <Text style={styles.buttonText}>Iniciar Sesión</Text>
        </TouchableHighlight>
      </View>

      {/* Use a light status bar on iOS to account for the black space above the modal */}
      <StatusBar style={Platform.OS === "ios" ? "light" : "auto"} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "flex-end",
    marginBottom: 30,
    position: "relative",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
  },
  buttonText: {
    color: "white",
    textAlign: "center",
    fontSize: 16,
    fontWeight: "700",
  },
  loginBtn: {
    backgroundColor: Colors["light"].tint,
    borderRadius: 40,
    alignSelf: "center",
    justifyContent: "center",
    marginTop: 20,
    height: 55,
    width: 240,
  },
  subTitle: {
    marginTop: 10,
    marginBottom: 60,
    fontSize: 14,
  },
  input: {
    height: 40,
    borderBottomWidth: 1,
    marginBottom: 12,
    paddingLeft: 8,
    outlineStyle: "none",
  },
  loginContaier: {
    padding: 40,
    borderRadius: 40,

    backgroundColor: "#fff",
    shadowColor: "black",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    width: "90%",
    flex: 0.5,
  },
  image: {
    position: "absolute",
    top: 0,
    overflow: "hidden",
    minWidth: Dimensions.get("window").width + 50,
    height: Dimensions.get("window").height / 1.65,
  },
});
