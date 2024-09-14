import React, { useState } from "react";
import {
  Image,
  ScrollView,
  StyleSheet,
  Switch,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { Dropdown } from "react-native-element-dropdown";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { stylesAll } from "../(tabs)/style";
import { router } from "expo-router";

interface DropdownItem {
  label: string;
  value: string;
}

const data: DropdownItem[] = [
  { label: "Бишкек", value: "Бишкек" },
  { label: "Кант", value: "Кант" },
  { label: "Токмок", value: "Токмок" },
  { label: "Чолпон-ата", value: "Чолпон-ата" },
  { label: "Кара-Балта", value: "Кара-Балта" },
  { label: "Сокулук", value: "Сокулук" },
  { label: "Бостери", value: "Бостери" },
  { label: "Балыкчы", value: "Балыкчы" },
  { label: "Белеводское", value: "Белеводское" },
  { label: "Ош", value: "Ош" },
  { label: "Каракол", value: "Каракол" },
  { label: "Базар-Коргон", value: "Базар-Коргон" },
  { label: "Другой город", value: "Другой город" },
];

const gender: DropdownItem[] = [
  { label: "Мужской", value: "Мужской" },
  { label: "Женский", value: "Женский" },
];
const language = [
  { label: "Кыргызча", value: "Кыргызча" },
  { label: "Русский", value: "Русский" },
];
const married = [
  { label: "Холост/не замужем", value: "Холост/не замужем" },
  { label: "Женат/замужем", value: "Женат/замужем" },
];

const DropdownComponent = () => {
  const [isFocus, setIsFocus] = useState(false);
  const [isPetONe, setIsPetOne] = useState(false);
  const [isPetTwo, setIsPetTwo] = useState(false);
  const [genderValue, setGenderValue] = useState(null);
  const [languageValue, setLanguageValue] = useState(null);
  const [marriedValue, setMarriedValue] = useState(null);
  const [cityValue, setCityValue] = useState(null);

  const toggleSwitchONe = async () => {
    const newValue = !isPetONe;
    setIsPetOne(newValue);
    try {
      if (newValue) {
        await AsyncStorage.setItem(
          "Toggle_block_one",
          JSON.stringify(newValue)
        );
      } else {
        await AsyncStorage.removeItem("Toggle_block_one");
      }
    } catch (error) {
      console.error("Failed to update switch state in AsyncStorage:", error);
    }
  };

  const toggleSwitchTwo = async () => {
    const newValue = !isPetTwo;
    setIsPetTwo(newValue);
    try {
      if (newValue) {
        await AsyncStorage.setItem(
          "Toggle_block_two",
          JSON.stringify(newValue)
        );
      } else {
        await AsyncStorage.removeItem("Toggle_block_two");
      }
    } catch (error) {
      console.error("Failed to save switch state to AsyncStorage:", error);
    }
  };

  return (
    <View style={stylesAll.background_block}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        showsHorizontalScrollIndicator={false}
      >
        <View style={stylesAll.container}>
          <View style={stylesAll.header}>
            <TouchableOpacity
              style={stylesAll.header_back_btn}
              onPress={() => router.back()}
            >
              <Image
                style={{ width: 24, height: 24 }}
                source={require("../../assets/images/moreLeft.png")}
              />
            </TouchableOpacity>
            <Text style={stylesAll.header_name}>Мои данные</Text>
            <View style={stylesAll.header_back_btn}></View>
          </View>
          <View style={stylesAll.input_block_all}>
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
            <View style={styles.input_block}>
              <Text style={stylesAll.label}>Дата рождения</Text>
              <TextInput
                style={[stylesAll.input, styles.input_box]}
                placeholder="Номер телефона"
                keyboardType="phone-pad"
              />
            </View>
            <View style={styles.input_block}>
              <Text style={stylesAll.label}>Пол</Text>
              <Dropdown
                style={[
                  stylesAll.input,
                  styles.input_box,
                  isFocus && { borderColor: "blue" },
                ]}
                placeholderStyle={styles.placeholderStyle}
                selectedTextStyle={styles.selectedTextStyle}
                inputSearchStyle={styles.inputSearchStyle}
                iconStyle={styles.iconStyle}
                data={gender}
                search
                maxHeight={300}
                labelField="label"
                valueField="value"
                placeholder={!isFocus ? "Выберите пол" : "..."}
                searchPlaceholder="Search..."
                value={genderValue}
                onFocus={() => setIsFocus(true)}
                onBlur={() => setIsFocus(false)}
                onChange={(item) => setGenderValue(item.value)}
              />
            </View>
            <View style={styles.input_block}>
              <Text style={stylesAll.label}>Родной язык</Text>
              <Dropdown
                style={[
                  stylesAll.input,
                  styles.input_box,
                  isFocus && { borderColor: "blue" },
                ]}
                placeholderStyle={styles.placeholderStyle}
                selectedTextStyle={styles.selectedTextStyle}
                inputSearchStyle={styles.inputSearchStyle}
                iconStyle={styles.iconStyle}
                data={language}
                search
                maxHeight={300}
                labelField="label"
                valueField="value"
                placeholder={!isFocus ? "Выберите язык" : "..."}
                searchPlaceholder="Search..."
                value={languageValue}
                onFocus={() => setIsFocus(true)}
                onBlur={() => setIsFocus(false)}
                onChange={(item) => setLanguageValue(item.value)}
              />
            </View>
            <View style={styles.input_block}>
              <Text style={stylesAll.label}>Семейное положение</Text>
              <Dropdown
                style={[
                  stylesAll.input,
                  styles.input_box,
                  isFocus && { borderColor: "blue" },
                ]}
                placeholderStyle={styles.placeholderStyle}
                selectedTextStyle={styles.selectedTextStyle}
                inputSearchStyle={styles.inputSearchStyle}
                iconStyle={styles.iconStyle}
                data={married}
                search
                maxHeight={300}
                labelField="label"
                valueField="value"
                placeholder={!isFocus ? "Выберите семейное положение" : "..."}
                searchPlaceholder="Search..."
                value={marriedValue}
                onFocus={() => setIsFocus(true)}
                onBlur={() => setIsFocus(false)}
                onChange={(item) => setMarriedValue(item.value)}
              />
            </View>
            <View style={styles.input_block}>
              <Text style={stylesAll.label}>Город проживания</Text>
              <Dropdown
                style={[
                  stylesAll.input,
                  styles.input_box,
                  isFocus && { borderColor: "blue" },
                ]}
                placeholderStyle={styles.placeholderStyle}
                selectedTextStyle={styles.selectedTextStyle}
                inputSearchStyle={styles.inputSearchStyle}
                iconStyle={styles.iconStyle}
                data={data}
                search
                maxHeight={300}
                labelField="label"
                valueField="value"
                placeholder={!isFocus ? "Выберите город" : "..."}
                searchPlaceholder="Search..."
                value={cityValue}
                onFocus={() => setIsFocus(true)}
                onBlur={() => setIsFocus(false)}
                onChange={(item) => setCityValue(item.value)}
              />
            </View>
            <View
              style={[
                stylesAll.input,
                styles.input_box,
                {
                  flexDirection: "row",
                  alignItems: "center",
                  justifyContent: "space-between",
                },
              ]}
            >
              <Text>Наличие домашних животных</Text>
              <Switch
                trackColor={{ false: "#3e3e3e", true: "#25D366" }}
                thumbColor={isPetONe ? "#f4f3f4" : "#f4f3f4"}
                ios_backgroundColor="#3e3e3e"
                onValueChange={toggleSwitchONe}
                value={isPetONe}
              />
            </View>
            <View
              style={[
                stylesAll.input,
                styles.input_box,
                {
                  flexDirection: "row",
                  alignItems: "center",
                  justifyContent: "space-between",
                },
              ]}
            >
              <Text>Наличие автомобиля</Text>
              <Switch
                trackColor={{ false: "#3e3e3e", true: "#25D366" }}
                thumbColor={isPetTwo ? "#f4f3f4" : "#f4f3f4"}
                ios_backgroundColor="#3e3e3e"
                onValueChange={toggleSwitchTwo}
                value={isPetTwo}
              />
            </View>
          </View>
        </View>
      </ScrollView>
    </View>
  );
};

export default DropdownComponent;

const styles = StyleSheet.create({
  input_block: {
    flexDirection: "column",
  },
  input_box: {
    backgroundColor: "#F5F7FA",
  },
  select_box: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    height: 50,
    borderRadius: 5,
    backgroundColor: "#FFFFFF",
    borderWidth: 1,
    borderColor: "#E0E0E0",
    paddingHorizontal: 10,
  },
  selectedTextStyle: {
    fontSize: 16,
  },
  placeholderStyle: {
    fontSize: 16,
    color: "#AAAAAA",
  },
  icon: {
    marginRight: 5,
  },
  iconStyle: {
    width: 20,
    height: 20,
  },
  inputSearchStyle: {
    height: 40,
    fontSize: 16,
  },
});
