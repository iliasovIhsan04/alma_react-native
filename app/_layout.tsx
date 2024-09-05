import { useFonts } from "expo-font";
import { Stack } from "expo-router";
import * as SplashScreen from "expo-splash-screen";
import { useEffect } from "react";
import "react-native-reanimated";

SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const [loaded] = useFonts({
    SpaceMono: require("../assets/fonts/SpaceMono-Regular.ttf"),
  });

  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync();
    }
  }, [loaded]);

  if (!loaded) {
    return null;
  }

  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
      <Stack.Screen
        name="/navigate/SettingPage"
        options={{ headerShown: false }}
      />
      <Stack.Screen name="/navigate/ToHelp" options={{ headerShown: false }} />
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
      <Stack.Screen name="/details/:cat" options={{ headerShown: false }} />
      <Stack.Screen
        name="/navigate/HarryBuyDetails"
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="/details/HarryDetailsId/:id"
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
    </Stack>
  );
}
