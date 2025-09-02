import { View, Text } from "react-native";
import { Stack } from "expo-router";
import { useAuth } from "../redux/authSlice";

type Props = {};

const Router = (props: Props) => {
  const { isLogin } = useAuth();

  console.log("isLOginnn", isLogin);

  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen name="(tabs)" />
      <Stack.Screen name="(profile)" />
      <Stack.Screen name="(auth)" />
      <Stack.Screen name="/" />
      <Stack.Screen name="+not-found" /> {/* always include not-found */}
    </Stack>
  );
};

// const MainStack = () => {
//   return (
//     <>
//       <Stack.Screen name="+not-found" />
//       <Stack.Screen name="(tabs)" />
//       <Stack.Screen
//         name="(profile)"
//         options={{ headerShown: false }}
//       ></Stack.Screen>
//     </>
//   );
// };

// const AuthStack = () => {
//   return (
//     <>
//       <Stack.Screen name="(auth)" />
//       <Stack.Screen name="/" />
//     </>
//   );
// };

export default Router;
