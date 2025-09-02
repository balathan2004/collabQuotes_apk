import { View, Image, StyleSheet } from "react-native";
import { useEffect } from "react";
import { getRefreshToken } from "@/components/cred";
import { router } from "expo-router";
import { styles as globalStyles } from "@/styles/global";
import { useLazyRefreshTokenQuery, useRefreshTokenQuery } from "@/components/redux/apis/authApi";
const image = require("../assets/images/index.png");

const ProfileScreen = () => {
  useEffect(() => {
    const SetContext = async () => {
      const data = await getRefreshToken("refreshToken");

      console.log("data", { data });
      if (!data) {
        router.push("/(auth)/login");
        return;
      }
      await refreshToken(data)
      router.push("/(tabs)");
    };
    SetContext();
  }, []);

  const [refreshToken]=useLazyRefreshTokenQuery()

  return (
    <View style={globalStyles.container}>
      <Image style={styles.image} source={image}></Image>
    </View>
  );
};

const styles = StyleSheet.create({
  image: {
    width: 250,
    height: 250,
    borderRadius: 10,
  },
});

export default ProfileScreen;
