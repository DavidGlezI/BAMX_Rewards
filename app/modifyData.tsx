import React, { useState, useEffect } from "react";
import { StatusBar } from "expo-status-bar";
import { router } from "expo-router";
import {
  Platform,
  TextInput,
  TouchableHighlight,
  Pressable,
  Button,
  StyleSheet,
  Image,
  Dimensions,
} from "react-native";
import { Text, View } from "../components/Themed";
import Colors from "../constants/Colors"
import { useUpdateCreate, useFetch } from "../util/useApi";




export default function TabAccountScreen() {

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [name, setName] = useState("");
  const [isFocused, setIsFocused] = useState(false);
  const [isFocused1, setIsFocused1] = useState(false);
  const [isFocused2, setIsFocused2] = useState(false);


  const {data, error:aserror2, loading:loading2, setData } = useFetch(
    "user"
  );
  const { response, error, loading, update} = useUpdateCreate(
    "user/",
    {
      user_email: email,
      username: name,
      user_password: newPassword,
    }
  );
  return (
    <View style={styles.container}>
      
      <Image
        source={require("../assets/images/background2.png")} // Troll 
        style={styles.image}
      />
      <View style={styles.loginContaier}>
        <Text style={styles.title}>Modificar mis datos</Text>

        <Text style={styles.infoTitle}>Nombre y Apellido*</Text>
        <TextInput
          placeholder={data}
          value={name}
          onChangeText={(text) => setName(text)}
          style={[
            styles.input,
            { borderColor: isFocused2 ? Colors["light"].tint : "#CCCCCC" },
          ]}
          onFocus={() => setIsFocused2(true)}
          onBlur={() => setIsFocused2(false)}
        />
       
        <Text style={styles.infoTitle}>Correo Electrónico*</Text>
        <TextInput
          placeholder={data}
          value={email}
          onChangeText={(text) => setEmail(text)}
          style={[
            styles.input,
            { borderColor: isFocused2 ? Colors["light"].tint : "#CCCCCC" },
          ]}
          onFocus={() => setIsFocused2(true)}
          onBlur={() => setIsFocused2(false)}
        />

        <Text style={styles.infoTitle}>Contraseña*</Text>
        <TextInput
          placeholder="Nueva Contraseña"
          value={password}
          onChangeText={(text) => setPassword(text)}
          style={[
            styles.input,
            { borderColor: isFocused2 ? Colors["light"].tint : "#CCCCCC" },
          ]}
          onFocus={() => setIsFocused2(true)}
          onBlur={() => setIsFocused2(false)}
        /> 

        <Text style={styles.infoTitle}>Confirmar Contraseña*</Text>
        <TextInput
          placeholder="Confirmar Nueva Contraseña"
          value={newPassword}
          onChangeText={(text) => setNewPassword(text)}
          style={[
            styles.input,
            { borderColor: isFocused2 ? Colors["light"].tint : "#CCCCCC" },
          ]}
          onFocus={() => setIsFocused2(true)}
          onBlur={() => setIsFocused2(false)}
        />

        <TouchableHighlight style={styles.loginBtn} onPress={() => password === newPassword ? update : console.log("Not the same")}>
          <Text style={styles.buttonText}>Guardar</Text>
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
    justifyContent: "center",
    marginBottom: 30,
    position: "relative",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20
  },
  title2: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 5
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
    fontWeight: "600"

  },
  input: {
    height: 40,
    borderBottomWidth: 1,
    marginBottom: 12,
    paddingLeft: 8,
    outlineStyle: "none",
  },
  infoCuenta: {
    height: 40,
    borderBottomWidth: 1,
    marginBottom: 12,
    outlineStyle: "none",
    fontWeight: "100",
  },
  infoTitle: {
    marginBottom: 12,
    outlineStyle: "none",
    fontWeight: "100",
  },
  infoDonacion:{
    fontWeight: "100",
  },
  borderBottom: {
    borderBottomColor: "red",
    borderBottomWidth: 1
  },

  donation:{
    backgroundColor: "#fff",
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
    flex: 0.6,
  },

  loginContaier2: {
    padding: 40,
    borderRadius: 40,
    backgroundColor: "#fff",
    shadowColor: "black",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    width: "90%",
    flex: 0.4,
  },

  image: {
    position: "absolute",
    top: 0,
    overflow: "hidden",
    minWidth: Dimensions.get("window").width + 50,
    height: Dimensions.get("window").height / 1.65,
  },
});