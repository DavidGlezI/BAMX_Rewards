import { StyleSheet } from "react-native";
import EditScreenInfo from "../../components/EditScreenInfo";
import { Text, View } from "../../components/Themed";
import { HeaderImage } from "../../components/HeaderImage";


export default function TabHomeScreen() {
  return (
    <View style={styles.container}>
      <HeaderImage />

    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  }
});
