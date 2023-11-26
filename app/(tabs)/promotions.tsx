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
  EasingStatic,
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


export default function TabPromotionsScreen() {
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

  return (
    <SafeAreaView style={styles.container}>
      <HeaderImage />

      <ScrollView
        // scrollEnabled={false}
        refreshControl={
          <RefreshControl
            refreshing={loading}
            onRefresh={() => (fetch(), promoFetch())}
          />
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
              
              <Text
                style={{
                  ...styles.establecimientosTitle,
                  marginTop: Dimensions.get("window").height / 5 + 10,
                }}
              >
                ESTABLECIMIENTOS
              </Text>
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
              <Text style={styles.promocionesTitle}>PROMOCIONES</Text>
              <ScrollView
                horizontal={true}
                showsHorizontalScrollIndicator={false}
              >
                <View>
                  <View style={styles.promotionsRow}>
                    {promoData?.slice(0,Math.ceil(promoData?.length / 2)).map((item: any,index :number) =>
                        (
                        <TouchableOpacity
                          onPress={() => openPopup(item)}
                          style={[styles.rectangleContainer, index === 0 && { marginLeft: 20 }]}
                          key={item.establishment_id}
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
                  <View style={styles.promotionsRow}>
                    {promoData?.slice(Math.ceil(promoData?.length / 2)).map((item: any,index :number) =>
                      (
                        <TouchableOpacity
                          onPress={() => openPopup(item)}
                          style={[styles.rectangleContainer, index === 0 && { marginLeft: 20 }]}
                          key={item.establishment_id}
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
