import React from "react";
import {
  Modal,
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Image,
} from "react-native";


interface PopUpPromoProps {
  isVisible: boolean;
  onClose: () => void;
  rectangle: Rectangle;
  onRedeem: () => void;
}

const PopUpPromo: React.FC<PopUpPromoProps> = ({
  isVisible,
  onClose,
  rectangle,
  onRedeem,
}) => {
  if (!isVisible) return null;

  const handleRedeem = () => {
    onRedeem();
  };
  return (
    <>
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
            <View style={styles.header}>
              <Text style={styles.headerText}>Canjear Recompensa</Text>
            </View>
            <Text style={styles.pointsAccumulated}>Tienes $ 200 puntos</Text>
            <Image
              source={{ uri: rectangle.promotion_image }}
              style={styles.image}
            />
            <Text style={styles.mainText}>{rectangle.promotion_name}</Text>
            <Text style={styles.discountText}>
              {rectangle.promotion_descriptive_text}
            </Text>
            <Text style={styles.pointsText}>
              {rectangle.promotion_price} Puntos
            </Text>
            <TouchableOpacity
              onPress={handleRedeem}
              style={styles.redeemButton}
            >
              <Text style={styles.redeemButtonText}>Canjear</Text>
            </TouchableOpacity>
          </View>
        </TouchableOpacity>
      </Modal>
    </>
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
  textStyle: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center",
  },
  mainText: {
    textAlign: "center",
    fontSize: 18,
    color: "#000",
    fontWeight: "bold",
    marginBottom: 5,
  },
  image: {
    width: 110,
    height: 110,
    resizeMode: "contain",
    marginTop: 10,
    marginBottom: 16,
  },
  discountText: {
    textAlign: "center",
    fontSize: 12,
    color: "#E6012E",
    fontWeight: "bold",
    marginBottom: 5,
  },
  pointsText: {
    textAlign: "center",
    fontSize: 12,
    color: "#BBB",
    fontWeight: "bold",
    marginBottom: 10,
  },
  pointsAccumulated: {
    textAlign: "center",
    fontSize: 12,
    color: "#E6012E",
    fontWeight: "bold",
    marginBottom: 4,
    marginTop: 50,
  },
  redeemButton: {
    backgroundColor: "#E6012E",
    borderRadius: 30,
    paddingVertical: 10,
    paddingHorizontal: 60,
    marginTop: 0,
    marginBottom: 20,
    elevation: 2,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.22,
    shadowRadius: 2.22,
  },

  redeemButtonText: {
    color: "white",
    textAlign: "center",
    fontWeight: "bold",
    fontSize: 14,
  },
});

export default PopUpPromo;
