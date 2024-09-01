import React, { useEffect, useState } from "react";
import { Image, StyleSheet, Text, View } from "react-native";
import axios from "axios";
interface CatalogItem {
  id: number;
  name: string;
  image: string;
  price: number;
  description: string;
  count: number;
  qrimg: string;
  bonus: number;
}

const BonusCart = () => {
  // const [data, setData] = useState<CatalogItem[]>([]);
  // const api = "https://alma-market.online/card/type/one/auth/user-info";

  // useEffect(() => {
  //   const fetchUserData = async () => {
  //     try {
  //       const response = await axios.get<CatalogItem[]>(api);
  //       setData(response.data);
  //     } catch (error) {
  //       console.error("Error fetching data:", error);
  //     }
  //   };

  //   fetchUserData();
  // }, []);

  return (
    <View style={styles.bonus_block}>
      <View style={{ flexDirection: "column", marginLeft: 10 }}>
        <Text style={styles.bonus}>0</Text>
        <Text style={styles.bonus_text}>бонусов</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  bonus_block: {
    flexDirection: "row",
    alignItems: "center",
    height: 168,
    backgroundColor: "#DC0200",
    borderRadius: 16,
    padding: 10,
    marginTop: 30,
    marginBottom: 12,
  },
  bonus: {
    fontSize: 20,
    color: "#FFFFFF",
    fontWeight: "700",
  },
  bonus_text: {
    fontSize: 18,
    color: "#FFFFFF",
    fontWeight: "600",
  },
});

export default BonusCart;
