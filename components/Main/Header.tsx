import { stylesAll } from "@/app/(tabs)/style";
import { router } from "expo-router";
import React from "react";
import { Image, Pressable, StyleSheet, View } from "react-native";

const Header = () => {
  return (
    <View style={styles.header}>
      <Pressable onPress={() => router.push("/navigate/Notifications")}>
        <Image style={stylesAll.icons} source={require("../../assets/images/notifications.png")}/>
      </Pressable>
      <Image style={stylesAll.logotip} source={require("../../assets/images/logotipCenter.png")} />
      <Pressable onPress={() => router.push("/navigate/BasketPage")}>
        <Image style={stylesAll.icons} source={require("../../assets/images/cart_gray.png")} />
      </Pressable>
    </View>
  );
};

const styles = StyleSheet.create({
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingTop: 50,
  },
});

export default Header;
