import React, { useEffect, useState } from "react";
import {
  ActivityIndicator,
  ScrollView,
  View,
  Text,
  TouchableOpacity,
  Image,
  TextInput,
  StyleSheet,
} from "react-native";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { router } from "expo-router";
import { url } from "@/Api";
import { stylesAll } from "@/style";

const PurchaseHistory = () => {
  const [order, setOrder] = useState<any[]>([]);
  const [dateTo, setDateTo] = useState("");
  const [dateFrom, setDateFrom] = useState("");
  const [local, setLocal] = useState(null);
  const [loading, setLoading] = useState(true); // Управление загрузкой

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      const token = await AsyncStorage.getItem("tokenActivation");
      setLocal(token);
      const headers = {
        Authorization: `Token ${token}`,
      };
      const urlWithDates =
        dateFrom && dateTo
          ? `${url}/order/list/?date_from=${dateFrom}&date_to=${dateTo}`
          : `${url}/order/list/`;

      try {
        const response = await axios.get(urlWithDates, { headers });
        setOrder(response.data);
      } catch (error) {
        console.error("Ошибка при загрузке данных:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    if (dateFrom && dateTo) {
      const fetchDataWithDates = async () => {
        setLoading(true);
        const token = await AsyncStorage.getItem("tokenActivation");
        const headers = {
          Authorization: `Token ${token}`,
        };

        try {
          const response = await axios.get(
            `${url}/order/list/?date_from=${dateFrom}&date_to=${dateTo}`,
            { headers }
          );
          setOrder(response.data);
        } catch (error) {
          console.error("Ошибка при загрузке данных с датами:", error);
        } finally {
          setLoading(false);
        }
      };

      fetchDataWithDates();
    }
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
        {loading ? (
          <View style={stylesAll.loading_catalog_page}>
            <ActivityIndicator size="small" color="#DC0200" />
          </View>
        ) : (
          <ScrollView showsVerticalScrollIndicator={false}>
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
                    <Text style={styles.dateTextInput}>{elem.date}</Text>
                    {elem.data.map((el, id) => (
                      <TouchableOpacity
                        style={styles.historyItem}
                        key={id}
                        onPress={() =>
                          router.push(`/details/PurchaseId/${el.id}`)
                        }
                      >
                        <View style={styles.itemInfo}>
                          <Text style={stylesAll.itemName}>
                            Покупка на сумму
                          </Text>
                          <Text style={stylesAll.itemSum}>{el.sum}</Text>
                        </View>
                        <Text style={stylesAll.itemAddress}>{el.address}</Text>
                        <View style={stylesAll.itemFooter}>
                          <Text style={stylesAll.date_text}>
                            {el.date} {el.time}
                          </Text>
                          <Text style={stylesAll.bonus}>+13 баллов</Text>
                        </View>
                      </TouchableOpacity>
                    ))}
                  </View>
                ))}
              </View>
            ) : (
              <>
                {loading ? (
                  <View style={stylesAll.loading_catalog_page}>
                    <ActivityIndicator size="small" color="#DC0200" />
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
                      Добавьте в корзину всё, что душе угодно, а мы доставим
                      заказ от 150 сом
                    </Text>
                    <TouchableOpacity
                      style={stylesAll.button}
                      onPress={() => router.push("/(tabs)/catalog")}
                    >
                      <Text style={stylesAll.button_text}>
                        Перейти в каталог
                      </Text>
                    </TouchableOpacity>
                  </View>
                )}
              </>
            )}
          </ScrollView>
        )}
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
  dateTextInput: {
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


});

export default PurchaseHistory;
