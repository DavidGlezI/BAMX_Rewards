import FontAwesome from "@expo/vector-icons/FontAwesome";
import React from "react";
import { useFonts } from "expo-font";
import { SplashScreen, Stack, Link, router } from "expo-router";
import { useEffect } from "react";
import { AntDesign } from "@expo/vector-icons";
import {
  useColorScheme,
  Dimensions,
  Pressable,
  Image,
  StyleSheet,
} from "react-native";
import Colors from "../constants/Colors";

export {
  // Catch any errors thrown by the Layout component.
  ErrorBoundary,
} from "expo-router";

export const unstable_settings = {
  // Ensure that reloading on `/modal` keeps a back button present.
  initialRouteName: "(tabs)",
};

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const [loaded, error] = useFonts({
    SpaceMono: require("../assets/fonts/SpaceMono-Regular.ttf"),
    ...FontAwesome.font,
  });

  // Expo Router uses Error Boundaries to catch errors in the navigation tree.
  useEffect(() => {
    if (error) throw error;
  }, [error]);

  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync();
    }
  }, [loaded]);

  if (!loaded) {
    return null;
  }

  return <RootLayoutNav />;
}

function RootLayoutNav() {
  const colorScheme = useColorScheme();

  return (
    <Stack>
      <Stack.Screen name="index" options={{ headerShown: false }} />
      <Stack.Screen name="login" options={{ headerShown: false }} />
      <Stack.Screen name="register" options={{ headerShown: false }} />
      <Stack.Screen
        name="(tabs)"
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="modifydata"
        options={{
          title: "Modificar Datos",
          headerLeft: () => (
            <Pressable onPress={() => router.back()}>
              <AntDesign name="arrowleft" size={24} color="black" />
            </Pressable>
          ),
        }}
      />
    </Stack>
  );
}
const styles = StyleSheet.create({
  headerImage: {
    minWidth: Dimensions.get("window").width,
    height: 50,
  },
});
