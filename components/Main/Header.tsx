import { router } from "expo-router";
import React from "react";
import { Image, Pressable, StyleSheet, View } from "react-native";

const Header = () => {
  return (
    <View style={styles.header}>
      <Pressable onPress={() => router.push("/navigate/Notifications")}>
        <Image source={require("../../assets/images/notificationBing.png")} />
      </Pressable>
      <Image source={require("../../assets/images/blackLogotip.png")} />
      <Pressable onPress={() => router.push("/navigate/BasketPage")}>
        <Image source={require("../../assets/images/cart.png")} />
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
