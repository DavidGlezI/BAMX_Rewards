import {
  StyleSheet,
  Image,
  ScrollView,
  Dimensions,
  SafeAreaView,
} from "react-native";
import { Text, View} from "../../components/Themed";
import { HeaderImage } from "../../components/HeaderImage";
import MapView, { PROVIDER_GOOGLE, Marker } from "react-native-maps";
import { mapStyle } from './mapStyle';
import { CustomMarker } from './CustomMarker';
import { useState } from 'react';
// import FastImage from 'react-native-fast-image';


const markers = [
  {
    id:0,
    color: "#B00101",
    name: 'QIN ORIENTAL FOOD',
    image: require("../../assets/images/QinLogo.png"),
    coordinates: [
      { latitude: 20.72930714177958, longitude: -103.43452222905285 },
      { latitude: 20.737537170135532, longitude: -103.40182686610052 },
      { latitude: 20.710306698445276, longitude: -103.41168423451794 },
      { latitude: 20.67629825302664, longitude: -103.43141133749296 },
      { latitude: 20.673460958122675, longitude: -103.40422586639863 },
      { latitude: 20.665334050828303, longitude: -103.40613588048976 },
      { latitude: 20.69391610983949, longitude: -103.37522872153644 },
      { latitude: 20.6732130496441, longitude: -103.36836795420922 },
      { latitude: 20.644803316927312, longitude: -103.411800672568 },
      { latitude: 20.647344017825784, longitude: -103.32027517144685},
      { latitude: 20.68793633223487, longitude: -103.29600739027772 } 
    ],
  },
  {
    id: 1,
    color: "#524F4E",
    name: 'CARLS JR',
    image: require("../../assets/images/CarlsLogo.png"),
    coordinates: [
      { latitude: 20.68232968719728, longitude: -103.44618153601769 },
      { latitude: 20.67852757825034, longitude: -103.43099971745646 },
      { latitude: 20.65878300060883, longitude: -103.43634474154089 },
      { latitude: 20.686331098195716, longitude: -103.42055131772005 },
      { latitude: 20.659732825150037, longitude: -103.42142982474729 },
      { latitude: 20.64503574009851, longitude: -103.41145448971474 },
      { latitude: 20.64985231715028, longitude: -103.40275923306895 },
      { latitude: 20.611470575681913, longitude: -103.4152847393661 },
      { latitude: 20.671624829049307, longitude: -103.36877477136407 },
      { latitude: 20.7022724348247, longitude: -103.37620403322397 },
      { latitude: 20.676595724527463, longitude: -103.34375527149052 },
      { latitude: 20.70038808979686, longitude: -103.33764389224118 },
      { latitude: 20.687844795036927, longitude: -103.29591501693336 },
      { latitude: 20.679459356035753, longitude: -103.29206201210987 },
      { latitude: 20.640181292825606, longitude: -103.27489536389574 },
      { latitude: 20.6028124330907, longitude: -103.40191800945432 }
    ],
  },
  {
    id: 2,
    color: "#1B59FF",
    name: 'CINEPOLIS',
    image: require("../../assets/images/CinepolisLogo.png"),
    coordinates: [
      { latitude: 20.643858595109883, longitude: -103.41306050547492 },
      { latitude: 20.649403571129465, longitude: -103.41960980591341 },
      { latitude: 20.677307545752747, longitude: -103.4334458078731 },
      { latitude: 20.64782701306877, longitude: -103.38631380036857 },
      { latitude: 20.64888153979382, longitude: -103.36195798614024 },
      { latitude: 20.672806414456822, longitude: -103.40394143410295 },
      { latitude: 20.673792240389933, longitude: -103.38116370097242 },
      { latitude: 20.680163798354563, longitude: -103.39856869250156 },
      { latitude: 20.670695461579488, longitude: -103.35951934995593 },
      { latitude: 20.6479747988508, longitude: -103.32003944827939 },
      { latitude: 20.69377463565199, longitude: -103.37579864700358 },
      { latitude: 20.694954085991494, longitude: -103.34979954058437 },
      { latitude: 20.70930043286712, longitude: -103.4058187909775 },
      { latitude: 20.711785715220167, longitude: -103.41107304171574 },
      { latitude: 20.732172262070172, longitude: -103.42874873320869 },
      { latitude: 20.679119479816812, longitude: -103.29117244337435 },
      { latitude: 20.68765335276722, longitude: -103.29557017601712 },
      { latitude: 20.720180815672432, longitude: -103.3199477794156 },
    ],
  },
  {
    id: 3,
    color: "#FFE71C",
    name: 'LEGO',
    image: require("../../assets/images/LegoLogo.png"),
    coordinates: [
      { latitude: 20.695005376741832, longitude: -103.37558026959198 },
      { latitude: 20.71094833515771, longitude: -103.4111591446657 },
      { latitude: 20.67663857716045, longitude: -103.43188879005764 },
    ],
  },
  {
    id: 4,
    color: "#FFFFFF",
    name: 'NIKE',
    image: require("../../assets/images/NikeLogo.png"),
    coordinates: [
      { latitude: 20.738307903636596, longitude: -103.40144364712344 },
      { latitude: 20.711058088985094, longitude: -103.41140752607198 },
      { latitude: 20.700731082587694, longitude: -103.37718873598445 },
      { latitude: 20.67384233970137, longitude: -103.34812034574294 },
      { latitude: 20.669196991943913, longitude: -103.34147230013518 },
      { latitude: 20.66230384396428, longitude: -103.36106666589043 },
      { latitude: 20.673615274458097, longitude: -103.40484893290068 },
      { latitude: 20.676448008400467, longitude: -103.43080085609134 },
      { latitude: 20.643813155917194, longitude: -103.41201308684231 }
    ],
  },
  {
    id: 5,
    color: "#A00000",
    name: 'KFC',
    image: require("../../assets/images/KfcLogo.png"),
    coordinates: [
      { latitude: 20.737307777805125, longitude: -103.40128100788672 },
      { latitude: 20.72074208329956, longitude: -103.41510808067041 },
      { latitude: 20.70692857186662, longitude: -103.3464752079628 },
      { latitude: 20.673529965849536, longitude: -103.40491000951181 },
      { latitude: 20.67830628546684, longitude: -103.34758822297265 },
      { latitude: 20.674906640679254, longitude: -103.34913447723018 },
      { latitude: 20.67664263901874, longitude: -103.34155783136822 },
      { latitude: 20.684265898377713, longitude: -103.32599006822532 },
      { latitude: 20.649150588542064, longitude: -103.3221160766097 },
      { latitude: 20.650254506983888, longitude: -103.30868819953093 },
      { latitude: 20.67624700190362, longitude: -103.43101473053531 },
      { latitude: 20.662411085630946, longitude: -103.42049610312348 },
      { latitude: 20.651058806076914, longitude: -103.39921775660216 },
      { latitude: 20.626715847563933, longitude: -103.38463059245531 },
      { latitude: 20.630021377583525, longitude: -103.41709105053393 },
      { latitude: 20.60539686537489, longitude: -103.40076119919374 }
    ],
  },
];



