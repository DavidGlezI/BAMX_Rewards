import React, { useState, useEffect } from "react";
import { StatusBar } from "expo-status-bar";
import { router } from "expo-router";
import {
  Platform,
  TextInput,
  TouchableHighlight,
  Pressable,
  SafeAreaView,
  ActivityIndicator,
  StyleSheet,
  ScrollView,
  RefreshControl,
  Dimensions
} from "react-native";
import { Text, View } from "../../components/Themed";
import Colors from "../../constants/Colors";
import { useFetch } from "../../util/useApi";
import { HeaderImage } from "../../components/HeaderImage";

interface DonationProps {
  id: string;
  cantidad: string;
}

const Donations: React.FC<DonationProps> = ({ id, cantidad }) => {
  return (
    <View style={styles.donation}>
      <Text style={styles.subTitle}>Donación</Text>
      <Text style={styles.infoDonacion}>ID: {id}</Text>
      <Text style={styles.infoDonacion}>Cantidad: $ {cantidad} pesos</Text>
      <View style={styles.borderBottom} />
    </View>
  );
};

export default function TabAccountScreen() {
  const { data, error, loading, setData, fetch } = useFetch("donations");
  const {
    data: userData,
    error: userError,
    loading: userLoading,
    fetch: userFetch,
  } = useFetch("user");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [isFocused, setIsFocused] = useState(false);
  const [isFocused1, setIsFocused1] = useState(false);
  const [isFocused2, setIsFocused2] = useState(false);

  useEffect(() => {
    fetch();
    userFetch();
  }, []);

  return (
    <SafeAreaView >
      <ScrollView 
        refreshControl={
          <RefreshControl refreshing={loading} onRefresh={() => (fetch(), userFetch())} />
        }
      >
      {loading || userLoading ? (
        <ActivityIndicator size="large" color={Colors["light"].tint} />
        ) : error ? (
          <Text>Error</Text>
          ) : (
            <View style={styles.container}>
              <HeaderImage />
          <View style={styles.loginContaier}>
            <Text style={styles.title}>Mi cuenta</Text>

            <Text style={styles.infoTitle}>Nombre y Apellido*</Text>
            <Text style={styles.infoCuenta}>{userData?.user_name}</Text>

            <Text style={styles.infoTitle}>Correo Electrónico*</Text>
            <Text style={styles.infoCuenta}>{userData?.user_email}</Text>

            <Text style={styles.infoTitle}>Contraseña*</Text>
            <Text style={styles.infoCuenta}>******</Text>

            <TouchableHighlight
              style={styles.loginBtn}
              onPress={() => {
                router.push("/modifydata");
              }}
            >
              <Text style={styles.buttonText}>Modificar</Text>
            </TouchableHighlight>
          </View>

          <View style={styles.loginContaier2}>
            <View style={styles.donation}>
              <Text style={styles.title2}>Historial</Text>
              <View style={styles.borderBottom} />
              {!data?.length ? (
                <Text style={{ marginTop: 10 }}>
                  Sin historial de donaciones
                </Text>
              ) : (
                data?.map((d: any) => (
                  <Donations
                    key={d?.donation_id}
                    id={d?.donation_id}
                    cantidad={d?.donation_quantity}
                  />
                ))
              )}
            </View>
          </View>

          {/* Use a light status bar on iOS to account for the black space above the modal */}
          <StatusBar style={Platform.OS === "ios" ? "light" : "auto"} />
        </View>
      )}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "flex-end",
    gap: 20,
    marginBottom: 5,
    position: "relative",
  },

  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
  },
  title2: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 5,
  },
  buttonText: {
    color: "white",
    textAlign: "center",
    fontSize: 16,
    fontWeight: "700",
  },
  loginBtn: {
    backgroundColor: Colors["light"].tint,
    borderRadius: 40,
    alignSelf: "center",
    justifyContent: "center",
    height: 55,
    width: 240,
  },
  subTitle: {
    marginTop: 10,
    fontWeight: "600",
  },
  input: {
    borderBottomWidth: 1,
    marginBottom: 12,
    paddingLeft: 8,
  },
  infoCuenta: {
    borderBottomWidth: 1,
    marginBottom: 24,
    fontWeight: "100",
  },
  infoTitle: {
    marginBottom: 12,
    fontWeight: "100",
  },
  infoDonacion: {
    fontWeight: "100",
  },
  borderBottom: {
    borderBottomColor: "red",
    borderBottomWidth: 1,
  },

  donation: {
    backgroundColor: "#fff",
  },
  loginContaier: {
    marginTop: 160,
    padding: 25,
    borderRadius: 40,
    backgroundColor: "#fff",
    shadowColor: "black",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    width: "90%",
    flex: 0.6,
  },
  loginContaier2: {
    padding: 40,
    borderRadius: 40,
    backgroundColor: "#fff",
    shadowColor: "black",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    width: "90%",
    flex: 0.4,
  },
  image: {
    position: "absolute",
    top: 0,
    overflow: "hidden",
    minWidth: Dimensions.get("window").width + 50,
    height: Dimensions.get("window").height / 1.65,
  },
});
