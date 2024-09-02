import React from "react";
import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { stylesAll } from "../(tabs)/style";
import { router } from "expo-router";

const ToHelp = () => {
  return (
    <View style={stylesAll.background_block}>
      <View style={stylesAll.container}>
        <View style={stylesAll.header}>
          <TouchableOpacity
            style={stylesAll.header_back_btn}
            onPress={() => router.push("/(tabs)/profile")}
          >
            <Image
              style={{ width: 24, height: 24 }}
              source={require("../../assets/images/moreLeft.png")}
            />
          </TouchableOpacity>
          <Text style={stylesAll.header_name}>Помощь</Text>
          <View style={stylesAll.header_back_btn}></View>
        </View>
        <Image
          style={styles.help_image_logo}
          source={require("../../assets/images/logo.png")}
        />
        <View style={{ gap: 10 }}>
          <View style={styles.help_box}></View>
          <View style={styles.help_box}></View>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  help_image_logo: {
    width: 210,
    height: 80,
    margin: "auto",
    marginTop: 50,
    marginBottom: 50,
  },
  help_box: {
    width: "100%",
    minHeight: 180,
    backgroundColor: "#F5F7FA",
    padding: 16,
    borderRadius: 16,
  },
});

export default ToHelp;
