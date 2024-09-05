import React, { useState } from "react";
import {
  Image,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { stylesAll } from "../(tabs)/style";
import { router } from "expo-router";
import { Picker } from "@react-native-picker/picker";

const MyDetails = () => {
  const [selectedCity, setSelectedCity] = useState("");

  const dataSelect = {
    city_accommodation: [
      { city: "--" },
      { city: "Бишкек" },
      { city: "Кант" },
      { city: "Токмок" },
      { city: "Чолпон-ата" },
      { city: "Кара-Балта" },
      { city: "Сокулук" },
      { city: "Бостери" },
      { city: "Балыкчы" },
      { city: "Белеводское" },
      { city: "Ош" },
      { city: "Каракол" },
      { city: "Базар-Коргон" },
      { city: "Другой город" },
    ],
  };
  return (
    <View style={stylesAll.background_block}>
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
          <Text style={stylesAll.header_name}>Мои данные</Text>
          <View style={stylesAll.header_back_btn}></View>
        </View>
        <View style={styles.input_block_all}>
          <View style={styles.input_block}>
            <Text style={stylesAll.label}>Имя</Text>
            <TextInput
              style={[stylesAll.input, styles.input_box]}
              placeholder="Имя"
            />
          </View>
          <View style={styles.input_block}>
            <Text style={stylesAll.label}>Фамилия</Text>
            <TextInput
              style={[stylesAll.input, styles.input_box]}
              placeholder="Фамилия"
            />
          </View>
          <View style={styles.input_block}>
            <Text style={stylesAll.label}>Номер телефона</Text>
            <TextInput
              style={[stylesAll.input, styles.input_box]}
              placeholder="Номер телефона"
              keyboardType="phone-pad"
            />
          </View>
          <Picker
            selectedValue={selectedCity}
            onValueChange={(itemValue) => setSelectedCity(itemValue)}
            style={styles.picker}
          >
            {dataSelect.city_accommodation.map((el, index) => (
              <Picker.Item key={index} label={el.city} value={el.city} />
            ))}
          </Picker>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  picker: {},
  input_block_all: {
    flexDirection: "column",
    gap: 14,
    marginTop: 20,
  },
  input_block: {
    width: "100%",
    flexDirection: "column",
  },
  input_box: {
    backgroundColor: "#F5F7FA",
  },
});

export default MyDetails;
