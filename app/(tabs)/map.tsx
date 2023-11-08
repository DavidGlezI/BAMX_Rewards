import {
  StyleSheet,
  Image,
  ScrollView,
  Dimensions,
  SafeAreaView,
  RefreshControl,
  ActivityIndicator,
} from "react-native";
import { Text, View} from "../../components/Themed";
import { HeaderImage } from "../../components/HeaderImage";

const images = [
  require("../../assets/images/QinLogo.png"),
  require("../../assets/images/CarlsLogo.png"),
  require("../../assets/images/CinepolisLogo.png"),
  require("../../assets/images/LegoLogo.png"),
  require("../../assets/images/NikeLogo.png"),
  require("../../assets/images/KfcLogo.png"),
];

export default function TabMapScreen() {
  return (
    <SafeAreaView style={styles.container}>
      <HeaderImage />
      <Text 
      style={{...styles.establecimientosTitle,
      marginTop: Dimensions.get("window").height / 5 + 10}}
      >
      ESTABLECIMIENTOS
      </Text>
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
              index === 0 ? { marginLeft: 35 } : {},
            ]}
          >
            <Image source={image} style={styles.image} />
          </View>
        ))}
      </ScrollView>
      <Image source={require("../../assets/images/mapa.png")} style={styles.mapa}></Image>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    justifyContent: "center",
  },
  mapa: {
    marginTop: 20,
    width: 340,
    height: 400,
    borderRadius: 20,
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

});
