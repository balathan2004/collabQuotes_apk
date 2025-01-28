import React, { FC, useState } from "react";
import {
  SafeAreaView,
  View,
  Text,
  TextInput,
  Button,
  NativeSyntheticEvent,
  TextInputChangeEventData,
  Pressable,
} from "react-native";
import { useRouter } from "expo-router";
import { styles } from "../../styles/auth";
import { serverUrl } from "@/constants/env";
import { useReplyContext } from "@/components/context/reply_context";
import { ResponseConfig } from "@/components/interfaces";
import { useTheme } from "@react-navigation/native";

const SignUp: FC = () => {
  const [userData, setUserData] = useState({
    email: "",
    password: "",
  });

  const { setReply } = useReplyContext();
  const { colors } = useTheme();
  const router = useRouter();
  const handleInput =
    (key: string) =>
    (event: NativeSyntheticEvent<TextInputChangeEventData>) => {
      const inputValue = event.nativeEvent.text;

      setUserData((prevData) => ({
        ...prevData,
        [key]: inputValue,
      }));
    };

  const submitForm = async () => {
    if (userData.email && userData.password) {
      const response = await fetch(`${serverUrl}/auth/register`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },

        body: JSON.stringify(userData),
      });
      const res = (await response.json()) as ResponseConfig;
      if (res) {
        setReply(res.message);
        if (res.status == 200) {
          router.push("/(auth)/wait_verify");
        }
      }
    }
  };

  return (
    <View style={styles.auth_container}>
      <View>
        <Text style={[styles.title, { color: colors.text }]}>
          Collab Quotes
        </Text>
        <Text style={[styles.title, { color: colors.text }]}>SignUp Page</Text>
        <View style={styles.input_container}>
          <Text style={[styles.label, { color: colors.text }]}>
            Enter email
          </Text>
          <TextInput
            onChange={handleInput("email")}
            style={[
              styles.input,
              { color: colors.text, borderColor: colors.text },
            ]}
            placeholderTextColor={colors.text}
            placeholder="Enter email"
            keyboardType="email-address"
            autoCapitalize="none" // To prevent auto-capitalization
            autoComplete="email"
          />
        </View>
        <View style={styles.input_container}>
          <Text style={[styles.label, { color: colors.text }]}>
            Enter password
          </Text>
          <TextInput
            onChange={handleInput("password")}
            style={[
              styles.input,
              { color: colors.text, borderColor: colors.text },
            ]}
            placeholderTextColor={colors.text}
            placeholder="Enter password"
            keyboardType="visible-password"
            autoCapitalize="none" // To prevent auto-capitalization
            autoComplete="password"
          />
        </View>
        <Pressable
          onPress={() => {
            router.push("/(auth)/login");
          }}
        >
          <Text style={[styles.forget_password, { color: colors.text }]}>
            Login here
          </Text>
        </Pressable>
        <View style={styles.button}>
          <Button title="Signup" onPress={submitForm}></Button>
        </View>
      </View>
    </View>
  );
};

export default SignUp;
