import { Tabs } from "expo-router";
import React from "react";

import { Image, View } from "react-native";
import { stylesAll } from "./style";

export default function TabLayout() {
  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: "#DC0200",
        headerShown: false,
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: "Главная",
          tabBarIcon: ({ focused }) => (
            <View>
              {focused ? (
                <Image
                  style={{ width: 26, height: 26 }}
                  source={require("../../assets/images/home.png")}
                />
              ) : (
                <Image
                  style={{ width: 26, height: 26 }}
                  source={require("../../assets/images/homeRed.png")}
                />
              )}
            </View>
          ),
        }}
      />
      <Tabs.Screen
        name="catalog"
        options={{
          title: "Каталог",

          tabBarIcon: ({ focused }) => (
            <View>
              {focused ? (
                <Image
                  style={{ width: 26, height: 26 }}
                  source={require("../../assets/images/catalogRed.png")}
                />
              ) : (
                <Image
                  style={{ width: 26, height: 26 }}
                  source={require("../../assets/images/category.png")}
                />
              )}
            </View>
          ),
        }}
      />
      <Tabs.Screen
        name="qrCode"
        options={{
          title: "Карта",
          tabBarIcon: ({ focused }) => (
            <View style={stylesAll.footer_absolute}>
              {focused ? (
                <Image
                  style={{ width: 26, height: 26 }}
                  source={require("../../assets/images/qrCodWhite.png")}
                />
              ) : (
                <Image
                  style={{ width: 26, height: 26 }}
                  source={require("../../assets/images/qrCodWhite.png")}
                />
              )}
            </View>
          ),
        }}
      />
      <Tabs.Screen
        name="map"
        options={{
          title: "Локации",
          tabBarIcon: ({ focused }) => (
            <View>
              {focused ? (
                <Image
                  style={{ width: 26, height: 26 }}
                  source={require("../../assets/images/mapRed.png")}
                />
              ) : (
                <Image
                  style={{ width: 26, height: 26 }}
                  source={require("../../assets/images/map.png")}
                />
              )}
            </View>
          ),
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          title: "Профиль",
          tabBarIcon: ({ focused }) => (
            <View>
              {focused ? (
                <Image
                  style={{ width: 26, height: 26 }}
                  source={require("../../assets/images/profileRed.png")}
                />
              ) : (
                <Image
                  style={{ width: 26, height: 26 }}
                  source={require("../../assets/images/profile.png")}
                />
              )}
            </View>
          ),
        }}
      />
    </Tabs>
  );
}
