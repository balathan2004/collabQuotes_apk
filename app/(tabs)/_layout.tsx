import { useRouter, useSegments } from "expo-router";
import { Tabs } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import React from "react";

export default function Layout() {
  return (
    <Tabs
      screenOptions={({ route }) => ({
        headerShown: false,
        BarActiveTintColor: "tomato",
        tabBarInactiveTintColor: "gray",
        tabBarStyle: {
          backgroundColor: "white",
          height: 60,
        },
      })}
    >
      <Tabs.Screen
        name="index"
        options={{
          tabBarLabel: "Blog",
        }}
      />
      <Tabs.Screen
        name="account"
        options={{
          tabBarLabel: "Account",
        }}
      />
      <Tabs.Screen
        name="tweet"
        options={{
          tabBarLabel: "Tweet",
        }}
      />
    </Tabs>
  );
}
