import ServicesManager from "@src/helper/ServicesManager";
import { Asset } from "react-native-image-picker";

class MediaServices {
  private static axiosInstance = new ServicesManager(ServicesManager.DEFAULT_URL).getAxiosInstance(false, true);

  public static uploadImageApi = async (file: Asset): Promise<null> => {
    const formData = new FormData();
    formData.append("file", {
      uri: file.uri,
      type: file.type,
      name: file.fileName,
    });

    return this.axiosInstance.postForm("media-service/user/profile", formData).then((res) => res.data);
  };

  public static getImageApi = async (): Promise<string> => {
    return this.axiosInstance.get("media-service/user/profile").then((res) => res.data);
  };
}

export default MediaServices;
