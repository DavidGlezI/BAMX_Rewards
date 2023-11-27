import React, { useState, useEffect } from "react";
import { HeaderImage } from "../../components/HeaderImage";
import {
  StyleSheet,
  View,
  Text,
  Image,
  SafeAreaView,
  ScrollView,
  RefreshControl,
  Dimensions,
  ActivityIndicator,
  TouchableOpacity,
} from "react-native";
import { useFetch } from "../../util/useApi";
import Colors from "../../constants/Colors";
import PopUpPromo from "../../components/PopUpPromo";

interface Rectangle {
  establishment_id: number;
  promotion_id: number;
  promotion_name: string;
  promotion_image : string;
  promotion_descriptive_text : string;
  promotion_price : number;
}

interface Establishment {
  establishment_id: number;
  establishment_name: string;
  establishment_logo: string;
  establishment_latitud: number;
  establishment_longitud: number;
}

export default function TabHomeScreen() {
  const { data, error, loading, fetch } = useFetch("restaurants");
  const {
    data: promoData,
    error: promoError,
    loading: promoLoading,
    fetch: promoFetch,
  } = useFetch("promotions");

  useEffect(() => {
    fetch();
    promoFetch();
  }, []);

  const [isPopupVisible, setIsPopupVisible] = useState(false);
  const [selectedRectangle, setSelectedRectangle] = useState<Rectangle | null>(
    null
  );
  const openPopup = (rectangle: Rectangle) => {
    setSelectedRectangle(rectangle);
    setIsPopupVisible(true);
  };

  const closePopup = () => {
    setIsPopupVisible(false);
  };


  useEffect(() => {
    fetch();
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <HeaderImage />

      <ScrollView
        // scrollEnabled={false}
        refreshControl={
          <RefreshControl refreshing={loading} onRefresh={fetch} />
        }
      >
        {error || promoError ? (
          <Text style={{ marginTop: Dimensions.get("window").height / 5 }}>
            Sorry there was an error loading your data
          </Text>
        ) : loading || promoLoading ? (
          <ActivityIndicator
            style={{ marginTop: Dimensions.get("window").height / 5 }}
            size="large"
            color={Colors["light"].tint}
          />
        ) : (
          data && 
          promoData && (
            <>
              <View
                style={{
                  ...styles.card,
                  marginTop: Dimensions.get("window").height / 5,
                  alignSelf: "center",
                }}
              >
                <View style={styles.contentWrapper}>
                  <Text style={styles.cardText}>Tarjeta</Text>
                  <View style={styles.circleWrapper}>
                    <View style={styles.circleWhite}>
                      <View style={styles.circleRed}>
                        <Image source={require("../../assets/images/qr.png")} />
                      </View>
                    </View>
                    <Text style={styles.pointsText}>200 puntos</Text>
                  </View>
                </View>
              </View>

              <Text style={styles.promocionesTitle}>PROMOCIONES</Text>
              <ScrollView
                horizontal={true}
                showsHorizontalScrollIndicator={false}
              >
                <View>
                  <View style={styles.promotionsRow}>
                  {promoData?.map((item: Rectangle,index :number) =>
                        (
                        <TouchableOpacity
                          onPress={() => openPopup(item)}
                          style={[styles.rectangleContainer, index === 0 && { marginLeft: 20 }]}
                          key={item.promotion_id}
                        >
                          <View style={styles.smallCircle}>
                            <Image source={{ uri: data[item.establishment_id-1].establishment_logo }} style={styles.smallImage} />
                          </View>
                          <View style={styles.rectangle}>
                            <Image source={{uri: item.promotion_image}} style={styles.rectangleImage} />
                            <Text style={styles.rectangleTextMain}>{item.promotion_name}</Text>
                            <Text style={styles.rectangleTextDiscount}>{item.promotion_descriptive_text}</Text>
                            <Text style={styles.rectangleTextPoints}>{item.promotion_price}</Text>
                          </View>
                        </TouchableOpacity>
                      )
                    )}
                  </View>
                </View>
              </ScrollView>

              <Text style={styles.donacionesTitle}>DONACIONES</Text>
              <View style={styles.rect}>
                <Text style={styles.mainText}>
                  Tu donación marca la diferencia
                </Text>
                <Text style={styles.subText}>¡Únete para cambiar vidas!</Text>
                <View style={styles.donationContainer}>
                  <View style={styles.circle_border}>
                    <Text style={styles.circleNum}>5</Text>
                  </View>
                  <View style={styles.circle_border}>
                    <Text style={styles.circleNum}>10</Text>
                  </View>
                  <View style={styles.circle_border}>
                    <Text style={styles.circleNum}>15</Text>
                  </View>
                  <View style={styles.circle_border}>
                    <Text style={styles.circleNum}>20</Text>
                  </View>
                  <View style={styles.circle_border}>
                    <Text style={styles.circleNum}>50</Text>
                  </View>
                  <View style={styles.circle_border}>
                    <Text style={styles.circleNum}>100</Text>
                  </View>
                </View>
              </View>

              <Text style={styles.establecimientosTitle}>ESTABLECIMIENTOS</Text>
              <ScrollView
                horizontal={true}
                contentContainerStyle={styles.circlesContainer}
                showsHorizontalScrollIndicator={false}
              >
                {data?.map((d: Establishment) => {
                  return (
                    <View
                      key={String(d?.establishment_id)}
                      style={[
                        styles.circle,
                        d?.establishment_id === 0 ? { marginLeft: 35 } : {},
                      ]}
                    >
                      <Image
                        source={{ uri: d?.establishment_logo }}
                        style={styles.image}
                      />
                    </View>
                  );
                })}
              </ScrollView>
            </>
          )
        )}
      </ScrollView>
      {isPopupVisible && selectedRectangle && (
        <PopUpPromo
          isVisible={isPopupVisible}
          onClose={closePopup}
          rectangle={selectedRectangle}
        />
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  promocionesTitle: {
    color: "#BBB",
    fontSize: 16,
    fontWeight: "800",
    textAlign: "left",
    marginTop: 10,
    alignSelf: "flex-start",
    marginLeft: 30,
    marginBottom: 10,
  },
  establecimientosTitle: {
    color: "#BBB",
    fontSize: 16,
    fontWeight: "800",
    textAlign: "left",
    marginBottom: 5,
    alignSelf: "flex-start",
    marginLeft: 30,
    marginTop: 5,
  },
  donacionesTitle: {
    color: "#BBB",
    fontSize: 16,
    fontWeight: "800",
    textAlign: "left",
    marginBottom: 5,
    alignSelf: "flex-start",
    marginLeft: 30,
  },
  rect: {
    backgroundColor: "#FFF",
    borderRadius: 20,
    padding: 10,
    flexShrink: 0,
    margin: 10,
    width: 335,
    height: 100,
    alignItems: "center",
    justifyContent: "center",
    shadowColor: "rgba(0, 0, 0, 0.1)",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 1,
    shadowRadius: 4,
    elevation: 4,
    alignSelf: "center",
  },
  mainText: {
    fontSize: 14,
    fontWeight: "bold",
  },
  subText: {
    fontSize: 12,
    color: "red",
    marginTop: 2,
    marginBottom: 6,
  },
  donationContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 2,
  },
  circle_border: {
    width: 35,
    height: 35,
    borderRadius: 20,
    borderColor: "red",
    borderWidth: 2,
    alignItems: "center",
    justifyContent: "center",
    marginLeft: 10,
  },
  circleNum: {
    fontSize: 16,
    color: "red",
    fontWeight: "500",
  },
  card: {
    backgroundColor: "#FFF",
    borderRadius: 20,
    padding: 10,
    flexShrink: 0,
    margin: 10,
    width: 335,
    height: 60,
    zIndex: 3,
    alignItems: "center",
    justifyContent: "center",
    shadowColor: "rgba(0, 0, 0, 0.1)",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 1,
    shadowRadius: 4,
    elevation: 4,
  },
  contentWrapper: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  circleWrapper: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  circleWhite: {
    width: 85,
    height: 85,
    borderRadius: 40,
    backgroundColor: "white",
    alignItems: "center",
    justifyContent: "center",
    shadowColor: "rgba(0, 0, 0, 0.1)",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 1,
    shadowRadius: 4,
  },
  circleRed: {
    width: 70,
    height: 70,
    borderRadius: 35,
    backgroundColor: "red",
    alignItems: "center",
    justifyContent: "center",
  },
  cardText: {
    fontSize: 10,
    color: "black",
    fontWeight: "bold",
    marginRight: 15,
  },
  pointsText: {
    fontSize: 10,
    color: "red",
    fontWeight: "bold",
    marginLeft: 15,
  },
  circlesContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
  },
  circle: {
    width: 50,
    height: 50,
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
