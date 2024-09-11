import store from "@/Redux/reducer/store";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Stack } from "expo-router";
import React, { createContext, useContext, useEffect, useState } from "react";
import { Provider } from "react-redux";

type CartItem = {
  id: number;
};

const CartContext = createContext<{
  saveToLocalStorage: (id: number) => Promise<void>;
} | null>(null);

export default function RootLayout() {
  const [token, setToken] = useState<string | null>(null);
  const [cart, setCart] = useState<CartItem[]>([]);

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

  const saveToLocalStorage = async (id: number): Promise<void> => {
    try {
      const itemToAdd = { id };
      let updatedCart = [...cart];

      if (updatedCart.some((item) => item.id === id)) {
        updatedCart = updatedCart.filter((item) => item.id !== id);
        await AsyncStorage.removeItem(`activeItem_${id}`);
      } else {
        updatedCart.push(itemToAdd);
        await AsyncStorage.setItem(`activeItem_${id}`, `${id}`);
      }

      setCart(updatedCart);
      await AsyncStorage.setItem("cart", JSON.stringify(updatedCart));
    } catch (error) {
      console.error("Error saving to AsyncStorage:", error);
    }
  };

  return (
    <Provider store={store}>
      <CartContext.Provider value={{ saveToLocalStorage }}>
        <Stack screenOptions={{ headerShown: false }}>
          {token ? (
            <>
              <Stack.Screen
                key="tabs"
                name="(tabs)"
                options={{ headerShown: false }}
              />
              <Stack.Screen
                key="settingPage"
                name="/navigate/SettingPage"
                options={{ headerShown: false }}
              />
              <Stack.Screen
                key="toHelp"
                name="/navigate/ToHelp"
                options={{ headerShown: false }}
              />
              <Stack.Screen
                key="aboutTheApplication"
                name="/navigate/AboutTheApplication"
                options={{ headerShown: false }}
              />
              <Stack.Screen
                key="purchaseHistory"
                name="/navigate/PurchaseHistory"
                options={{ headerShown: false }}
              />
              <Stack.Screen
                key="featuredProducts"
                name="/navigate/FeaturedProducts"
                options={{ headerShown: false }}
              />
              <Stack.Screen
                key="myDetails"
                name="/navigate/MyDetails"
                options={{ headerShown: false }}
              />
              <Stack.Screen
                key="categoryDetails"
                name="/details/:cat"
                options={{ headerShown: false }}
              />
              <Stack.Screen
                key="harryBuyDetails"
                name="/navigate/HarryBuyDetails"
                options={{ headerShown: false }}
              />
              <Stack.Screen
                key="promotionDetails"
                name="/navigate/PromotionDetails"
                options={{ headerShown: false }}
              />
              <Stack.Screen
                key="harryDetailsId"
                name="/details/HarryDetailsId/:id"
                options={{ headerShown: false }}
              />
              <Stack.Screen
                key="promotionId"
                name="/details/PromotionId/:id"
                options={{ headerShown: false }}
              />
              <Stack.Screen
                key="productId"
                name="/details/ProductId/:id"
                options={{ headerShown: false }}
              />
              <Stack.Screen
                key="notifications"
                name="/navigate/Notifications"
                options={{ headerShown: false }}
              />
              <Stack.Screen
                key="basketProducts"
                name="/navigate/BasketProducts"
                options={{ headerShown: false }}
              />
              <Stack.Screen
                key="login"
                name="/auth/Login"
                options={{ headerShown: false }}
              />
              <Stack.Screen
                key="forgotPassword"
                name="/auth/ForgotPassword"
                options={{ headerShown: false }}
              />
              <Stack.Screen
                key="forgotActivationCode"
                name="/auth/ForgotActivationCode"
                options={{ headerShown: false }}
              />
              <Stack.Screen
                key="resetPassword"
                name="/auth/ResetPassword"
                options={{ headerShown: false }}
              />
            </>
          ) : (
            <Stack.Screen
              key="registration"
              name="/auth/Registration"
              options={{ headerShown: false }}
            />
          )}
        </Stack>
      </CartContext.Provider>
    </Provider>
  );
}

// Хук для использования функции saveToLocalStorage
export const useCartContext = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error("useCartContext must be used within a CartProvider");
  }
  return context;
};
