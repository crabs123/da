export interface IRenderLabelProps {
  color: string;
  focused: boolean;
  route: any;
}

export enum EAppointmentTypes {
  upcoming,
  previous,
}

export interface IUpcomingRouteItem {
  id: string;
  date: Date;
  doctorName: string;
  serviceName: string;
  clinicName: string;
  duration: string;
  type: EAppointmentTypes;
}

export const FAKE_UPCOMING_APPOINTMENTS = [
  {
    id: "1",
    date: new Date(),
    doctorName: "Dr. Miles Tyler",
    serviceName: "Heart Surgery Service",
    clinicName: "NO. 1 Clinic",
    duration: "1 Hour",
    type: EAppointmentTypes.upcoming,
  },
  {
    id: "2",
    date: new Date(),
    doctorName: "Dr. Edwards",
    serviceName: "Hand Surgery Service",
    clinicName: "NO. 2 Clinic",
    duration: "5 Hour",
    type: EAppointmentTypes.upcoming,
  },
  {
    id: "3",
    date: new Date(),
    doctorName: "Dr. James",
    serviceName: "Leg Surgery Service",
    clinicName: "NO. 4 Clinic",
    duration: "2 Hour",
    type: EAppointmentTypes.upcoming,
  },
  {
    id: "4",
    date: new Date(),
    doctorName: "Dr. Robert",
    serviceName: "Lung Surgery Service",
    clinicName: "NO. 0 Clinic",
    duration: "2 Hour",
    type: EAppointmentTypes.upcoming,
  },
];
