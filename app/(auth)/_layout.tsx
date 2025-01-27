import { Tabs } from "expo-router";
import React from "react";
import { Platform } from "react-native";
import AntDesign from "@expo/vector-icons/AntDesign";
import FontAwesome5 from "@expo/vector-icons/FontAwesome5";
import { Colors } from "@/constants/Colors";
import { useColorScheme } from "@/hooks/useColorScheme";

export default function TabLayout() {
  const colorScheme = useColorScheme();

  return (
    <Tabs
      screenOptions={({ route }) => ({
        tabBarActiveTintColor: Colors[colorScheme ?? "light"].tint,
        headerShown: false,
        // Dynamically hide the tab bar for specific screens
        tabBarStyle: route.name === "wait_verify" ? { display: "none" } : {},
      })}
    >
      <Tabs.Screen
        name="login"
        options={{
          title: "Login",
          tabBarIcon: ({ color }) => (
            <AntDesign name="login" size={24} color="black" />
          ),
        }}
      />

      <Tabs.Screen
        name="register"
        options={{
          title: "Register",
          tabBarIcon: ({ color }) => (
            <FontAwesome5 name="user-edit" size={24} color="black" />
          ),
        }}
      />

      <Tabs.Screen
        name="wait_verify"
        options={{
          href: null,
        }}
      />
    </Tabs>
  );
}
