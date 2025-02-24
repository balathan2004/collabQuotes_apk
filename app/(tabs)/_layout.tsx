import { Tabs } from "expo-router";
import Ionicons from "@expo/vector-icons/Ionicons";
import React from "react";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import Octicons from "@expo/vector-icons/Octicons";
import { useColorScheme } from "@/hooks/useColorScheme.web";
import { useTheme } from "@react-navigation/native";
export default function Layout() {
  const colorTheme = useColorScheme();

  const colors = useTheme();

  return (
    <Tabs
      screenOptions={({ route }) => ({
        headerShown: false,
        BarActiveTintColor: "tomato",
        tabBarInactiveTintColor: "gray",
        tabBarHideOnKeyboard: true,
        tabBarStyle: {
          backgroundColor: colorTheme === "dark" ? "#000000" : "#ffffff",
          height: 60,
        },
      })}
    >
      <Tabs.Screen
        name="index"
        options={{
          tabBarLabel: "Blog",
          tabBarIcon: () => (
            <Octicons
              name="feed-discussion"
              size={24}
              color={colors.colors.text}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="account"
        options={{
          tabBarLabel: "Account",
          tabBarIcon: () => (
            <MaterialCommunityIcons
              name="account"
              size={24}
              color={colors.colors.text}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="tweet"
        options={{
          tabBarLabel: "Tweet",
          tabBarIcon: () => (
            <Ionicons name="send" size={24} color={colors.colors.text} />
          ),
        }}
      />
    </Tabs>
  );
}