export default function TabMapScreen() {
  const [selectedMarker, setSelectedMarker] = useState<number | null>(null);//

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
        {markers.map((marker, index) => (
          <View
            key={String(index)}
            style={[
              styles.circle,
              index === 0 ? { marginLeft: 35 } : {},
              selectedMarker === marker.id ? { borderColor: '#FF0000', borderWidth: 2 } : {}, //
            ]}
            onTouchEnd={() => setSelectedMarker(marker.id)}
          >
            <Image source={marker.image} style={styles.image} />
          </View>
        ))}
      </ScrollView>

      <MapView
        customMapStyle={mapStyle}
        provider={PROVIDER_GOOGLE}
        style={styles.mapa}
        initialRegion={{
          latitude: 20.676814678225828,
          longitude: -103.34364995203153,
          latitudeDelta: 0.24,
          longitudeDelta: 0.06,
        }}>
        {selectedMarker !== null
    ? markers
        .filter((marker) => marker.id === selectedMarker)
        .map((marker) =>
          marker.coordinates.map((coordinate, index) => (
            <CustomMarker
              key={index}
              color={marker.color}
              latitude={coordinate.latitude}
              longitude={coordinate.longitude}
              image={marker.image}
            />
          ))
        )
    : markers.map((marker) =>
        marker.coordinates.map((coordinate, index) => (
          <CustomMarker
            key={index}
            color={marker.color}
            latitude={coordinate.latitude}
            longitude={coordinate.longitude}
            image={marker.image}
          />
        ))
      )}

      </MapView>
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
