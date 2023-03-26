import { Text, TextInput, TextInputProps, View, ViewStyle } from "react-native";
import React from "react";
import { COLORS } from "@src/assets";
import { IInputComponentProps } from "./Model.InputComponent";
import HelperManager from "@src/helper/HelperManager";
import styles from "./Styles.InputComponent";
import { useSharedData } from "@src/hooks";

const InputComponent: React.FC<IInputComponentProps> = React.memo(
  ({
    placeHolder,
    value,
    setValue,
    keyboardType = "default",
    customTextInputStyle,
    multiline = false,
    customRightIcon,
    errorMessageText = "",
    onBlur,
    customTextChange,
    ...props
  }) => {
    const [errorMessage, setErrorMessage] = React.useState("");
    const _handleOnchangeText = React.useCallback(
      (string: string) => {
        if (!!customTextChange) {
          customTextChange(string);
          return;
        }
        setValue(string);
      },
      [setValue, customTextChange],
    );

    const { colorUpdate } = useSharedData();

    let textInputStyle = { ...styles.textInput };
    if (!HelperManager.checkInvalidity(customTextInputStyle)) {
      textInputStyle = { ...textInputStyle, ...customTextInputStyle };
    }

    const textInputProps: TextInputProps = React.useMemo(() => ({ ...props }), [props]);

    if (!!errorMessage) {
      (textInputStyle as ViewStyle).borderWidth = 1;
      (textInputStyle as ViewStyle).borderColor = COLORS.errorColor;
    }

    const _handleCloseErrorMessage = React.useCallback(
      (errMess: string) => () => {
        setErrorMessage(errMess);
      },
      [],
    );

    if (keyboardType === "email-address") {
      textInputProps.autoCapitalize = "none";
    }

    if (!!onBlur) {
      textInputProps.onBlur = onBlur(_handleCloseErrorMessage(""), _handleCloseErrorMessage(errorMessageText));
    }

    return (
      <View>
        <TextInput
          value={value as string}
          keyboardType={keyboardType}
          placeholderTextColor={Object.values(colorUpdate({ color: COLORS.darkFourColor }))[0]}
          style={textInputStyle}
          onChangeText={_handleOnchangeText}
          placeholder={placeHolder}
          multiline={multiline}
          {...textInputProps}
        />
        {!!customRightIcon && customRightIcon()}
        {!!errorMessage && (
          <Text style={colorUpdate({ ...styles.errorText, ...props.customerErrorTextStyle })}>{errorMessage}</Text>
        )}
      </View>
    );
  },
);

InputComponent.displayName = "InputComponent";
export default InputComponent;
