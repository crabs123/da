import { BackgroundHeaderComponent, HeaderComponent } from "@src/components";
import { useSharedData } from "@src/hooks";
import React from "react";
import { Pressable, Text, TouchableOpacity, View } from "react-native";
import LottieView from "lottie-react-native";
import { ANIMATIONS, ICONS, TEXTS } from "@src/assets";
import styles from "./Styles.TermsConditionsScreen";
import { ELanguageOptions } from "@src/models/LanguageOptionsModel";
import { Modalize } from "react-native-modalize";
import ScaleManager from "@src/assets/ScaleManager";
import { EAvailableLanguages } from "@languages/LanguagesManager";
import { ITermsConditionsProps, TCheckBox } from "./Model.TermsConditionsScreen";
import ViewModel from "./ViewModel.TermsConditionsScreen";

const TermsConditionsScreen: React.FC<ITermsConditionsProps> = React.memo(({ route }) => {
  const { activationCode, lastName } = route?.params;
  const { colorUpdate, translate } = useSharedData();
  const {
    canNext,
    language,
    modalizeRef,
    checkboxTerm,
    checkboxPrivacy,
    bottomSheetType,
    _handleOpenDetail,
    _handleOnCheckBox,
    _handleGoToPersonalDetailScreen,
  } = ViewModel(activationCode, lastName);

  const _renderContentModal = React.useCallback(() => {
    if (bottomSheetType === TCheckBox.privacy) {
      return (
        <View style={colorUpdate(styles.contentContainer)}>
          <Text style={colorUpdate(styles.headerText)}>{translate(ELanguageOptions.privacy_policy)}</Text>
          <Text style={colorUpdate(styles.contentText)}>{TEXTS.policies(language as EAvailableLanguages)}</Text>
          <Text style={colorUpdate(styles.contentText)}>{TEXTS.policies(language as EAvailableLanguages)}</Text>
          <Text style={colorUpdate(styles.contentText)}>{TEXTS.policies(language as EAvailableLanguages)}</Text>
        </View>
      );
    }
    return (
      <View style={colorUpdate(styles.contentContainer)}>
        <Text style={colorUpdate(styles.headerText)}>{translate(ELanguageOptions.terms_of_use)}</Text>
        <Text style={colorUpdate(styles.contentText)}>{TEXTS.terms(language as EAvailableLanguages)}</Text>
        <Text style={colorUpdate(styles.contentText)}>{TEXTS.terms(language as EAvailableLanguages)}</Text>
        <Text style={colorUpdate(styles.contentText)}>{TEXTS.terms(language as EAvailableLanguages)}</Text>
      </View>
    );
  }, [colorUpdate, bottomSheetType, language, translate]);

  return (
    <View style={colorUpdate(styles.container)}>
      <BackgroundHeaderComponent>
        <HeaderComponent transparentBackground={true} />
      </BackgroundHeaderComponent>
      <View>
        <LottieView style={colorUpdate(styles.lottie)} source={ANIMATIONS.protect} autoPlay loop />
      </View>
      <View style={colorUpdate(styles.bodyContainer)}>
        <Pressable onPress={_handleOnCheckBox(TCheckBox.term)} style={styles.checkboxContainer}>
          {ICONS.CheckedIcon({ isChecked: checkboxTerm, size: ScaleManager.scaleSizeHeight(30) })}
          <Text>
            <Text style={styles.acceptText}>{` ${translate(ELanguageOptions.accept)} `}</Text>
            <Text onPress={_handleOpenDetail(TCheckBox.term)} style={styles.termOfUseText}>{`${translate(
              ELanguageOptions.terms_of_use,
            )}`}</Text>
          </Text>
        </Pressable>

        <Pressable onPress={_handleOnCheckBox(TCheckBox.privacy)} style={styles.checkboxContainer}>
          {ICONS.CheckedIcon({ isChecked: checkboxPrivacy, size: ScaleManager.scaleSizeHeight(30) })}
          <Text>
            <Text style={styles.acceptText}>{` ${translate(ELanguageOptions.accept)} `}</Text>
            <Text onPress={_handleOpenDetail(TCheckBox.privacy)} style={styles.termOfUseText}>{`${translate(
              ELanguageOptions.privacy_policy,
            )}`}</Text>
          </Text>
        </Pressable>
      </View>
      <Modalize
        withHandle={true}
        handlePosition={"outside"}
        modalTopOffset={10}
        handleStyle={styles.handleStyle}
        modalHeight={ScaleManager.WINDOW_HEIGHT - 200}
        modalStyle={styles.modalStyle}
        ref={modalizeRef}
      >
        {_renderContentModal()}
      </Modalize>

      <View style={{ flex: 1 }} />
      <TouchableOpacity
        disabled={!canNext}
        style={colorUpdate(styles.nextButtonContainerStyle(canNext))}
        onPress={_handleGoToPersonalDetailScreen}
      >
        <Text style={colorUpdate(styles.nextTextStyle(canNext))}>{translate(ELanguageOptions.next)}</Text>
      </TouchableOpacity>
    </View>
  );
});

TermsConditionsScreen.displayName = "TermsConditionsScreen";
export default TermsConditionsScreen as React.ComponentType;
