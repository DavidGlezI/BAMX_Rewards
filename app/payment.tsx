import React, { useEffect, useState } from "react";
import {
  Modal,
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Image,
  Button,
  Dimensions,
} from "react-native";

import { useUpdateCreate } from "../util/useApi";
import {
  StripeProvider,
  initPaymentSheet,
  presentPaymentSheet,
  usePaymentSheet,
} from "@stripe/stripe-react-native";
import { TouchableHighlight } from "react-native-gesture-handler";
import { useLocalSearchParams } from "expo-router";
import Colors from "../constants/Colors";
import { HeaderImage } from "../components/HeaderImage";

const publishableKey =
  "pk_test_51O9qWCA1N4jj7tFywDEElSoJY86l4sLHoO5vzUeg9NB96GQJvu9E7Xv5OA9nR8ex55b9rw3GlZICsAw8EIS6lX1Y002girw2w9";

interface DonationCardProps {
  tipoPlan: string | string[];
  cantidad: string | string[];
  puntos: string | string[];
}

const DonationCard: React.FC<DonationCardProps> = ({
  tipoPlan,
  cantidad,
  puntos,
}) => {
  return (
    <TouchableHighlight style={styles.rectangleTouch}>
      <View style={styles.rectangle}>
        <Text style={styles.rectangleTextMain}>{tipoPlan}</Text>
        <Text style={styles.rectangleTextDiscount}>{cantidad}$</Text>
        <Text style={styles.text1}>Plan Mensual</Text>
        <Text style={styles.text2}>recibes</Text>
        <Text style={styles.rectangleTextPoints}>{puntos} Puntos</Text>
      </View>
    </TouchableHighlight>
  );
};

export default function Payment() {
  const [ready, setReady] = useState(false);
  const { initPaymentSheet, presentPaymentSheet, loading } = usePaymentSheet();
  const [loading2, setLoading2] = useState(false);

  const { cantidad, puntos, tipoPlan } = useLocalSearchParams();
  let amount2 = cantidad;
  const { response, error, create } = useUpdateCreate("payment-sheet", {
    amount: amount2,
  });
  const {response: responseWebhook, error: errorWebhook, loading: loadingResend, create: createWebhook,} = useUpdateCreate("webhook", {
    amount: amount2,
  });


  useEffect(() => {
    initialisePaymentSheet();
  }, [loading2]);

  const initialisePaymentSheet = async () => {
    await create();
    if (!response) {
      console.log("loading");
      setLoading2(!loading2);
    } else {
      const paymentIntent = response.data["paymentIntent"];
      const ephemeralKey = response.data["ephemeralKey"];
      const customer = response.data["customer"];

      const { error } = await initPaymentSheet({
        customerId: customer,
        customerEphemeralKeySecret: ephemeralKey,
        paymentIntentClientSecret: paymentIntent,
        merchantDisplayName: "Bamx Rewards.",
        allowsDelayedPaymentMethods: true,
      });
      if (error) {
        console.log(error);
      } else {
        setReady(true);
      }
    }
  };

  async function buy() {
    const { error } = await presentPaymentSheet();

    if (error) {
      console.log(error);
    } else {
      setReady(false);
      await createWebhook();
      if (!responseWebhook) {
        console.log("loading webhook response");
      }
      else{
        console.log(responseWebhook);
      }
    }
  }

  return (
    <View style={styles.container}>
      <HeaderImage />
      <View style={styles.loginContainer}>
        <View>
          <Text style={styles.resumen}>Resumen de donación</Text>

          <View style={styles.inLine}>
            <Text style={styles.opciones}>Plan:</Text>
            <Text style={styles.rectangleTextDiscount}>{tipoPlan}</Text>
          </View>

          <View style={styles.inLine}>
            <Text style={styles.opciones}>Donando:</Text>
            <Text style={styles.rectangleTextDiscount}>${cantidad} pesos</Text>
          </View>

          <View style={styles.inLine}>
            <Text style={styles.opciones}>Recibiendo: </Text>
            <Text style={styles.rectangleTextDiscount}>{puntos} puntos</Text>
          </View>
        </View>

        <DonationCard tipoPlan={tipoPlan} cantidad={cantidad} puntos={puntos} />
      </View>
      <StripeProvider publishableKey={publishableKey}>
        <View>
          <TouchableHighlight
            style={styles.btn}
            onPress={buy}
            disabled={loading || !ready}
          >
            <Text style={styles.buttonText}>Donar!</Text>
          </TouchableHighlight>
        </View>
      </StripeProvider>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 2,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 30,
    position: "relative",
  },
  buttonText: {
    color: "white",
    textAlign: "center",
    fontSize: 16,
    fontWeight: "700",
  },
  btn: {
    marginTop: 50,
    backgroundColor: Colors["light"].tint,
    borderRadius: 40,
    alignSelf: "center",
    justifyContent: "center",
    height: 55,
    width: 240,
  },
  inLine: {
    flexDirection: "row",
    gap: 5,
  },
  loginContainer: {
    padding: 20,
    borderRadius: 40,
    alignItems: "center",
    gap: 25,
    justifyContent: "center",
    backgroundColor: "#fff",
    shadowColor: "black",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    width: "80%",
    flex: 0.6,
    marginTop: 70,
  },
  headerImage: {
    position: "absolute",
    top: 0,
    zIndex: 1,
    minWidth: Dimensions.get("window").width + 50,
    height: Dimensions.get("window").height / 2.5,
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

  text1: {
    fontSize: 12,
    color: "#000",
    textAlign: "center",
  },
  text2: {
    fontSize: 8,
    fontWeight: "400",
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
  resumen: {
    fontSize: 20,
    color: "#000",
    textAlign: "center",
    fontWeight: "bold",
    marginBottom: 10,
    textDecorationLine: "underline",
  },
  opciones: {
    fontSize: 18,
    fontWeight: "bold",
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
  rectangleTextDiscountLightRed: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#FF3632",
    textAlign: "center",
  },
  rectangleTextPoints: {
    display: "flex",
    fontSize: 8,
    color: "red",
    textAlign: "center",
  },
});
