import ServicesManager from "@src/helper/ServicesManager";
import { IGetSearchDoctorApi, IGetSearchDoctorResponseApi, ISpecialty } from "@src/models/AppointmentServicesModel";

class AppointmentServices {
  private static axiosInstance = new ServicesManager(ServicesManager.DEFAULT_URL).getAxiosInstance(false);

  public static getSpecialtyListApi = (): Promise<ISpecialty[]> => {
    return this.axiosInstance.get("doctor/specialty-list").then((res) => res.data);
  };

  public static getSearchDoctorApi = (params: IGetSearchDoctorApi): Promise<IGetSearchDoctorResponseApi> => {
    return this.axiosInstance.post("doctor/search", params).then((res) => res.data);
  };
}

export default AppointmentServices;
