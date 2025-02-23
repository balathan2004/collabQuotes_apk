import React from "react";
import { lazy, Suspense } from "react";
const Snackbar = lazy(() =>
  import("react-native-paper").then((mod) => ({ default: mod.Snackbar }))
);
import { Text, View } from "react-native";
import { styles } from "@/styles/global";
import { useReplyContext } from "../context/reply_context";
import { useTheme } from "@react-navigation/native";

export default function SnackbarComponent() {
  const { reply, setReply } = useReplyContext();
  const { colors } = useTheme();

  const onDismissSnackBar = () => {
    setReply(null);
  };
  return (
    <View style={styles.snackbarContainer}>
      <Snackbar
        visible={!!reply}
        onDismiss={onDismissSnackBar}
        action={{
          label: "Undo",
          onPress: () => {
            // Do something
          },
        }}
      >
        <Text style={[styles.snackbar_text]}>
          {reply}
        </Text>
      </Snackbar>
    </View>
  );
}
