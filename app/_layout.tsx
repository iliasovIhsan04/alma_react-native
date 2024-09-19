import store from "@/Redux/reducer/store";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Stack, useRouter } from "expo-router";
import React, { useEffect, useState } from "react";
import { Provider } from "react-redux";
import { ActivityIndicator, View } from "react-native";

export default function RootLayout() {
  const [token, setToken] = useState<string | null>(null);
  const [loading, setLoading] = useState(true); // Для отслеживания состояния загрузки
  const router = useRouter(); // Используем роутер для перенаправления

  const getToken = async (): Promise<void> => {
    try {
      const storedToken = await AsyncStorage.getItem("tokenActivation");
      setToken(storedToken);
    } catch (error) {
      console.error("Error retrieving token:", error);
      setToken(null);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getToken();
  }, []);

  // useEffect(() => {
  //   if (!loading && !token) {
  //     router.replace("/auth/Registration");
  //   }
  // }, [loading, token]);
  // if (loading) {
  //   return (
  //     <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
  //       <ActivityIndicator size="large" color="#0000ff" />
  //     </View>
  //   );
  // }

  return (
    <Provider store={store}>
      <Stack screenOptions={{ headerShown: false }}>
        <Stack.Screen name="(tabs)" />
        <Stack.Screen name="navigate/SettingPage" />
        <Stack.Screen name="navigate/ToHelp" />
        <Stack.Screen name="navigate/AboutTheApplication" />
        <Stack.Screen name="navigate/PurchaseHistory" />
        <Stack.Screen name="navigate/FeaturedProducts" />
        <Stack.Screen name="navigate/MyDetails" />
        <Stack.Screen name="details/[cat]" />
        <Stack.Screen name="navigate/HarryBuyDetails" />
        <Stack.Screen name="navigate/PromotionDetails" />
        <Stack.Screen name="navigate/EmptyAddress" />
        <Stack.Screen name="navigate/NewAddress" />
        <Stack.Screen name="details/HarryDetailsId/:id" />
        <Stack.Screen name="details/PromotionId/:id" />
        <Stack.Screen name="details/ProductId/:id" />
        <Stack.Screen name="navigate/Notifications" />
        <Stack.Screen name="navigate/BasketPage" />
        <Stack.Screen name="navigate/PlacingOrder" />
        <Stack.Screen name="auth/Registration" />
        <Stack.Screen name="auth/forgotpassword" />
        <Stack.Screen name="auth/resetpassword" />
        <Stack.Screen name="auth/login" />
        <Stack.Screen name="auth/activationforgot" />
      </Stack>
    </Provider>
  );
}
