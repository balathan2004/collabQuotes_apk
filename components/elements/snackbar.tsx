import React from "react";
import { Snackbar } from "react-native-paper";
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
    <View style={[styles.snackbarContainer]}>
      <Snackbar
        visible={!!reply}
        onDismiss={onDismissSnackBar}
        action={{
          label: "Undo",
          onPress: onDismissSnackBar,
        }}
      >
        <Text style={[styles.snackbar_text, { color: colors.background }]}>
          {reply}
        </Text>
      </Snackbar>
    </View>
  );
}
