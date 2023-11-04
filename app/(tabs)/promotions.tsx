import React, { useEffect } from "react";
import {
  StyleSheet,
  View,
  Text,
  Image,
  SafeAreaView,
  ScrollView,
  RefreshControl,
  ActivityIndicator,
} from "react-native";
import { useFetch } from "../../util/useApi";
import Colors from "../../constants/Colors";

interface Rectangle {
  id: string;
  text: string;
  image: any;
}

const images = [
  require("../../assets/images/QinLogo.png"),
  require("../../assets/images/CarlsLogo.png"),
  require("../../assets/images/QinLogo.png"),
  require("../../assets/images/QinLogo.png"),
  require("../../assets/images/CarlsLogo.png"),
  require("../../assets/images/QinLogo.png"),
  require("../../assets/images/CarlsLogo.png"),
];

const rectangles: Rectangle[] = [
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
  {
    id: "6",
    text: "Promoción 6",
    image: require("../../assets/images/QinLogo.png"),
  },
  {
    id: "7",
    text: "Promoción 7",
    image: require("../../assets/images/QinLogo.png"),
  },
  {
    id: "8",
    text: "Promoción 8",
    image: require("../../assets/images/QinLogo.png"),
  },
  {
    id: "9",
    text: "Promoción 9",
    image: require("../../assets/images/QinLogo.png"),
  },
  {
    id: "10",
    text: "Promoción 10",
    image: require("../../assets/images/QinLogo.png"),
  },
  {
    id: "11",
    text: "Promoción 11",
    image: require("../../assets/images/QinLogo.png"),
  },
  {
    id: "12",
    text: "Promoción 12",
    image: require("../../assets/images/QinLogo.png"),
  },
];

export default function TabPromotionsScreen() {
  const half = Math.ceil(rectangles.length / 2);
  const firstRowRectangles = rectangles.slice(0, half);
  const secondRowRectangles = rectangles.slice(half);
  const { data, error, loading, fetch } = useFetch("restaurants");

  const renderRectangle = (item: Rectangle) => (
    <View style={styles.rectangle} key={item.id}>
      <Image source={item.image} style={styles.rectangleImage} />
      <Text style={styles.rectangleText}>{item.text}</Text>
    </View>
  );

  useEffect(() => {
    fetch();
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView
        refreshControl={
          <RefreshControl refreshing={loading} onRefresh={fetch} />
        }
      >
        {error ? (
          <Text>Sorry there was an error loading your data</Text>
        ) : loading ? (
          <ActivityIndicator size="large" color={Colors["light"].tint} />
        ) : (
          data && (
            <>
              <Text style={styles.establecimientosTitle}>ESTABLECIMIENTOS</Text>
              <ScrollView
                horizontal={true}
                contentContainerStyle={styles.circlesContainer}
                showsHorizontalScrollIndicator={false}
              >
                {images.map((image, index) => (
                  <View key={String(index)} style={styles.circle}>
                    <Image source={image} style={styles.image} />
                  </View>
                ))}
              </ScrollView>
              <Text style={styles.promocionesTitle}>PROMOCIONES</Text>
              <ScrollView
                horizontal={true}
                contentContainerStyle={styles.smallCirclesContainer}
                showsHorizontalScrollIndicator={false}
              >
                {images.map((image, index) => (
                  <View key={`small-${index}`} style={styles.smallCircle}>
                    <Image source={image} style={styles.smallImage} />
                  </View>
                ))}
              </ScrollView>

              <ScrollView
                horizontal={true}
                contentContainerStyle={styles.promotionsContainer}
                showsHorizontalScrollIndicator={false}
              >
                <View style={styles.promotionsRow}>
                  {firstRowRectangles.map(renderRectangle)}
                </View>
                <View style={styles.promotionsRow}>
                  {secondRowRectangles.map(renderRectangle)}
                </View>
              </ScrollView>
            </>
          )
        )}
      </ScrollView>
    </SafeAreaView>
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
    marginBottom: 10,
  },
  establecimientosTitle: {
    color: "#BBB",
    fontSize: 16,
    fontWeight: "800",
    textAlign: "left",
    marginBottom: 10,
    marginTop: 20,
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
  rectangle: {
    backgroundColor: "#FFF",
    borderRadius: 20,
    padding: 10,
    flexShrink: 0,
    margin: 10,
    width: 106,
    height: 160,
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
  promotionsRow: {
    flexDirection: "row",
    flexWrap: "wrap",
  },
  promotionsContainer: {
    flexDirection: "column",
  },
  smallCirclesContainer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    paddingVertical: 10,
  },
  smallCircle: {
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: "#FFF",
    flexShrink: 0,
    margin: 10,
    justifyContent: "center",
    alignItems: "center",
    overflow: "hidden",
  },
  smallImage: {
    width: "100%",
    height: "100%",
    resizeMode: "contain",
  },
});
