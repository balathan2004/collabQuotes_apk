import {
  QuotesInterfaceWithProfile,
  PostResponseConfig,
} from "@/components/interfaces";
import React, { FC, useEffect, useState } from "react";
import QuoteList from "@/components/elements/list";
import { useLoadingContext } from "@/components/context/loading_context";
import {
  StyleSheet,
  View,
  Text,
  RefreshControl,
  FlatList,
  ActivityIndicator,
} from "react-native";
import { serverUrl } from "@/constants/env";
import { debounce } from "lodash";
import { useTheme } from "@react-navigation/native";

const Blog: FC = () => {
  const [quotesData, setQuotesData] = useState<QuotesInterfaceWithProfile[]>(
    []
  );
  const [loading, setLoading] = useState(false);
  const [startFrom, setStartFrom] = useState(0);
  const [hasMorePosts, setHasMorePosts] = useState(true);
  const { colors } = useTheme();
  const { setIsLoading } = useLoadingContext();

  const onRefresh = async () => {
    setLoading(true); // Set loading to true when refreshing starts
    setStartFrom(0); // Reset pagination
    setQuotesData([]); // Clear previous data
    await fetchMorePosts({ refreshValue: 0 }); // Fetch the first page
    setLoading(false); // Set loading to false once fetching is done
  };

  interface RefreshValue {
    refreshValue: number;
  }
  const fetchMorePosts = async ({ refreshValue }: RefreshValue) => {
    const url = `${serverUrl}/posts/get_posts?page=${
      refreshValue == 0 ? refreshValue : startFrom
    }&limit=5`;

    try {
      const response = await fetch(url, { method: "GET" });

      if (response.ok) {
        const data: PostResponseConfig = await response.json();
        const { quotes } = data;

        if (quotes && quotes.length > 0) {
          // Filter out duplicates before updating state
          setQuotesData((prevData) => {
            const newQuotes = quotes.filter(
              (quote) =>
                !prevData.some(
                  (existingQuote) => existingQuote.quoteId === quote.quoteId
                )
            );
            return [...prevData, ...newQuotes];
          });

          setStartFrom((prev) => prev + 1);
        } else {
          setHasMorePosts(false);
        }
      } else {
        console.error("Failed to fetch more posts");
        setHasMorePosts(false);
      }
    } catch (error) {
      console.error("Error fetching more posts:", error);
    }
  };

  const debouncedFunction = debounce(async () => {
    await fetchMorePosts({ refreshValue: 1 });

    setLoading(false);
  }, 2000);

  const triggerMorePosts = async () => {
    if (loading || !hasMorePosts) return; // Prevent multiple requests
    setLoading(true); // Set loading as soon as debounce starts
    debouncedFunction();
  };

  useEffect(() => {
    setIsLoading(true);
    fetchMorePosts({ refreshValue: 1 });
    setIsLoading(false);
  }, []);

  const renderFooter = () => {
    if (!loading) return null;

    return (
      <View style={styles.footer}>
        <ActivityIndicator size="large" color="#0000ff" />
        <Text style={[styles.text, { color: colors.text }]}>
          Loading more...
        </Text>
      </View>
    );
  };

  const renderItem = ({ item }: { item: QuotesInterfaceWithProfile }) => (
    <QuoteList data={item} />
  );

  return (
    <View style={styles.container}>
      <Text style={[styles.centerText, { color: colors.text }]}>Blog</Text>
      <FlatList
        showsVerticalScrollIndicator={false}
        data={quotesData}
        renderItem={renderItem} // Use the debounced function for scrolling
        keyExtractor={(item) => item.quoteId}
        onEndReached={() => triggerMorePosts()}
        onEndReachedThreshold={0.5}
        ListFooterComponent={renderFooter}
        nestedScrollEnabled={true}
        refreshControl={
          <RefreshControl
            refreshing={loading} // Set to true while loading
            onRefresh={onRefresh}
            colors={[colors.primary]} // Customize spinner color
          />
        }
      ></FlatList>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginTop:50,
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    width: "85%",
    margin: "auto",
  },
  centerText: {
    textAlign: "center",
    fontSize: 24,
    marginVertical: 10,
  },
  footer: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
    margin: "auto",
    alignItems: "center",
  },
  text: {
    fontSize: 16,
  },
});

export default Blog;
