import { StyleSheet } from "react-native";
export const styles = StyleSheet.create({
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
  