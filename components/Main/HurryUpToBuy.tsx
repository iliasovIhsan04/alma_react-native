import axios from "axios";
import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Image,
} from "react-native";

interface HarryBuy {
  id: number;
  title: string;
  net: string;
  where: string;
}

const HurryUpToBuy = () => {
  const [data, setData] = useState<HarryBuy[]>([]);

  const api = "https://alma-market.online/card/type/one";

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await axios.get<HarryBuy[]>(api);
        setData(response.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchUserData();
  }, []);

  console.log(data);

  return (
    <>
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "space-between",
          marginTop: 30,
          marginBottom: 10,
        }}
      >
        <Text style={styles.prom_text}>Успей купить</Text>
        <TouchableOpacity
          style={{ flexDirection: "row", alignItems: "center" }}
        >
          <Text>Все</Text>
          <View style={styles.back_btn}>
            <Image
              style={{ width: 24, height: 24 }}
              source={require("../../assets/images/moreRight.png")}
            />
          </View>
        </TouchableOpacity>
      </View>
      <ScrollView
        horizontal={true}
        showsVerticalScrollIndicator={false}
        showsHorizontalScrollIndicator={false}
      >
        <View style={{ gap: 10, flexDirection: "row" }}>
          {data.map((item) => (
            <View key={item.id} style={styles.harry_block}>
              <View style={{ flexDirection: "row", gap: 10 }}>
                <View style={styles.block_red}></View>
                <View style={styles.title_text_box}>
                  <Text style={styles.harry_title} numberOfLines={2}>
                    {item.title}
                  </Text>
                  <Text style={styles.harry_net_text}>{item.net}</Text>
                  <Text style={styles.harry_where_text}>{item.where}</Text>
                </View>
              </View>
            </View>
          ))}
        </View>
      </ScrollView>
    </>
  );
};

const styles = StyleSheet.create({
  harry_block: {
    width: 260,
    height: 260,
    borderRadius: 20,
    borderColor: "#DC0200",
    borderWidth: 2,
    padding: 10,
  },
  block_red: {
    width: "28%",
    height: 70,
    borderRadius: 50,
    backgroundColor: "#DC0200",
  },
  title_text_box: {
    width: "68%",
  },
  harry_title: {
    fontSize: 12,
    fontWeight: "700",
    color: "#191919",
    overflow: "hidden",
    marginBottom: 0,
  },
  harry_net_text: {
    fontSize: 14,
    fontWeight: 400,
    color: "#6B6B6B",
    lineHeight: 16,
  },
  harry_where_text: {
    fontSize: 11,
    fontWeight: "400",
    color: "#68B936",
  },
  back_btn: {
    width: 24,
    height: 24,
  },
  prom_text: {
    fontSize: 20,
    fontWeight: "700",
    color: "#191919",
  },
});

export default HurryUpToBuy;
