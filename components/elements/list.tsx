import React, { FC } from "react";
import { QuoteInterface } from "../interfaces";
import moment from "moment";
import { Alert, Pressable, StyleSheet, Text, View } from "react-native";
import { router } from "expo-router";
import { SvgUri } from "react-native-svg";
import { useTheme } from "@react-navigation/native";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";

interface Props {
  data: QuoteInterface;
  isOwner?: boolean;
}

const QuoteList: FC<Props> = ({ data, isOwner = false }) => {
  const timeHandler = (date: number) => {
    return moment(new Date(date)).fromNow();
  };

  const { colors } = useTheme();
  const image = encodeURI(
    "https://avataaars.io/?avatarStyle=Circle&topType=ShortHairDreads01&accessoriesType=Prescription02&hairColor=BrownDark&facialHairType=BeardLight&facialHairColor=BrownDark&clotheType=CollarSweater&clotheColor=Blue03&eyeType=Happy&eyebrowType=Angry&mouthType=Disbelief&skinColor=Light"
  );

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
          onPress: () => console.log("OK Pressed"),
        },
      ],
      { cancelable: false } // Prevent dismissing by tapping outside the alert
    );
  };

  const deletePost = async () => {
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

        {/* <View style={styles.top_right}>
          {isOwner ? (
            <MaterialIcons
              onPress={showConfirmationDialog}
              name="delete"
              size={24}
              color="black"
            />
          ) : null}
        </View> */}
      </View>
      <View style={styles.content}>
        <Text style={[styles.paragraph, { color: colors.text }]}>
          {data.quote}
        </Text>
        <Text
          style={[styles.content_span, { color: colors.text }]}
        >{` - ${data.author}`}</Text>
      </View>

      <View>
        <Text style={[styles.footerSpan, { color: colors.text }]}>
          Created {timeHandler(data.createdAt)}
        </Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  quoteList: {
    flex: 1,
    width: "100%",
    marginBottom: 50, // 5rem = 80px
  },

  top_left: {
    flex: 1,
    flexDirection: "row", // React Native uses `flexDirection` for layouts.
    alignItems: "center",
    gap: 16,
  },
  top_right: {},

  paragraph: {
    fontSize: 18, // `clamp` isn't available, so pick a middle value (18px in this case).
    lineHeight: 40,
  },
  text: {
    fontSize: 16,
  },

  content: {
    borderBottomWidth: 0.5,
    borderBottomColor: "rgb(133, 132, 132)",
    paddingBottom: 8, // 0.5rem = 8px
  },
  content_span: {
    fontSize: 16,
    textAlign: "right", // `end` maps to `right` in React Native.
    fontWeight: "600",
    lineHeight: 40,
  },

  top: {
    flexDirection: "row", // React Native uses `flexDirection` for layouts.
    alignItems: "center",
    gap: 16, // React Native doesn't directly support `gap`, but you can use `marginRight` or `padding`.
  },

  footerSpan: {
    paddingTop: 8, // 0.5rem = 8px
    fontSize: 16,
  },
});

export default QuoteList;
