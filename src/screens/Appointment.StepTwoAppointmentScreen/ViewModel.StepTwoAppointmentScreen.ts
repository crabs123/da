import React from "react";
import {
  ICalendarComponentProps,
  ICalendarComponentRef,
} from "@src/components/CalendarComponent/Model.CalendarComponent";
import { DateManager } from "@src/helper/DateManager";
import { useDispatch, useSelector } from "@src/hooks";
import { MyDay } from "@src/helper/DateManager";
import NavigationManager from "../../helper/NavigationManager";
import { EAppointmentScreenList } from "../../models/RouterNamesModel";

const ViewModel = () => {
  const dispatch = useDispatch();
  const calendarComponentRef = React.createRef<ICalendarComponentRef>();

  const { selectedMonth: monthName } = useSelector((state) => state.universal);
  const [selectedDates, setSelectedDates] = React.useState({
    singleDate: new MyDay().createNewDay(new Date().getTime()),
    startDate: new MyDay().createNewDay(new Date().getTime()),
    endDate: new MyDay().createNewDay(new Date().getTime()),
  });
  const [selectedMonth, setSelectedMonth] = React.useState(monthName);

  const MyCalendar = React.useMemo(() => new DateManager(5, 5).getMonthList(), []);
  const CalendarComponentProps: ICalendarComponentProps = {
    selectedMonth,
    setSelectedDates,
    setSelectedMonth,
    MyCalendar,
    selectedDates,
    disableRange: true,
    notShowOutOfMonth: true,
  };

  const canNext = React.useMemo(() => {
    return true;
  }, []);

  const _handleGoToNextStep = React.useCallback(() => {
    const param = {};
    NavigationManager.navigate(EAppointmentScreenList.STEP_THREE_APPOINTMENT_SCREEN, param);
  }, []);

  React.useEffect(() => {
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedMonth]);

  return {
    canNext,
    _handleGoToNextStep,
    calendarComponentRef,
    CalendarComponentProps,
  };
};

export default ViewModel;
