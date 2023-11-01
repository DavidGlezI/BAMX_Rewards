import React from "react";
import { StyleSheet, View, Text, Image} from "react-native";
import { ScrollView } from "react-native-gesture-handler";

const images = [
  require ("../../assets/images/QinLogo.png"),
  require ("../../assets/images/CarlsLogo.png"),
  require ("../../assets/images/QinLogo.png"),
  require ("../../assets/images/QinLogo.png"),
  require ("../../assets/images/CarlsLogo.png"),
  require ("../../assets/images/QinLogo.png"),
  require ("../../assets/images/CarlsLogo.png")
];
export default function TabPromotionsScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.establecimientosTitle}>ESTABLECIMIENTOS</Text>
      <ScrollView  horizontal={true}>
        {images.map((image, index) => (
          <View key={index} style={styles.circle}>
            <Image source={image} style={styles.image} />
          </View>
        ))}
      </ScrollView>
      <Text style={styles.promocionesTitle}>PROMOCIONES</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  promocionesTitle: {
    color: "#BBB",
    fontSize: 16,
    fontWeight: "800",
    textAlign: "left",
    marginTop: 20,
    alignSelf: "flex-start",
    marginLeft: 30,
  },
  establecimientosTitle: {
    color: "#BBB",
    fontSize: 16,
    fontWeight: "800",
    textAlign: "left",
    marginBottom: 10,
    alignSelf: "flex-start",
    marginLeft: 30,
  },
  circlesContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
  },

  circle: {
    width: 58,
    height: 58,
    borderRadius: 50,
    padding: 2,
    backgroundColor: "#FFF",
    flexShrink: 0,
    margin: 10,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.23,
    shadowRadius: 2.62,
    elevation: 4,
    overflow: "hidden", 
  },
  image: {
    width: "100%",
    height: "100%",
    borderRadius: 24,
    objectFit: "contain",
    padding: 5,
  },
});
