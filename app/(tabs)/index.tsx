import {
  QuotesInterfaceWithProfile,
  PostResponseConfig,
} from "@/components/interfaces";
import React, { FC, useEffect, useState } from "react";
import QuoteList from "@/components/elements/list";
import { useLoadingContext } from "@/components/context/loading_context";
import { StyleSheet, View, Text, SafeAreaView } from "react-native";

const url = "http://localhost:3000/posts/get_posts?page=0&limit=10";

const Blog: FC = () => {
  const [quotesData, setQuotesData] = useState<
    QuotesInterfaceWithProfile[] | null
  >(null);

  const { setIsLoading } = useLoadingContext();

  useEffect(() => {
    async function GetQuotes() {
      setIsLoading(true);
      const response = await fetch(url, {
        method: "GET",
      });
      const res = (await response.json()) as PostResponseConfig;
      setIsLoading(false);
      console.log(res)
      if (res.status == 200) {
        
        setQuotesData(res.quotes);
      }
    }
    GetQuotes();
  }, []);

  return (
    <SafeAreaView style={styles.main_container}>
      <View style={styles.container}>
        <Text style={styles.centerText}>Blog</Text>
        {quotesData?.map((item) => (
          <QuoteList key={item.quoteId} data={item} image={item.profile_url} />
        ))}
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  main_container: {},
  container: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  centerText: {
    textAlign: "center",
    fontSize: 24,
    marginVertical: 10,
  },
});

export default Blog;
