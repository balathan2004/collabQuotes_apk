import React, { Component } from "react";
import { View, Text } from "react-native";
import { styles } from "@/styles/global";
import { useTheme } from "@react-navigation/native";

interface Props {
  value: string;
}

export default function Snackbar({ value }: Props) {
  const { colors } = useTheme();
  return (
    <View style={[styles.snack_bar]}>
      <Text style={[styles.snack_bar_text]}>{value}</Text>
    </View>
  );
}
