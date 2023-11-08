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
import { TouchableHighlight } from "react-native-gesture-handler";
import Colors from "../constants/Colors";


  interface DonationCardProps {
    tipoPlan: string;
    cantidad: string;
    puntos: string;
  }
  

export const DonationCard: React.FC<DonationCardProps> = ({tipoPlan, cantidad, puntos}) =>{
    return(
        <TouchableHighlight style = {styles.rectangleTouch} onPress={()=> 
        {console.log(`DonationCard presionada Plan: ${tipoPlan} Cantidad: ${cantidad} Puntos: ${puntos}` )}}>
            <View style = {styles.rectangle}>
                <Text style={styles.rectangleTextMain}>{tipoPlan}</Text>
                <Text style={styles.rectangleTextDiscount}>{cantidad}$</Text>
                <Text style={styles.text1}>Plan Mensual</Text>
                <Text style={styles.text2}>recibes</Text>
                <Text style={styles.rectangleTextPoints}>{puntos} Puntos</Text>
                </View>
      </TouchableHighlight>
    )
};



const styles = StyleSheet.create({
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
    rectangleTouch: {
        backgroundColor: Colors["light"].tint,
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

      text1 :{
        fontSize: 12,
        color: "#000",
        textAlign: "center",

      },
      text2 :{
        fontSize: 8,
        fontWeight: "400"

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
      rectangleTextMain: {
        fontSize: 12,
        color: "#000",
        textAlign: "center",
        fontWeight: "bold",
      },
      rectangleTextDiscount: {
        fontSize: 20,
        fontWeight: "bold",
        color: "#E6012E",
        textAlign: "center",
      },
      rectangleTextPoints: {
        display: "flex",
        fontSize: 8,
        color: "red",
        textAlign: "center",
      },

});
