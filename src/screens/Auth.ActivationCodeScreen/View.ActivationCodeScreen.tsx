import { BackgroundHeaderComponent, DismissKeyboardComponent, HeaderComponent, InputComponent } from "@src/components";
import HelperManager from "@src/helper/HelperManager";
import { useSharedData } from "@src/hooks";
import { ELanguageOptions } from "@src/models/LanguageOptionsModel";
import React from "react";
import { Text, TouchableOpacity, View } from "react-native";
import { CodeField, RenderCellOptions } from "react-native-confirmation-code-field";
import styles from "./Styles.ActivationCodeScreen";
import ViewModel from "./ViewModel.ActivationCodeScreen";

const ActivationCodeScreen = React.memo(() => {
  const {
    ref,
    props,
    canNext,
    lastName,
    setLastName,
    activationCode,
    _handleOnChangeText,
    getCellOnLayoutHandler,
    _handleGoToTermsAndConditions,
  } = ViewModel();

  const { translate, colorUpdate } = useSharedData();

  const _renderCell = React.useCallback(
    ({ index, symbol, isFocused }: RenderCellOptions) => {
      const filledValue = HelperManager.checkInvalidity(activationCode.charAt(index));
      return (
        <View style={styles.cellWrapperStyle(isFocused || !filledValue)}>
          <Text key={index} style={colorUpdate(styles.textVerificationCell)} onLayout={getCellOnLayoutHandler(index)}>
            {symbol ?? null}
          </Text>
        </View>
      );
    },
    [colorUpdate, getCellOnLayoutHandler, activationCode],
  );

  return (
    <DismissKeyboardComponent>
      <View style={colorUpdate(styles.container)}>
        <BackgroundHeaderComponent>
          <HeaderComponent transparentBackground={true} />
        </BackgroundHeaderComponent>
        <View style={styles.bodyContainer}>
          <View style={colorUpdate(styles.contentContainer)}>
            <Text style={colorUpdate(styles.activationQuestionText)}>
              {translate(ELanguageOptions.enter_your_activation_code_and_last_name)}
            </Text>
            <Text style={colorUpdate(styles.titleText)}>{translate(ELanguageOptions.activationCode)}</Text>
            <View style={colorUpdate(styles.codeFieldContainer)}>
              <CodeField
                ref={ref}
                {...props}
                cellCount={6}
                value={activationCode}
                renderCell={_renderCell}
                keyboardType="number-pad"
                textContentType="oneTimeCode"
                onChangeText={_handleOnChangeText}
              />
            </View>

            <Text style={colorUpdate(styles.titleText)}>{translate(ELanguageOptions.last_name)}</Text>
            <InputComponent
              {...{
                value: lastName,
                setValue: setLastName,
                maxLength: 50,
              }}
            />
          </View>
          <TouchableOpacity
            disabled={!canNext}
            style={colorUpdate(styles.nextButtonContainerStyle(canNext))}
            onPress={_handleGoToTermsAndConditions}
          >
            <Text style={colorUpdate(styles.nextTextStyle(canNext))}>{translate(ELanguageOptions.next)}</Text>
          </TouchableOpacity>
        </View>
      </View>
    </DismissKeyboardComponent>
  );
});

ActivationCodeScreen.displayName = "ActivationCodeScreen";
export default ActivationCodeScreen;
