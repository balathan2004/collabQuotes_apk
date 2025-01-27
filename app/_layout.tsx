import { ThemeProvider } from "@react-navigation/native";
import { DarkTheme, LightTheme } from "@/constants/themes";
import { useFonts } from "expo-font";
import { Stack } from "expo-router";
import * as SplashScreen from "expo-splash-screen";
import { StatusBar } from "expo-status-bar";
import { useEffect } from "react";
import "react-native-reanimated";
import { useColorScheme } from "@/hooks/useColorScheme";
import LoadingHolder from "@/components/context/loading_context";
import UserCredHolder from "@/components/context/usercred_context";
import ReplyHolder from "@/components/context/reply_context";
import { SafeAreaView } from "react-native";
import { styles } from "@/styles/global";
import Snackbar from "@/components/elements/snackbar";
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const colorScheme = useColorScheme();
  const [loaded] = useFonts({
    SpaceMono: require("../assets/fonts/SpaceMono-Regular.ttf"),
  });

  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync().catch((error) =>
        console.error("Error hiding splash screen:", error)
      );
    }
  }, [loaded]);

  if (!loaded) {
    return null;
  }

  return (
    <ThemeProvider value={colorScheme === "dark" ? DarkTheme : LightTheme}>
      <SafeAreaView
        style={[
          styles.safearea,
          {
            backgroundColor:
              colorScheme === "dark"
                ? DarkTheme.colors.background
                : LightTheme.colors.background,
          },
        ]}
      >
        <UserCredHolder>
          <ReplyHolder>
            <LoadingHolder>
              <Stack screenOptions={{ headerShown: false }}>
                <Stack.Screen name="(auth)" />
                <Stack.Screen name="(tabs)" />
                <Stack.Screen
                  name="(profile)"
                  options={{ headerShown: false }}
                ></Stack.Screen>
                <Stack.Screen name="+not-found" />
                <Stack.Screen name="/" />
              </Stack>
            </LoadingHolder>
          </ReplyHolder>
        </UserCredHolder>
      </SafeAreaView>

      <StatusBar
        translucent={true}
        backgroundColor={colorScheme === "dark" ? "#000000" : "#ffffff"}
      />
    </ThemeProvider>
  );
}
