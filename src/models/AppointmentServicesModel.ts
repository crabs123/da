export interface ISpecialty {
  system: string;
  code: string;
  display: string;
}

export interface IGetSearchDoctorApi {
  page: number;
  limit: number;
  locationId: string;
  specialtyCode: string;
}

export interface IAvailableTime {
  allday: boolean;
  dayOfWeek: string[];
  endTime: string;
  startTime: string;
}

export interface INotAvailable {
  description: string;
  endDate: string;
  startDate: string;
}

export interface IAvailableDate {
  availableTime: IAvailableTime[];
  endDate: string;
  notAvailable: INotAvailable[];
}

export interface IDoctor {
  id: string;
  title: null | string;
  yearOfExperience: number;
  doctorName: string;
  avatar: string;
  availableDate: [];
}

export interface IGetSearchDoctorResponseApi {
  content: IDoctor[];
  pageSize: number;
  totalPages: number;
  totalElements: number;
}
