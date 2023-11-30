import React, { useState } from "react";
import {
  Modal,
  View,
  TouchableOpacity,
  StyleSheet,
  Image,
  Text,
} from "react-native";

interface QRPopupProps {
  isVisible: boolean;
  onClose: () => void;
  rectangle: Rectangle;
  points: number;
}

const QRPopup: React.FC<QRPopupProps> = ({
  rectangle,
  isVisible,
  onClose,
  points, 
}) => {
  if (!isVisible) return null;

  const QRCodeImage = require("../assets/images/QRPromo.png");
  

  return (
    <Modal
      transparent={true}
      animationType="fade"
      visible={isVisible}
      onRequestClose={onClose}
    >
      <TouchableOpacity
        style={styles.centeredView}
        activeOpacity={1}
        onPressOut={onClose}
      >
        <View style={styles.modalView}>
          <Text style={styles.mainText}>{rectangle.promotion_name}</Text>
          <Image source={QRCodeImage} style={styles.image} />
          <Text style={styles.pointsText}>
            $ {points} puntos restantes
          </Text>
          <View style={styles.header}>
            <Text style={styles.headerText}>Recompensa</Text>
          </View>
          <TouchableOpacity
            onPress={onClose}
            style={styles.closeButton}
          ></TouchableOpacity>
        </View>
      </TouchableOpacity>
    </Modal>
  );
};

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.6)",
  },
  modalView: {
    width: 300,
    height: 390,
    backgroundColor: "white",
    borderRadius: 20,
    padding: 35,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
    overflow: "hidden",
  },
  header: {
    backgroundColor: "#E6012E",
    width: "200%",
    height: 78,
    position: "absolute",
    top: 0,
    borderTopStartRadius: 20,
    borderTopEndRadius: 20,
    justifyContent: "center",
    alignItems: "center",
  },
  headerText: {
    color: "white",
    fontWeight: "bold",
    fontSize: 20,
  },
  closeButton: {
    position: "absolute",
    left: 3,
    top: 10,
    backgroundColor: "transparent",
    padding: 10,
  },
  mainText: {
    textAlign: "center",
    fontSize: 18,
    color: "#000",
    fontWeight: "bold",
    marginBottom: 20,
    marginTop: 60,
  },
  image: {
    width: 200,
    height: 200,
    resizeMode: "contain",
    marginBottom: 0,
    borderWidth: 6,
    borderColor: "#E6012E",
    borderRadius: 20,
  },
  pointsText: {
    textAlign: "center",
    fontSize: 12,
    color: "#E6012E",
    fontWeight: "bold",
    marginBottom: 10,
    marginTop: 15,
  },
});

export default QRPopup;
