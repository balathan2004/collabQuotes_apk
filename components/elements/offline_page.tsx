import React, { Component } from "react";
import { View, Image, Text, Button } from "react-native";
import { useNetworkContext } from "../context/network_context";
import { AppText } from "./AppText";
const image = require("@/assets/images/meme.jpg");
import NetInfo from "@react-native-community/netinfo";

export default function OfflinePage() {
  const { setIsOnline } = useNetworkContext();

  const tryReconnect = async () => {
    const state = await NetInfo.fetch();
    if (state.isConnected) {
      setIsOnline(true); // this will re-enable your app
    } else {
      alert("Still offline bro 🌧️");
    }
  };

  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#1c1c1c",
      }}
    >
      <AppText>Seems like youre Disconnected</AppText>
      <Image source={image}></Image>
      <Button title="Try Again 🔁" onPress={tryReconnect} />
    </View>
  );
}
