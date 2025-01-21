import QuoteList from "@/components/elements/list";
import {
  ProfileResponseCofig,
  UserDataInterface,
  QuoteInterface,
} from "@/components/interfaces";
import { useLocalSearchParams } from "expo-router";
import { useEffect, useState } from "react";
import { View, Text, Image } from "react-native";
const placeholderImage = require("../../assets/images/user.jpg");
import moment from "moment";
import { StyleSheet } from "react-native";
import { useUserContext } from "@/components/context/usercred_context";

const timeHandler = (date: number) => {
  return moment(new Date(date)).fromNow();
};

const ProfileScreen = () => {
  const { userCred } = useUserContext();

  const [profileData, setProfileData] = useState<UserDataInterface | null>(
    null
  );
  const [profilePosts, setProfilePosts] = useState<QuoteInterface[]>([]);

  useEffect(() => {
    const getProfile = async () => {
      const response = await fetch(
        `http://localhost:3000/profile/get_profile/${userCred?.userId}`,
        {
          method: "GET",
        }
      );

      const res = (await response.json()) as ProfileResponseCofig;

      if (res.status == 200) {
        console.log(res);
        setProfileData(res.userData);
        setProfilePosts(res.userPosts);
      }
    };

    if (userCred && userCred.userId) {
      getProfile();
    }
  }, [userCred]);

  return (
    <View style={styles.container}>
      <View>
        <View style={styles.header}>
          <Image
            source={
              profileData?.profile_url
                ? { uri: profileData?.profile_url }
                : placeholderImage
            }
            style={{ width: 100, height: 100 }}
          ></Image>
          <View>
            <Text style={styles.text}>
              {profileData ? `@${profileData.username}` : ""}
            </Text>
            <Text style={styles.text}>
              {profileData ? `Email ${profileData.email}` : ""}
            </Text>
            <Text style={styles.text}>
              {profileData
                ? `Joined ${timeHandler(profileData.createdAt)}`
                : ""}
            </Text>
          </View>
        </View>

        <View style={styles.horizontalLine} />

        <View>
          <Text style={styles.centerText}>User Posts</Text>
          {profilePosts.map((item) => {
            return (
              <QuoteList
                data={item}
                key={item.quoteId}
                image={
                  profileData?.profile_url
                    ? profileData?.profile_url
                    : placeholderImage
                }
              />
            );
          })}
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  main_container: {},
  container: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  header: {
    marginVertical: 50,
    display: "flex",
    flexDirection: "row",
    gap: 10,
    alignItems: "center",
  },
  horizontalLine: {
    width: "100%", // Adjust width as needed
    height: 1, // Thin line
    backgroundColor: "#ccc", // Light gray color
  },
  centerText: {
    textAlign: "center",
    fontSize: 24,
    marginVertical: 20,
  },
  text: {
    fontSize: 18,
    marginVertical: 5,
  },
});

export default ProfileScreen;
