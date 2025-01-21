import React, { useContext, useState, FC, ReactNode, useEffect } from "react";
import { View, StyleSheet } from "react-native";
import { ActivityIndicator } from "react-native-paper";
import { UserDataInterface } from "../interfaces";

export type UserCredType = UserDataInterface | null;

export interface UserContextType {
  userCred: UserCredType;
  setUserCred: React.Dispatch<React.SetStateAction<UserCredType>>;
}

export const UserContext = React.createContext<UserContextType>({
  userCred: null,
  setUserCred: () => {},
});

interface Props {
  children: ReactNode;
}

const UserCredHolder: FC<Props> = ({ children }) => {
  const [userCred, setUserCred] = useState<UserCredType>(null);

  return (
    <UserContext.Provider value={{ userCred, setUserCred }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUserContext = () => useContext(UserContext);

export default UserCredHolder;
