import { stylesAll } from "@/app/(tabs)/style";
import { router } from "expo-router";
import React from "react";
import { Image, Text, TouchableOpacity, View } from "react-native";

const PurchaseHistory = () => {
  const [history, setHistory] = React.useState<any[]>([]);
  const [isLoading, setIsLoading] = React.useState(false);

  

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
          <Text style={stylesAll.header_name}>История покупок</Text>
          <View style={stylesAll.header_back_btn}></View>
        </View>
        <View style={stylesAll.purchase_history}>
          <View style={stylesAll.history_image_box}>
            <Image
              style={stylesAll.image_all}
              source={require("../../assets/images/historyImage.png")}
            />
          </View>
          <Text style={stylesAll.history_text_one}>
            Вы не сделали ни одной покупки, но это поправимо...
          </Text>
          <Text style={stylesAll.history_text_two}>
            Добавьте в корзину всё, что душе угодно, а мы доставим заказ
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

export default PurchaseHistory;
