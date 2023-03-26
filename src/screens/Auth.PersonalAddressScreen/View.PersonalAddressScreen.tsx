import { BackgroundHeaderComponent, DismissKeyboardComponent, HeaderComponent, InputComponent } from "@src/components";
import { ELanguageOptions } from "@src/models/LanguageOptionsModel";
import React from "react";
import { Text, TouchableOpacity, View } from "react-native";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import ViewModel from "./ViewModel.PersonalAddressScreen";
import styles from "./Styles.PersonalAddressScreen";
import { TPersonalAddressScreenProps } from "./Model.PersonalAddressScreen";

const PersonalAddressScreen: React.FC<TPersonalAddressScreenProps> = React.memo(({ route }) => {
  const { canNext, personalAddressData, translate, _handleGoToNextScreen } = ViewModel(route?.params);

  const _renderFlatList = React.useCallback(() => {
    const output: JSX.Element[] = [];

    for (const field of personalAddressData) {
      output.push(
        <React.Fragment key={field.id}>
          <Text style={styles.textInputTitle}>{field.label}</Text>
          <InputComponent
            {...{
              value: field.value,
              setValue: field.setValue,
              keyboardType: field.keyboardType,
              onBlur: field.onBlur,
              errorMessageText: field.errorMessage,
            }}
          />
        </React.Fragment>,
      );
    }

    return <KeyboardAwareScrollView>{output}</KeyboardAwareScrollView>;
  }, [personalAddressData]);

  return (
    <DismissKeyboardComponent>
      <View style={styles.container}>
        <BackgroundHeaderComponent>
          <HeaderComponent mainTitle={translate(ELanguageOptions.personal_address)} transparentBackground={true} />
        </BackgroundHeaderComponent>
        <View style={styles.spacer} />
        {_renderFlatList()}
        <TouchableOpacity
          onPress={_handleGoToNextScreen}
          disabled={!canNext}
          style={styles.nextButtonContainerStyle(canNext)}
        >
          <Text style={styles.nextTextStyle(canNext)}>{translate(ELanguageOptions.next)}</Text>
        </TouchableOpacity>
      </View>
    </DismissKeyboardComponent>
  );
});

PersonalAddressScreen.displayName = "PersonalAddressScreen";
export default PersonalAddressScreen as React.ComponentType;
