import { url } from "@/Api";
import { stylesAll } from "@/style";
import axios from "axios";
import { router, useLocalSearchParams } from "expo-router";
import React, { useEffect, useState } from "react";
import {
  TouchableOpacity,
  Image,
  View,
  Text,
  StyleSheet,
  ActivityIndicator,
} from "react-native"; // Импортируем ActivityIndicator
import Images from "../ProductId/Images";

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

const BarrCodeId = () => {
  const [data, setData] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);
  const { id } = useLocalSearchParams();

  useEffect(() => {
    if (id) {
      axios
        .get(`${url}/product/barrcode/${id}`)
        .then((response) => {
          setData(response.data);
          setLoading(false);
        })
        .catch((error) => {
          console.error("Error fetching data:", error);
          setLoading(false);
        });
    }
  }, [id]);
  
  return (
    <View style={stylesAll.background_block}>
      <View style={stylesAll.container}>
        <View style={stylesAll.header}>
          <TouchableOpacity
            style={stylesAll.header_back_btn}
            onPress={() => router.push("/navigate/ProductGiven")}
          >
            <Image
              style={{ width: 24, height: 24 }}
              source={require("../../../assets/images/moreLeft.png")}
            />
          </TouchableOpacity>
          <Text style={stylesAll.header_name}>Товар</Text>
          <View style={stylesAll.header_back_btn}></View>
        </View>
      </View>
      {loading ? (
        <View style={stylesAll.loading_catalog_page}>
          <ActivityIndicator size="small" color="#DC0200" />
        </View>
      ) : (
        <View>
          {data?.status === true ? (
            <>
              <Images data={data.img} />
              <View style={stylesAll.container}>
                <View style={styles.product_block}>
                  <Text style={styles.product_title}>{data.title}</Text>
                  <View
                    style={{ flexDirection: "column", gap: 5, marginTop: 16 }}
                  >
                    <View style={styles.row}>
                      <Text style={styles.product_name}>Артикул:</Text>
                      <Text style={styles.product_code}>{data.code}</Text>
                    </View>
                    <View style={styles.row}>
                      <Text style={styles.product_name}>
                        1 {data.price_for}
                      </Text>
                      <Text style={[styles.product_old_price, styles.price]}>
                        {data.price}
                      </Text>
                    </View>
                    <View style={styles.row}>
                      <Text style={styles.product_name}>По карте</Text>
                      <Text style={styles.product_old_price}>
                        {data.old_price}
                      </Text>
                    </View>
                  </View>
                  <View
                    style={{ flexDirection: "column", gap: 10, marginTop: 30 }}
                  >
                    <Text style={styles.description_name}>Описание:</Text>
                    <Text style={styles.description_text}>
                      {data.description}
                    </Text>
                  </View>
                </View>
              </View>
            </>
          ) : (
            <View style={stylesAll.loading_catalog_page}>
              <Text style={stylesAll.barrcode_page_text}>Товар не найден!</Text>
            </View>
          )}
        </View>
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
  product_name: {
    fontSize: 14,
    fontWeight: "500",
    color: "#6B6B6B",
  },
  row: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  heart_img_box: {
    alignItems: "center",
  },
  heart_img: {
    width: 24,
    height: 24,
  },
});

export default BarrCodeId;
