import { View, Text } from "react-native";
import React from "react";
import { styles } from "@/styles/profile";
import { SvgUri } from "react-native-svg";
import { UserDataInterface } from "../interfaces";
import moment from "moment";
import { useTheme } from "@react-navigation/native";

type Props = {
  data: UserDataInterface;
};

const timeHandler = (date: number) => {
  return moment(new Date(date)).fromNow();
};

const ProfileCard = ({ data }: Props) => {
  const { colors } = useTheme();

  return (
    <View style={styles.header}>
      <SvgUri uri={data?.profile_url || ""} width={70} height={70}></SvgUri>
      <View>
        <Text style={[styles.text, { color: colors.text }]}>
          {data ? `@${data.username}` : ""}
        </Text>
        <Text style={[styles.text, { color: colors.text }]}>
          {data ? `${data.email}` : ""}
        </Text>
        <Text style={[styles.text, { color: colors.text }]}>
          {data ? `Joined ${timeHandler(data.createdAt)}` : ""}
        </Text>
      </View>
    </View>
  );
};

export default ProfileCard;
