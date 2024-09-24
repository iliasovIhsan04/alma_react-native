import store from "@/Redux/reducer/store";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Stack, useRouter } from "expo-router";
import React, { useEffect, useState } from "react";
import { Provider } from "react-redux";

export default function RootLayout() {
  const [token, setToken] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

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
        <Stack.Screen name="details/HarryDetailsId/[id]" />
        <Stack.Screen name="details/PromotionId/[id]" />
        <Stack.Screen name="details/ProductId/[id]" />
        <Stack.Screen name="details/PurchaseId/[id]" />
        <Stack.Screen name="navigate/Notifications" />
        <Stack.Screen name="navigate/BasketPage" />
        <Stack.Screen name="navigate/PlacingOrder" />
        <Stack.Screen name="auth/Registration" />
        <Stack.Screen name="auth/ForgotPassword" />
        <Stack.Screen name="auth/ResetPassword" />
        <Stack.Screen name="auth/Login" />
        <Stack.Screen name="auth/Activation" />
        <Stack.Screen name="auth/ActivationForgot" />
      </Stack>
    </Provider>
  );
}
