import React, { useState, useRef, useEffect } from "react";
import {
  Image,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  ScrollView,
  Modal,
  Pressable,
  Animated,
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
  const scaleValue = useRef(new Animated.Value(0)).current;
  const opacityValue = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    if (openModal) {
      Animated.parallel([
        Animated.spring(scaleValue, {
          toValue: 1,
          friction: 5,
          useNativeDriver: true,
        }),
        Animated.timing(opacityValue, {
          toValue: 1,
          duration: 300,
          useNativeDriver: true,
        }),
      ]).start();
    } else {
      Animated.parallel([
        Animated.timing(scaleValue, {
          toValue: 0,
          duration: 300,
          useNativeDriver: true,
        }),
        Animated.timing(opacityValue, {
          toValue: 0,
          duration: 300,
          useNativeDriver: true,
        }),
      ]).start();
    }
  }, [openModal]);

  return (
    <ScrollView
      showsVerticalScrollIndicator={false}
      showsHorizontalScrollIndicator={false}
    >
      <Modal visible={openModal} transparent={true} animationType="none">
        <Pressable
          style={stylesAll.content_modal}
          onPress={() => setOpenModal(false)}
        >
          <Animated.View
            style={[
              stylesAll.modal_block,
              {
                transform: [{ scale: scaleValue }],
                opacity: opacityValue,
              },
            ]}
          >
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
          </Animated.View>
        </Pressable>
      </Modal>

      <View style={{ marginBottom: 30 }}>
        <Header />
        <BonusCart />
        <TouchableOpacity
          style={stylesAll.button}
          onPress={() => router.push("/auth/Registration")}
        >
          <Text>Войти</Text>
        </TouchableOpacity>
        <View style={styles.apple_check_price}>
          <TouchableOpacity
            style={styles.apple_box}
            onPress={() => setOpenModal(true)}
          >
            <Image
              style={styles.image_apple}
              source={require("../../assets/images/alma_go.png")}
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
      </View>
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
