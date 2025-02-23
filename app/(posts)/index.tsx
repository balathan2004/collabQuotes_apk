import QuoteList from "@/components/elements/list";
import {
  ProfileResponseCofig,
  UserDataInterface,
  QuoteInterface,
} from "@/components/interfaces";
import { SvgUri } from "react-native-svg";
import { useLocalSearchParams } from "expo-router";
import { useEffect, useState } from "react";
import { View, Text, ScrollView } from "react-native";
import moment from "moment";
import { styles } from "@/styles/profile";
import { useLoadingContext } from "@/components/context/loading_context";
import { serverUrl } from "@/constants/env";
import { useTheme } from "@react-navigation/native";

const timeHandler = (date: number) => {
  return moment(new Date(date)).fromNow();
};

const ProfileScreen = () => {
  const { userId } = useLocalSearchParams(); // Correct hook
  const [profileData, setProfileData] = useState<UserDataInterface | null>(
    null
  );
  const [profilePosts, setProfilePosts] = useState<QuoteInterface[]>([]);
  const { setIsLoading } = useLoadingContext();
  const { colors } = useTheme();

  useEffect(() => {
    const getProfile = async () => {
      setIsLoading(true);
      const response = await fetch(
        `${serverUrl}/posts/get_single_posts?userId=${userId}`,
        {
          method: "GET",
        }
      );

      const res = (await response.json()) as ProfileResponseCofig;
      setIsLoading(false);
      if (res.status == 200) {
        console.log(res);
        setProfileData(res.userData);
        const newUserPosts: QuoteInterface[] = res.userPosts.map((item) => {
          return { ...item, profile_url: res.userData?.profile_url || "" };
        });
        setProfilePosts(newUserPosts);
      }
    };

    if (userId) {
      getProfile();
    }
  }, [userId]);

  return (
    <ScrollView>
      <View style={styles.container}>
        <Text style={[styles.centerText, { color: colors.text }]}>
          Your Profile
        </Text>

        <View style={styles.horizontalLine} />
        {/* { <QuoteList data={} />} */}
      </View>
    </ScrollView>
  );
};

export default ProfileScreen;
