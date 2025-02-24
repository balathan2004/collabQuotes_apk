import { Tabs } from "expo-router";
import React from "react";
import AntDesign from "@expo/vector-icons/AntDesign";
import FontAwesome5 from "@expo/vector-icons/FontAwesome5";
import Colors from "@/constants/Colors";
import { useColorScheme } from "@/hooks/useColorScheme";
import { useTheme } from "@react-navigation/native";

export default function TabLayout() {
  const colorScheme = useColorScheme();
  const { colors } = useTheme();

  return (
    <Tabs
      screenOptions={({ route }) => ({
        tabBarActiveTintColor: Colors[colorScheme ?? "light"].border,
        headerShown: false,
        tabBarHideOnKeyboard: true,
        tabBarStyle: route.name === "wait_verify" ? { display: "none" } : {},
      })}
    >
      <Tabs.Screen
        name="login"
        options={{
          title: "Login",
          tabBarIcon: ({ color }) => (
            <AntDesign name="login" size={24} color={colors.text} />
          ),
        }}
      />

      <Tabs.Screen
        name="register"
        options={{
          title: "Register",
          tabBarIcon: ({ color }) => (
            <FontAwesome5 name="user-edit" size={24} color={colors.text} />
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
