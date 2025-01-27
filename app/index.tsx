import { View, Image,StyleSheet } from "react-native";
import { useEffect } from "react";
import { getData } from "@/components/cred";
import { router } from "expo-router";
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
    <View style={styles.container}>
      <Image style={styles.image} source={image}></Image>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    flex: 1,
    height: "100%",
  },
  horizontalLine: {
    width: "100%", // Adjust width as needed
    height: 1, // Thin line
    backgroundColor: "#ccc", // Light gray color
  },
  centerText: {
    textAlign: "center",
    fontSize: 24,
    marginVertical: 20,
  },
  image: {
    width: 250,
    height: 250,
    borderRadius: 10,
  },
});

export default ProfileScreen;
