import React from "react";
import { StyleSheet, View, Text, Image, ScrollView } from "react-native";

const images = [
  require("../../assets/images/QinLogo.png"),
  require("../../assets/images/CarlsLogo.png"),
  require("../../assets/images/QinLogo.png"),
  require("../../assets/images/QinLogo.png"),
  require("../../assets/images/CarlsLogo.png"),
  require("../../assets/images/QinLogo.png"),
  require("../../assets/images/CarlsLogo.png"),
];

const rectangles = [
  {
    id: "1",
    text: "Promoción 1",
    image: require("../../assets/images/QinLogo.png"),
  },
  {
    id: "2",
    text: "Promoción 2",
    image: require("../../assets/images/QinLogo.png"),
  },
  {
    id: "3",
    text: "Promoción 3",
    image: require("../../assets/images/QinLogo.png"),
  },
  {
    id: "4",
    text: "Promoción 4",
    image: require("../../assets/images/QinLogo.png"),
  },
  {
    id: "5",
    text: "Promoción 5",
    image: require("../../assets/images/QinLogo.png"),
  },
];

export default function TabPromotionsScreen() {
  const row1 = rectangles.filter((_, index) => index % 2 === 0);
  const row2 = rectangles.filter((_, index) => index % 2 === 1);

  return (
    <View style={styles.container}>
      <Text style={styles.establecimientosTitle}>ESTABLECIMIENTOS</Text>
      <ScrollView horizontal={true} contentContainerStyle={styles.circlesContainer}>
        {images.map((image, index) => (
          <View key={index} style={styles.circle}>
            <Image source={image} style={styles.image} />
          </View>
        ))}
      </ScrollView>
      <Text style={styles.promocionesTitle}>PROMOCIONES</Text>
      <ScrollView horizontal={true} contentContainerStyle={styles.rectanglesContainer}>
        <View style={styles.row}>
          {row1.map((item) => (
            <View key={item.id} style={styles.rectangle}>
              <Image source={item.image} style={styles.rectangleImage} />
              <Text style={styles.rectangleText}>{item.text}</Text>
            </View>
          ))}
        </View>
        <View style={styles.row}>
          {row2.map((item) => (
            <View key={item.id} style={styles.rectangle}>
              <Image source={item.image} style={styles.rectangleImage} />
              <Text style={styles.rectangleText}>{item.text}</Text>
            </View>
          ))}
        </View>
      </ScrollView>
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
    borderRadius: 29,
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
  },
  rectanglesContainer: {
    flexDirection: 'row',
  },
  row: {
    flexDirection: 'column',
  },
  rectangle: {
    backgroundColor: "#FFF",
    borderRadius: 10,
    padding: 10,
    margin: 5,
    width: 100,
    alignItems: "center",
    justifyContent: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.23,
    shadowRadius: 2.62,
    elevation: 4,
  },
  rectangleImage: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginBottom: 10,
  },
  rectangleText: {
    fontSize: 16,
    color: "#000",
    textAlign: "center",
  },
});
