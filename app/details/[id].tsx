import { url } from "@/Api";
import axios from "axios";
import { router, useLocalSearchParams } from "expo-router";
import React, { useEffect, useState } from "react";
import { Image, Text, TouchableOpacity, View } from "react-native";
import { stylesAll } from "../(tabs)/style";

const CatalogDetails = () => {
  const [data, setData] = useState<CatalogItem[]>([]);
  const { cat } = useLocalSearchParams();
  const api = "product/list";

  interface CatalogItem {
    id: number;
    title: string;
    net: string;
    where: string;
  }

  //   useEffect(() => {
  //     const fetchUserData = async () => {
  //       try {
  //         const response = await axios.get<CatalogItem[]>(
  //           `${url}/${api}?cat=${cat}`
  //         );
  //         setData(response.data);
  //       } catch (error) {
  //         console.error("Error fetching data:", error);
  //       }
  //     };
  //     fetchUserData();
  //   }, []);

  return (
    <View style={stylesAll.container}>
      <View style={stylesAll.header}>
        <TouchableOpacity
          style={stylesAll.header_back_btn}
          onPress={() => router.push("/(tabs)/profile")}
        >
          <Image
            style={{ width: 24, height: 24 }}
            source={require("../../assets/images/moreLeft.png")}
          />
        </TouchableOpacity>
        <Text style={stylesAll.header_name}>Каталог товары</Text>
        <View style={stylesAll.header_back_btn}></View>
      </View>
    </View>
  );
};

export default CatalogDetails;
``;
