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
import { Text, View } from "../../components/Themed";
import Colors from "../../constants/Colors"



interface DonationProps{
  id: string;
  cantidad: string;
};

const Donations: React.FC<DonationProps> = ({id, cantidad}) =>{
  
  return (
    <View style= {styles.donation}>
      <Text style= {styles.subTitle}>Donación</Text>
      <Text style= {styles.infoDonacion}>ID: {id}</Text>
      <Text style= {styles.infoDonacion}>Cantidad: $ {cantidad} pesos</Text>
      <View style = {styles.borderBottom}/>
    </View>
  );
};



export default function TabAccountScreen() {

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [isFocused, setIsFocused] = useState(false);
  const [isFocused1, setIsFocused1] = useState(false);
  const [isFocused2, setIsFocused2] = useState(false);
  return (
    <View style={styles.container}>
      
      <Image
        source={require("../../assets/images/background2.png")} // Troll 
        style={styles.image}
      />
      <View style={styles.loginContaier}>
        <Text style={styles.title}>Mi cuenta</Text>

        <Text style={styles.infoTitle}>Nombre y Apellido*</Text>
        <Text style={styles.infoCuenta}>Mateo Bernasconi</Text> 
       
        <Text style={styles.infoTitle}>Correo Electrónico*</Text>
        <Text style={styles.infoCuenta}>mateobernasconi@gmail.com</Text> 

        <Text style={styles.infoTitle}>Contraseña*</Text>
        <Text style={styles.infoCuenta}>******</Text> 

        <TouchableHighlight style={styles.loginBtn}>
          <Text style={styles.buttonText}>Modificar</Text>
        </TouchableHighlight>

      </View>


      <View style = {styles.loginContaier2}>
        <View style = {styles.donation}>
          <Text style={styles.title2}>Historial</Text>
          <View style = {styles.borderBottom}/>
          <Donations id = {"5"} cantidad = {"70"}/>
          <Donations id = {"5"} cantidad = {"70"}/>
          <Donations id = {"5"} cantidad = {"70"}/>
        </View>

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
    gap: 20,
    justifyContent: "flex-end",
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