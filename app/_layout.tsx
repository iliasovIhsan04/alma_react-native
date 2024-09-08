import store from "@/Redux/reducer/store";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Stack } from "expo-router";
import { useEffect, useState } from "react";
import { Provider } from "react-redux";

export default function RootLayout() {
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
    getToken();
  }, []);

  return (
    <Provider store={store}>
      <Stack screenOptions={{ headerShown: false }}>
        {token ? (
          <>
            <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
            <Stack.Screen
              name="/navigate/SettingPage"
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="/navigate/ToHelp"
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="/navigate/AboutTheApplication"
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="/navigate/PurchaseHistory"
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="/navigate/FeaturedProducts"
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="/navigate/MyDetails"
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="/details/:cat"
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="/navigate/HarryBuyDetails"
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="/navigate/PromotionDetails"
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="/details/HarryDetailsId/:id"
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="/details/PromotionId/:id"
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="/navigate/Notifications"
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="/navigate/BasketProducts"
              options={{ headerShown: false }}
            />
            <Stack.Screen name="/auth/Login" options={{ headerShown: false }} />
            <Stack.Screen
              name="/auth/ForgotPassword"
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="/auth/ForgotActivationCode"
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="/auth/ResetPassword"
              options={{ headerShown: false }}
            />
          </>
        ) : (
          <Stack.Screen
            name="/auth/Registration"
            options={{ headerShown: false }}
          />
        )}
      </Stack>
    </Provider>
  );
}
