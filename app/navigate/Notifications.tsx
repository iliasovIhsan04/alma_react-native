import React, { useState } from "react";
import { Image, Text, TouchableOpacity, View } from "react-native";
import { stylesAll } from "../(tabs)/style";
import { router } from "expo-router";

const Notifications = () => {
  const [notifications, setnotifications] = useState([]);

  return (
    <View style={stylesAll.background_block}>
      <View style={stylesAll.container}>
        <View style={[stylesAll.header, stylesAll.header_nav]}>
          <TouchableOpacity
            style={stylesAll.header_back_btn}
            onPress={() => router.push("(tabs)/")}
          >
            <Image
              style={{ width: 24, height: 24 }}
              source={require("../../assets/images/moreLeft.png")}
            />
          </TouchableOpacity>
          <Text style={stylesAll.header_name}>Успей купить</Text>
          <View style={stylesAll.header_back_btn}></View>
        </View>
      </View>
    </View>
  );
};

export default Notifications;
