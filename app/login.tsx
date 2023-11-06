import React, { useState, useEffect } from "react";
import { StatusBar } from "expo-status-bar";
import { router } from "expo-router";
import * as SecureStore from "expo-secure-store";
import {
  Platform,
  TextInput,
  TouchableHighlight,
  Animated,
  StyleSheet,
  Image,
  ActivityIndicator,
  Dimensions,
} from "react-native";
import { useUpdateCreate } from "../util/useApi";
import { Text, View } from "../components/Themed";
import Colors from "../constants/Colors";

async function save(key: string, value: any) {
  await SecureStore.setItemAsync(key, value);
}

export default function LoginScreen() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isFocused, setIsFocused] = useState(false);
  const [isFocused2, setIsFocused2] = useState(false);
  const { response, error, loading, create } = useUpdateCreate("user/login", {
    user_email: email,
    user_password: password,
  });

  useEffect(() => {
    console.log(
      `being called with values load: ${loading} error: ${error} response: ${response}`
    );
    if (!loading && !error && response?.status === 200) {
      console.log(response.data["access-token"]);
      save("access-token", response.data["access-token"]);
      router.push("/home");
    } else if (!loading && error) {
      setPassword("");
    }
  }, [response, loading]);

  return (
    <View style={styles.container}>
      <Image
        source={require("../assets/images/background1.png")}
        style={styles.image}
      />
      <View style={styles.loginContaier}>
        <Text style={styles.title}>Iniciar sesión</Text>
        <Text
          style={styles.subTitle}
          onPress={() => router.replace("/register")}
        >
          o Únete a BAMX
        </Text>
        <TextInput
          placeholder="Correo Electrónico"
          placeholderTextColor="gray"
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
          placeholderTextColor="gray"
          value={password}
          onChangeText={(text) => setPassword(text)}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          secureTextEntry
        />
        {loading ? (
          <ActivityIndicator
            style={{ marginTop: 10 }}
            size="small"
            color={Colors["light"].tint}
          />
        ) : (
          <TouchableHighlight style={styles.loginBtn} onPress={create}>
            <Text style={styles.buttonText}>Iniciar Sesión</Text>
          </TouchableHighlight>
        )}

        {error && !isFocused && !isFocused2 && (
          <Text style={styles.errorText}>
            Credenciales incorrectas intente de nuevo
          </Text>
        )}
      </View>

      {/* Use a light status bar on iOS to account for the black space above the modal */}
      <StatusBar style={Platform.OS === "ios" ? "light" : "auto"} />
    </View>
  );
}

const styles = StyleSheet.create({
  errorText: {
    color: "red",
    textAlign: "center",
    marginTop: 30,
    fontWeight: "500",
  },
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
