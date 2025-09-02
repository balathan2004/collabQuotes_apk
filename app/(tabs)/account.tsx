import { View, Text, ScrollView } from "react-native";
import { useTheme } from "@react-navigation/native";
import { styles } from "@/styles/profile";
import { styles as global_style } from "@/styles/global";
import AuthQuoteList from "@/components/elements/authQuote";
import { useAuth } from "@/components/redux/authSlice";
import { useGetUserQuotesQuery } from "@/components/redux/apis/profileApi";
import ProfileCard from "@/components/elements/ProfileCard";


const ProfileScreen = () => {
  const { colors } = useTheme();

  const { data: userCred } = useAuth();

 
  const {data:profilePosts,isLoading}=useGetUserQuotesQuery()

 

  return (
    <ScrollView>
      <View style={global_style.container}>
        <Text style={[styles.centerText, { color: colors.text }]}>
          Your Profile
        </Text>
       {profilePosts?.userData&&<ProfileCard data={profilePosts?.userData} />} 
        <View style={styles.horizontalLine} />
        <View style={styles.content}>
          <Text style={[styles.centerText, { color: colors.text }]}>
            Your Posts
          </Text>
          {profilePosts?.userPosts.map((item) => {
            return <AuthQuoteList data={item} key={item.quoteId} />;
          })}
        </View>
      </View>
    </ScrollView>
  );
};

export default ProfileScreen;
