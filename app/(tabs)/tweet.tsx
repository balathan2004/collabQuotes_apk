import { useUserContext } from "@/components/context/usercred_context";
import { ResponseConfig } from "@/components/interfaces";
import React, { useState } from "react";
import { View, Text, Button } from "react-native";
import { TextInput } from "react-native-paper";
import { serverUrl } from "@/constants/env";
import { useTheme } from "@react-navigation/native";
import { useLoadingContext } from "@/components/context/loading_context";
import { useReplyContext } from "@/components/context/reply_context";
import { router } from "expo-router";
import { styles } from "@/styles/tweet.css";

export default function TabTwoScreen() {
  const [quote, setQuote] = useState("");
  const [author, setAuthor] = useState("");
  const [inputHeight, setInputHeight] = useState(50);
  const { userCred } = useUserContext();
  const { colors } = useTheme();
  const { isLoading, setIsLoading } = useLoadingContext();
  const { setReply } = useReplyContext();

  const handleInput = (label: string, text: string) => {
    if (label === "quote" && text.length <= 280) {
      setQuote(text);
    } else if (label === "author" && text.length <= 50) {
      setAuthor(text);
    }
  };

  const handleResetState = () => {
    setQuote("");
    setAuthor("");
    setInputHeight(50);
  };

  const handleSubmit = async () => {
    if (author.trim() && quote.trim() && userCred) {
      setIsLoading(true);
      console.log(author, quote);
      const data = {
        userId: userCred.userId,
        quote: quote,
        author: author,
        username: userCred.username,
      };
      console.log(data);
      const response = await fetch(`${serverUrl}/posts/create_tweet`, {
        method: "POST",
        body: JSON.stringify(data),
        headers: {
          "Content-Type": "application/json",
        },
      });
      setIsLoading(false);
      const res = (await response.json()) as ResponseConfig;
      console.log(res);
      if (res) {
        setReply(res.message);
        if (res.status == 200) {
          handleResetState();
          router.push("/(tabs)");
        }
      }
    } else {
      setReply("Fields missing");
    }
  };

  return (
    <View style={styles.container}>
      <Text style={[styles.text, { color: colors.text }]}>
        Share Your Quote
      </Text>
      <View style={styles.inputContainer}>
        <TextInput
          label="Add Your Quote"
          value={quote}
          onChangeText={(text) => handleInput("quote", text)}
          mode="outlined"
          multiline
          onContentSizeChange={(event) =>
            setInputHeight(event.nativeEvent.contentSize.height)
          }
          style={[styles.input, { height: Math.max(50, inputHeight) }]}
        />
        <Text style={[styles.labelCount, { color: colors.text }]}>
          {quote.length}/280 characters
        </Text>
      </View>

      <View style={styles.inputContainer}>
        <TextInput
          value={author}
          onChangeText={(text) => handleInput("author", text)}
          style={styles.input}
          placeholder="Enter Author"
        />
        <Text style={[styles.labelCount, { color: colors.text }]}>
          {author.length}/50 characters
        </Text>
      </View>
      <View style={{ width: "90%" }}>
        <Button
          title={isLoading ? "Submitting" : "Submit"}
          disabled={isLoading}
          onPress={handleSubmit}
        ></Button>
      </View>
    </View>
  );
}
