import { IDay, TMonth } from "@src/helper/DateManager";

export interface ICalendarComponentProps {
  selectedMonth: string;
  setSelectedMonth: React.Dispatch<React.SetStateAction<string>>;
  MyCalendar: TMonth[];
  selectedDates: ICustomizedCalendar;
  disableRange: boolean;
  notShowOutOfMonth: boolean;
  setSelectedDates: any;
}

export enum EBackOrForward {
  backward,
  forward,
}

export interface ICalendarComponentRef {
  show(): void;
  hide(): void;
  submit(): void;
}

export interface ICustomizedCalendar {
  singleDate: IDay;
  startDate: IDay;
  endDate: IDay;
}
