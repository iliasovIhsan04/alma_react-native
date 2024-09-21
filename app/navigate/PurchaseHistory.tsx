import { url } from "@/Api";
import { stylesAll } from "@/style";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import { router } from "expo-router";
import React, { useEffect, useState } from "react";
import { ScrollView } from "react-native";
import {
  Image,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";

const PurchaseHistory = () => {
  const [order, setOrder] = useState<any[]>([]);
  const [dateTo, setDateTo] = useState("");
  const [dateFrom, setDateFrom] = useState("");
  const [local, setLocal] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      const token = await AsyncStorage.getItem("tokenActivation");
      setLocal(token);
      const headers = {
        Authorization: `Token ${token}`,
      };
      axios
        .get(`${url}/order/list/?date_from=${dateFrom}&date_to=${dateTo}`, {
          headers,
        })
        .then((res) => setOrder(res.data));
    };

    fetchData();
  }, [dateFrom, dateTo]);

  const hasOrders = order.length > 0 && order[0]?.key === true;

  return (
    <View style={stylesAll.background_block}>
      <View style={stylesAll.container}>
        <View style={[stylesAll.header, stylesAll.header_nav]}>
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
        <ScrollView
          showsVerticalScrollIndicator={false}
          showsHorizontalScrollIndicator={false}
        >
          {hasOrders ? (
            <View style={styles.history_block}>
              <View style={styles.oclock_block}>
                <View style={styles.oclock_box}>
                  <Text>От:</Text>
                  <TextInput
                    style={styles.dateInput}
                    value={dateFrom}
                    onChangeText={setDateFrom}
                    placeholder="Выберите дату"
                  />
                </View>
                <View style={styles.oclock_box}>
                  <Text>До:</Text>
                  <TextInput
                    style={styles.dateInput}
                    value={dateTo}
                    onChangeText={setDateTo}
                    placeholder="Выберите дату"
                  />
                </View>
              </View>
              {order.map((elem, index) => (
                <View key={index}>
                  <Text style={styles.dateText}>{elem.date}</Text>
                  {elem.data.map((el, id) => (
                    <TouchableOpacity
                      style={styles.historyItem}
                      key={id}
                      onPress={() => router.push(`/purchase-id/${el.id}`)}
                    >
                      <View style={styles.itemInfo}>
                        <Text style={styles.itemName}>Покупка на сумму</Text>
                        <Text style={styles.itemSum}>{el.sum}</Text>
                      </View>
                      <Text style={styles.itemAddress}>{el.address}</Text>
                      <View style={styles.itemFooter}>
                        <Text style={styles.date_text}>
                          {el.date} {el.time}
                        </Text>
                        <Text style={styles.bonus}>+13 баллов</Text>
                      </View>
                    </TouchableOpacity>
                  ))}
                </View>
              ))}
            </View>
          ) : (
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
                Добавьте в корзину всё, что душе угодно, а мы доставим заказ от
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
        </ScrollView>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  history_block: {
    marginBottom: 150,
  },
  oclock_block: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    flexWrap: "wrap",
  },
  oclock_box: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    width: "48%",
    backgroundColor: "#F5F7FA",
    padding: 10,
    height: 45,
    borderRadius: 10,
    marginTop: 10,
  },
  dateInput: {
    width: "70%",
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 5,
    padding: 5,
  },
  dateText: {
    fontSize: 14,
    fontWeight: "500",
    color: "#6B6B6B",
    textAlign: "center",
    marginTop: 30,
    marginBottom: 14,
  },
  historyItem: {
    width: "100%",
    backgroundColor: "#F5F7FA",
    borderRadius: 14,
    padding: 16,
    marginBottom: 10,
    flexDirection: "column",
    gap: 12,
  },
  itemInfo: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  itemAddress: {
    fontSize: 14,
    fontWeight: "400",
    color: "#191919",
  },
  itemName: {
    fontSize: 16,
    fontWeight: "700",
    color: "#191919",
  },
  itemSum: {
    fontWeight: "bold",
    color: "#191919",
  },
  itemFooter: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  bonus: {
    color: "#68B936",
    fontSize: 14,
    fontWeight: "700",
  },
  date_text: {
    fontSize: 12,
    fontWeight: "500",
    color: "#AAAAAA",
  },
});

export default PurchaseHistory;
