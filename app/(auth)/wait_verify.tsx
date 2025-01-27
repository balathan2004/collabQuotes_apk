import React from "react";
import { View, Text, Button } from "react-native";
import { styles } from "@/styles/profile";
import { styles as global_style } from "@/styles/global";
import { useTheme } from "@react-navigation/native";
import { router } from "expo-router";

const VerifyMailPage = () => {
  const { colors } = useTheme();

  return (
    <View style={global_style.container}>
      <Text style={[styles.centerText, { color: colors.text }]}>
        Verify Your Email
      </Text>

      <View style={styles.horizontalLine} />
      <View style={styles.content}>
        <Text style={[styles.centerText, { color: colors.text }]}>
          Check Your Inbox
        </Text>
        <Text style={[styles.text, { color: colors.text }]}>
          We have sent a verification link to your email address. Please check
          your inbox and verify your email to continue.
        </Text>
        <View style={global_style.button}>
          <Button
            onPress={() => {
              router.push("/(auth)/login");
            }}
            title="Click Here to Login"
          ></Button>
        </View>
      </View>
    </View>
  );
};

export default VerifyMailPage;
