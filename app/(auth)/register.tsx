import React, { FC, useState } from "react";
import {
  SafeAreaView,
  View,
  Text,
  TextInput,
  StyleSheet,
  Button,
  NativeSyntheticEvent,
  TextInputChangeEventData,
  Pressable,
} from "react-native";
import { useRouter } from "expo-router";

const SignUp: FC = () => {
  const [userData, setUserData] = useState({
    email: "",
    password: "",
  });

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
      const response = await fetch(
        "https://minimal-blog-ivory.vercel.app/api/auth/signUp",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },

          body: JSON.stringify(userData),
        }
      );
      const res = await response.json();
      if (res) {
        if (res.status == 200) {
        } else {
        }
      }
    }
  };

  return (
    <SafeAreaView style={styles.safearea}>
      <View style={styles.auth_container}>
        <View>
        <Text style={styles.title}>Collab Quotes</Text>
          <Text style={styles.title}>SignUp Page</Text>
          <View style={styles.input_container}>
            <Text style={styles.label}>Enter Email</Text>
            <TextInput
              onChange={handleInput("email")}
              style={styles.input}
              keyboardType="email-address"
              autoCapitalize="none" // To prevent auto-capitalization
              autoComplete="email"
            />
          </View>
          <View style={styles.input_container}>
            <Text style={styles.label}>Enter Password</Text>
            <TextInput
              onChange={handleInput("password")}
              style={styles.input}
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
            <Text style={styles.forget_password}>Create New Account</Text>
          </Pressable>
          <View style={styles.button}>
            <Button title="SignUp" onPress={submitForm}></Button>
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default SignUp;

const styles = StyleSheet.create({
  safearea: {
    marginTop: 50,
    backgroundColor: "inherit",
    position: "relative",
    width: "100%",
    display: "flex",
    height: "100%",
  },
  auth_container: {
    flex: 1,
    display: "flex",
    justifyContent: "center",
    gap: 20,
    paddingBottom: 100,
  },
  input_container: {
    display: "flex",
    width: "75%",
    gap: 5,
    margin: "auto",
  },
  input: {
    height: 40,
    borderWidth: 1,
    borderBlockColor: "black",
    borderRadius: 4,
    paddingLeft: 5,
  },

  title: {
    textAlign: "center",
    marginBottom: 10,
    lineHeight: 50,
    fontSize: 22,
  },
  label: {
    marginBottom: 10,
    fontSize: 18,
  },
  forget_password: {
    textAlign: "center",
    lineHeight: 50,
    fontSize: 18,
  },
  button: {
    marginTop: 20,
    width: "75%",
    margin: "auto",
  },
});
