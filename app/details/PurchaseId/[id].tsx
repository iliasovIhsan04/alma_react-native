import { url } from "@/Api";
import { stylesAll } from "@/style";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import { router, useLocalSearchParams } from "expo-router";
import React, { useEffect, useState } from "react";
import {
  ActivityIndicator,
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

const PurchaseId = () => {
  const { id } = useLocalSearchParams();
  const [order, setOrder] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = await AsyncStorage.getItem("tokenActivation");
        const headers = {
          Authorization: `Token ${token}`,
        };
        const response = await axios.get(`${url}/order/${id}`, {
          headers,
        });
        setOrder(response.data);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      fetchData();
    }
  }, [id]);

  if (loading) {
    return (
      <View style={stylesAll.loading}>
        <ActivityIndicator color="#DC0200" size="small" />
      </View>
    );
  }

  return (
    <View style={stylesAll.background_block}>
      <View style={stylesAll.container}>
        <View style={[stylesAll.header, stylesAll.header_nav]}>
          <TouchableOpacity
            style={stylesAll.header_back_btn}
            onPress={() => router.push("/navigate/PurchaseHistory")}
          >
            <Image
              style={{ width: 24, height: 24 }}
              source={require("../../../assets/images/moreLeft.png")}
            />
          </TouchableOpacity>
          <Text style={stylesAll.header_name}>Информация по чеку</Text>
          <View style={stylesAll.header_back_btn}></View>
        </View>
        <ScrollView
          showsVerticalScrollIndicator={false}
          showsHorizontalScrollIndicator={false}
        >
          <View style={styles.purchase_id_block}>
            <View style={{ flexDirection: "column", gap: 12 }}>
              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "space-between",
                }}
              >
                <Text style={stylesAll.itemName}>Покупка на сумму</Text>
                <Text style={stylesAll.itemSum}>{order.sum}</Text>
              </View>
              <Text style={stylesAll.itemAddress}>{order.address}</Text>
              <View style={stylesAll.itemFooter}>
                <Text style={stylesAll.date_text}>
                  {order.date} {order.time}
                </Text>
                <Text style={stylesAll.bonus}>+13 баллов</Text>
              </View>
            </View>
            <Image
              style={{ height: 1, width: "100%" }}
              source={require("../../../assets/images/lineBonus.png")}
            />
            {order.product.map((item: any) => (
              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "space-between",
                  gap: 12,
                }}
              >
                <Text style={styles.name_product}>{item.title}</Text>
                <View style={styles.cost_count}>
                  <Text style={styles.product_cost}>{item.cost}</Text>
                  <Text style={styles.product_count}>
                    {item.count} <Text>{item.price_for}</Text>
                  </Text>
                </View>
              </View>
            ))}
            <Image
              style={{ height: 1, width: "100%" }}
              source={require("../../../assets/images/lineBonus.png")}
            />
            <View style={styles.bonus_block}>
              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "space-between",
                  alignItems: "center",
                }}
              >
                <View
                  style={{ flexDirection: "row", alignItems: "center", gap: 8 }}
                >
                  <Image
                    style={{ width: 24, height: 24 }}
                    source={require("../../../assets/images/bonusRed.png")}
                  />
                  <Text style={styles.bonus_text}>Баллов использовано:</Text>
                </View>
                <Text style={[styles.bonus_plus, { color: "#FE211F" }]}>0</Text>
              </View>
              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "space-between",
                  alignItems: "center",
                }}
              >
                <View
                  style={{ flexDirection: "row", alignItems: "center", gap: 8 }}
                >
                  <Image
                    style={{ width: 24, height: 24 }}
                    source={require("../../../assets/images/pointsAwarded.png")}
                  />
                  <Text style={styles.bonus_text}>Баллов начислено:</Text>
                </View>
                <Text style={styles.bonus_plus}>+13</Text>
              </View>
            </View>
          </View>
        </ScrollView>
      </View>
    </View>
  );
};
const styles = StyleSheet.create({
  bonus_plus: {
    fontSize: 14,
    fontWeight: "700",
    color: "#68B936",
  },
  bonus_text: {
    fontSize: 14,
    fontWeight: "400",
    color: "#191919",
  },
  bonus_block: {
    flexDirection: "column",
    gap: 12,
  },
  product_count: {
    fontSize: 12,
    fontWeight: "500",
    color: "#AAAAAA",
  },
  product_cost: {
    fontSize: 14,
    fontWeight: "500",
    color: "#191919",
  },
  name_product: {
    fontSize: 14,
    fontWeight: "400",
    color: "#191919",
  },
  purchase_id_block: {
    width: "100%",
    minHeight: 200,
    backgroundColor: "#F5F7FA",
    padding: 16,
    borderRadius: 14,
    flexDirection: "column",
    gap: 24,
    marginTop: 10,
    marginBottom: 100,
  },
  cost_count: {
    flexDirection: "column",
    gap: 2,
    alignItems: "flex-end",
  },
});
export default PurchaseId;