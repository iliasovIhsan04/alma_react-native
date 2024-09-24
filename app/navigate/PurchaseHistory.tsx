import React, { useEffect, useState } from "react";
import {
  ActivityIndicator,
  ScrollView,
  View,
  Text,
  Image,
  TouchableOpacity,
  Pressable,
  StyleSheet,
} from "react-native";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { router } from "expo-router";
import { url } from "@/Api";
import { stylesAll } from "@/style";
import DateTimePickerModal from "react-native-modal-datetime-picker";

const PurchaseHistory = () => {
  const [orders, setOrders] = useState<any[]>([]);
  const [filteredOrders, setFilteredOrders] = useState<any[]>([]);
  const [dateFrom, setDateFrom] = useState<string>("");
  const [dateTo, setDateTo] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(true);
  const [isDatePickerVisible, setDatePickerVisibility] = useState<boolean>(false);
  const [isSelectingFromDate, setIsSelectingFromDate] = useState<boolean>(true);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      const token = await AsyncStorage.getItem("tokenActivation");
      if (token) {
        const headers = { Authorization: `Token ${token}` };
        const urlWithDates = dateFrom && dateTo
          ? `${url}/order/list/?date_from=${dateFrom}&date_to=${dateTo}`
          : `${url}/order/list/`;

        try {
          const response = await axios.get(urlWithDates, { headers });
          setOrders(response.data);
          setFilteredOrders(response.data);
        } catch (error) {
          console.error("Ошибка при загрузке данных:", error);
        } finally {
          setLoading(false);
        }
      } else {
        setLoading(false);
      }
    };

    fetchData();
  }, [dateFrom, dateTo]);

  useEffect(() => {
    const filterOrders = () => {
      if (!dateFrom && !dateTo) {
        setFilteredOrders(orders);
        return;
      }

      const fromDate = new Date(dateFrom);
      const toDate = new Date(dateTo);
      const filtered = orders.filter((order) => {
        const orderDate = new Date(order.date);
        return orderDate >= fromDate && orderDate <= toDate;
      });
      setFilteredOrders(filtered);
    };

    filterOrders();
  }, [orders, dateFrom, dateTo]);

  const handleConfirm = (date: Date) => {
    const isoDate = date.toISOString().split("T")[0];
    if (isSelectingFromDate) {
      setDateFrom(isoDate);
    } else {
      setDateTo(isoDate);
    }
    hideDatePicker();
  };

  const hideDatePicker = () => {
    setDatePickerVisibility(false);
  };

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
            {filteredOrders.length > 0 ? (
              <View style={styles.history_block}>
                <View style={styles.oclock_block}>
                  <Pressable
                    style={styles.oclock_box}
                    onPress={() => {
                      setIsSelectingFromDate(true);
                      setDatePickerVisibility(true);
                    }}
                  >
                    <Text>От:</Text>
                    <Text style={stylesAll.label}>
                      {dateFrom || "Выберите дату"}
                    </Text>
                    <Image
                      style={styles.calendar}
                      source={require("../../assets/images/calendar_days.png")}
                    />
                  </Pressable>

                  <Pressable
                    style={styles.oclock_box}
                    onPress={() => {
                      setIsSelectingFromDate(false);
                      setDatePickerVisibility(true);
                    }}
                  >
                    <Text>До:</Text>
                    <Text style={stylesAll.label}>
                      {dateTo || "Выберите дату"}
                    </Text>
                    <Image
                      style={styles.calendar}
                      source={require("../../assets/images/calendar_days.png")}
                    />
                  </Pressable>
                </View>

                {filteredOrders.map((order, index) => (
                  <View key={index}>
                    <Text style={styles.dateTextInput}>{order.date}</Text>
                    {order.data.map((item, id) => (
                      <TouchableOpacity
                        style={styles.historyItem}
                        key={id}
                        onPress={() => router.push(`/details/PurchaseId/${item.id}`)}
                      >
                        <View style={styles.itemInfo}>
                          <Text style={stylesAll.itemName}>Покупка на сумму</Text>
                          <Text style={stylesAll.itemSum}>{item.sum}</Text>
                        </View>
                        <Text style={stylesAll.itemAddress}>{item.address}</Text>
                        <View style={stylesAll.itemFooter}>
                          <Text style={stylesAll.date_text}>
                            {item.date} {item.time}
                          </Text>
                          <Text style={stylesAll.bonus}>+13 баллов</Text>
                        </View>
                      </TouchableOpacity>
                    ))}
                  </View>
                ))}
              </View>
            ) : (
              <View style={stylesAll.purchase_history}>
                <Text>Нет заказов</Text>
              </View>
            )}
          </ScrollView>
        )}
      </View>
      <DateTimePickerModal
        isVisible={isDatePickerVisible}
        mode="date"
        onConfirm={handleConfirm}
        onCancel={hideDatePicker}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  calendar: {
    width: 24,
    height: 24,
    marginRight: 10,
  },
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
