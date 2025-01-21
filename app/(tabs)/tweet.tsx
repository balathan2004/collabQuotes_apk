import React, { useState, useRef } from "react";
import {
  StyleSheet,
  View,
  Text,
  NativeSyntheticEvent,
  TextInputContentSizeChangeEventData,
  TouchableOpacity,
} from "react-native";
import {
  Button,
  TextInput,
  Provider as PaperProvider,
} from "react-native-paper";

export default function TabTwoScreen() {
  const [quote, setQuote] = useState("");
  const [author, setAuthor] = useState("");
  const [inputHeight, setInputHeight] = useState(50);

  const handleInput = (label: string, text: string) => {
    if (label == "quote") {
      setQuote(text);
    } else if (label == "author") {
      setAuthor(text);
    }
  };

  const handleSubmit = () => {
    if (author.trim() && quote.trim()) {
      console.log(author, quote);
      // need to make new route in post data without cookies
    }
  };

  return (
    <PaperProvider>
      <View style={styles.container}>
        <Text style={styles.text}>Share Your Quote</Text>
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
        <TextInput
          value={author}
          onChangeText={(text) => handleInput("author", text)}
          style={styles.input}
          placeholder="Enter Author"
        />
        <TouchableOpacity style={styles.button} onPress={handleSubmit}>
          <Text style={styles.buttonText}>Submit</Text>
        </TouchableOpacity>
      </View>
    </PaperProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    padding: 16,
  },
  text: {
    textAlign: "center",
    fontSize: 18,
    marginBottom: 20,
    lineHeight: 50,
  },
  input: {
    width: "90%",
    marginBottom: 20,
    textAlignVertical: "top", // Align text to the top
  },
  button: {
    alignSelf: "center",

    paddingVertical: 10,
    paddingHorizontal: 20,
    width: "90%",
    borderRadius: 8,
    borderWidth: 1,
    borderColor: "#007bff",
    backgroundColor: "#007bff",
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
    textAlign: "center",
  },
});
