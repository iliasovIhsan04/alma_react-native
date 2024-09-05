import { stylesAll } from "@/app/(tabs)/style";
import { router } from "expo-router";
import React from "react";
import { Image, Text, TouchableOpacity, View } from "react-native";

const FeaturedProducts = () => {
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
          <Text style={stylesAll.header_name}>Избранные товары</Text>
          <View style={stylesAll.header_back_btn}></View>
        </View>
        <View style={stylesAll.purchase_history}>
          <View style={stylesAll.history_image_box}>
            <Image
              style={stylesAll.image_all}
              source={require("../../assets/images/empty_favorites.png")}
            />
          </View>
          <Text style={stylesAll.history_text_one}>Пока тут пусто</Text>
          <Text style={stylesAll.history_text_two}>
            Добавьте в избранное всё, что душе угодно, а мы доставим заказ
            от 150 сом
          </Text>
          <TouchableOpacity
            style={stylesAll.button}
            onPress={() => router.push("/(tabs)/catalog")}
          >
            <Text style={stylesAll.button_text}>Перейти в каталог</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

export default FeaturedProducts;
