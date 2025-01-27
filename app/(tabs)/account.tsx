import QuoteList from "@/components/elements/list";
import {
  ProfileResponseCofig,
  UserDataInterface,
  QuoteInterface,
} from "@/components/interfaces";
import { useEffect, useState } from "react";
import { View, Text, Image, SafeAreaView, ScrollView } from "react-native";
const placeholderImage = require("../../assets/images/user.jpg");
import moment from "moment";
import { useUserContext } from "@/components/context/usercred_context";
import { useLoadingContext } from "@/components/context/loading_context";
import { serverUrl } from "@/constants/env";
import { SvgUri } from "react-native-svg";
import { useTheme } from "@react-navigation/native";
import { styles } from "@/styles/profile";
import { styles as global_style } from "@/styles/global";

const timeHandler = (date: number) => {
  return moment(new Date(date)).fromNow();
};

const ProfileScreen = () => {
  const { userCred } = useUserContext();
  const { colors } = useTheme();

  const [profileData, setProfileData] = useState<UserDataInterface | null>(
    null
  );
  const [profilePosts, setProfilePosts] = useState<QuoteInterface[]>([]);
  const { setIsLoading } = useLoadingContext();
  useEffect(() => {
    const getProfile = async () => {
      setIsLoading(true);
      const response = await fetch(
        `${serverUrl}/profile/get_profile/${userCred?.userId}`,
        {
          method: "GET",
        }
      );

      const res = (await response.json()) as ProfileResponseCofig;
      setIsLoading(false);
      if (res.status == 200) {
        setProfileData(res.userData);
        const newUserPosts: QuoteInterface[] = res.userPosts.map((item) => {
          return { ...item, profile_url: res.userData?.profile_url || "" };
        });
        setProfilePosts(newUserPosts);
      }
    };

    if (userCred && userCred.userId) {
      getProfile();
    }
  }, [userCred]);

  return (
    <ScrollView>
      <View style={global_style.container}>
        <Text style={[styles.centerText, { color: colors.text }]}>
          Your Profile
        </Text>
        <View style={styles.header}>
          <SvgUri
            uri={profileData?.profile_url || ""}
            width={70}
            height={70}
          ></SvgUri>
          <View>
            <Text style={[styles.text, { color: colors.text }]}>
              {profileData ? `@${profileData.username}` : ""}
            </Text>
            <Text style={[styles.text, { color: colors.text }]}>
              {profileData ? `${profileData.email}` : ""}
            </Text>
            <Text style={[styles.text, { color: colors.text }]}>
              {profileData
                ? `Joined ${timeHandler(profileData.createdAt)}`
                : ""}
            </Text>
          </View>
        </View>

        <View style={styles.horizontalLine} />
        <View style={styles.content}>
          <Text style={[styles.centerText, { color: colors.text }]}>
            User Posts
          </Text>
          {profilePosts.map((item) => {
            return <QuoteList isOwner={true} data={item} key={item.quoteId} />;
          })}
        </View>
      </View>
    </ScrollView>
  );
};

export default ProfileScreen;
