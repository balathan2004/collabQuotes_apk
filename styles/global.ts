import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  safearea: {
    margin: 0,
    flex: 1,
    position: "relative",
    justifyContent: "flex-start",
    // Keeps the snackbar positioned correctly within the container
  },
  snack_bar: {
    position: "absolute",
    zIndex: 10,
    top: 60, // Distance from the top of the safe area
    width: "80%",
    left: "10%",
    height: 50,
    borderRadius: 10,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "gray",
    shadowColor: "#000", // Optional shadow for better visibility
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 3,
  },
  snack_bar_text: {
    color: "white",
    textTransform: "capitalize",
    fontSize: 16,
  },

  container: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    width: "90%",
    marginTop: 50,
    margin: "auto",
  },
  button: {
    marginTop: 20,
    width: "75%",
    margin: "auto",
  },
});
