import { View } from "react-native";
import { ActivityIndicator } from "react-native-paper";
import { StyleSheet } from "react-native";
import { useEffect, useState } from "react";
import { getData } from "@/components/cred";
import { router } from "expo-router";
import { useUserContext } from "@/components/context/usercred_context";

const ProfileScreen = () => {
  const [loading, setLoading] = useState(true);
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
      {loading ? <ActivityIndicator /> : null}
      <View style={styles.horizontalLine} />
    </View>
  );
};

const styles = StyleSheet.create({
  main_container: {},
  container: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  header: {
    marginVertical: 50,
    display: "flex",
    flexDirection: "row",
    gap: 10,
    alignItems: "center",
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
  text: {
    fontSize: 18,
    marginVertical: 5,
  },
});

export default ProfileScreen;
