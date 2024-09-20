import { useRoute } from "@react-navigation/native";
import { url } from "@/Api";
import { stylesAll } from "@/style";
import axios from "axios";
import { router } from "expo-router";
import React, { useEffect, useState } from "react";
import {
  ActivityIndicator,
  Alert,
  Image,
  Pressable,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Images from "./Images";

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
  img: {
    id: number;
    img: string;
  }[];
}

const Productid = () => {
  const route = useRoute();
  const { id } = route.params as { id: number };
  const [data, setData] = useState<Product | null>(null);
  const [isInBasket, setIsInBasket] = useState<boolean>(false);
  const [isFavorite, setIsFavorite] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(true);
  const [cart, setCart] = useState<Product[]>([]);
  const [favoriteItems, setFavoriteItems] = useState<Set<number>>(new Set());

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get<Product>(
          `${url}/product/detail/${id}`
        );
        setData(response.data);

        const activeItem = await AsyncStorage.getItem(
          `activeItemsBasket_${id}`
        );
        setIsInBasket(!!activeItem);

        const itemFeatured = await AsyncStorage.getItem(
          `activeItemFeatured${id}`
        );
        setIsFavorite(!!itemFeatured);
      } catch (error) {
        console.error("Ошибка при получении данных:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [id]);

  const InitializeData = async () => {
    const cartItemsString = await AsyncStorage.getItem("cartFeatured");
    if (cartItemsString) {
      setCart(JSON.parse(cartItemsString));
    }
  };
  useEffect(() => {
    InitializeData();
  }, []);

  const toggleFavorite = async () => {
    try {
      if (isFavorite) {
        await AsyncStorage.removeItem(`activeItemFeatured${id}`);
      } else {
        await AsyncStorage.setItem(`activeItemFeatured${id}`, `${id}`);
        saveToAsyncStorage(id); // Сохраняем в корзину при добавлении в избранное
      }
      setIsFavorite(!isFavorite);
    } catch (error) {
      console.error("Ошибка при обновлении AsyncStorage:", error);
    }
  };

  const saveToAsyncStorage = async (id: number) => {
    if (!data) return;
  
    const itemToAdd = data;
    let updatedCart = [...cart];
  
    const itemIndex = updatedCart.findIndex((item) => item.id === itemToAdd.id);
  
    if (itemIndex === -1) {
      // Добавляем товар в корзину
      updatedCart.push(itemToAdd);
      console.log("Товар добавлен в корзину:", itemToAdd.id);
  
      // Сохраняем товар в AsyncStorage по идентификатору
      await AsyncStorage.setItem(`cartItem_${itemToAdd.id}`, JSON.stringify(itemToAdd));
    } else {
      // Удаляем товар из корзины
      updatedCart.splice(itemIndex, 1);
      console.log("Товар удален из корзины:", itemToAdd.id);
      console.log("После удаления:", updatedCart);
  
      // Удаляем товар из AsyncStorage по идентификатору
      await AsyncStorage.removeItem(`cartItem_${itemToAdd.id}`);
    }
  
    setCart(updatedCart);
  };
  

  if (loading) {
    return (
      <View style={stylesAll.loading}>
        <ActivityIndicator color="red" size="small" />
        <Text>Загрузка данных...</Text>
      </View>
    );
  }

  if (!data) {
    return (
      <View style={stylesAll.loading}>
        <Text>Ошибка загрузки данных. Пожалуйста, попробуйте позже.</Text>
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
          <Pressable onPress={toggleFavorite}>
            <Image
              style={styles.heart_img}
              source={
                isFavorite
                  ? require("../../../assets/images/heart_card_new.png")
                  : require("../../../assets/images/heart_card.png")
              }
            />
          </Pressable>
        </View>
      </View>
      <View>
        <Images data={data.img} />
      </View>
      <View style={stylesAll.container}>
        <View style={styles.product_block}>
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
          onPress={() => {
            saveToAsyncStorage(data.id);
            setIsInBasket(true);
            Alert.alert("Ваш товар успешно добавлен в корзину!");
          }}
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
  heart_img: {
    width: 24,
    height: 24,
  },
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
