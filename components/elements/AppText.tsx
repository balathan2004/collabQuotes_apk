import { useTheme } from "@react-navigation/native";
import React, { Component } from "react";
import { TextProps, Text, TextStyle } from "react-native";

interface AppTextProps extends TextProps {
  children: React.ReactNode;
  style?: TextStyle | TextStyle[];
}

export function AppText({ children, style }: AppTextProps) {
  const { colors } = useTheme();

  return <Text style={[{ color: colors.text }, style]}>{children}</Text>;
}

export function AppCenterText({ children, style }: AppTextProps) {
  const { colors } = useTheme();

  return (
    <Text style={[{ color: colors.text, textAlign: "center" }, style]}>
      {children}
    </Text>
  );
}
