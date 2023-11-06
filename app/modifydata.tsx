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
  ActivityIndicator,
} from "react-native";
import { Text, View } from "../components/Themed";
import Colors from "../constants/Colors";
import { useUpdateCreate, useFetch } from "../util/useApi";
import { HeaderImage } from "../components/HeaderImage";

export default function ModifydataScreen() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [name, setName] = useState("");
  const [isFocused, setIsFocused] = useState(false);
  const [isFocused1, setIsFocused1] = useState(false);
  const [isFocused2, setIsFocused2] = useState(false);

  const {
    data,
    error: error2,
    loading: loading2,
    setData,
    fetch,
  } = useFetch("user");
  const { response, error, loading, update } = useUpdateCreate("user/", {
    user_email: email,
    user_name: name,
    user_password: newPassword,
  });

  useEffect(() => {
    if (!data && !error2 && !loading2) {
      //Call get user on initial render
      fetch();
    }
    if (data && !error2 && !loading2) {
      // Update states on get user
      setEmail(data?.user_email);
      setName(data?.user_name);
    }
    if (response?.data && !error && !loading) {
      // Update states on response
      setEmail(response?.data?.user_email);
      setName(response?.data?.user_name);
    }
  }, [loading, data, loading2, response]);

  return (
    <View style={styles.container}>
      
          <HeaderImage />
          <View style={styles.loginContaier}>
            <Text style={styles.title}>Modificar mis datos</Text>
            {loading || loading2 ? (
        <ActivityIndicator size="large" color={Colors["light"].tint} />
      ) : error2 || error ? (
        <Text>Error</Text>
      ) : (
        <>
            <Text style={styles.infoTitle}>Nombre y Apellido*</Text>
            <TextInput
              placeholderTextColor="gray"
              placeholder={name}
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
              placeholderTextColor="gray"
              placeholder={email}
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
              placeholderTextColor="gray"
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
              placeholderTextColor="gray"
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

            <TouchableHighlight
              style={styles.loginBtn}
              onPress={() =>
                password === newPassword
                  ? update()
                  : alert("Contraseñas no son iguales")
              }
            >
              <Text style={styles.buttonText}>Guardar</Text>
            </TouchableHighlight>
        </>
      )}
          </View>
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
    marginBottom: 20,
  },
  title2: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 5,
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
    fontWeight: "600",
  },
  input: {
    height: 40,
    borderBottomWidth: 1,
    marginBottom: 12,
    paddingLeft: 8,
  },
  infoCuenta: {
    height: 40,
    borderBottomWidth: 1,
    marginBottom: 12,
    fontWeight: "100",
  },
  infoTitle: {
    marginBottom: 12,
    fontWeight: "100",
  },
  infoDonacion: {
    fontWeight: "100",
  },
  borderBottom: {
    borderBottomColor: "red",
    borderBottomWidth: 1,
  },
  donation: {
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
    flex: 0.7,
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
