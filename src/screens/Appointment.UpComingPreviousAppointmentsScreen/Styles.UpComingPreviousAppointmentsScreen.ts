import { COLORS, THEMES } from "@src/assets";
import { StyleSheet } from "react-native";
import ScaleManager from "@src/assets/ScaleManager";
import themes from "@src/assets/themes";

class CurrentPreviousAppointmentScreen {
  private static _styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: COLORS.white,
    },
    flatlist: {
      paddingBottom: ScaleManager.PADDING_SIZE,
    },
    headerContainer: {
      height: ScaleManager.BACKGROUND_HEADER_HEIGHT - ScaleManager.STATUSBAR_HEIGHT,
      alignItems: "center",
      justifyContent: "center",
      marginTop: ScaleManager.STATUSBAR_HEIGHT / 2,
    },
    headerText: {
      ...THEMES.commonBoldTextStyle(COLORS.white),
      fontSize: ScaleManager.moderateScale(22),
    },
    titleTabContainer: {
      height: ScaleManager.scaleSizeHeight(30),
      width: ScaleManager.WINDOW_WIDTH / 2,
      justifyContent: "center",
      alignItems: "center",
      backgroundColor: COLORS.white,
    },
    tabContainer: {
      backgroundColor: COLORS.white,
      shadowOpacity: 0,
    },
    tabIndicator: {
      backgroundColor: COLORS.darkCyan20,
      height: ScaleManager.scaleSizeHeight(3),
      borderRadius: 1,
    },
    bookAppointmentButton: {
      ...THEMES.commonButtonStyle(COLORS.mainColor),
      marginTop: ScaleManager.scaleSizeHeight(20),
    },
    upcomingRouteItemWrapper: {
      width: ScaleManager.WIDTH_SCREEN_MINUS_PADDING,
      alignSelf: "center",
      marginTop: ScaleManager.scaleSizeHeight(16),
      borderRadius: ScaleManager.scaleSizeHeight(8),
      backgroundColor: COLORS.white,
      minHeight: ScaleManager.scaleSizeHeight(180),
      borderWidth: 1,
      borderColor: "#C0E1F1",
      justifyContent: "space-between",
    },
    upcomingRouteItemSubWrapper: {
      flexDirection: "row",
      flex: 1,
    },
    callOrEditButton: {
      ...THEMES.commonButton,
      width: ScaleManager.scaleSizeWidth(140),
      borderWidth: 1,
      borderColor: COLORS.mainColor,
    },
    footerButton: {
      flexDirection: "row",
      justifyContent: "space-evenly",
    },
    callOrEditText: {
      ...THEMES.commonRegularText,
      fontSize: ScaleManager.moderateScale(16),
    },
    timeWrapper: {
      justifyContent: "center",
      alignItems: "center",
      paddingHorizontal: ScaleManager.PADDING_SIZE,
    },
    dateTimeText: {
      ...THEMES.commonMediumTextStyle(COLORS.mainColor),
    },
    minuteTimeText: {
      ...THEMES.commonRegularText,
    },
    appointmentInfoWrapper: {
      justifyContent: "center",
    },
    doctorNameText: {
      ...THEMES.commonMediumTextStyle(COLORS.mainColor),
      marginBottom: ScaleManager.scaleSizeHeight(8),
    },
    appointmentInfoText: {
      ...THEMES.commonRegularText,
      marginVertical: ScaleManager.scaleSizeHeight(2),
    },
    viewDetailButton: {
      ...THEMES.commonButton,
      width: ScaleManager.scaleSizeWidth(280),
      borderWidth: 1,
      borderColor: COLORS.mainColor,
      backgroundColor: COLORS.white,
    },
    emptyContainer: {
      flex: 1,
      backgroundColor: COLORS.white,
      justifyContent: "center",
      alignItems: "center",
    },
    emptyIcon: {
      paddingVertical: ScaleManager.PADDING_SIZE * 2,
    },
    emptyText: {
      ...THEMES.commonRegularTextStyle(COLORS.grayLight),
      paddingVertical: ScaleManager.scaleSizeHeight(2),
    },
  });

  public static styles = {
    ...this._styles,
    titleTextStyle: (focused: boolean) => {
      if (focused) {
        return {
          ...themes.commonBoldTextStyle(COLORS.darkOneColor),
          fontSize: ScaleManager.moderateScale(13),
        };
      }

      return {
        ...themes.commonRegularText,
      };
    },
    callOrEditButtonStyle: (isCall: boolean) => {
      return {
        ...this._styles.callOrEditButton,
        backgroundColor: isCall ? COLORS.mainColor : COLORS.white,
      };
    },
    callOrEditTextStyle: (isCall: boolean) => {
      return {
        ...this._styles.callOrEditText,
        color: !isCall ? COLORS.mainColor : COLORS.white,
      };
    },
    upcomingRouteItemWrapperStyle: (isLastItem: boolean) => {
      return {
        ...this._styles.upcomingRouteItemWrapper,
        marginBottom: isLastItem ? ScaleManager.scaleSizeHeight(24) : 0,
      };
    },
  };
}

export default CurrentPreviousAppointmentScreen.styles;
