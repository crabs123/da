import { IRoute } from "@src/models/CommonModel";
import { INewUser } from "@src/models/EntitiesModel";

export type TSelectClinicScreenProps = IRoute<INewUser>;

export interface IFakeClinic {
  id: string;
  name: string;
  address: string;
  uri: string;
  phoneNumber: string;
}

export const FAKE_CLINIC_ARR: IFakeClinic[] = [
  {
    id: "1",
    name: "Healthway Medical",
    address: "No. 142 Saint Louis avenue, Cambridge district, London +0908127387 8127",
    uri: "https://healthwaymedical.com/wp-content/uploads/2022/01/Medico-Clinic-Surgery-1024x681.jpg",
    phoneNumber: "+0908127387 8127",
  },
  {
    id: "2",
    uri: "https://healthwaymedical.com/wp-content/uploads/2022/01/Medico-Clinic-Surgery-1024x681.jpg",
    name: "My Heath clinic",
    address: "No. 142 Saint Louis avenue, Cambridge district, London",
    phoneNumber: "+0908127387 8127",
  },
  {
    id: "3",
    uri: "https://healthwaymedical.com/wp-content/uploads/2022/01/Medico-Clinic-Surgery-1024x681.jpg",
    name: "My wings clinic",
    address: "No. 142 Saint Louis avenue, Cambridge district, London",
    phoneNumber: "+0908127387 8127",
  },
  {
    id: "4",
    uri: "https://healthwaymedical.com/wp-content/uploads/2022/01/Medico-Clinic-Surgery-1024x681.jpg",
    name: "My future clinic",
    address: "No. 142 Saint Louis avenue, Cambridge district, London",
    phoneNumber: "+0908127387 8127",
  },
  {
    id: "5",
    uri: "https://healthwaymedical.com/wp-content/uploads/2022/01/Medico-Clinic-Surgery-1024x681.jpg",
    name: "My Life clinic",
    address: "No. 142 Saint Louis avenue, Cambridge district, London",
    phoneNumber: "+0908127387 8127",
  },
  {
    id: "6",
    uri: "https://healthwaymedical.com/wp-content/uploads/2022/01/Medico-Clinic-Surgery-1024x681.jpg",
    name: "My hospital clinic",
    address: "No. 142 Saint Louis avenue, Cambridge district, London ",
    phoneNumber: "+0908127387 8127",
  },
];
