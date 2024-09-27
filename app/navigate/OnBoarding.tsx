import React from "react";
import { StyleSheet, Text, View, FlatList } from "react-native";
import slides from "./Slider";
import OnBoradingItem from "./OnBoradingItem";

const OnBoarding = () => {
  return (
    <View style={styles.to_come_in}>
      <FlatList
        data={slides}
        renderItem={({ item }) => <OnBoradingItem item={item} />}
        horizontal
        showsHorizontalScrollIndicator
        pagingEnabled
        bounces={false}
        keyExtractor={(item) => item.id.toString()}
      />
    </View>
  );
};
const styles = StyleSheet.create({
  to_come_in: {
    width: "100%",
    height: "100%",
    backgroundColor: "#68B936",
    position: "relative",
  },
  come_in_text_weight: {
    color: "#191919",
    fontWeight: "700",
    fontSize: 24,
    textAlign: "center",
    lineHeight: 26,
  },
  come_in_text: {
    fontSize: 16,
    fontWeight: "400",
    color: "#6B6B6B",
    textAlign: "center",
    lineHeight: 20,
  },
});

export default OnBoarding;
