import { Text, TouchableOpacity, View } from "react-native";
import React from "react";
import styles from "./Styles.CreateNewPwScreen";
import ViewModel from "./ViewModel.CreateNewPwScreen";
import { TCreateNewPwScreenProps } from "./Model.CreateNewPwScreen";
import { BackgroundHeaderComponent, DismissKeyboardComponent, HeaderComponent, InputComponent } from "@src/components";
import { ELanguageOptions } from "@src/models/LanguageOptionsModel";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { ICONS } from "@src/assets";

const CreateNewPwScreen: React.FC<TCreateNewPwScreenProps> = React.memo(({ route }) => {
  const { canNext, translate, passwordFields, _handleVerify } = ViewModel(route?.params);

  const _renderFlatList = React.useCallback(() => {
    const output: JSX.Element[] = [];

    for (const field of passwordFields) {
      output.push(
        <React.Fragment key={field.id}>
          <Text style={styles.textInputTitle}>{field.label}</Text>
          <View style={styles.inputWrapper}>
            <InputComponent
              {...{
                value: field.value,
                setValue: field.setValue,
                keyboardType: field.keyboardType,
                onBlur: field.onBlur,
                errorMessageText: field.errorMessage,
                secureTextEntry: field.hidePassword,
              }}
            />
            <TouchableOpacity onPress={field.onHidePasswordIcon} style={styles.showHidePasswordButton}>
              {ICONS.ShowHidePasswordIcon({ show: field.hidePassword })}
            </TouchableOpacity>
          </View>
        </React.Fragment>,
      );
    }

    return <KeyboardAwareScrollView>{output}</KeyboardAwareScrollView>;
  }, [passwordFields]);

  return (
    <DismissKeyboardComponent>
      <View style={styles.container}>
        <BackgroundHeaderComponent>
          <HeaderComponent
            showBackButton={true}
            transparentBackground={true}
            mainTitle={translate(ELanguageOptions.create_password)}
          />
        </BackgroundHeaderComponent>
        {_renderFlatList()}
        <TouchableOpacity disabled={!canNext} style={styles.nextButtonContainerStyle(canNext)} onPress={_handleVerify}>
          <Text style={styles.nextTextStyle(canNext)}>{translate(ELanguageOptions.next)}</Text>
        </TouchableOpacity>
      </View>
    </DismissKeyboardComponent>
  );
});

CreateNewPwScreen.displayName = "CreateNewPwScreen";
export default CreateNewPwScreen as React.ComponentType;
