import { EHealthScreenList } from "@src/models/RouterNamesModel";
import React from "react";
import NavigationManager from "@helper/NavigationManager";
import { AuthenticationServices } from "@src/services";
import { IPatientProfile } from "@src/models/AuthenticationServicesModel";
import { useDispatch, useHealthKit, useSelector } from "@src/hooks";
import AuthActions from "@src/globalState/authState/auth.actions";
import { EAvailableLanguages } from "../../languages/LanguagesManager";
import UniversalActions from "@src/globalState/universalState/universal.actions";
import MediaServices from "@src/services/Media.services";

const ViewModel = () => {
  const dispatch = useDispatch();
  useHealthKit();
  const { language } = useSelector((state) => state.universal);
  const { userProfile } = useSelector((state) => state.auth);

  const _handleGoToProfile = React.useCallback(() => {
    NavigationManager.navigate(EHealthScreenList.USER_PROFILE_SCREEN);
  }, []);

  const _addDataToProps = React.useCallback((input: Object, data: any) => {
    return {
      ...input,
      data,
    };
  }, []);

  const _fetchProfile = React.useCallback(async () => {
    try {
      const response = await AuthenticationServices.getProfileApi();
      const patientProfile: IPatientProfile = {
        ...response.data,
        dateOfBirth: new Date(response.data.dateOfBirth),
      };
      const base64Image = await MediaServices.getImageApi();
      patientProfile.avatar = "data:image/png;base64," + base64Image;
      if (patientProfile.language.toLowerCase() === EAvailableLanguages.en && language === EAvailableLanguages.en) {
        dispatch(UniversalActions._switchLanguageAction(EAvailableLanguages.en));
      }
      dispatch(AuthActions._setPatientProfileAction(patientProfile));
    } catch (error) {
      console.log("📢 [ViewModel.HomeScreen.ts:14]", error);
    }
  }, [dispatch, language]);

  React.useEffect(() => {
    _fetchProfile();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return { userProfile, _addDataToProps, _handleGoToProfile };
};

export default ViewModel;
