import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  safearea: {
    margin:0,
    flex: 1,
    position: "relative",
  },
  snack_bar: {
    position: "absolute",
    zIndex: 10,
    top: 0,
    width: "100%",
    height: 50,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "black",
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
