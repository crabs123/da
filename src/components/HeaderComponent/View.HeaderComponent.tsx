import { Text, View, ViewStyle } from "react-native";
import React from "react";
import ICONS from "@src/assets/icons";
import { TouchableOpacity } from "react-native-gesture-handler";
import { Shadow } from "react-native-shadow-2";
import NavigationManager from "@src/helper/NavigationManager";
import HelperManager from "@src/helper/HelperManager";
import styles from "./Styles.HeaderComponent";
import { ERightIconHeaderComponent, IHeaderComponentProps } from "./Model.HeaderComponent";
import TextStyle from "react-native";
import { COLORS } from "@src/assets";
import ScaleManager from "@assets/ScaleManager";

const HeaderComponent: React.FC<IHeaderComponentProps> = (props) => {
  const {
    showShadow = false,
    showBackButton = true,
    mainTitle,
    rightIcon,
    handlePressRightIcon,
    customRightButtonStyle,
    customBackFunction,
    middleTitleOnPress,
    showFullMiddleTitle = false,
    transparentBackground = false,
  } = props;

  const _handleBack = React.useCallback(() => {
    if (!!customBackFunction) {
      customBackFunction();
      return;
    }
    NavigationManager.goBack();
  }, [customBackFunction]);

  const [active, setActive] = React.useState(false);

  const _handlePressRightIcon = React.useCallback(() => {
    setActive((prev) => !prev);
    if (handlePressRightIcon) handlePressRightIcon();
  }, [handlePressRightIcon]);

  const _handleMiddlePress = React.useCallback(() => {
    if (!!middleTitleOnPress) {
      middleTitleOnPress();
    }
  }, [middleTitleOnPress]);

  const leftButtonStyle: ViewStyle = { ...styles.leftButton };
  const containerStyle: ViewStyle = { ...styles.container };
  const mainTitleTextStyle: TextStyle.StyleProp<TextStyle.TextStyle> = { ...styles.mainTitleText };
  if (!showBackButton) {
    leftButtonStyle.opacity = 0;
  }

  if (transparentBackground) {
    containerStyle.backgroundColor = "transparent";
    mainTitleTextStyle.color = COLORS.white;
    containerStyle.height = ScaleManager.BACKGROUND_HEADER_HEIGHT;
  }

  let rightButtonStyle: ViewStyle = { ...styles.rightButton };

  if (customRightButtonStyle) {
    rightButtonStyle = { ...rightButtonStyle, ...customRightButtonStyle };
  }

  if (!rightIcon) {
    rightButtonStyle.opacity = 0;
  }

  if (props.backgroundColor) {
    containerStyle.backgroundColor = props.backgroundColor;
  }

  const whichRightIcon = React.useMemo(() => {
    if (!!rightIcon) {
      switch (rightIcon) {
        case ERightIconHeaderComponent.search:
          return ICONS.SearchIcon({ active });

        case ERightIconHeaderComponent.plus:
          return ICONS.PlusIcon();

        default:
          return ICONS.SearchIcon({ active });
      }
    }
    return null;
  }, [active, rightIcon]);

  return (
    <View style={containerStyle}>
      <View style={styles.wrapperStyle(transparentBackground)}>
        <View style={styles.leftButtonWrapperStyle(transparentBackground)}>
          <TouchableOpacity disabled={!showBackButton} style={leftButtonStyle} onPress={_handleBack}>
            {showBackButton && !transparentBackground && ICONS.ChevBackWardIcon()}
            {showBackButton && transparentBackground && ICONS.WhiteChevBackWardIcon()}
          </TouchableOpacity>
        </View>
        <TouchableOpacity
          disabled={!middleTitleOnPress}
          onPress={_handleMiddlePress}
          style={styles.middleContainerStyle(transparentBackground)}
        >
          {!!mainTitle && (
            <Text style={mainTitleTextStyle}>
              {HelperManager.handleLongName(mainTitle, showFullMiddleTitle ? 100 : 20)}
            </Text>
          )}
          {!!middleTitleOnPress && <View style={styles.editIcon}>{ICONS.EditIcon()}</View>}
        </TouchableOpacity>
        <View style={styles.rightButtonWrapperStyle(transparentBackground)}>
          <TouchableOpacity disabled={!rightIcon} style={rightButtonStyle} onPress={_handlePressRightIcon}>
            {whichRightIcon}
          </TouchableOpacity>
        </View>
      </View>
      <Shadow distance={4} startColor={"#00000006"} offset={[0, 4]} disabled={!showShadow}>
        <View style={styles.viewShadow} />
      </Shadow>
    </View>
  );
};

HeaderComponent.displayName = "HeaderComponent";
export default React.memo(HeaderComponent);
