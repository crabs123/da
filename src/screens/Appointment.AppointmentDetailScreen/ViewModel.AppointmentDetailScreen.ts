import React from "react";
import { ELanguageOptions } from "../../models/LanguageOptionsModel";
import NavigationManager from "../../helper/NavigationManager";
import { EAppointmentScreenList } from "../../models/RouterNamesModel";
import { ISectionInfo } from "../Appointment.StepThreeAppointmentScreen/Model.StepThreeAppointmentScreen";

const ViewModel = () => {
  const InfoSections: ISectionInfo[] = [
    {
      title: ELanguageOptions.booking_details,
      properties: [
        {
          [ELanguageOptions.short_appointment_status]: "Booked",
          [ELanguageOptions.date]: new Date().toDateString(),
          [ELanguageOptions.time]: new Date().toDateString(),
          [ELanguageOptions.doctor]: "Miles Tyler",
          [ELanguageOptions.clinic]: "No.1 Clinic",
          [ELanguageOptions.specialty]: "Cardiology",
          [ELanguageOptions.short_appointment_type]: "Routine check-up",
        },
      ],
    },
    {
      title: ELanguageOptions.your_information,
      properties: [
        {
          [ELanguageOptions.full_name]: "Angela Chou",
          [ELanguageOptions.email]: "angela.c@gmail.com",
          [ELanguageOptions.mobile_no]: "+65 97623 432",
        },
      ],
    },
  ];

  const _handleCallNow = React.useCallback(() => {
    const param = {};
    NavigationManager.navigate(EAppointmentScreenList.APPOINTMENT_VIDEO_CALL_SCREEN, param);
  }, []);

  return {
    InfoSections,
    _handleCallNow,
  };
};

export default ViewModel;
