import { COLORS } from "@src/assets";
import FONTS from "@src/assets/fonts";
import ScaleManager from "@src/assets/ScaleManager";
import { Platform, StyleSheet } from "react-native";
import { CLOCKWISE } from "@src/components/LinearCircularSliderComponent/View.LinearCircularSliderComponent";

class HomeScreenStyles {
  public static CHART_WRAPPER_HEIGHT = ScaleManager.scaleSizeHeight(Platform.OS === "ios" ? 210 : 230);

  public static CIRCULAR_PROPS = {
    arcDirection: CLOCKWISE,
    backgroundColor: COLORS.lightCornFlowerBlue10,
    btnRadius: 1,
    sliderRadius: ScaleManager.scaleSizeHeight(50),
    sliderWidth: ScaleManager.scaleSizeHeight(15),
    startDegree: 0,
    maxValue: 360,
    endGradient: "#2D1EDC",
    startGradient: "#6666FF",
    btnColor: "white",
    value: 230,
    hideThumb: false,
    disablePress: true,
  };

  public static HEART_RATE_CHART_PROPS = {
    areaChart: true,
    curved: true,
    isAnimated: true,
    height: ScaleManager.scaleSizeHeight(70),
    spacing: ScaleManager.scaleSizeWidth(28),
    initialSpacing: ScaleManager.scaleSizeWidth(15),
    color1: COLORS.darkOneColor,
    hideRules: true,
    hideYAxisText: true,
    startFillColor1: "#C04A82",
    startOpacity: 0,
    endOpacity: 0,
    hideOrigin: true,
    hideDataPoints: true,
    hideAxesAndRules: true,
  };

  public static BLOOD_PRESSURE_PROPS = {
    curved: true,
    thickness: 3,
    isAnimated: true,
    areaChart: true,
    hideDataPoints: true,
    pressEnabled: true,
    color: COLORS.lightOrange10,
    maxValue: 140,
    noOfSections: 1,
    startFillColor: COLORS.primaryOrange,
    endFillColor: COLORS.darkCyan20,
    startOpacity: 0.7,
    endOpacity: 0.4,
    showStripOnPress: true,
    hideAxesAndRules: true,
    xAxisColor: COLORS.white,
    xAxisType: "line",
    backgroundColor: COLORS.darkCyan20,
    spacing: ScaleManager.scaleSizeWidth(28),
    initialSpacing: ScaleManager.scaleSizeWidth(15),
    height: ScaleManager.scaleSizeHeight(70),
  };

  public static BLOOD_GLUCOSE_PROPS = {
    areaChart: true,
    curved: true,
    isAnimated: true,
    hideRules: true,
    hideDataPoints: true,
    height: ScaleManager.scaleSizeHeight(70),
    spacing: ScaleManager.scaleSizeWidth(28),
    initialSpacing: ScaleManager.scaleSizeWidth(15),
    color1: "#C04A82",
    hideYAxisText: true,
    startFillColor1: "#C04A82",
    startOpacity: 0,
    endOpacity: 0,
    hideOrigin: true,
    scrollToEnd: false,
    hideAxesAndRules: true,
  };

