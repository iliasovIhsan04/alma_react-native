import React from "react";
import { Image, StyleSheet, View } from "react-native";

const Header = () => {
  return (
    <View style={styles.header}>
      <Image source={require("../../assets/images/notificationBing.png")} />
      <Image source={require("../../assets/images/blackLogotip.png")} />
      <Image source={require("../../assets/images/cart.png")} />
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
