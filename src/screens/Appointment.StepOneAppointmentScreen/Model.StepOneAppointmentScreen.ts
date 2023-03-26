export interface IAppointmentType {
  id: string;
  value: string;
  label: string;
}

export enum EFocusTypes {
  none,
  specialty,
  appointment,
}

export const FAKE_APPOINTMENT_TYPES: IAppointmentType[] = [
  {
    id: "1",
    value: "test1",
    label: "Test 1",
  },
  {
    id: "2",
    value: "test2",
    label: "Test 2",
  },
  {
    id: "3",
    value: "test3",
    label: "Test 3",
  },
  {
    id: "4",
    value: "test4",
    label: "Test 4",
  },
];
