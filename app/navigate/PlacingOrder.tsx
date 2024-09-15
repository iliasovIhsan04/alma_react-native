import React, { useEffect, useState } from "react";
import {
  ActivityIndicator,
  Alert,
  Image,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { stylesAll } from "../(tabs)/style";
import { router } from "expo-router";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import { url } from "@/Api";
import { useSelector } from "react-redux";
import { RootState } from "@/Redux/reducer/store";
import DateTimePicker from "@react-native-community/datetimepicker";

const PlacingOrder = () => {
  const [receiveInput, setReceiveInput] = useState(false);
  const [local, setLocal] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [cart, setCart] = useState<any[]>([]);
  const [placingModal, setPlacingModal] = useState(false);
  const [totalPrice, setTotalPrice] = useState(0);
  const [plus, setPlus] = useState<any>({});
  const [show, setShow] = useState(false);
  const selectedAddressId = useSelector(
    (state: RootState) => state.selectedAddress.selectedAddress
  );
  const addressId = useSelector(
    (state: RootState) => state.selectedAddress.selectedId
  );
  const [address, setAddress] = useState({
    address_to: "",
    get_date: "",
    comment: "",
  });

  useEffect(() => {
    const loadData = async () => {
      try {
        const tokens = await AsyncStorage.getItem("tokenActivation");
        const cartData = await AsyncStorage.getItem("cartFeatured");
        setLocal(tokens);
        setCart(cartData ? JSON.parse(cartData) : []);
      } catch (error) {
        console.error("Error loading data", error);
      }
    };
    loadData();
  }, []);

  useEffect(() => {
    const fetchTotalPrice = async () => {
      try {
        const plusData = await AsyncStorage.getItem("plus");
        const parsedPlus = plusData ? JSON.parse(plusData) : {};
        setPlus(parsedPlus);
      } catch (error) {
        console.error("Error fetching total price:", error);
      }
    };
    fetchTotalPrice();
  }, []);

  const headers = {
    Authorization: `Token ${local}`,
  };

  const handleSubmit = async () => {
    setIsLoading(true);
    console.log("Address:", address); // Добавьте этот вывод
    try {
      const shopCart = await AsyncStorage.getItem("shopCart");
      const parsedShopCart = shopCart ? JSON.parse(shopCart) : [];
      const cartIds = parsedShopCart.map((el: any) => el.id);
      const idCount = cartIds.reduce(
        (acc: { [key: string]: number }, id: number) => {
          acc[id] = acc[id] ? acc[id] + 1 : 1;
          return acc;
        },
        {}
      );
      const addresing = 24;

      const productsForOrder = Object.keys(idCount).map((id) => ({
        product: parseInt(id),
        count: idCount[id],
      }));
      const dataToSend = {
        address_to: addressId ? addressId : null,
        get_date: addresing,
        comment: address.comment,
        product: productsForOrder,
      };

      const response = await axios.post(url + "/order/create", dataToSend, {
        headers,
      });

      if (response.data.response === true) {
        setIsLoading(false);
        await AsyncStorage.multiRemove([
          "myData",
          "updatedOldPrice",
          "address",
          "shopCart",
          "cart",
        ]);
        setPlacingModal(true);
      }
    } catch (error) {
      console.error("Error during order placement:", error); // Добавьте этот вывод
      if (!address.address_to) {
        Alert.alert("Ошибка", "Добавьте адрес прежде чем заказать!");
      } else if (!address.get_date) {
        Alert.alert("Ошибка", "Выберите время получения");
      }
      setIsLoading(false);
    }
  };
  const calculateTotalPrice = async () => {
    const shopCart = await AsyncStorage.getItem("shopCart");
    const parsedCart = shopCart ? JSON.parse(shopCart) : [];

    const total = parsedCart.reduce((acc: number, item: any) => {
      const itemTotal = item.price * plus[item.id];
      return acc + itemTotal;
    }, 0);

    setTotalPrice(total);
  };

  useEffect(() => {
    calculateTotalPrice();
  }, [cart]);

  return (
    <View style={stylesAll.background_block}>
      <View style={stylesAll.container}>
        <View style={stylesAll.header}>
          <TouchableOpacity
            style={stylesAll.header_back_btn}
            onPress={() => router.push("/navigate/BasketPage")}
          >
            <Image
              style={{ width: 24, height: 24 }}
              source={require("../../assets/images/moreLeft.png")}
            />
          </TouchableOpacity>
          <Text style={stylesAll.header_name}>Оформление заказа</Text>
          <View style={stylesAll.header_back_btn}></View>
        </View>
        <View style={stylesAll.input_block_all}>
          <View>
            <Text style={stylesAll.label}>Адрес доставки</Text>
            <TouchableOpacity
              style={[stylesAll.input, styles.input_box]}
              onPress={() => router.push("/navigate/EmptyAddress")}
            >
              <View
                style={{ flexDirection: "row", alignItems: "center", gap: 12 }}
              >
                <Image
                  style={stylesAll.icons}
                  source={require("../../assets/images/address.png")}
                />
                {selectedAddressId ? (
                  <Text style={styles.placeholder_static}>
                    {selectedAddressId}
                  </Text>
                ) : (
                  <Text style={styles.placeholder_static}>
                    Выберите адрес доставки
                  </Text>
                )}
              </View>
              <Image
                style={[stylesAll.icons, { tintColor: "#CFCFCF" }]}
                source={require("../../assets/images/moreRight.png")}
              />
            </TouchableOpacity>
          </View>
          <View>
            <Text style={stylesAll.label}>Время получения</Text>
            <TouchableOpacity style={[stylesAll.input, styles.input_box]}>
              <View
                style={{ flexDirection: "row", alignItems: "center", gap: 12 }}
              >
                <View style={stylesAll.cell_box}></View>
                <Text style={styles.placeholder_static}>Как можно быстрее</Text>
              </View>
            </TouchableOpacity>
            <TouchableOpacity
              style={[stylesAll.input, styles.input_box, { marginTop: 10 }]}
            >
              <TouchableOpacity
                onPress={() => setShow(true)}
                style={{ flexDirection: "row", alignItems: "center", gap: 12 }}
              >
                <View style={stylesAll.cell_box}></View>
                <Text style={styles.placeholder_static}>
                  Выбрать дату и время
                </Text>
              </TouchableOpacity>
              <View style={stylesAll.input_block_all}>
                {show && (
                  <View style={styles.input_box_date}>
                    <DateTimePicker
                      style={styles.date_picker}
                      testID="dateTimePicker"
                      value={
                        address.get_date
                          ? new Date(address.get_date)
                          : new Date()
                      }
                      mode="datetime"
                      onChange={(event, selectedDate) => {
                        const currentDate = selectedDate || new Date();
                        setShow(false);
                        setAddress((prevAddress) => ({
                          ...prevAddress,
                          get_date: currentDate.toISOString(),
                        }));
                      }}
                    />
                  </View>
                )}
              </View>
            </TouchableOpacity>
          </View>
          <View>
            <Text style={stylesAll.label}>Комментарий к заказу( 0-2000)</Text>
            <TextInput
              style={[stylesAll.input, styles.input_box_textarea]}
              placeholder="Напишите комментарий"
              placeholderTextColor={"#6B6B6B"}
              multiline
              numberOfLines={10}
              onChangeText={(text) =>
                setAddress((prevAddress) => ({
                  ...prevAddress,
                  comment: text,
                }))
              }
            />
          </View>
          <View style={{ marginTop: 75 }}>
            <Text style={stylesAll.label}>Способ оплаты</Text>
            <TouchableOpacity style={[stylesAll.input, styles.input_box]}>
              <View
                style={{ flexDirection: "row", alignItems: "center", gap: 12 }}
              >
                <Image
                  style={stylesAll.icons}
                  source={require("../../assets/images/wallet.png")}
                />
                <Text style={styles.placeholder_static}>Наличными</Text>
              </View>
            </TouchableOpacity>
          </View>
        </View>
      </View>
      <View style={styles.placing_order_bottom}>
        <View style={{ flexDirection: "column", gap: 10 }}>
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "space-between",
            }}
          >
            <Text style={styles.placing_price_name}>Сумма:</Text>
            <Text style={styles.placing_price_result}>{totalPrice} сом</Text>
          </View>
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "space-between",
            }}
          >
            <Text style={styles.placing_price_name}>Доставка:</Text>
            <Text style={styles.placing_price_result}>0 сом</Text>
          </View>
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "space-between",
              borderTopWidth: 1,
              borderColor: "#CFCFCF",
              paddingTop: 10,
            }}
          >
            <Text style={styles.placing_price_name}>Итого:</Text>
            <Text style={[styles.placing_price_result, styles.total_text]}>
              {totalPrice} сом
            </Text>
          </View>
        </View>
        <TouchableOpacity
          style={[stylesAll.button, styles.btn_placing]}
          onPress={handleSubmit}
          disabled={isLoading}
        >
          {isLoading ? (
            <ActivityIndicator color="white" />
          ) : (
            <Text style={stylesAll.button_text}>Оформить заказ</Text>
          )}
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  placeholder_static: {
    fontSize: 16,
    fontWeight: "400",
    color: "#191919",
  },
  input_box_textarea: {
    backgroundColor: "#F5F7FA",
    minHeight: 120,
    textAlignVertical: "top",
    paddingVertical: 10,
  },
  input_box: {
    backgroundColor: "#F5F7FA",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  input_box_date: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginTop: 20,
  },
  date_picker: {
    height: 45,
    marginLeft: 0,
  },
  btn_placing: {
    backgroundColor: "#6B6B6B",
    marginTop: 15,
  },
  total_text: {
    color: "#FE211F",
  },
  placing_order_bottom: {
    position: "absolute",
    bottom: 0,
    width: "100%",
    minHeight: 180,
    backgroundColor: "#F5F7FA",
    padding: 16,
    borderTopLeftRadius: 16,
    borderTopRightRadius: 16,
    zIndex: 1,
    paddingBottom: 30,
  },
  placing_price_result: {
    fontSize: 18,
    fontWeight: "700",
    color: "#191919",
  },
  placing_price_name: {
    fontSize: 14,
    fontWeight: "400",
    color: "#6B6B6B",
  },
});

export default PlacingOrder;
