import React from "react";
import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";

const Promotion = () => {
  return (
    <View>
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "space-between",
          marginTop: 30,
          marginBottom: 10,
        }}
      >
        <Text style={styles.prom_text}>Акции</Text>
        <TouchableOpacity
          style={{ flexDirection: "row", alignItems: "center" }}
        >
          <Text>Все</Text>
          <View style={styles.back_btn}>
            <Image
              style={{ width: 24, height: 24 }}
              source={require("../../assets/images/moreRight.png")}
            />
          </View>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  back_btn: {
    width: 24,
    height: 24,
  },
  prom_text: {
    fontSize: 20,
    fontWeight: "700",
    color: "#191919",
  },
});

export default Promotion;
