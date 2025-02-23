import React, { FC } from "react";
import { QuoteInterface } from "../interfaces";
import moment from "moment";
import { Alert, Pressable, Text, View } from "react-native";
import { router } from "expo-router";
import { SvgUri } from "react-native-svg";
import { useTheme } from "@react-navigation/native";
import { styles } from "@/styles/lists";

interface Props {
  data: QuoteInterface;
  isOwner?: boolean;
}

const QuoteList: FC<Props> = ({ data, isOwner = false }) => {
  const timeHandler = (date: number) => {
    return moment(new Date(date)).fromNow();
  };

  const { colors } = useTheme();

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

export default QuoteList;
