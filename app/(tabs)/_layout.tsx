import FontAwesome from "@expo/vector-icons/FontAwesome";
import { Link, Tabs } from "expo-router";
import { Feather, AntDesign, Octicons, Ionicons } from "@expo/vector-icons";
import { Pressable, useColorScheme } from "react-native";
import React from 'react';

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
          borderTopLeftRadius: 25,
          borderTopRightRadius: 25,
          height: 58,
        },
        tabBarActiveTintColor: Colors["light"].tint,
      }}
    >
      <Tabs.Screen
        name="account"
        options={{
          title: "",
          tabBarIcon: ({ color }) => (
            <Feather
              name="user"
              size={22}
              style={{ marginBottom: -3 }}
              color={color}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="donate"
        options={{
          title: "",
          tabBarIcon: ({ color }) => (
            <AntDesign
              name="creditcard"
              size={22}
              style={{ marginBottom: -3 }}
              color={color}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="index"
        options={{
          title: "",
          tabBarIcon: ({ color }) => (
            <Octicons
              name="home"
              size={22}
              style={{ marginBottom: -3 }}
              color={color}
            />
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
          title: "",
          tabBarIcon: ({ color }) => (
            <Ionicons
              name="gift-outline"
              size={22}
              style={{ marginBottom: -3 }}
              color={color}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="map"
        options={{
          title: "",
          tabBarIcon: ({ color }) => (
            <Feather
              name="map"
              size={22}
              style={{ marginBottom: -3 }}
              color={color}
            />
          ),
        }}
      />
    </Tabs>
  );
}
