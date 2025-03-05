import { StyleSheet } from "react-native";
export const styles = StyleSheet.create({
  container: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    width: "90%",
    margin: "auto",
    marginTop: 25,
  },
  header: {
    marginVertical: 15,
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
  content: {
    marginTop: 10,
    width: "100%",
    margin: "auto",
  },
  centerText: {
    textAlign: "center",
    fontSize: 24,
    marginBottom: 20,
  },
  text: {
    fontSize: 18,
    marginVertical: 5,
  },
});
