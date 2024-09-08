import React, { useState } from "react";
import {
  Image,
  Modal,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  FlatList,
  TextInput,
  Switch,
  ScrollView,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { stylesAll } from "../(tabs)/style";
import { router } from "expo-router";
import AsyncStorage from "@react-native-async-storage/async-storage";

interface MyDetailsItem {
  title: string;
  value: string;
  selected: boolean;
  modalType: string;
}

const dataSelect = {
  language: [{ value: "Кыргызча" }, { value: "Русский" }],
  gender: [{ value: "Мужской" }, { value: "Женский" }],
  married: [{ value: "Холост/не замужем" }, { value: "Женат/замужем" }],
  social_status: [
    { value: "Студент" },
    { value: "Пенсионер" },
    { value: "Сотрудник частной компании" },
    { value: "Безработный" },
    { value: "Частный предприниматель" },
    { value: "Другое" },
  ],
  city_accommodation: [
    { value: "Бишкек" },
    { value: "Кант" },
    { value: "Токмок" },
    { value: "Чолпон-ата" },
    { value: "Кара-Балта" },
    { value: "Сокулук" },
    { value: "Бостери" },
    { value: "Балыкчы" },
    { value: "Белеводское" },
    { value: "Ош" },
    { value: "Каракол" },
    { value: "Базар-Коргон" },
    { value: "Другой город" },
  ],
};

const placeholderLabels = {
  city_accommodation: "город",
  language: "язык",
  gender: "пол",
  married: "семейное положение",
  social_status: "социальный статус",
};

const MyDetails = () => {
  const [selected, setSelected] = useState({
    city: "",
    language: "",
    gender: "",
    married: "",
    social_status: "",
  });
  const [modalType, setModalType] = useState<string | null>(null);
  const [isModalVisible, setModalVisible] = useState(false);
  const [isPetONe, setIsPetOne] = useState(false);
  const [isPetTwo, setIsPetTwo] = useState(false);

  const openModal = (type: string) => {
    setModalType(type);
    setModalVisible(true);
  };

  const closeModal = () => {
    setModalVisible(false);
  };

  const selectOption = (value: string) => {
    if (modalType) {
      setSelected((prev) => ({
        ...prev,
        [modalType]: value,
      }));
      closeModal();
    }
  };

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

  const renderModalContent = () => {
    if (!modalType) return null;

    const data = dataSelect[modalType as keyof typeof dataSelect];
    const placeholder =
      placeholderLabels[modalType as keyof typeof placeholderLabels];

    return (
      <>
        <Text style={styles.modalTitle}>Выберите {placeholder}</Text>
        <FlatList
          data={data}
          keyExtractor={(item, index) => index.toString()}
          renderItem={({ item }) => (
            <TouchableOpacity
              style={styles.modalItem}
              onPress={() => selectOption(item.value)}
            >
              <Text style={styles.modalItemText}>{item.value}</Text>
            </TouchableOpacity>
          )}
        />
        <TouchableOpacity style={styles.closeButton} onPress={closeModal}>
          <Text style={styles.closeButtonText}>Закрыть</Text>
        </TouchableOpacity>
      </>
    );
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
            {Object.keys(dataSelect).map((key) => (
              <View style={styles.input_block} key={key}>
                <Text style={stylesAll.label}>
                  {key === "city_accommodation"
                    ? "Город проживания"
                    : key === "language"
                    ? "Язык"
                    : key === "gender"
                    ? "Пол"
                    : key === "married"
                    ? "Семейное положение"
                    : "Социальный статус"}
                </Text>
                <TouchableOpacity
                  style={[styles.select_box, stylesAll.input]}
                  onPress={() => openModal(key)}
                >
                  <Text style={styles.selected_text}>
                    {selected[key] ||
                      `Выберите ${
                        key === "city_accommodation"
                          ? "город"
                          : key === "language"
                          ? "язык"
                          : key === "gender"
                          ? "пол"
                          : key === "married"
                          ? "семейное положение"
                          : "социальный статус"
                      }`}
                  </Text>
                  <Ionicons
                    size={24}
                    color="black"
                    style={styles.select_arrow}
                  />
                </TouchableOpacity>
              </View>
            ))}

            <Modal
              visible={isModalVisible}
              animationType="slide"
              transparent={true}
            >
              <View style={styles.modalContainer}>
                <View style={styles.modalContent}>{renderModalContent()}</View>
              </View>
            </Modal>
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

const styles = StyleSheet.create({
  input_block: {
    marginBottom: 20,
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
  selected_text: {
    fontSize: 16,
  },
  select_arrow: {
    marginLeft: 10,
  },
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  modalContent: {
    width: "80%",
    backgroundColor: "#FFFFFF",
    borderRadius: 10,
    padding: 20,
    alignItems: "center",
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 10,
  },
  modalItem: {
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#E0E0E0",
    width: "100%",
  },
  modalItemText: {
    fontSize: 16,
  },
  closeButton: {
    marginTop: 10,
    padding: 10,
    backgroundColor: "#25D366",
    borderRadius: 5,
  },
  closeButtonText: {
    color: "#FFFFFF",
    fontSize: 16,
  },
});

export default MyDetails;
