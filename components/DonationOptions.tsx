import {
  StyleSheet,
  View,
  Text,
  Image,
  SafeAreaView,
  TouchableHighlight,
  ScrollView,
  RefreshControl,
  ActivityIndicator,
} from "react-native";

export const DonationOptions = () => {
  return (
    <View style={styles.rect}>
      <Text style={styles.mainText}>Tu donación marca la diferencia</Text>
      <Text style={styles.subText}>¡Únete para cambiar vidas!</Text>
      <View style={styles.donationContainer}>
        <TouchableHighlight
          style={styles.circle_border}
          onPress={() => {
            console.log("5");
          }}
        >
          <Text style={styles.circleNum}>5</Text>
        </TouchableHighlight>

        <TouchableHighlight
          style={styles.circle_border}
          onPress={() => {
            console.log("10");
          }}
        >
          <Text style={styles.circleNum}>10</Text>
        </TouchableHighlight>

        <TouchableHighlight
          style={styles.circle_border}
          onPress={() => {
            console.log("15");
          }}
        >
          <Text style={styles.circleNum}>15</Text>
        </TouchableHighlight>

        <TouchableHighlight
          style={styles.circle_border}
          onPress={() => {
            console.log("20");
          }}
        >
          <Text style={styles.circleNum}>20</Text>
        </TouchableHighlight>

        <TouchableHighlight
          style={styles.circle_border}
          onPress={() => {
            console.log("50");
          }}
        >
          <Text style={styles.circleNum}>50</Text>
        </TouchableHighlight>

        <TouchableHighlight
          style={styles.circle_border}
          onPress={() => {
            console.log("100");
          }}
        >
          <Text style={styles.circleNum}>100</Text>
        </TouchableHighlight>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  rect: {
    backgroundColor: "#FFF",
    borderRadius: 20,
    padding: 10,
    flexShrink: 0,
    margin: 10,
    height: 100,
    alignItems: "center",
    justifyContent: "space-evenly",
    shadowColor: "rgba(0, 0, 0, 0.1)",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 1,
    shadowRadius: 4,
    elevation: 4,
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
});
