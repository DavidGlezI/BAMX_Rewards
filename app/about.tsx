import React, { useEffect, useState } from "react";
import {
  ScrollView,
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Image,
  Button,
} from "react-native";
import { Video, ResizeMode } from "expo-av";
import { WebView } from "react-native-webview";

import Colors from "../constants/Colors";

export default function About() {
  const video = React.useRef(null);
  const [status, setStatus] = React.useState({});
  const img1 = require("../assets/images/bamxInfo1.png");
  const img2 = require("../assets/images/bamxinfo2.png");
  return (
    <ScrollView>
      <View style={styles.container}>
        <View style={styles.infoContainer}>
          <Text style={{ ...styles.title, marginTop: 15 }}>
            ¿Quiénes somos?
          </Text>
          <Text>
            Somos una OSC (Organización de la Sociedad Civil) sin fines de lucro
            y apartidista, nuestra red está compuesta por 57 Bancos de Alimentos
            los cuales rescatan alimento a lo largo de toda la cadena de valor
            para llevarlo a familias, comunidades e instituciones
          </Text>
          <Video
            ref={video}
            source={{
              uri: "https://images-bucket-bamx.s3.us-east-2.amazonaws.com/%C2%BFQu%C3%A9+es+la+Red+BAMX_.mp4",
            }}
            style={{ width: "100%", height: 200 }}
            useNativeControls
            resizeMode={ResizeMode.CONTAIN}
            isLooping
            onPlaybackStatusUpdate={(status) => setStatus(() => status)}
          />
          <Text style={{ ...styles.title }}>¿Qué hacemos?</Text>
          <Text style={{ marginTop: 0 }}>
            Rescatamos 149,400.81 kg de alimento en 2022, del cual 47% son
            frutas y verduras y 53% no perecederos.
          </Text>
          <Image
            style={{ objectFit: "contain", width: "100%", marginTop: -70 }}
            source={img2}
          />
          <Image
            style={{
              objectFit: "contain",
              width: "100%",
              marginTop: -185,
              marginBottom: -110,
            }}
            source={img1}
          />
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
  },
  btn: {
    marginTop: 50,
    backgroundColor: Colors["light"].tint,
    borderRadius: 40,
    alignSelf: "center",
    justifyContent: "center",
    height: 55,
    width: 240,
  },
  inLine: {
    flexDirection: "row",
    gap: 5,
  },
  infoContainer: {
    padding: 20,
    borderRadius: 40,
    alignItems: "center",
    gap: 25,
    justifyContent: "center",
    backgroundColor: "#fff",
    shadowColor: "black",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    width: "90%",
    marginTop: 30,
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#E6012E",
    textAlign: "center",
  },

  text1: {
    fontSize: 12,
    color: "#000",
    textAlign: "center",
  },
  text2: {
    fontSize: 8,
    fontWeight: "400",
  },
  rectangleContainer: {
    alignItems: "center",
    marginBottom: 10,
  },
  rectangleImage: {
    width: 89.011,
    height: 88,
    borderRadius: 25,
  },
  rectangleText: {
    fontSize: 16,
    color: "#000",
    textAlign: "center",
  },
  resumen: {
    fontSize: 20,
    color: "#000",
    textAlign: "center",
    fontWeight: "bold",
    marginBottom: 10,
    textDecorationLine: "underline",
  },

  rectangleTextMain: {
    fontSize: 12,
    color: "#000",
    textAlign: "center",
    fontWeight: "bold",
  },

  rectangleTextPoints: {
    display: "flex",
    fontSize: 8,
    color: "red",
    textAlign: "center",
  },
});
