import { useRoute } from "@react-navigation/native";
import { url } from "@/Api";
import { stylesAll } from "@/app/(tabs)/style";
import axios from "axios";
import { router } from "expo-router";
import React, { useEffect, useState } from "react";
import {
  ActivityIndicator,
  Alert,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";

interface Product {
  id: number;
  title: string;
  preview_img: string;
  price: number;
  old_price: string;
  wholesale_price: number;
  description: string;
  sales: number;
  status: boolean;
  sub_cat: number;
  created_at: string;
  updated_at: string;
  quantity: number | null;
  price_for: string;
  code: number;
}

const Productid = () => {
  const route = useRoute();
  const [data, setData] = useState<Product | null>(null);
  const { id } = route.params as { id: number };
  const [isInBasket, setIsInBasket] = useState<boolean>(false);

  useEffect(() => {
    const checkIfInBasket = async () => {
      try {
        const activeItem = await AsyncStorage.getItem(
          `activeItemsBasket_${id}`
        );
        setIsInBasket(!!activeItem);
        console.log(`Item ${id} is in basket:`, !!activeItem); // Debugging line
      } catch (error) {
        console.error("Ошибка при проверке корзины:", error);
      }
    };
    checkIfInBasket();
  }, [id]);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await axios.get<Product>(
          `${url}/product/detail/${id}`
        );
        setData(response.data);
      } catch (error) {
        console.error("Ошибка при получении данных:", error);
      }
    };
    fetchUserData();
  }, [id]);

  const Basket = async (id: number, datas: Product) => {
    setIsInBasket(true);
    try {
      const prevIDString = await AsyncStorage.getItem("plus");
      const prevID = prevIDString !== null ? JSON.parse(prevIDString) : {};
      const updatedPrevID = { ...prevID, [id]: 1 };
      await AsyncStorage.setItem("plus", JSON.stringify(updatedPrevID));
      await AsyncStorage.setItem("plusOne", JSON.stringify(updatedPrevID));
      const prevShopCartString = await AsyncStorage.getItem("shopCart");
      const prevShopCart =
        prevShopCartString !== null ? JSON.parse(prevShopCartString) : [];
      const updatedShopCart = [...prevShopCart, datas];
      await AsyncStorage.setItem("shopCart", JSON.stringify(updatedShopCart));
      const prevCartsString = await AsyncStorage.getItem("cartsBasket");
      const prevCarts =
        prevCartsString !== null ? JSON.parse(prevCartsString) : [];
      const updatedCarts = [...prevCarts, datas];
      await AsyncStorage.setItem("cartsBasket", JSON.stringify(updatedCarts));
      await AsyncStorage.setItem(`activeItemsBasket_${id}`, JSON.stringify(id));
      const activeItem = await AsyncStorage.getItem(`activeItemsBasket_${id}`);

      if (activeItem) {
        Alert.alert("Ваш товар успешно добавлен в корзину!");
      } else {
        Alert.alert("Ошибка", "Не удалось добавить товар в корзину");
      }
    } catch (error) {
      Alert.alert("Ошибка", "Произошла ошибка при добавлении товара в корзину");
      console.error(error);
    }
  };

  if (!data) {
    return (
      <View style={stylesAll.loading}>
        <ActivityIndicator color="red" size="small" />
      </View>
    );
  }

  return (
    <View style={stylesAll.background_block}>
      <View style={stylesAll.container}>
        <View style={stylesAll.header}>
          <TouchableOpacity
            style={stylesAll.header_back_btn}
            onPress={() => router.back()}
          >
            <Image
              style={{ width: 24, height: 24 }}
              source={require("../../../assets/images/moreLeft.png")}
            />
          </TouchableOpacity>
          <Text style={stylesAll.header_name}></Text>
          <View style={stylesAll.header_back_btn}></View>
        </View>
        <View style={styles.product_block}>
          <View style={styles.product_img_box}></View>
          <Text style={styles.product_title}>{data.title}</Text>
          <View style={{ flexDirection: "column", gap: 5, marginTop: 16 }}>
            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "space-between",
              }}
            >
              <Text style={styles.product_name}>Артикул:</Text>
              <Text style={styles.product_code}>{data.code}</Text>
            </View>
            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "space-between",
              }}
            >
              <Text style={styles.product_name}>1 {data.price_for}</Text>
              <Text style={[styles.product_old_price, styles.price]}>
                {data.price}
              </Text>
            </View>
            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "space-between",
              }}
            >
              <Text style={styles.product_name}>По карте</Text>
              <Text style={styles.product_old_price}>{data.old_price}</Text>
            </View>
          </View>
          <View style={{ flexDirection: "column", gap: 10, marginTop: 30 }}>
            <Text style={styles.description_name}>Описание:</Text>
            <Text style={styles.description_text}>{data.description}</Text>
          </View>
        </View>
      </View>
      {!isInBasket ? (
        <TouchableOpacity
          style={[stylesAll.button, styles.btn_product]}
          onPress={() => Basket(data.id, data)}
        >
          <Text style={stylesAll.button_text}>Добавить в корзину</Text>
        </TouchableOpacity>
      ) : (
        <TouchableOpacity
          style={[stylesAll.button, styles.btn_product]}
          onPress={() => router.push(`navigate/BasketPage`)}
        >
          <Text style={stylesAll.button_text}>В корзине</Text>
        </TouchableOpacity>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  btn_product: {
    position: "absolute",
    width: "90%",
    bottom: 30,
    margin: "auto",
    alignSelf: "center",
  },
  description_name: {
    fontSize: 16,
    fontWeight: "600",
    color: "#191919",
  },
  product_block: {
    flexDirection: "column",
    justifyContent: "space-between",
  },
  description_text: {
    fontSize: 16,
    fontWeight: "400",
    color: "#191919",
  },
  price: {
    color: "#191919",
  },
  product_old_price: {
    fontSize: 20,
    fontWeight: "700",
    color: "#DC0200",
  },
  product_code: {
    fontSize: 14,
    fontWeight: "500",
    color: "#6B6B6B",
  },
  product_title: {
    fontSize: 18,
    fontWeight: "700",
    color: "#191919",
  },
  product_img_box: {
    height: 300,
    backgroundColor: "#E8E8E8",
    marginBottom: 20,
  },
  product_name: {
    fontSize: 14,
    fontWeight: "500",
    color: "#6B6B6B",
  },
});

export default Productid;
