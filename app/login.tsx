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
  Modal,
  TouchableOpacity,
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
  const [isPopupVisible, setIsPopupVisible] = useState(false);
  const { response: response2, error:errorResend, loading:loadingResend, create: createResend } = useUpdateCreate("verify", {
    user_email: email,
  });

  const { response, error, loading, create } = useUpdateCreate("user/login", {
    user_email: email,
    user_password: password,
  });

  useEffect(() => {
    console.log(
      `being called with values load: ${loading} error: ${error} response: ${response}`
    );
    if (!loading && !error && response?.status === 200) {
      setIsPopupVisible(false);
      console.log(response.data["access-token"]);
      save("access-token", response.data["access-token"]);
      router.push("/home");
    } 
    else if (!loading && error?.response.status === 403){
      setIsPopupVisible(true);
      console.log(error.response.data); 
      setPassword("");
    }
    else if (!loading && error) {
      setIsPopupVisible(false);
      console.log(error.response.data); 
      setPassword("");
    }
  }, [response, loading]);
  const openPopup = () => {
    setIsPopupVisible(true);
  };

  const closePopup = () => {
    setIsPopupVisible(false);
  };

  const handlePress = () => {
    createResend();
    setIsPopupVisible(false);
  };

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
        {error && !loading && !isFocused && !isFocused2 && error.response.status === 403 ? (
        <Modal
        transparent={true}
        animationType="fade"
        visible = {isPopupVisible}
        onRequestClose={closePopup}
      >
        <TouchableOpacity
          style={styles.centeredView}
          activeOpacity={1}
          onPressOut={closePopup}
        >
          <View style={styles.modalView}>
            <View style={styles.header}>
              <Text style={styles.headerText}>Reenviar Email</Text>
            </View>

            <Text style={styles.mainText}> Haz click en el boton para reenviar el email de verificacion</Text>
            <TouchableOpacity onPress={() => handlePress()} style={styles.redeemButton}>
              <Text style={styles.redeemButtonText}>Reenviar</Text>
            </TouchableOpacity>
          </View>
        </TouchableOpacity>
      </Modal>
        ) : (
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
  redeemButton: {
    backgroundColor: "#E6012E",
    borderRadius: 30,
    paddingVertical: 10,
    paddingHorizontal: 20,
    marginTop: 0,
    marginBottom: 5,
    elevation: 2,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.22,
    shadowRadius: 2.22,
  },

  redeemButtonText: {
    color: "white",
    textAlign: "center",
    fontWeight: "bold",
    fontSize: 14,
  },
  mainText: {
    textAlign: "center",
    fontSize: 18,
    color: "#000",
    fontWeight: "bold",
    marginTop: 25,
    marginBottom: 10,
  },
  modalView: {
    width: 300,
    height: 200,
    backgroundColor: "white",
    borderRadius: 20,
    padding: 35,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
    overflow: "hidden",
  },
  header: {
    backgroundColor: "#E6012E",
    width: "200%",
    height: 50,
    position: "absolute",
    top: 0,
    borderTopStartRadius: 15,
    borderTopEndRadius: 15,
    justifyContent: "center",
    alignItems: "center",
  },
  headerText: {
    color: "white",
    fontWeight: "bold",
    fontSize: 20,
  },
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.6)",
  },
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
