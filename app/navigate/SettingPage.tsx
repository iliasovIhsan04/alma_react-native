import React from "react";
import {
  Image,
  Pressable,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { stylesAll } from "../(tabs)/style";
import { router } from "expo-router";

const SettingPage = () => {
  return (
    <View style={styles.settings_block}>
      <View style={stylesAll.container}>
        <View style={styles.header}>
          <TouchableOpacity
            style={styles.header_back_btn}
            onPress={() => router.push("/(tabs)/profile")}
          >
            <Image
              style={{ width: 24, height: 24 }}
              source={require("../../assets/images/moreLeft.png")}
            />
          </TouchableOpacity>
          <Text style={stylesAll.header_name}>Настройки</Text>
          <View style={styles.header_back_btn}></View>
        </View>
        <View style={styles.settings_cart_block}>
          <View style={styles.settings_box}>
            <View
              style={{
                flexDirection: "column",
                gap: 6,
                width: 240,
              }}
            >
              <Text style={styles.setting_notifications}>Уведомления</Text>
              <Text style={styles.setting_notifications_text}>
                Получайте уведомления об акциях и социальных предложениях
              </Text>
            </View>
            <View style={styles.settings_radio}></View>
          </View>
          <View style={styles.settings_box}>
            <View
              style={{
                flexDirection: "column",
                gap: 6,
                width: 240,
              }}
            >
              <Text style={styles.setting_notifications}>Автояркость</Text>
              <Text style={styles.setting_notifications_text}>
                Автояркость нужна для корректного считывания шрихкода
              </Text>
            </View>
            <View style={styles.settings_radio}></View>
          </View>
        </View>
        <Pressable style={{ marginTop: 20 }}>
          <Text style={styles.remove_accaunt}>Удалить аккаунт</Text>
        </Pressable>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingTop: 50,
  },
  header_back_btn: {
    width: 30,
    height: 30,
    flexDirection: "row",
    alignItems: "center",
  },
  settings_box: {
    width: "100%",
    minHeight: 90,
    backgroundColor: "#F5F7FA",
    borderRadius: 10,
    padding: 16,
    flexDirection: "row",
    justifyContent: "space-between",
  },
  settings_block: {
    width: "100%",
    height: "100%",
    backgroundColor: "white",
  },
  settings_cart_block: {
    flexDirection: "column",
    gap: 10,
    marginTop: 30,
  },
  setting_notifications: {
    fontSize: 16,
    fontWeight: "700",
    color: "#191919",
  },
  setting_notifications_text: {
    fontSize: 14,
    fontWeight: 400,
    color: "#6B6B6B",
    lineHeight: 16,
  },
  settings_radio: {
    width: 45,
    height: 24,
    backgroundColor: "red",
  },
  remove_accaunt: {
    fontSize: 16,
    fontWeight: "700",
    color: "#DC0200",
  },
});

export default SettingPage;
