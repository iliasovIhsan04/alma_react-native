import React, { useState } from "react";
import {
  Image,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  ScrollView,
  Modal,
  Pressable,
} from "react-native";
import BonusCart from "./BonusCart";
import Header from "./Header";
import HurryUpToBuy from "./HurryUpToBuy";
import Promotion from "./Promotion";
import { router } from "expo-router";
import { stylesAll } from "@/app/(tabs)/style";
import { Ionicons } from "@expo/vector-icons";

export default function Main() {
  const [openModal, setOpenModal] = useState(false);
  return (
    <ScrollView
      showsVerticalScrollIndicator={false}
      showsHorizontalScrollIndicator={false}
    >
      <Modal visible={openModal} transparent={true} animationType="slide">
        <Pressable
          style={stylesAll.content_modal}
          onPress={() => setOpenModal(false)}
        >
          <View style={stylesAll.modal_block}>
            <Ionicons
              onPress={() => setOpenModal(false)}
              size={24}
              style={stylesAll.icon_close}
              name="close"
            />
            <Image
              style={styles.image_modal}
              source={require("../../assets/images/soonAlmaGoo.png")}
            />
          </View>
        </Pressable>
      </Modal>
      <Header />
      <BonusCart />
      {/* <TouchableOpacity
        style={stylesAll.button}
        onPress={() => router.push("/auth/Registration")}
      >
        <Text>Войти</Text>
      </TouchableOpacity> */}
      <View style={styles.apple_check_price}>
        <TouchableOpacity
          style={styles.apple_box}
          onPress={() => setOpenModal(true)}
        >
          <Image
            style={styles.image_apple}
            source={require("../../assets/images/almaGoo.png")}
          />
        </TouchableOpacity>
        <TouchableOpacity style={styles.check_price_box}>
          <Image
            style={{ width: 24, height: 24 }}
            source={require("../../assets/images/scanning.png")}
          />
          <Text>Проверить цену</Text>
        </TouchableOpacity>
      </View>
      <HurryUpToBuy />
      <Promotion />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  image_modal: {
    width: "100%",
    height: "100%",
    objectFit: "cover",
  },
  apple_check_price: {
    width: "100%",
    flexDirection: "row",
    alignItems: "center",
    flexWrap: "wrap",
    gap: 10,
  },
  apple_box: {
    width: "48%",
    height: 58,
    borderRadius: 10,
  },
  image_apple: {
    width: "100%",
    height: "100%",
    resizeMode: "contain",
  },
  check_price_box: {
    width: "48%",
    height: 58,
    flexDirection: "row",
    alignItems: "center",
    borderRadius: 10,
    padding: 10,
    gap: 10,
    backgroundColor: "#F5F7FA",
  },
});
