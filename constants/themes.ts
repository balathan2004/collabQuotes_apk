import { Theme } from "@react-navigation/native"; // Import Theme type
import { fonts } from "./../node_modules/@react-navigation/native/src/theming/fonts"; // Import fonts or define your own fonts object
import Colors from "./Colors";
const tintColorLight = "#0a7ea4";
const tintColorDark = "#fff";

export const LightTheme: Theme = {
  dark: false,
  colors: {
    card: Colors.light.card,
    primary: Colors.light.primary,
    background: Colors.light.background,
    text: Colors.light.text,
    border: Colors.light.border,
    notification: "rgb(255, 59, 48)",
  },
  fonts,
};

export const DarkTheme: Theme = {
  dark: true,
  colors: {
    card: Colors.dark.card,
    primary: Colors.dark.primary,
    background: Colors.dark.background,
    text: Colors.dark.text,
    border: Colors.dark.border,
    notification: "rgb(145, 142, 142)",
  },
  fonts,
};
