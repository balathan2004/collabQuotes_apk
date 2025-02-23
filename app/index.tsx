import { View, Image, StyleSheet } from "react-native";
import { useEffect } from "react";
import { getData } from "@/components/cred";
import { router } from "expo-router";
import { styles as globalStyles } from "@/styles/global";
const image = require("../assets/images/index.png");
import { useUserContext } from "@/components/context/usercred_context";

const ProfileScreen = () => {
  const { setUserCred } = useUserContext();

  useEffect(() => {
    const SetContext = async () => {
      const data = await getData("login_cred");
      if (!data) {
        router.push("/(auth)/login");
        return;
      }
      setUserCred(data);
      router.push("/(tabs)");
    };
    SetContext();
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
