import axios from "axios";
import React, { useEffect, useState } from "react";
import { View, TouchableOpacity, StyleSheet, Image, Text } from "react-native";

interface CatalogItem {
  color: string;
  img: string;
  name: string;
}

const CatalogPage = () => {
  const [data, setData] = useState<CatalogItem[]>([]);

  const api = "https://alma-market.online/product/categories";

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await axios.get<CatalogItem[]>(api);
        setData(response.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchUserData();
  }, []);

  return (
    <View style={styles.shop_block}>
      {data.map((item) => (
        <TouchableOpacity
          style={[styles.shop_box, { backgroundColor: item.color }]}
        >
          <Text style={styles.shop_text}>{item.name}</Text>
          <Image style={styles.image_shop} source={{ uri: item.img }} />
        </TouchableOpacity>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  shop_block: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
    gap: 10,
    marginTop: 30,
  },
  shop_box: {
    width: "48%",
    height: 140,
    borderRadius: 16,
    position: "relative",
    padding: 12,
  },
  image_shop: {
    width: 100,
    height: 100,
    position: "absolute",
    right: 0,
    bottom: 0,
    objectFit: "cover",
    borderBottomRightRadius: 16,
  },
  shop_text: {
    fontSize: 14,
    fontWeight: "700",
    lineHeight: 14,
  },
});

export default CatalogPage;
