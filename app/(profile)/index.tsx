import { Tabs, useLocalSearchParams } from "expo-router";
import { View, Text, ScrollView } from "react-native";
import { styles } from "@/styles/profile";
import { useTheme } from "@react-navigation/native";
import QuoteList from "@/components/elements/list";
import { useGetProfileByIdQuery } from "@/components/redux/apis/profileApi";
import ProfileCard from "@/components/elements/ProfileCard";

const ProfileScreen = () => {
  const userId = useLocalSearchParams().userId as string; // Correct hook

  const { data: profile } = useGetProfileByIdQuery(userId, { skip: !userId });

  const { colors } = useTheme();

  return (
    <ScrollView>
      <Tabs.Screen
        options={{
          headerTitle: profile?.userData
            ? `${profile?.userData?.username}'s Profile`
            : "User Profile",
        }}
      />
      <View style={styles.container}>
        <Text style={[styles.centerText, { color: colors.text }]}>
          User Profile
        </Text>
        {profile?.userData && <ProfileCard data={profile?.userData} />}
        <View style={styles.horizontalLine} />
        <View style={styles.content}>
          <Text style={[styles.centerText, { color: colors.text }]}>
            User Posts
          </Text>
          {profile?.userPosts.map((item) => {
            return <QuoteList data={item} key={item.quoteId} />;
          })}
        </View>
      </View>
    </ScrollView>
  );
};

export default ProfileScreen;
