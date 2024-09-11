import { url } from "@/Api";
import { stylesAll } from "@/app/(tabs)/style";
import axios from "axios";
import { router, useLocalSearchParams } from "expo-router";
import React, { useEffect, useState } from "react";
import {
  ActivityIndicator,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

interface PromotionIdInter {
  id: number;
  title: string;
  img: string;
}

const PromotionId = () => {
  const [harryId, setHarryId] = useState<PromotionIdInter | null>(null);
  const { id } = useLocalSearchParams();

  useEffect(() => {
    console.log(id);
    if (id) {
      const fetchUserData = async () => {
        try {
          const response = await axios.get<PromotionIdInter>(
            `${url}/card/one${id}`
          );
          setHarryId(response.data);
        } catch (error) {
          console.error("Error fetching data:", error);
        }
      };
      fetchUserData();
    }
  }, [id]);

  if (!harryId) {
    return (
      <View style={stylesAll.loading}>
        <ActivityIndicator color="red" size="small" />
      </View>
    );
  }

  return (
    <View style={stylesAll.background_block}>
      <View style={stylesAll.container}>
        <View style={[stylesAll.header, stylesAll.header_nav]}>
          <TouchableOpacity
            style={stylesAll.header_back_btn}
            onPress={() => router.back()}
          >
            <Image
              style={{ width: 24, height: 24 }}
              source={require("../../../assets/images/moreLeft.png")}
            />
          </TouchableOpacity>
          <Text style={stylesAll.header_name}>Акции</Text>
          <View style={stylesAll.header_back_btn}></View>
        </View>
        <View style={styles.promotion_img_box}>
          <Image style={stylesAll.image_all} source={{ uri: harryId.img }} />
        </View>
        <Text>{harryId.title}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  promotion_img_box: {
    width: "100%",
    height: 390,
    borderRadius: 24,
    overflow: "hidden",
  },
});

export default PromotionId;
