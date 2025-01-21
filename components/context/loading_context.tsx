import React, { useContext, useState, FC, ReactNode, useEffect } from "react";
import { View, StyleSheet } from "react-native";
import { ActivityIndicator } from "react-native-paper";

export interface LoadingContextType {
  isLoading: loadingType;
  setIsLoading: React.Dispatch<React.SetStateAction<boolean>>;
}

export const LoadingContext = React.createContext<LoadingContextType>({
  isLoading: false,
  setIsLoading: () => {},
});

interface Props {
  children: ReactNode;
}
export type loadingType = boolean;

const LoadingHolder: FC<Props> = ({ children }) => {
  const [isLoading, setIsLoading] = useState<loadingType>(false);

  useEffect(() => {
    if (isLoading) {
      const timeoutId = setTimeout(() => {
        setIsLoading(false);
      }, 10000);

      // Cleanup timeout
      return () => clearTimeout(timeoutId);
    }
  }, [isLoading]);

  return (
    <LoadingContext.Provider value={{ isLoading, setIsLoading }}>
      {isLoading && (
        <View style={styles.overlay}>
          <ActivityIndicator size="large" color="#6200ee" />
        </View>
      )}
      {children}
    </LoadingContext.Provider>
  );
};

export const useLoadingContext = () => useContext(LoadingContext);

export default LoadingHolder;

const styles = StyleSheet.create({
  overlay: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)", // Optional semi-transparent background
    zIndex: 1000, // Ensure it appears on top of other content
  },
});
