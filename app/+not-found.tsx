import { Link, Stack } from "expo-router";
import { StyleSheet, View, Text } from "react-native";
import { styles as globalStyles } from "@/styles/global";
import OfflinePage from "@/components/elements/offline_page";
import { AppText } from "@/components/elements/AppText";

export default function NotFoundScreen() {
  return (
    <>
      <Stack.Screen options={{ title: "Oops!" }} />
      <View style={globalStyles.container}>
        <AppText>This screen doesn't exist.</AppText>
        <Link href="/" style={styles.link}>
          <AppText>Go to home screen!</AppText>
        </Link>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  link: {
    marginTop: 15,
    paddingVertical: 15,
  },
});