  private static _styles = StyleSheet.create({
    container: {
      backgroundColor: "white",
      flex: 1,
    },
    headerWrapper: {
      flexDirection: "row",
      alignItems: "center",
      height: "100%",
      width: ScaleManager.WIDTH_SCREEN_MINUS_PADDING,
      justifyContent: "space-between",
      marginTop: ScaleManager.scaleSizeHeight(30),
    },
    avatarImage: {
      height: ScaleManager.scaleSizeHeight(44),
      aspectRatio: 1,
      borderRadius: 100,
    },
    allStatsText: {
      // color: "#00337C",
      color: COLORS.white,
      fontSize: ScaleManager.moderateScale(28),
      fontFamily: FONTS.interSemiBold,
      // marginBottom: ScaleManager.scaleSizeHeight(16) * 2,
      // marginTop: ScaleManager.PADDING_SIZE * 3,
      // paddingHorizontal: ScaleManager.PADDING_SIZE,
      alignSelf: "center",
    },
    notificationIconContainer: {
      justifyContent: "center",
      alignItems: "flex-end",
      height: ScaleManager.scaleSizeHeight(100),
    },
    titleText: {
      color: "#00337C",
      fontSize: ScaleManager.moderateScale(18),
      fontFamily: FONTS.interSemiBold,
      marginBottom: ScaleManager.scaleSizeHeight(16),
      marginTop: ScaleManager.scaleSizeHeight(30),
      paddingHorizontal: ScaleManager.PADDING_SIZE,
    },
    separator: {
      width: "100%",
      height: ScaleManager.scaleSizeHeight(100),
    },
    pieChartWrapper: {
      height: HomeScreenStyles.CHART_WRAPPER_HEIGHT,
      width: ScaleManager.WIDTH_SCREEN_MINUS_PADDING,
      alignSelf: "center",
      borderRadius: 8,
    },
    bloodGlucoseContainer: {
      backgroundColor: "#002F2F",
      height: HomeScreenStyles.CHART_WRAPPER_HEIGHT,
      width: ScaleManager.WIDTH_SCREEN_MINUS_PADDING,
      alignSelf: "center",
      borderRadius: 8,
      overflow: "hidden",
    },
    bloodPressureContainer: {
      backgroundColor: COLORS.darkCyan20,
      height: HomeScreenStyles.CHART_WRAPPER_HEIGHT,
      width: ScaleManager.WIDTH_SCREEN_MINUS_PADDING,
      alignSelf: "center",
      borderRadius: 8,
      overflow: "hidden",
    },
    bloodPressureWrapper: {
      transform: [
        {
          translateY: -ScaleManager.scaleSizeHeight(10),
        },
      ],
    },
    pieChartTopWrapper: {
      flex: 1,
      backgroundColor: COLORS.lightCornFlowerBlue20,
      borderTopLeftRadius: 8,
      borderTopRightRadius: 8,
      flexDirection: "row",
    },
    pieChartBottomWrapper: {
      backgroundColor: "#2D1EDC",
      borderBottomLeftRadius: 8,
      borderBottomRightRadius: 8,
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "center",
      paddingHorizontal: ScaleManager.PADDING_SIZE,
      height: ScaleManager.scaleSizeHeight(50),
    },
    LeftPipeChartTopContainer: {
      flex: 1,
      justifyContent: "space-between",
    },
    topTextPieChart: {
      paddingTop: ScaleManager.PADDING_SIZE,
      paddingLeft: ScaleManager.PADDING_SIZE,
    },
    startWeightText: {
      color: "#2D1EDC",
      fontFamily: FONTS.interRegular,
      fontSize: ScaleManager.moderateScale(13),
      paddingBottom: ScaleManager.scaleSizeHeight(8),
    },
    sleepTextTitle: {
      fontSize: ScaleManager.moderateScale(15),
      color: "#843607",
      fontFamily: FONTS.interSemiBold,
      paddingBottom: ScaleManager.scaleSizeHeight(8),
      paddingLeft: ScaleManager.PADDING_SIZE,
      position: "absolute",
      bottom: ScaleManager.scaleSizeHeight(50),
    },
    averageSleepContainer: {
      backgroundColor: "#F69459",
      borderBottomLeftRadius: 8,
      borderBottomRightRadius: 8,
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "center",
      paddingHorizontal: ScaleManager.PADDING_SIZE,
      height: ScaleManager.scaleSizeHeight(50),
    },
    heartRateText: {
      fontSize: ScaleManager.moderateScale(15),
      color: COLORS.white,
      fontFamily: FONTS.interSemiBold,
      paddingBottom: ScaleManager.scaleSizeHeight(8),
      paddingLeft: ScaleManager.PADDING_SIZE,
      position: "absolute",
      bottom: ScaleManager.scaleSizeHeight(50),
    },
    bigWeightText: {
      color: "#2D1EDC",
      fontFamily: FONTS.interSemiBold,
      fontSize: ScaleManager.moderateScale(15),
      paddingBottom: ScaleManager.scaleSizeHeight(8),
      paddingLeft: ScaleManager.PADDING_SIZE,
    },
    bloodGlucoseText: {
      fontSize: ScaleManager.moderateScale(12),
      fontFamily: FONTS.interRegular,
      color: COLORS.shadowGreen,
    },
    averageBloodTextContainer: {
      backgroundColor: "#749F82",
      borderBottomLeftRadius: 8,
      borderBottomRightRadius: 8,
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "center",
      paddingHorizontal: ScaleManager.PADDING_SIZE,
      height: ScaleManager.scaleSizeHeight(50),
    },
    averageBloodPressureContainer: {
      backgroundColor: "#002F2F",
      borderBottomLeftRadius: 8,
      borderBottomRightRadius: 8,
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "center",
      paddingHorizontal: ScaleManager.PADDING_SIZE,
      height: ScaleManager.scaleSizeHeight(50),
    },
    bloodPressureText: {
      color: COLORS.white,
      fontFamily: FONTS.interSemiBold,
      fontSize: ScaleManager.moderateScale(15),
      paddingBottom: ScaleManager.scaleSizeHeight(8),
      paddingLeft: ScaleManager.PADDING_SIZE,
      position: "absolute",
      bottom: ScaleManager.scaleSizeHeight(-0),
    },
    spacer: {
      height: ScaleManager.scaleSizeHeight(20),
      width: "100%",
    },
    circularContainer: { flex: 1, justifyContent: "center", alignItems: "center" },
    scrollViewSpacer: {
      height: 100,
      width: "100%",
    },
    flatlist: {
      height: ScaleManager.scaleSizeHeight(100),
    },
    sleepWrapper: {
      width: "100%",
      marginLeft: ScaleManager.PADDING_SIZE,
    },
    sleepAverageTextContainer: {
      position: "absolute",
      zIndex: 1000,
      top: ScaleManager.scaleSizeWidth(30),
      left: ScaleManager.scaleSizeWidth(10),
    },
    sleepAverageText: { color: "#F69459", fontFamily: FONTS.interRegular, fontSize: ScaleManager.moderateScale(13) },
    axisesContainer: { overflow: "hidden", position: "absolute", zIndex: 1000 },
    sleepXAxisContainer: {
      borderStyle: "dashed",
      borderWidth: 1,
      borderColor: "#F69459",
      margin: -2,
      marginTop: ScaleManager.scaleSizeHeight(80),
      marginLeft: ScaleManager.scaleSizeWidth(0),
    },
    sleepXAxis: { height: 1, width: ScaleManager.WINDOW_WIDTH },
    sleepYAxisContainer: {
      overflow: "hidden",
      position: "absolute",
    },
    sleepYAxisWrapper: {
      borderStyle: "dashed",
      borderWidth: 1,
      borderColor: "#F69459",
      margin: -2,
      marginLeft: ScaleManager.scaleSizeWidth(0),
      marginTop: ScaleManager.scaleSizeWidth(0),
    },
    sleepYAxis: { height: ScaleManager.scaleSizeHeight(80), width: 1 },
    flexSeven: { flex: 7 },
    sleepChartBarItemContainer: {
      margin: ScaleManager.scaleSizeHeight(10),
      justifyContent: "flex-end",
    },
    sleepChartBarItem: {
      width: ScaleManager.scaleSizeWidth(20),
      borderRadius: ScaleManager.scaleSizeHeight(10),
      transform: [{ translateY: -ScaleManager.scaleSizeHeight(10) }],
      alignItems: "baseline",
    },
    sleepChartDateText: {
      color: "#F69459",
      position: "absolute",
      zIndex: 1,
      width: ScaleManager.scaleSizeWidth(50),
      bottom: -ScaleManager.scaleSizeHeight(Platform.OS === "ios" ? 10 : 13),
    },
    commonXYAxisesContainer: {
      position: "absolute",
      zIndex: -1,
      top: ScaleManager.scaleSizeHeight(20),
      left: ScaleManager.scaleSizeWidth(40),
    },
    dashedBorderXWrapper: { overflow: "hidden", position: "absolute", zIndex: 1000 },
    dashedXBorderLine: {
      borderStyle: "dashed",
      borderWidth: 1,
      margin: -2,
      marginTop: ScaleManager.scaleSizeHeight(103),
      marginLeft: ScaleManager.scaleSizeWidth(30),
    },
    dashedYBorderLine: {
      borderStyle: "dashed",
      borderWidth: 1,
      margin: -2,
      marginLeft: ScaleManager.scaleSizeWidth(30),
      marginTop: ScaleManager.scaleSizeWidth(20),
    },
  });

  public static styles = {
    ...this._styles,
    sleepChartBarItemStyle: (height: number, backgroundColor: string) => {
      return {
        ...this._styles.sleepChartBarItem,
        height: ScaleManager.scaleSizeHeight(height),
        backgroundColor,
      };
    },
    dashedXBorderLine: (borderColor: string) => {
      return {
        ...this._styles.dashedXBorderLine,
        borderColor,
      };
    },
    dashedYBorderLine: (borderColor: string) => {
      return {
        ...this._styles.dashedYBorderLine,
        borderColor,
      };
    },
    CIRCULAR_PROPS: HomeScreenStyles.CIRCULAR_PROPS,
    BLOOD_GLUCOSE_PROPS: HomeScreenStyles.BLOOD_GLUCOSE_PROPS,
    BLOOD_PRESSURE_PROPS: HomeScreenStyles.BLOOD_PRESSURE_PROPS,
    HEART_RATE_CHART_PROPS: HomeScreenStyles.HEART_RATE_CHART_PROPS,
  };
}

export default HomeScreenStyles.styles;
