import React, { useEffect } from "react";
import { HeaderImage } from "../../components/HeaderImage";
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
  mainText: string;
  discountText: string;
  pointsText: string;
  image: any;
}

const images = [
  require("../../assets/images/QinLogo.png"),
  require("../../assets/images/CarlsLogo.png"),
  require("../../assets/images/CinepolisLogo.png"),
  require("../../assets/images/QinLogo.png"),
  require("../../assets/images/CarlsLogo.png"),
  require("../../assets/images/QinLogo.png"),
  require("../../assets/images/CarlsLogo.png"),
];

const rectangles: Rectangle[] = [
  {
    id: "1",
    mainText: "Combo Infantil",
    discountText: "20 % descuento",
    pointsText: "25 puntos",
    image: require("../../assets/images/ComboInfantil.png"),
  },
  {
    id: "2",
    mainText: "Refresco Refill",
    discountText: "Gratis",
    pointsText: "15 puntos",
    image: require("../../assets/images/CarlsRefresco.png"),
  },
  {
    id: "3",
    mainText: "Palomitas Grandes",
    discountText: "10 % descuento",
    pointsText: "35 puntos",
    image: require("../../assets/images/CinepolisPalomitas.png"),
  },
  {
    id: "4",
    mainText: "Combo Amigos",
    discountText: "20 % descuento",
    pointsText: "30 puntos",
    image: require("../../assets/images/QinLogo.png"),
  },
  {
    id: "5",
    mainText: "Minibox",
    discountText: "20 % descuento",
    pointsText: "25 puntos",
    image: require("../../assets/images/Mini-Box.png"),
  },
  {
    id: "6",
    mainText: "Combo Infantil",
    discountText: "20 % descuento",
    pointsText: "25 puntos",
    image: require("../../assets/images/QinLogo.png"),
  },
  {
    id: "7",
    mainText: "Minibox",
    discountText: "20 % descuento",
    pointsText: "25 puntos",
    image: require("../../assets/images/Mini-Box.png"),
  },
  {
    id: "8",
    mainText: "Western Bacon",
    discountText: "10 % descuento",
    pointsText: "30 puntos",
    image: require("../../assets/images/CarlsWestern.png"),
  },
  {
    id: "9",
    mainText: "Combo Infantil",
    discountText: "20 % descuento",
    pointsText: "25 puntos",
    image: require("../../assets/images/QinLogo.png"),
  },
  {
    id: "10",
    mainText: "Combo Infantil",
    discountText: "20 % descuento",
    pointsText: "25 puntos",
    image: require("../../assets/images/QinLogo.png"),
  },
  {
    id: "11",
    mainText: "Combo Infantil",
    discountText: "20 % descuento",
    pointsText: "25 puntos",
    image: require("../../assets/images/QinLogo.png"),
  },
  {
    id: "12",
    mainText: "Combo Infantil",
    discountText: "20 % descuento",
    pointsText: "25 puntos",
    image: require("../../assets/images/QinLogo.png"),
  },
];

export default function TabPromotionsScreen() {
  const half = Math.ceil(rectangles.length / 2);
  const firstRowRectangles = rectangles.slice(0, half);
  const secondRowRectangles = rectangles.slice(half);
  const { data, error, loading, fetch } = useFetch("restaurants");

  const renderRectangleWithCircle = (
    item: Rectangle,
    index: number,
    isFirst: boolean
  ) => (
    <View
      style={[styles.rectangleContainer, isFirst && { marginLeft: 20 }]}
      key={item.id}
    >
      <View style={styles.smallCircle}>
        <Image
          source={images[index % images.length]}
          style={styles.smallImage}
        />
      </View>
      <View style={styles.rectangle}>
        <Image source={item.image} style={styles.rectangleImage} />
        <Text style={styles.rectangleTextMain}>{item.mainText}</Text>
        <Text style={styles.rectangleTextDiscount}>{item.discountText}</Text>
        <Text style={styles.rectangleTextPoints}>{item.pointsText}</Text>
      </View>
    </View>
  );

  useEffect(() => {
    fetch();
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <HeaderImage />

      <ScrollView
        style={{ marginTop: 160 }}
        // scrollEnabled={false}
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
                  <View
                    key={String(index)}
                    style={[
                      styles.circle,
                      index === 0 ? { marginLeft: 46 } : {},
                    ]}
                  >
                    <Image source={image} style={styles.image} />
                  </View>
                ))}
              </ScrollView>
              <Text style={styles.promocionesTitle}>PROMOCIONES</Text>
              <ScrollView
                horizontal={true}
                showsHorizontalScrollIndicator={false}
              >
                <View>
                  <View style={styles.promotionsRow}>
                    {firstRowRectangles.map((item, index) =>
                      renderRectangleWithCircle(item, index, index === 0)
                    )}
                  </View>
                  <View style={styles.promotionsRow}>
                    {secondRowRectangles.map((item, index) =>
                      renderRectangleWithCircle(item, index, index === 0)
                    )}
                  </View>
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
    width: 48,
    height: 48,
    borderRadius: 20,
    backgroundColor: "#FFF",
    flexShrink: 0,
    margin: 10,
    shadowColor: "rgba(0, 0, 0, 0.1)",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 1,
    shadowRadius: 4,
    elevation: 4,
  },
  image: {
    width: "100%",
    height: "100%",
    resizeMode: "contain",
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
    shadowColor: "rgba(0, 0, 0, 0.1)",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 1,
    shadowRadius: 4,
    elevation: 4,
  },
  rectangleContainer: {
    alignItems: "center",
    marginBottom: 20,
  },
  rectangleImage: {
    width: 85,
    height: 85,
    borderRadius: 25,
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
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "flex-start",
    paddingTop: 12,
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
    borderRadius: 20,
    backgroundColor: "#FFF",
    position: "absolute",
    zIndex: 1,
    justifyContent: "center",
    alignItems: "center",
    shadowColor: "rgba(0, 0, 0, 0.1)",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 1,
    shadowRadius: 4,
    elevation: 4,
  },
  smallImage: {
    width: 20,
    height: 20,
    resizeMode: "contain",
  },
  rectangleTextMain: {
    fontSize: 12,
    color: "#000",
    textAlign: "center",
    fontWeight: "bold",
  },
  rectangleTextDiscount: {
    fontSize: 8,
    color: "#E6012E",
    textAlign: "center",
  },
  rectangleTextPoints: {
    display: "flex",
    fontSize: 8,
    color: "#BBB",
    textAlign: "center",
  },
});
