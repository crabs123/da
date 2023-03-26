import React from "react";
import { ISectionInfo } from "./Model.StepThreeAppointmentScreen";
import { ELanguageOptions } from "../../models/LanguageOptionsModel";
import NavigationManager from "../../helper/NavigationManager";
import { EAppointmentScreenList } from "../../models/RouterNamesModel";

const ViewModel = () => {
  const InfoSections: ISectionInfo[] = [
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
    {
      title: ELanguageOptions.booking_details,
      properties: [
        {
          [ELanguageOptions.date]: new Date().toDateString(),
          [ELanguageOptions.time]: new Date().toDateString(),
          [ELanguageOptions.doctor]: "Miles Tyler",
          [ELanguageOptions.clinic]: "No.1 Clinic",
          [ELanguageOptions.specialty]: "Cardiology",
          [ELanguageOptions.short_appointment_type]: "Routine check-up",
        },
      ],
    },
  ];

  const _handleGoToNextStep = React.useCallback(() => {
    const param = {};
    NavigationManager.navigate(EAppointmentScreenList.APPOINTMENT_BOOK_SUCCESS_SCREEN, param);
  }, []);

  return {
    InfoSections,
    _handleGoToNextStep,
  };
};

export default ViewModel;
