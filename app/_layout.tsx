import { ThemeProvider } from "@react-navigation/native";
import { DarkTheme, LightTheme } from "@/constants/themes";
import { useFonts } from "expo-font";
import * as SplashScreen from "expo-splash-screen";
import { StatusBar } from "expo-status-bar";
import { useEffect } from "react";
import "react-native-reanimated";
import { useColorScheme } from "@/hooks/useColorScheme";
import LoadingHolder from "@/components/context/loading_context";
import { SafeAreaView } from "react-native";
import { styles } from "@/styles/global";
import { PaperProvider } from "react-native-paper";
import NewtworkWrapper from "@/components/context/network_context";
import { Provider } from "react-redux";
import { store } from "@/components/redux/store";
import Toast from "react-native-toast-message";
import Router from "@/components/router.tsx/router";
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
    <PaperProvider>
      <ThemeProvider value={colorScheme === "dark" ? DarkTheme : LightTheme}>
        <Provider store={store}>
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
            <LoadingHolder>
              <NewtworkWrapper>
                <Router />
              </NewtworkWrapper>
            </LoadingHolder>
          </SafeAreaView>

          <StatusBar
            translucent={true}
            backgroundColor={colorScheme === "dark" ? "#000000" : "#ffffff"}
          />
        </Provider>
        <Toast />
      </ThemeProvider>
    </PaperProvider>
  );
}
