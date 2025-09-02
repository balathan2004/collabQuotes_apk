import React, { useState } from "react";
import { View, Text, Button } from "react-native";
import { TextInput } from "react-native-paper";
import { useTheme } from "@react-navigation/native";
import { useLoadingContext } from "@/components/context/loading_context";
import { router } from "expo-router";
import { styles } from "@/styles/tweet.css";
import { useCreatePostMutation } from "@/components/redux/apis/postsApi";
import { useAuth } from "@/components/redux/authSlice";
import Toast from "react-native-toast-message";

export default function TabTwoScreen() {
  const [quote, setQuote] = useState("");
  const [author, setAuthor] = useState("");
  const [inputHeight, setInputHeight] = useState(50);
  const { colors } = useTheme();

  const { data: userCred } = useAuth();
  const { isLoading, setIsLoading } = useLoadingContext();

  const [createPost] = useCreatePostMutation();

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
    if (author.trim() && quote.trim()) {
      const data = {
        quote: quote,
        author: author,
        username: userCred.username,
      };
      createPost({ ...data })
        .unwrap()
        .then((res) => {
          Toast.show({ type: "success", text1: res.message });
          handleResetState();
        })
        .catch((err) => {
          Toast.show({ type: "error", text1: err.message || err.data.message });
        });
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
