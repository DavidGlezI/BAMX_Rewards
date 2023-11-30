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
import React, { useEffect } from "react";
import { router } from "expo-router";
import EditScreenInfo from "../../components/EditScreenInfo";
import { HeaderImage } from "../../components/HeaderImage";
import { DonationCard } from "../../components/DonationCard";
import { DonationOptions } from "../../components/DonationOptions";
import { AboutUsCard } from "../../components/AboutUsCard";

export default function TabDonateScreen() {
  return (
    <View style={styles.container}>
      <HeaderImage />

      <View style={styles.cardsContainer}>
        <AboutUsCard />
        <View style={styles.cardsRowContainer}>
          <DonationCard tipoPlan="Basico" cantidad="20" puntos="40" />
          <DonationCard tipoPlan="Medio" cantidad="50" puntos="100" />
          <DonationCard tipoPlan="Avanzado" cantidad="150" puntos="300" />
        </View>
        <View style={styles.cardsRowContainer}>
          <DonationCard tipoPlan="Plus" cantidad="300" puntos="700" />
          <DonationCard tipoPlan="Premium" cantidad="500" puntos="1200" />
          <DonationCard tipoPlan="Max" cantidad="1000" puntos="2500" />
        </View>
        <DonationOptions />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  cardsContainer: {
    marginTop: 190,
    flexDirection: "column",
    justifyContent: "flex-start",
  },
  cardsRowContainer: {
    flexDirection: "row",
    justifyContent: "space-evenly",
  },
});
