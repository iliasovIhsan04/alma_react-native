import { url } from "@/Api";
import { stylesAll } from "@/style";
import axios from "axios";
import { router } from "expo-router";
import React, { useEffect, useState } from "react";
import {
  View,
  Image,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  ActivityIndicator,
} from "react-native";

type Location = {
  address: string;
};

const ProductGiven = () => {
  const [locations, setLocations] = useState<Location[]>([]);
  const [barCodeInput, setBarCodeInput] = useState(false);
  const [barrcode, setBarrCode] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios
      .get(url + "/map")
      .then((response) => {
        setLocations(response.data);
        setLoading(false);
      })
      .catch((error) => {
        console.log(error);
        setLoading(false);
      });
  }, []);

  const opendate = () => {
    setBarCodeInput(true);
  };

  return (
    <View style={stylesAll.background_block}>
      <View style={stylesAll.container}>
        <View style={stylesAll.header}>
          <TouchableOpacity
            style={stylesAll.header_back_btn}
            onPress={() => router.push("/")}
          >
            <Image
              style={{ width: 24, height: 24 }}
              source={require("../../assets/images/moreLeft.png")}
            />
          </TouchableOpacity>
          <Text style={stylesAll.header_name}>Выберите адрес магазина</Text>
          <View style={stylesAll.header_back_btn}></View>
        </View>
        {loading ? (
          <View style={stylesAll.loading_catalog_page}>
            <ActivityIndicator color="red" size="small" />
          </View>
        ) : (
          <View style={styles.list_block}>
            {locations.map((el, id) => (
              <TouchableOpacity
                key={id}
                style={styles.list_item}
                onPress={() => opendate()}
              >
                <View style={{ flexDirection: "row", gap: 4 }}>
                  <Image
                    style={{ width: 30, height: 30 }}
                    source={require("../../assets/images/maps.png")}
                  />
                  <Text style={styles.address_text}>{el.address}</Text>
                </View>
                <View
                  style={{ flexDirection: "row", alignItems: "center", gap: 4 }}
                >
                  <Image
                    style={{ width: 30, height: 30 }}
                    source={require("../../assets/images/timer.png")}
                  />
                  <Text style={styles.work_text}>
                    График работы:
                    <Text style={styles.around_the_block}>Круглосуточно</Text>
                  </Text>
                </View>
              </TouchableOpacity>
            ))}
            {barCodeInput && (
              <View>
                <TextInput
                  style={[stylesAll.input, styles.input_box]}
                  placeholder="Напишите номер товара"
                  placeholderTextColor={"#6B6B6B"}
                  keyboardType="numeric"
                  value={barrcode}
                  onChangeText={(text) => setBarrCode(text)}
                />
                <TouchableOpacity
                  style={[stylesAll.button, styles.barrcode_btn]}
                  onPress={() => router.push(`/details/BarrCodeId/${barrcode}`)}
                >
                  <Text style={stylesAll.button_text}> Поиск...</Text>
                </TouchableOpacity>
              </View>
            )}
          </View>
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  barrcode_btn: {
    marginTop: 20,
  },
  input_box: {
    backgroundColor: "#F5F7FA",
  },
  list_block: {
    marginTop: 30,
  },
  list_item: {
    width: "100%",
    minHeight: 100,
    backgroundColor: "#F5F7FA",
    borderRadius: 14,
    marginBottom: 10,
    padding: 16,
    flexDirection: "column",
    justifyContent: "space-between",
    gap: 8,
  },
  address_text: {
    fontSize: 16,
    fontWeight: "600",
    color: "#191919",
    width: "90%",
  },
  work_text: {
    fontSize: 14,
    fontWeight: "400",
    color: "#6B6B6B",
  },
  around_the_block: {
    fontSize: 16,
    fontWeight: "500",
    color: "#68B936",
    marginLeft: 5,
  },
});

export default ProductGiven;
