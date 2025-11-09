import { View, Image, StyleSheet } from "react-native";
import { useEffect } from "react";
import { getRefreshToken } from "@/components/cred";
import { router } from "expo-router";
import { styles as globalStyles } from "@/styles/global";
import { useRefreshTokenMutation } from "@/components/redux/apis/authApi";
const image = require("../assets/images/index.png");

const ProfileScreen = () => {
  const [getAccessToken, { isLoading }] = useRefreshTokenMutation();

  useEffect(() => {
    const getCred = async () => {
      const refreshToken = await getRefreshToken("refreshToken");

      console.log("refreshToken", { refreshToken });
      if (!refreshToken) {
        router.push("/(auth)/login");
        return;
      }
      await getAccessToken({ refreshToken });
      router.push("/(tabs)");
      return;
    };
    getCred();
  }, []);

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
