import { stylesAll } from "@/app/(tabs)/style";
import { Ionicons } from "@expo/vector-icons";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useRouter } from "expo-router";
import React, { useEffect, useState } from "react";
import {
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

type BasketProduct = {
  id: number;
  title: string;
  price: number;
  preview_img?: string;
};

const BasketProducts = () => {
  const [cart, setCart] = useState<BasketProduct[]>([]);
  const [plus, setPlus] = useState<{ [key: number]: number }>({});
  const [shopCart, setShopCart] = useState<BasketProduct[]>([]);
  const [count, setCount] = useState(0);
  const [basket, setBasket] = useState<BasketProduct[]>([]);
  const router = useRouter();

  useEffect(() => {
    const fetchBasketData = async () => {
      const storedBasket = await AsyncStorage.getItem("cartsBasket");
      const storedCart = (await AsyncStorage.getItem("cart")) || "[]";
      const storedShopCart = (await AsyncStorage.getItem("shopCart")) || "[]";
      const storedPlus = (await AsyncStorage.getItem("plus")) || "{}";

      setCart(JSON.parse(storedCart));
      setBasket(storedBasket ? JSON.parse(storedBasket) : []);
      setShopCart(JSON.parse(storedShopCart));
      setPlus(JSON.parse(storedPlus));
    };

    fetchBasketData();
  }, []);

  const handlePlus = async (id: number) => {
    try {
      // Найти элемент в корзине и в магазине
      const itemTo = basket.find((el) => el.id === id);
      const itemToLocal = shopCart.find((el) => el.id === id);

      // Вывод отладочного сообщения для проверки значений
      console.log("itemTo:", itemTo);
      console.log("itemToLocal:", itemToLocal);

      // Если элемент найден
      const item = itemTo || itemToLocal;
      if (!item) {
        console.error(`Элемент с id ${id} не найден в корзине или магазине`);
        return;
      }

      // Обновление корзины
      const updatedCart = [
        ...shopCart.filter((cartItem) => cartItem.id !== id),
        item,
      ];
      await AsyncStorage.setItem("shopCart", JSON.stringify(updatedCart));
      setShopCart(updatedCart);

      // Обновление счетчика
      const newPlus = { ...plus, [id]: (plus[id] || 0) + 1 };
      await AsyncStorage.setItem("plus", JSON.stringify(newPlus));
      setPlus(newPlus);

      PriceCalculation();
    } catch (error) {
      console.error("Ошибка добавления элемента:", error);
    }
  };

  const handleMinus = async (id: number) => {
    try {
      const currentPlus = { ...plus };
      const currentCount = currentPlus[id] || 0;

      // Уменьшаем количество на 1
      if (currentCount > 0) {
        currentPlus[id] = currentCount - 1;

        // Обновляем AsyncStorage
        await AsyncStorage.setItem("plus", JSON.stringify(currentPlus));
        setPlus(currentPlus);

        // Если количество стало равно нулю, удаляем товар из корзины
        if (currentPlus[id] === 0) {
          await handleRemoveItem(id);
        } else {
          // Обновляем корзину, если количество больше нуля
          const updatedCart = shopCart.map((item) =>
            item.id === id ? { ...item } : item
          );
          await AsyncStorage.setItem("shopCart", JSON.stringify(updatedCart));
          setShopCart(updatedCart);
        }

        // Пересчитываем общую сумму
        PriceCalculation();
      }
    } catch (error) {
      console.error("Ошибка уменьшения элемента:", error);
    }
  };

  const handleRemoveItem = async (id: number) => {
    try {
      const currentCartString = await AsyncStorage.getItem("cartsBasket");
      const currentCart = currentCartString
        ? JSON.parse(currentCartString)
        : [];
      const updatedCart = currentCart.filter(
        (item: BasketProduct) => item.id !== id
      );
      await AsyncStorage.setItem("cartsBasket", JSON.stringify(updatedCart));
      setBasket(updatedCart);
      setShopCart(shopCart.filter((item) => item.id !== id));
      PriceCalculation();
    } catch (error) {
      console.error("Ошибка удаления элемента:", error);
    }
  };

  const PriceCalculation = async () => {
    const shopCart = await AsyncStorage.getItem("shopCart");
    if (shopCart) {
      const total = JSON.parse(shopCart).reduce(
        (acc: number, item: BasketProduct) => acc + item.price,
        0
      );
      setCount(total);
    } else {
      setCount(0);
    }
  };

  useEffect(() => {
    PriceCalculation();
  }, [shopCart]);

  return (
    <View style={[stylesAll.background_block]}>
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
          <Text style={stylesAll.header_name}>Корзина</Text>
          <View style={stylesAll.header_back_btn}></View>
        </View>
        {basket.length > 0 ? (
          <View>
            <ScrollView
              showsVerticalScrollIndicator={false}
              showsHorizontalScrollIndicator={false}
              style={{ marginTop: 20, backgroundColor: "blue" }}
            >
              <View style={styles.basket_block}>
                {basket.map((item) =>
                  item ? (
                    <View style={styles.product_block} key={item.id}>
                      {item.preview_img ? (
                        <Image
                          style={styles.product_image}
                          source={{ uri: item.preview_img }}
                        />
                      ) : (
                        <View style={styles.product_image} />
                      )}
                      <View
                        style={{
                          flexDirection: "column",
                          justifyContent: "space-between",
                        }}
                      >
                        <Text style={styles.product_title} numberOfLines={2}>
                          {item.title}
                        </Text>
                        <View
                          style={{
                            width: "80%",
                            flexDirection: "row",
                            alignItems: "center",
                            justifyContent: "space-between",
                          }}
                        >
                          <Text style={styles.product_price}>
                            {item.price} сом
                          </Text>
                          <View style={styles.buttons_block}>
                            <TouchableOpacity
                              style={styles.add_remove}
                              onPress={() => handleMinus(item.id)}
                            >
                              <Ionicons
                                color="black"
                                style={{ width: 24, height: 24 }}
                                name="remove"
                                size={24}
                              />
                            </TouchableOpacity>
                            <Text style={styles.basketTxt}>
                              {plus[item.id] || 0}
                            </Text>
                            {plus[item.id] === 0 && (
                              <TouchableOpacity
                                onPress={() => handleRemoveItem(item.id)}
                              />
                            )}
                            <TouchableOpacity
                              style={styles.add_remove}
                              onPress={() => handlePlus(item.id)}
                            >
                              <Ionicons
                                color="black"
                                style={{ width: 24, height: 24 }}
                                name="add"
                                size={24}
                              />
                            </TouchableOpacity>
                          </View>
                        </View>
                      </View>
                    </View>
                  ) : null
                )}
              </View>
            </ScrollView>
            <View style={styles.placing_price_block}>
              <Text style={styles.placing_price_text}>
                Общая сумма: {count} сом
              </Text>
              <TouchableOpacity
                style={stylesAll.button}
                onPress={() => router.push("/(tabs)/profile")}
              >
                <Text style={stylesAll.button_text}>Оформить заказ</Text>
              </TouchableOpacity>
            </View>
          </View>
        ) : (
          <View style={stylesAll.purchase_history}>
            <View style={stylesAll.history_image_box}>
              <Image
                style={stylesAll.image_all}
                source={require("../../assets/images/basketImg.png")}
              />
            </View>
            <Text style={stylesAll.history_text_one}>
              Вы не сделали ни одной покупки, но это поправимо...
            </Text>
            <Text style={stylesAll.history_text_two}>
              Добавьте в избранное всё, что душе угодно, а мы доставим заказ от
              150 сом
            </Text>
            <TouchableOpacity
              style={stylesAll.button}
              onPress={() => router.push("/(tabs)/catalog")}
            >
              <Text style={stylesAll.button_text}>Перейти в каталог</Text>
            </TouchableOpacity>
          </View>
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  basket_container: {
    width: "100%",
  },
  basket_background: {
    position: "relative",
    width: "100%",
    height: "100%",
    backgroundColor: "blue",
  },
  placing_price_block: {
    top: 70,
    left: 0,
    right: 0,
    bottom: 0,
    width: "100%",
    height: 200,
    backgroundColor: "red",
    padding: 16,
    borderTopLeftRadius: 16,
    borderTopRightRadius: 16,
    zIndex: 1,
  },
  product_price: {
    fontSize: 18,
    fontWeight: "700",
    color: "#FE211F",
  },
  basketTxt: {
    fontSize: 16,
    fontWeight: "600",
    color: "#121213",
  },
  add_remove: {
    width: 32,
    height: 32,
    borderRadius: 50,
    backgroundColor: "#E8E8E8",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
  product_title: {
    fontSize: 14,
    fontWeight: "400",
    color: "#191919",
    lineHeight: 16,
  },
  basket_block: {
    paddingBottom: 300,
  },
  product_block: {
    width: "100%",
    backgroundColor: "#F5F7FA",
    borderRadius: 14,
    padding: 10,
    marginBottom: 10,
    gap: 10,
    flexDirection: "row",
  },
  product_image: {
    width: 100,
    height: 100,
    backgroundColor: "#f0f0f0",
  },
  buttons_block: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    width: 100,
  },
});

export default BasketProducts;
