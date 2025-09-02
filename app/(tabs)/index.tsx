import {
  QuotesInterfaceWithProfile,
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
import { styles as globalStyles } from "@/styles/global";
import { debounce } from "lodash";
import { useTheme } from "@react-navigation/native";
import { useLazyGetBlogQuery } from "@/components/redux/apis/blogApi";

const Blog: FC = () => {
  const [query, setQuery] = useState({
    page: 1,
    limit: 5,
  });

  const [quotesData, setQuotesData] = useState<QuotesInterfaceWithProfile[]>(
    []
  );

  const [getBlogs, { isLoading }] = useLazyGetBlogQuery();

  const [loading, setLoading] = useState(false);
  const [startFrom, setStartFrom] = useState(0);
  const [hasMorePosts, setHasMorePosts] = useState(true);
  const [refresh, setRefresh] = useState(false);
  const { colors } = useTheme();
  const { setIsLoading } = useLoadingContext();

  const fetchMorePosts = async () => {
    try {
      getBlogs(query)
        .unwrap()
        .then((res) => {
          setQuotesData((prev) => {
            const newQuotes =
              res?.quotes?.filter(
                (quote) =>
                  !prev.some(
                    (existingQuote) => existingQuote.quoteId === quote.quoteId
                  )
              ) || [];

            return [...prev, ...newQuotes];
          });
        });
    } catch (error) {
      console.error("Error fetching more posts:", error);
    }
  };

  const debouncedFunction = debounce(async () => {
    setQuery((prev) => ({
      ...prev,
      page: prev.page + 1,
    }));
  }, 1000);

  const triggerMorePosts = async () => {
    if (isLoading || !hasMorePosts) return; // Prevent multiple requests
    debouncedFunction();
  };

  const onRefresh = () => {
    setQuery({ page: 1, limit: 5 });
  };

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      //await
      fetchMorePosts(); // Waits for posts to load
      setIsLoading(false);
    };

    fetchData();
  }, []);

  const renderFooter = () => {
    if (!isLoading) return null;

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
    <View style={globalStyles.container}>
      <Text style={[globalStyles.centerText, { color: colors.text }]}>
        Blog
      </Text>
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
            refreshing={refresh} // Set to true while loading
            onRefresh={onRefresh}
            colors={[colors.primary]} // Customize spinner color
          />
        }
      ></FlatList>
    </View>
  );
};

const styles = StyleSheet.create({
  footer: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
    marginBottom: 75,
    alignItems: "center",
  },
  text: {
    fontSize: 16,
  },
});

export default Blog;
