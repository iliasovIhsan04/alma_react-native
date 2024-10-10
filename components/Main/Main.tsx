import React, { useState, useRef, useEffect, useCallback } from "react";
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
  RefreshControl,
} from "react-native";
import BonusCart from "./BonusCart";
import Header from "./Header";
import HurryUpToBuy from "./HurryUpToBuy";
import Promotion from "./Promotion";
import { stylesAll } from "@/style";
import { Ionicons } from "@expo/vector-icons";
import { AppDispatch } from "@/Redux/reducer/store";
import { useDispatch } from "react-redux";
import { fetchUserInfo } from "@/Redux/reducer/UserInfo";
import StoryComponent from "./StorisBlock";
import { router } from "expo-router";
import { useRoute } from "@react-navigation/native";

export default function Main() {
  const dispatch: AppDispatch = useDispatch();
  const [openModal, setOpenModal] = useState(false);
  const scaleValueModal1 = useRef(new Animated.Value(0)).current;
  const opacityValueModal1 = useRef(new Animated.Value(0)).current;
  const [modalRegistration, setModalRegistration] = useState(false);
  const scaleValueModal2 = useRef(new Animated.Value(0)).current;
  const opacityValueModal2 = useRef(new Animated.Value(0)).current;

  const [refreshing, setRefreshing] = useState(false);
  const route = useRoute();
  const { showModal } = route.params || {};
  useEffect(() => {
    if (showModal) {
      setModalRegistration(true);
    }
  }, [showModal]);

  const onRefresh = useCallback(async () => {
    setRefreshing(true);
    try {
      await dispatch(fetchUserInfo());
    } finally {
      setRefreshing(false);
    }
  }, [dispatch]);

  useEffect(() => {
    if (openModal) {
      Animated.parallel([
        Animated.spring(scaleValueModal1, {
          toValue: 1,
          friction: 5,
          useNativeDriver: true,
        }),
        Animated.timing(opacityValueModal1, {
          toValue: 1,
          duration: 300,
          useNativeDriver: true,
        }),
      ]).start();
    } else {
      Animated.parallel([
        Animated.timing(scaleValueModal1, {
          toValue: 0,
          duration: 300,
          useNativeDriver: true,
        }),
        Animated.timing(opacityValueModal1, {
          toValue: 0,
          duration: 300,
          useNativeDriver: true,
        }),
      ]).start();
    }
  }, [openModal]);

  useEffect(() => {
    if (modalRegistration) {
      Animated.parallel([
        Animated.spring(scaleValueModal2, {
          toValue: 1,
          friction: 5,
          useNativeDriver: true,
        }),
        Animated.timing(opacityValueModal2, {
          toValue: 1,
          duration: 300,
          useNativeDriver: true,
        }),
      ]).start();
    } else {
      Animated.parallel([
        Animated.timing(scaleValueModal2, {
          toValue: 0,
          duration: 300,
          useNativeDriver: true,
        }),
        Animated.timing(opacityValueModal2, {
          toValue: 0,
          duration: 300,
          useNativeDriver: true,
        }),
      ]).start();
    }
  }, [modalRegistration]);

  return (
    <>
      <Modal visible={openModal} transparent={true} animationType="none">
        <Pressable
          style={stylesAll.content_modal}
          onPress={() => setOpenModal(false)}
        >
          <Animated.View
            style={[
              stylesAll.modal_block,
              {
                transform: [{ scale: scaleValueModal1 }],
                opacity: opacityValueModal1,
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
      <Modal
        visible={modalRegistration}
        transparent={true}
        animationType="none"
      >
        <Pressable
          style={stylesAll.content_modal}
          onPress={() => setModalRegistration(false)}
        >
          <Animated.View
            style={[
              stylesAll.modal_block_placing,
              {
                transform: [{ scale: scaleValueModal2 }],
                opacity: opacityValueModal2,
              },
            ]}
          >
            <Ionicons
              onPress={() => setModalRegistration(false)}
              size={24}
              style={stylesAll.icon_close}
              name="close"
            />
            <View style={styles.modal_block_img}>
              <Image
                style={styles.image_modal}
                source={require("../../assets/images/modal_img.png")}
              />
            </View>
            <Text style={styles.modal_text_title}>
              Ваша карта успешно создана!
            </Text>
            <Text style={styles.modal_text}>
              Теперь вы можете экономить на покупках, получать скидки, подарки и
              многое другое
            </Text>
            <TouchableOpacity
              style={stylesAll.button}
              onPress={() => setModalRegistration(false)}
            >
              <Text style={stylesAll.buttonText}> Понятно</Text>
            </TouchableOpacity>
          </Animated.View>
        </Pressable>
      </Modal>
      <Header />
      <ScrollView
        showsVerticalScrollIndicator={false}
        showsHorizontalScrollIndicator={false}
        refreshControl={
          <RefreshControl
            colors={["#DC0200"]}
            tintColor={"#DC0200"}
            refreshing={refreshing}
            onRefresh={onRefresh}
          />
        }
      >
        <StoryComponent />
        <View style={{ marginBottom: 125 }}>
          <BonusCart />
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
            <TouchableOpacity
              style={styles.check_price_box}
              onPress={() => router.push("/navigate/ProductGiven")}
            >
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
    </>
  );
}

const styles = StyleSheet.create({
  modal_text_title: {
    fontSize: 20,
    fontWeight: "700",
    color: "#191919",
    textAlign: "center",
  },
  modal_text: {
    fontSize: 14,
    fontWeight: "400",
    color: "#6B6B6B",
    textAlign: "center",
  },
  modal_block_img: {
    width: 170,
    height: 140,
  },
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
