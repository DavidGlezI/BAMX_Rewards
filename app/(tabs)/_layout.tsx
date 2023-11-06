import React from "react";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import { Link, Tabs } from "expo-router";
import { Feather, AntDesign, Octicons, Ionicons } from "@expo/vector-icons";
import {
  Pressable,
  useColorScheme,
  StyleSheet,
  Dimensions,
  View,
  Text,
  ImageBackground,
} from "react-native";
import { HeaderImage } from "../../components/HeaderImage";
import Colors from "../../constants/Colors";

/**
 * You can explore the built-in icon families and icons on the web at https://icons.expo.fyi/
 */

export default function TabLayout() {
  const colorScheme = useColorScheme();

  return (
    <Tabs
      screenOptions={{
        tabBarStyle: {
          borderTopLeftRadius: 50,
          borderTopRightRadius: 50,
          height: 70,
          paddingBottom: -12,
          justifyContent: "center",
          alignContent: "center",
        },

        tabBarActiveTintColor: Colors["light"].tint,
      }}
    >
      <Tabs.Screen
        name="account"
        options={{
          headerShown: false,

          title: "",
          tabBarIcon: ({ color }) => (
            <Feather name="user" size={22} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="donate"
        options={{
          headerShown: false,
          title: "",
          tabBarIcon: ({ color }) => (
            <AntDesign name="creditcard" size={22} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="home"
        options={{
          headerShown: false,
          title: "",
          tabBarIcon: ({ color }) => (
            <Octicons name="home" size={22} color={color} />
          ),
          headerRight: () => (
            <Link href="/modal" asChild>
              <Pressable>
                {({ pressed }) => (
                  <FontAwesome
                    name="info-circle"
                    size={25}
                    color={Colors[colorScheme ?? "light"].text}
                    style={{ marginRight: 15, opacity: pressed ? 0.5 : 1 }}
                  />
                )}
              </Pressable>
            </Link>
          ),
        }}
      />
      <Tabs.Screen
        name="promotions"
        options={{
          headerShown: false,
          title: "",
          tabBarIcon: ({ color }) => (
            <Ionicons name="gift-outline" size={22} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="map"
        options={{
          headerShown: false,
          title: "",
          tabBarIcon: ({ color }) => (
            <Feather name="map" size={22} color={color} />
          ),
        }}
      />
    </Tabs>
  );
}

const styles = StyleSheet.create({
  headerImage: {
    position: "absolute",
    top: 0,
    zIndex: 1,
    minWidth: Dimensions.get("window").width + 50,
    height: Dimensions.get("window").height / 2.5,
  },
});
