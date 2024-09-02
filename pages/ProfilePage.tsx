import { stylesAll } from "@/app/(tabs)/style";
import React from "react";
import { Image, ImageBackground, StyleSheet, Text, View } from "react-native";

const ProfilePage = () => {
  return (
    <View style={{ backgroundColor: "white", height: "100%" }}>
      <View style={styles.headerWrapper}>
        <ImageBackground
          source={require("../assets/images/fon_profile.png")}
          style={styles.header_profile}
        >
          <View style={stylesAll.container}>
            <View
              style={{
                flexDirection: "column",
                justifyContent: "space-between",
                height: "100%",
                paddingLeft: 16,
              }}
            >
              <Image
                style={{ width: 77, height: 29 }}
                source={require("../assets/images/vector.png")}
              />
              <Text style={styles.profile_text}>iliyas uulu Ihsan</Text>
            </View>
          </View>
        </ImageBackground>
      </View>
      <View style={stylesAll.container}>
        <View style={styles.area_block}>
          <View style={styles.area_box}>
            <View style={styles.area_box_red}>
              <Image
                source={require("../assets/images/profile.png")}
                style={{ width: 20, height: 20 }}
                tintColor={"white"}
              />
            </View>
            <Image
              style={{ width: 24, height: 24, tintColor: "red" }}
              source={require("../assets/images/moreRight.png")}
            />
          </View>
          <Image source={require("../assets/images/line.png")} />
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  headerWrapper: {
    overflow: "hidden",
    borderBottomRightRadius: 20,
    borderBottomLeftRadius: 20,
  },
  header_profile: {
    width: "100%",
    height: 160,
    paddingTop: 50,
    paddingBottom: 24,
  },
  profile_text: {
    fontSize: 20,
    fontWeight: 700,
    color: "#FFFFFF",
  },
  area_block: {
    width: "100%",
    height: 112,
    backgroundColor: "#F5F7FA",
    borderRadius: 14,
  },
  area_box: {
    width: "100%",
    padding: 10,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  area_box_red: {
    width: 36,
    height: 36,
    backgroundColor: "#DC0200",
    borderRadius: 50,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
});

export default ProfilePage;
