import { AppDispatch, RootState } from "@/Redux/reducer/store";
import { fetchUserInfo } from "@/Redux/reducer/UserInfo";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { router } from "expo-router";
import React, { useEffect, useState } from "react";
import { Image, Pressable, StyleSheet, Text, View } from "react-native";
import { useDispatch, useSelector } from "react-redux";

const BonusCart = () => {
  const dispatch: AppDispatch = useDispatch();
  const [token, setToken] = useState<string | null>(null);

  const getToken = async (): Promise<void> => {
    try {
      const storedToken = await AsyncStorage.getItem("tokenActivation");
      setToken(storedToken);
    } catch (error) {
      console.error("Error retrieving token:", error);
      setToken(null);
    }
  };

  useEffect(() => {
    const loadUserInfo = async () => {
      await getToken();
      if (token) {
        dispatch(fetchUserInfo());
      }
    };

    loadUserInfo();
  }, [dispatch, token]);

  const data = useSelector((state: RootState) => state.users);
  const user = data?.user;

  return (
    <>
      {token && user ? (
        <Pressable
          style={styles.bonus_block}
          onPress={() => router.push("/(tabs)/qrCode")}
        >
          <View style={{ flexDirection: "column", marginLeft: 10 }}>
            <Text style={styles.bonus}>{user.bonus}</Text>
            <Text style={styles.bonus_text}>бонусов</Text>
          </View>
          <View style={styles.bonus_image_box}>
            <Image style={styles.bonus_img} source={{ uri: user.qrimg }} />
          </View>
        </Pressable>
      ) : null}
    </>
  );
};

const styles = StyleSheet.create({
  bonus_block: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
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
  bonus_image_box: {
    width: 150,
    height: "100%",
    borderRadius: 10,
    overflow: "hidden",
  },
  bonus_img: {
    width: "100%",
    height: "100%",
    objectFit: "cover",
  },
});

export default BonusCart;
