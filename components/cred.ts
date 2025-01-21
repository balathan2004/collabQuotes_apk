import AsyncStorage from "@react-native-async-storage/async-storage";
import { UserDataInterface } from "./interfaces";

const storeData = async (key: string, value: UserDataInterface) => {
  try {
    const jsonValue = JSON.stringify(value);
    await AsyncStorage.setItem(key, jsonValue);
  } catch (e) {
    // saving error
  }
};

const getData = async (key: string): Promise<UserDataInterface | null> => {
  try {
    const jsonValue = await AsyncStorage.getItem(key);
    return jsonValue != null
      ? (JSON.parse(jsonValue) as UserDataInterface)
      : null;
  } catch (e) {
    return null;
  }
};

export { storeData, getData };
