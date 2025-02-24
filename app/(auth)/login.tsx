import React, { FC, useState } from "react";
import {
  View,
  Text,
  TextInput,
  Button,
  NativeSyntheticEvent,
  TextInputChangeEventData,
  Pressable,
} from "react-native";
import { useRouter } from "expo-router";
import { storeData } from "@/components/cred";
import { AuthResponseConfig } from "@/components/interfaces";
import { useLoadingContext } from "@/components/context/loading_context";
import { useReplyContext } from "@/components/context/reply_context";
import { serverUrl } from "@/constants/env";
import { useUserContext } from "@/components/context/usercred_context";
import { styles } from "../../styles/auth";
import { useTheme } from "@react-navigation/native";

const Login: FC = () => {
  const router = useRouter();

  const [userData, setUserData] = useState({
    email: "",
    password: "",
  });

  const { setReply } = useReplyContext();
  const { isLoading, setIsLoading } = useLoadingContext();
  const { setUserCred } = useUserContext();
  const { colors } = useTheme();

  const handleInput =
    (key: string) =>
    (event: NativeSyntheticEvent<TextInputChangeEventData>) => {
      const inputValue = event.nativeEvent.text;

      setUserData((prevData) => ({
        ...prevData,
        [key]: inputValue.trim(),
      }));
    };

  const submitForm = async () => {
    if (userData.email && userData.password) {
      setIsLoading(true);
      const response = await fetch(`${serverUrl}/auth/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },

        body: JSON.stringify(userData),
      });
      const res = (await response.json()) as AuthResponseConfig;
      setIsLoading(false);
      setReply(res.message);
      if (res) {
        if (res.status == 200) {
          await storeData("login_cred", res.credentials)
            .then(() => {
              console.log("value stored");
              setUserCred(res.credentials);
            })
            .catch((err) => console.log("error saving"));
          router.push("/(tabs)");
        }
      }
    } else {
      setReply("field missing");
    }
  };

  return (
    <View style={styles.auth_container}>
      <View>
        <Text style={[styles.title, { color: colors.text }]}>
          Collab Quotes
        </Text>
        <Text style={[styles.title, { color: colors.text }]}>Login Page</Text>
        <View style={styles.input_container}>
          <Text style={[styles.label, { color: colors.text }]}>
            Enter email
          </Text>
          <TextInput
            onChange={handleInput("email")}
            placeholder="Enter email"
            style={[
              styles.input,
              { color: colors.text, borderColor: colors.text },
            ]}
            placeholderTextColor={colors.text}
            autoCapitalize="none" // To prevent auto-capitalization
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
            autoCapitalize="none" // To prevent auto-capitalization
          />
        </View>
        <Pressable
          onPress={() => {
            router.push("/(auth)/register");
          }}
        >
          <Text style={[styles.forget_password, { color: colors.text }]}>
            Create new account
          </Text>
        </Pressable>

        <View style={styles.button}>
          <Button
            title={isLoading ? "Logging in..." : "Login"}
            disabled={isLoading}
            onPress={submitForm}
          ></Button>
        </View>
      </View>
    </View>
  );
};

export default Login;
