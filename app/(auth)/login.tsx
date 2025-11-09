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
import { styles } from "../../styles/auth";
import { useTheme } from "@react-navigation/native";
import { useLoginMutation } from "@/components/redux/apis/authApi";
import Toast from "react-native-toast-message";

const Login: FC = () => {
  const router = useRouter();

  const [userData, setUserData] = useState({
    email: "",
    password: "",
  });

  const { colors } = useTheme();

  const [login, { isLoading: isLoggingIn }] = useLoginMutation();

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
    const { email, password } = userData;

    if (!email || !password) return;

    login({ email, password })
      .unwrap()
      .then((res) => {
        console.log(res);
        Toast.show({ type: "success", text1: res.message });
        router.push('/(tabs)')
      })
      .catch((err) => {
         console.log(err);
        Toast.show({ type: "error", text1: err.message || err.data.message });
      });
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
            title={isLoggingIn ? "Logging in..." : "Login"}
            disabled={isLoggingIn}
            onPress={submitForm}
          ></Button>
        </View>
      </View>
    </View>
  );
};

export default Login;
