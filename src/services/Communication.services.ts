import ServicesManager from "@src/helper/ServicesManager";

class CommunicationServices {
  private static axiosInstance = new ServicesManager(ServicesManager.COMMUNICATION_URL).getAxiosInstance(false);

  public static getRoomTokenApi = (roomName: string): Promise<{ token: string }> => {
    return this.axiosInstance
      .post("join-room", {
        roomName,
      })
      .then((res) => res.data);
  };
}

export default CommunicationServices;
