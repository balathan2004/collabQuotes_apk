import { StyleSheet } from "react-native";
export const styles = StyleSheet.create({
  quoteList: {
    flex: 1,
    width: "100%",
    marginBottom: 50, // 5rem = 80px
  },

  top_left: {
    flex: 1,
    flexDirection: "row", // React Native uses `flexDirection` for layouts.
    alignItems: "center",
    gap: 16,
  },
  top_right: {},

  paragraph: {
    fontSize: 18, // `clamp` isn't available, so pick a middle value (18px in this case).
    lineHeight: 40,
  },
  text: {
    fontSize: 16,
  },

  content: {
    borderBottomWidth: 0.5,
    borderBottomColor: "rgb(133, 132, 132)",
    paddingBottom: 8, // 0.5rem = 8px
  },
  content_span: {
    fontSize: 16,
    textAlign: "right", // `end` maps to `right` in React Native.
    fontWeight: "600",
    lineHeight: 40,
  },

  top: {
    flexDirection: "row", // React Native uses `flexDirection` for layouts.
    alignItems: "center",
    gap: 16, // React Native doesn't directly support `gap`, but you can use `marginRight` or `padding`.
  },

  footerSpan: {
    paddingTop: 8, // 0.5rem = 8px
    fontSize: 16,
  },
});
