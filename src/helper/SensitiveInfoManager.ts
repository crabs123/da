import RNSInfo from "react-native-sensitive-info";

class SensitiveInfoManager {
  private static readonly options = {
    sharedPreferencesName: "RNSInfoSharedPreferences",
    keychainService: "RNSInfoKeychainService",
  };

  public static readonly availableKeys = {
    test: "test",
    test2: "test2",
    test3: "test3",
  };

  public static setItem = async <T>(key: string, value: T, callback: Function): Promise<void> => {
    try {
      const result = await RNSInfo.setItem(key, JSON.stringify(value), this.options);
      if (!!callback) {
        callback(result as T);
      }
    } catch (error) {
      console.log("📢 [SensitiveInfoManager.setItem]", error);
    }
  };

  public static getItem = async <T>(key: string) => {
    try {
      const result = await RNSInfo.getItem(key, this.options);
      return JSON.parse(result) as T;
    } catch (error) {
      console.log("📢 [SensitiveInfoManager.getItem]", error);
    }
  };

  public static deleteItem = async (key: string, callback?: Function): Promise<void> => {
    try {
      const result = await RNSInfo.deleteItem(key, this.options);
      if (!!callback) {
        callback(result);
      }
    } catch (error) {
      console.log("📢 [SensitiveInfoManager.deleteItem]", error);
    }
  };

  public static getAllItems = async () => {
    try {
      const result = await RNSInfo.getAllItems(this.options);
      return result;
    } catch (error) {
      console.log("📢 [SensitiveInfoManager.ts:getAllItems]", error);
    }
  };
}

export default SensitiveInfoManager;
