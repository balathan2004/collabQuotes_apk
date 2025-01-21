import React, { FC } from "react";
import { QuoteInterface } from "../interfaces";
import moment from "moment";
import { Image, Pressable, StyleSheet, Text, View } from "react-native";
import { Link, router } from "expo-router";
const placeholderImage = require("../../assets/images/user.jpg");
import { useRouter } from "expo-router";

interface Props {
  data: QuoteInterface;
  image?: string | false;
}

const QuoteList: FC<Props> = ({ data, image = false }) => {
  const timeHandler = (date: number) => {
    return moment(new Date(date)).fromNow();
  };

  return (
    <View style={styles.quoteList}>
      <View style={styles.top}>
        <Image
          source={image ? { uri: image } : placeholderImage}
          style={{ width: 100, height: 100 }} // Add appropriate styles
        />
        <Pressable
          onPress={() => router.push(`/(profile)?userId=${data.userId}`)}
        >
          <Text>{data.username}</Text>
        </Pressable>
      </View>
      <View style={styles.content}>
        <Text style={styles.paragraph}>{data.quote}</Text>
        <Text style={styles.content_span}>{` - ${data.author}`}</Text>
      </View>

      <View>
        <Text style={styles.footerSpan}>
          Created {timeHandler(data.createdAt)}
        </Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  quoteList: {
    width: "100%",
    maxWidth: 500, // React Native doesn't have a 'max-width' property, so this is just an approximation.
    marginBottom: 80, // 5rem = 80px
  },
  link: {
    textDecorationLine: "none", // React Native uses `textDecorationLine` instead of `text-decoration`.
    color: "inherit", // Use specific colors here, e.g., 'black' or a hex code, as React Native doesn't support 'inherit'.
    fontSize: 18,
  },
  linkBefore: {
    // React Native doesn't support `::before`. You need to prepend "@" manually in the text component.
  },
  paragraph: {
    fontSize: 18, // `clamp` isn't available, so pick a middle value (18px in this case).
    lineHeight: 40,
  },
  content: {
    borderBottomWidth: 0.5,
    borderBottomColor: "rgb(133, 132, 132)",
    paddingBottom: 8, // 0.5rem = 8px
  },
  content_span: {
    // React Native uses `flex` instead of `block`.
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
  topImage: {
    height: 50,
    width: 50, // Add width to make it a perfect circle.
    borderRadius: 37.5, // Half of width/height to make it circular.
  },
  footerSpan: {
    paddingTop: 8, // 0.5rem = 8px
    fontSize: 16,
  },
});

export default QuoteList;
