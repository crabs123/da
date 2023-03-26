import { AppointmentServices } from "@src/services";
import { IDoctor, IGetSearchDoctorApi, ISpecialty } from "@src/models/AppointmentServicesModel";
import React from "react";
import NavigationManager from "@src/helper/NavigationManager";
import { EAppointmentScreenList } from "@src/models/RouterNamesModel";
import { EFocusTypes } from "./Model.StepOneAppointmentScreen";

const ViewModel = () => {
  const [selectFocusSpecialty, setSelectFocusSpecialty] = React.useState(false);
  const [doctorList, setDoctorList] = React.useState([] as IDoctor[]);
  const [selectFocusAppointment, setSelectFocusAppointment] = React.useState(false);
  const [selectedDoctor, setSelectedDoctor] = React.useState("-1");
  const [selectedSpecialty, setSelectedSpecialty] = React.useState({
    code: "-1",
    display: "",
    system: "",
  });

  const [selectedAppointmentType, setSelectedAppointmentType] = React.useState({
    id: "-1",
  });

  const _handleSelectDoctor = React.useCallback(
    (id: string) => () => {
      setSelectedDoctor((prev) => (prev === id ? "-1" : id));
    },
    [],
  );

  const _handleGoToNextStep = React.useCallback(() => {
    const param = {};
    NavigationManager.navigate(EAppointmentScreenList.STEP_TWO_APPOINTMENT_SCREEN, param);
  }, []);

  const canNext = React.useMemo(() => {
    if (selectedDoctor !== "-1" && selectedAppointmentType.id !== "-1") {
      return true;
    }

    return false;
  }, [selectedAppointmentType, selectedDoctor]);
  const [specialtyList, setSpecialtyList] = React.useState<ISpecialty[]>([]);

  const _fetchSpecialtyAndAppointmentType = React.useCallback(async () => {
    try {
      const response = await AppointmentServices.getSpecialtyListApi();
      setSpecialtyList([...response]);
    } catch (error) {
      console.log("📢 [ViewModel.StepOneAppointmentScreen.ts:10]", error);
    }
  }, []);

  const _fetchDoctorList = React.useCallback(async () => {
    if (selectedSpecialty.code === "-1") return;
    try {
      const params: IGetSearchDoctorApi = {
        page: 1,
        limit: 100,
        locationId: "1",
        specialtyCode: selectedSpecialty.code,
      };
      const response = await AppointmentServices.getSearchDoctorApi(params);
      if (!!response) {
        setDoctorList([...response.content]);
      }
    } catch (error) {
      console.log("📢 [ViewModel.StepOneAppointmentScreen.ts:21]", error);
    }
  }, [selectedSpecialty.code]);

  const _onFocus = React.useCallback(
    (type: EFocusTypes) => () => {
      if (type === EFocusTypes.specialty) {
        setSelectFocusSpecialty(true);
        setSelectFocusAppointment(false);
        return;
      }
      setSelectFocusSpecialty(false);
      setSelectFocusAppointment(true);
    },
    [],
  );

  const _onBlur = React.useCallback(() => {
    setSelectFocusSpecialty(false);
  }, []);

  React.useEffect(() => {
    _fetchSpecialtyAndAppointmentType();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  React.useEffect(() => {
    _fetchDoctorList();
  }, [_fetchDoctorList]);

  return {
    _onBlur,
    canNext,
    _onFocus,
    doctorList,
    specialtyList,
    selectedDoctor,
    selectedSpecialty,
    _handleSelectDoctor,
    _handleGoToNextStep,
    setSelectedSpecialty,
    selectFocusSpecialty,
    selectFocusAppointment,
    selectedAppointmentType,
    setSelectedAppointmentType,
  };
};

export default ViewModel;
