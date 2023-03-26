/* eslint-disable no-shadow */
import React, { useEffect, useState } from 'react';
import { TextInput, TouchableOpacity, TouchableWithoutFeedback, View } from 'react-native';
import type { ImageStyle, StyleProp, TextInputProps, TextStyle, ViewStyle } from 'react-native';
import { ICONS } from '@src/assets';
import { StyleSheet } from 'react-native';

interface Props extends TextInputProps {
  fontFamily?: string;
  style?: StyleProp<ViewStyle>;
  inputStyle?: StyleProp<TextStyle>;
  iconStyle?: StyleProp<ImageStyle>;
  showIcon?: boolean;
  renderRightIcon?: () => JSX.Element | null | undefined;
  renderLeftIcon?: () => JSX.Element | null | undefined;
}

export type CTextInput = React.FC<Props>;

const defaultProps = {
  style: {},
  value: '',
  showIcon: true,
  currency: false,
  numeric: false,
};

const TextInputComponent: CTextInput = (props) => {
  const {
    fontFamily,
    style,
    value,
    placeholderTextColor = '#000',
    placeholder = '',
    showIcon,
    inputStyle,
    iconStyle,
    onChangeText = (_value: string) => {},
    renderLeftIcon,
    renderRightIcon,
  } = props;

  const [text, setText] = useState<string>('');

  useEffect(() => {
    if (value) {
      setText(value);
    }
  }, [value]);

  const onChange = (text: string) => {
    setText(text);
    onChangeText(text);
  };

  const _renderRightIcon = () => {
    if (showIcon) {
      if (renderRightIcon) {
        return renderRightIcon();
      }
      if (text.length > 0) {
        return <TouchableOpacity onPress={() => onChange('')}>{ICONS.DeleteIcon()}</TouchableOpacity>;
      }
      return null;
    }
    return null;
  };

  const font = () => {
    if (fontFamily) {
      return {
        fontFamily: fontFamily,
      };
    } else {
      return {};
    }
  };

  return (
    <TouchableWithoutFeedback>
      <View style={[style]}>
        <View style={styles.textInput}>
          {renderLeftIcon?.()}
          <TextInput
            {...props}
            style={[styles.input, inputStyle, font()]}
            value={text}
            placeholder={placeholder}
            placeholderTextColor={placeholderTextColor}
            onChangeText={onChange}
          />
          {_renderRightIcon()}
        </View>
      </View>
    </TouchableWithoutFeedback>
  );
};

TextInputComponent.defaultProps = defaultProps;

export const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    borderRadius: 8,
    padding: 12,
    justifyContent: 'center',
  },
  textInput: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  input: {
    fontSize: 16,
    flex: 1,
  },
  label: {
    marginBottom: 4,
    fontSize: 16,
  },
  row: {
    flexDirection: 'row',
  },
  icon: {
    width: 20,
    height: 20,
  },
  textError: {
    color: 'red',
    fontSize: 14,
    marginTop: 10,
  },
});

export default TextInputComponent;
