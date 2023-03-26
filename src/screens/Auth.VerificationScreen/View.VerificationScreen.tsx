import { Text, TouchableOpacity, View } from "react-native";
import React from "react";
import styles from "./Styles.VerificationScreen";
import { COLORS } from "@src/assets";
import FONTS from "@src/assets/fonts";
import { CodeField, RenderCellOptions } from "react-native-confirmation-code-field";
import { TVerificationScreenProps } from "./Model.VerificationScreen";
import ViewModel from "./ViewModel.VerificationScreen";
import { BackgroundHeaderComponent, DismissKeyboardComponent, HeaderComponent } from "@src/components";
import HelperManager from "@src/helper/HelperManager";
import { ELanguageOptions } from "@src/models/LanguageOptionsModel";

const VerificationScreen: React.FC<TVerificationScreenProps> = React.memo(({ route }) => {
  const { ref, value, props, translate, _handleResendCode, _handleOnChangeText, getCellOnLayoutHandler } = ViewModel(
    route?.params?.emailValue,
  );

  const _renderCell = React.useCallback(
    ({ index, symbol, isFocused }: RenderCellOptions) => {
      const filledValue = HelperManager.checkInvalidity(value.charAt(index));
      return (
        <View style={styles.cellWrapperStyle(isFocused || !filledValue)}>
          <Text key={index} style={styles.textVerificationCell} onLayout={getCellOnLayoutHandler(index)}>
            {symbol ?? null}
          </Text>
        </View>
      );
    },
    [getCellOnLayoutHandler, value],
  );

  return (
    <DismissKeyboardComponent>
      <View style={styles.container}>
        <BackgroundHeaderComponent>
          <HeaderComponent transparentBackground={true} />
        </BackgroundHeaderComponent>
        <View style={styles.bodyContainer}>
          <Text style={styles.forgotPasswordText}>{translate(ELanguageOptions.verification_code)}</Text>
          <Text style={styles.textWrapper}>
            <Text style={styles.detailText}>{translate(ELanguageOptions.please_enter_verification_code) + " "}</Text>
            <Text style={[styles.detailText, { color: COLORS.darkOneColor, fontFamily: FONTS.interSemiBold }]}>
              {route.params.emailValue}
            </Text>
          </Text>
        </View>
        <View style={styles.codeFieldContainer}>
          <CodeField
            ref={ref}
            {...props}
            value={value}
            onChangeText={_handleOnChangeText}
            cellCount={6}
            keyboardType="number-pad"
            textContentType="oneTimeCode"
            renderCell={_renderCell}
          />
          <View style={styles.footerContainer}>
            <Text style={styles.notReceiveCodeText}>
              {translate(ELanguageOptions.you_have_not_receive_the_verification_code)}
            </Text>
            <TouchableOpacity onPress={_handleResendCode} style={styles.resendButton}>
              <Text style={styles.resendText}>{translate(ELanguageOptions.click_here_to_resend)}</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </DismissKeyboardComponent>
  );
});

VerificationScreen.displayName = "VerificationScreen";
export default VerificationScreen as React.ComponentType;
