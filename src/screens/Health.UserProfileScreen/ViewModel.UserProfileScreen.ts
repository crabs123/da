import AuthActions from "@src/globalState/authState/auth.actions";
import { useDispatch, useSelector, useTranslate } from "@src/hooks";
import React from "react";
import { Asset, launchImageLibrary } from "react-native-image-picker";
import { IBottomTabComponentRef } from "@src/components/BottomSheetComponent/Model.BottomSheetComponent";
import NavigationManager from "@src/helper/NavigationManager";
import { EHealthScreenList } from "@src/models/RouterNamesModel";
import ScaleManager from "@src/assets/ScaleManager";
import HardwarePermissionsManager from "@src/helper/HardwarePermissionsManager";
import HelperManager from "@src/helper/HelperManager";
import UniversalActions from "@src/globalState/universalState/universal.actions";
import { AuthenticationServices } from "@src/services";
import { IPersonalInfoSection } from "./Model.UserProfileScreen";
import moment from "moment";
import { DateManager } from "@src/helper/DateManager";
import { ELanguageOptions } from "@src/models/LanguageOptionsModel";
import { EAvailableLanguages } from "@src/languages/LanguagesManager";
import MediaServices from "@src/services/Media.services";
import { IPatientProfile } from "@src/models/AuthenticationServicesModel";

const ViewModel = () => {
  const { userProfile } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const translate = useTranslate();
  const bottomSheetForwardRef = React.createRef<IBottomTabComponentRef>();
  const bottomSheetForwardRefV2 = React.createRef<IBottomTabComponentRef>();

  const _handleCloseBottomSheet = React.useCallback(() => {
    bottomSheetForwardRef.current?.close();
    bottomSheetForwardRefV2.current?.close();
  }, [bottomSheetForwardRef, bottomSheetForwardRefV2]);

  const _handleGoToUpdateProfile = React.useCallback(() => {
    NavigationManager.navigate(EHealthScreenList.UPDATE_PROFILE_SCREEN);
  }, []);

  const _handleLogout = React.useCallback(() => {
    // socketIO.emit(EWebsocketMediaStatus.offline, auth?.userId ?? "");
    dispatch(AuthActions._logoutAction());
  }, [dispatch]);

  const _handleOpenModalLogout = React.useCallback(() => {
    bottomSheetForwardRef.current?.show();
  }, [bottomSheetForwardRef]);

  const _handleDeleteAccount = React.useCallback(() => {
    bottomSheetForwardRefV2.current?.show();
  }, [bottomSheetForwardRefV2]);

  const _handleChangeAvatar = React.useCallback(() => {
    HardwarePermissionsManager.checkCameraPermission({
      onCancel: () => {
        //do nothing
      },
      onResult: async (result: boolean) => {
        if (result) {
          try {
            const selectedImage = await launchImageLibrary({
              maxWidth: ScaleManager.scaleSizeHeight(800),
              maxHeight: ScaleManager.scaleSizeHeight(800),
              mediaType: "photo",
              quality: 1,
            });
            if (!HelperManager.checkInvalidity(selectedImage?.assets)) {
              const asset = (selectedImage?.assets as Asset[])[0];
              await MediaServices.uploadImageApi(asset);
              const patientProfile: IPatientProfile = {
                ...userProfile,
              };
              const base64Image = await MediaServices.getImageApi();
              patientProfile.avatar = "data:image/png;base64," + base64Image;

              dispatch(AuthActions._setPatientProfileAction(patientProfile));
            }
          } catch (error) {
            console.log("📢 [index.tsx:194]", error);
          }
        }
      },
    });
  }, [dispatch, userProfile]);

  const _handleConfirmDeleteAccount = React.useCallback(async () => {
    try {
      dispatch(UniversalActions._showLoadingAction());
      const res = await AuthenticationServices.deleteAccountApi();
      if (!!res) {
        dispatch(AuthActions._logoutAction());
      }
    } catch (error) {
      console.log("📢 [View.UserProfileScreen.tsx:98]", error);
    } finally {
      dispatch(UniversalActions._closeLoadingAction());
    }
  }, [dispatch]);

  const userData: IPersonalInfoSection[] = React.useMemo(
    () => [
      {
        title: translate(ELanguageOptions.personal_details),
        details: [
          {
            [translate(ELanguageOptions.full_name)]: `${userProfile.firstName} ${userProfile.lastName}`,
            [translate(ELanguageOptions.email)]: userProfile.email ?? "",
            [translate(ELanguageOptions.mobile_no)]: userProfile.phoneNumber ?? "",
            [translate(ELanguageOptions.date_of_birth)]: moment(userProfile.dateOfBirth).format(
              DateManager.DATE_FORMAT_V2,
            ),
          },
        ],
      },
      {
        title: translate(ELanguageOptions.personal_address),
        details: [
          {
            [translate(ELanguageOptions.state)]: userProfile.state ?? "",
            [translate(ELanguageOptions.city)]: userProfile.city ?? "",
            [translate(ELanguageOptions.district)]: userProfile.district ?? "",
            [translate(ELanguageOptions.ward)]: userProfile.ward ?? "",
            [translate(ELanguageOptions.address)]: userProfile.address ?? "",
          },
        ],
      },
      {
        title: translate(ELanguageOptions.clinic),
        details: [
          {
            [translate(ELanguageOptions.clinic_address)]: "ABC Clinic, 9 X Street, Bronx, NY 10200, U.S",
          },
        ],
      },
      {
        title: translate(ELanguageOptions.setting),
        details: [
          {
            [translate(ELanguageOptions.language)]:
              userProfile.language.toLowerCase() === EAvailableLanguages.vn ? "Tiếng Việt" : "English",
          },
        ],
      },
    ],
    [translate, userProfile],
  );

  return {
    userData,
    userProfile,
    _handleLogout,
    _handleChangeAvatar,
    _handleDeleteAccount,
    bottomSheetForwardRef,
    _handleOpenModalLogout,
    bottomSheetForwardRefV2,
    _handleCloseBottomSheet,
    _handleGoToUpdateProfile,
    _handleConfirmDeleteAccount,
  };
};

export default ViewModel;
