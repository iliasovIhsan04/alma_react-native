import { stylesAll } from "@/app/(tabs)/style";
import React from "react";
import { ImageBackground, StyleSheet, Text, View } from "react-native";

const ProfilePage = () => {
  return (
    <ImageBackground
      source={require(".././assets/images/fon_frofile.png")}
      style={styles.header_profile}
    >
      <View style={stylesAll.container}>
        <Text>ihsan</Text>
      </View>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  header_profile: {
    width: "100%",
    height: 160,
    paddingTop: 50,
    borderBottomRightRadius: 20,
    borderBottomLeftRadius: 20,
    backgroundColor: "#DC0200",
  },
});

export default ProfilePage;
