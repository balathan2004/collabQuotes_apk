import React, { FC } from "react";
import { QuoteInterface, ResponseConfig } from "../interfaces";
import moment from "moment";
import { Alert, Pressable, Text, View } from "react-native";
import { router } from "expo-router";
import { SvgUri } from "react-native-svg";
import { useTheme } from "@react-navigation/native";
import { styles } from "@/styles/lists";
import { serverUrl } from "@/constants/env";
import AntDesign from "@expo/vector-icons/AntDesign";
import { useDeletePostMutation } from "../redux/apis/postsApi";

interface Props {
  data: QuoteInterface;
  isOwner?: boolean;
}

const AuthQuoteList: FC<Props> = ({ data }) => {
  const timeHandler = (date: number) => {
    return moment(new Date(date)).fromNow();
  };

  const [handleDelete] = useDeletePostMutation();

  const { colors } = useTheme();

  const showConfirmationDialog = () => {
    Alert.alert(
      "Confirmation", // Title
      "Are you sure you want to proceed?", // Message
      [
        {
          text: "Cancel", // Button label
          onPress: () => console.log("Cancel Pressed"),
          style: "cancel", // Makes the button a "cancel" button (bolded on iOS)
        },
        {
          text: "OK", // Button label
          onPress: () => sendDeleteReq(),
        },
      ],
      { cancelable: false } // Prevent dismissing by tapping outside the alert
    );
  };

  const sendDeleteReq = async () => {
    handleDelete({ quoteId: data.quoteId });
  };

  const deletePost = async () => {
    console.log("clicked");
    showConfirmationDialog();
  };

  return (
    <View style={styles.quoteList}>
      <View style={styles.top}>
        <View style={styles.top_left}>
          <SvgUri uri={data.profile_url || ""} width={70} height={70}></SvgUri>
          <Pressable
            onPress={() => router.push(`/(profile)?userId=${data.userId}`)}
          >
            <Text style={[styles.text, { color: colors.text }]}>
              {data.username}
            </Text>
          </Pressable>
        </View>
        <Pressable onPress={deletePost}>
          <AntDesign
            style={{ color: colors.text }}
            name="delete"
            size={24}
            color="black"
          />
        </Pressable>

        <View></View>
      </View>
      <View style={styles.content}>
        {/* <Pressable
          onPress={() => router.push(`/(posts)?=${data.quoteId}`)}
        > */}
        <Text style={[styles.paragraph, { color: colors.text }]}>
          {data.quote}
        </Text>
        <Text
          style={[styles.content_span, { color: colors.text }]}
        >{` - ${data.author}`}</Text>
        {/* </Pressable> */}
      </View>

      <View>
        <Text style={[styles.footerSpan, { color: colors.text }]}>
          Created {timeHandler(data.createdAt)}
        </Text>
      </View>
    </View>
  );
};

export default AuthQuoteList;
