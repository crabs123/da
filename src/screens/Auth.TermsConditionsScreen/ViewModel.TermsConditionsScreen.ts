import { TCheckBox } from "./Model.TermsConditionsScreen";
import React from "react";
import { Modalize } from "react-native-modalize";
import { useSelector } from "@src/hooks";
import NavigationManager from "@src/helper/NavigationManager";
import { EGuestScreenList } from "@src/models/RouterNamesModel";

const ViewModel = (activationCode: string, lastName: string) => {
  const modalizeRef = React.useRef<Modalize>(null);
  const { language } = useSelector((state) => state.universal);

  const [checkboxTerm, setCheckboxTerm] = React.useState(false);
  const [checkboxPrivacy, setCheckboxPrivacy] = React.useState(false);
  const [bottomSheetType, setBottomSheetType] = React.useState(TCheckBox.privacy);

  const _handleOnCheckBox = React.useCallback(
    (type: TCheckBox) => () => {
      if (type === TCheckBox.privacy) {
        setCheckboxPrivacy((prev) => !prev);
        return;
      }
      setCheckboxTerm((prev) => !prev);
    },
    [],
  );

  const canNext = React.useMemo(() => {
    return !!checkboxPrivacy && !!checkboxTerm;
  }, [checkboxPrivacy, checkboxTerm]);

  const _handleOpenDetail = React.useCallback(
    (type: TCheckBox) => () => {
      setBottomSheetType(type);
      modalizeRef.current?.open();
    },
    [],
  );

  const _handleGoToPersonalDetailScreen = React.useCallback(() => {
    NavigationManager.navigate(EGuestScreenList.PERSONAL_DETAILS_SCREEN, {
      activationCode,
      lastName,
    });
  }, [activationCode, lastName]);

  return {
    canNext,
    language,
    modalizeRef,
    checkboxTerm,
    checkboxPrivacy,
    bottomSheetType,
    _handleOpenDetail,
    _handleOnCheckBox,
    _handleGoToPersonalDetailScreen,
  };
};

export default ViewModel;
