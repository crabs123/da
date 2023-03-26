import { FlatList, Text, TouchableOpacity, View } from "react-native";
import React from "react";
import styles from "./Styles.HomeScreen";
import { BackgroundHeaderComponent, FastImageComponent, LinearCircularSliderComponent } from "@src/components";
import ScaleManager from "@assets/ScaleManager";
import { COLORS, ICONS, THEMES } from "@src/assets";
import { LineChart } from "react-native-gifted-charts";
import LinearGradient from "react-native-linear-gradient";
import { IRenderItemProps } from "@src/models/CommonModel";
import { ISleepChartBarValue, sleepChartBarValueArr } from "./Model.HomeScreen";
import ViewModel from "./ViewModel.HomeScreen";
import HelperManager from "@src/helper/HelperManager";
import { useSharedData } from "@src/hooks";
import { ELanguageOptions } from "@src/models/LanguageOptionsModel";

const heartRateArr = [
  {
    value: 40,
    labelComponent: () => <Text style={styles.bloodGlucoseText}>Mon</Text>,
  },
  { value: 50 },
  {
    value: 58,
    labelComponent: () => <Text style={styles.bloodGlucoseText}>Tue</Text>,
  },
  { value: 50 },
  {
    value: 60,
    labelComponent: () => <Text style={styles.bloodGlucoseText}>Wed</Text>,
  },
  { value: 56 },
  {
    value: 60,
    labelComponent: () => <Text style={styles.bloodGlucoseText}>Thu</Text>,
  },
  { value: 50 },
  {
    value: 60,
    labelComponent: () => <Text style={styles.bloodGlucoseText}>Fri</Text>,
  },
  { value: 40 },
  {
    value: 65,
    labelComponent: () => <Text style={styles.bloodGlucoseText}>Sat</Text>,
  },
  { value: 56 },
  { value: 70, labelComponent: () => <Text style={styles.bloodGlucoseText}>Sun</Text> },
  { value: 50 },
];

const bloodGlucoseTextData = [
  {
    value: 40,
    labelComponent: () => <Text style={{ ...styles.bloodGlucoseText, color: "#BE6DB7" }}>Mon</Text>,
  },
  { value: 50 },
  {
    value: 58,
    labelComponent: () => <Text style={{ ...styles.bloodGlucoseText, color: "#BE6DB7" }}>Tue</Text>,
  },
  { value: 50 },
  {
    value: 60,
    labelComponent: () => <Text style={{ ...styles.bloodGlucoseText, color: "#BE6DB7" }}>Wed</Text>,
  },
  { value: 56 },
  {
    value: 60,
    labelComponent: () => <Text style={{ ...styles.bloodGlucoseText, color: "#BE6DB7" }}>Thu</Text>,
  },
  { value: 50 },
  {
    value: 60,
    labelComponent: () => <Text style={{ ...styles.bloodGlucoseText, color: "#BE6DB7" }}>Fri</Text>,
  },
  { value: 40 },
  {
    value: 65,
    labelComponent: () => <Text style={{ ...styles.bloodGlucoseText, color: "#BE6DB7" }}>Sat</Text>,
  },
  { value: 56 },
  { value: 70, labelComponent: () => <Text style={{ ...styles.bloodGlucoseText, color: "#BE6DB7" }}>Sun</Text> },
  { value: 50 },
];

const latestData = [
  {
    value: 59,
    labelComponent: () => <Text style={styles.bloodGlucoseText}>Mon</Text>,
  },
  {
    value: 40,
    hideDataPoint: true,
  },
  {
    value: 39,
    labelComponent: () => <Text style={styles.bloodGlucoseText}>Tue</Text>,
  },
  {
    value: 55,
    hideDataPoint: true,
  },
  {
    value: 70,
    labelComponent: () => <Text style={styles.bloodGlucoseText}>Wed</Text>,
  },
  {
    value: 82,
    hideDataPoint: true,
  },
  {
    value: 65,
    labelComponent: () => <Text style={styles.bloodGlucoseText}>Thu</Text>,
  },
  {
    value: 96,
    hideDataPoint: true,
  },
  {
    value: 110,
    labelComponent: () => <Text style={styles.bloodGlucoseText}>Fri</Text>,
  },
  {
    value: 115,
    hideDataPoint: true,
  },
  {
    value: 92,
    labelComponent: () => <Text style={styles.bloodGlucoseText}>Sat</Text>,
  },
  {
    value: 98,
    hideDataPoint: true,
  },
  {
    value: 100,
    labelComponent: () => <Text style={styles.bloodGlucoseText}>Sun</Text>,
  },
];

const HomeScreen = React.memo(() => {
  const { userProfile, _addDataToProps, _handleGoToProfile } = ViewModel();
  const { translate } = useSharedData();

  const _renderText = React.useCallback((text: string) => {
    return <Text style={styles.titleText}>{text}</Text>;
  }, []);

  const _renderXYAxis = React.useCallback((color: string, value: string) => {
    return (
      <React.Fragment>
        <View style={styles.commonXYAxisesContainer}>
          <Text style={THEMES.commonRegularTextStyle(color)}>{value}</Text>
        </View>
        <View style={styles.dashedBorderXWrapper}>
          <View style={styles.dashedXBorderLine(color)}>
            <View style={{ height: ScaleManager.scaleSizeHeight(1), width: ScaleManager.WINDOW_WIDTH }} />
          </View>
        </View>

        <View style={styles.sleepYAxisContainer}>
          <View style={styles.dashedYBorderLine(color)}>
            <View style={{ height: ScaleManager.scaleSizeHeight(80), width: ScaleManager.scaleSizeHeight(1) }} />
          </View>
        </View>
      </React.Fragment>
    );
  }, []);

  const _renderSleepChartBar = React.useCallback(({ item }: IRenderItemProps<ISleepChartBarValue>) => {
    return (
      <View style={styles.sleepChartBarItemContainer}>
        <View style={styles.sleepChartBarItemStyle(item.value, item.backgroundColor)} />
        <Text style={styles.sleepChartDateText}>{item.name}</Text>
      </View>
    );
  }, []);

  const _renderFooter = React.useCallback(() => {
    return (
      <React.Fragment>
        {/* BLOOD GLUCOSE */}
        {_renderText(translate(ELanguageOptions.blood_glucose))}
        <LinearGradient colors={["#FFF5DE", "#FDD97D"]} style={styles.bloodGlucoseContainer}>
          <View style={styles.flexSeven}>
            <View style={styles.spacer} />
            <View>
              <LineChart {..._addDataToProps(styles.BLOOD_GLUCOSE_PROPS, bloodGlucoseTextData)} />
            </View>
          </View>
          <Text style={{ ...styles.heartRateText, color: "#DC8449" }}>{translate(ELanguageOptions.blood_glucose)}</Text>
          <View style={{ ...styles.averageBloodTextContainer, backgroundColor: "#FCBC1D" }}>
            <Text style={THEMES.commonRegularTextStyle(COLORS.white)}>
              {translate(ELanguageOptions.average)}: {translate(ELanguageOptions.blood_glucose)}
            </Text>
            <Text style={THEMES.commonMediumTextStyle(COLORS.white)}>90 mg/dL</Text>
          </View>
          {_renderXYAxis("#DC8449", "90mg/dL")}
        </LinearGradient>

        {/* BLOOD PRESSURE */}
        {_renderText(translate(ELanguageOptions.blood_pressure))}
        <View style={styles.bloodPressureContainer}>
          <View style={styles.flexSeven}>
            <View style={styles.bloodPressureWrapper}>
              <LineChart {..._addDataToProps(styles.BLOOD_PRESSURE_PROPS, latestData)} />
            </View>
            <Text style={styles.bloodPressureText}>{translate(ELanguageOptions.blood_pressure)}</Text>
          </View>
          <View style={styles.averageBloodPressureContainer}>
            <Text style={THEMES.commonRegularTextStyle(COLORS.white)}>
              {" "}
              {translate(ELanguageOptions.average)}: {translate(ELanguageOptions.blood_pressure)}
            </Text>
            <Text style={THEMES.commonMediumTextStyle(COLORS.white)}>115 mmHG</Text>
          </View>
          {_renderXYAxis(COLORS.shadowGreen, "115 mmHG")}
        </View>

        {/* HEART RATE */}
        {_renderText(translate(ELanguageOptions.heart_rate))}
        <LinearGradient colors={["#E8F9E1", "#C2EFB0"]} style={styles.bloodGlucoseContainer}>
          <View style={styles.flexSeven}>
            <View style={styles.spacer} />
            <View>
              <LineChart {..._addDataToProps(styles.HEART_RATE_CHART_PROPS, heartRateArr)} />
            </View>
          </View>
          <Text style={{ ...styles.heartRateText, color: "#425F57" }}>{translate(ELanguageOptions.heart_rate)}</Text>
          <View style={styles.averageBloodTextContainer}>
            <Text style={THEMES.commonRegularTextStyle(COLORS.white)}>
              {translate(ELanguageOptions.average)}: {translate(ELanguageOptions.heart_rate)}
            </Text>
            <Text style={THEMES.commonMediumTextStyle(COLORS.white)}>90 bpm</Text>
          </View>
          {_renderXYAxis(COLORS.darkOneColor, "90bpm")}
        </LinearGradient>

        {/* SLEEP */}
        {_renderText(translate(ELanguageOptions.sleep))}
        <LinearGradient colors={["#FEF4EE", "#FBD0B6"]} style={styles.bloodGlucoseContainer}>
          <View style={styles.flexSeven}>
            <View style={styles.spacer} />
            <View style={styles.sleepWrapper}>
              <View style={styles.sleepAverageTextContainer}>
                <Text style={styles.sleepAverageText}>{translate(ELanguageOptions.average)}</Text>
              </View>
              <View style={styles.axisesContainer}>
                <View style={styles.sleepXAxisContainer}>
                  <View style={styles.sleepXAxis} />
                </View>
              </View>

              <View style={styles.sleepYAxisContainer}>
                <View style={styles.sleepYAxisWrapper}>
                  <View style={styles.sleepYAxis} />
                </View>
              </View>

              <FlatList
                keyExtractor={HelperManager.idGenerator}
                style={styles.flatlist}
                horizontal
                showsHorizontalScrollIndicator={false}
                data={sleepChartBarValueArr}
                renderItem={_renderSleepChartBar}
              />
            </View>
          </View>
          <Text style={styles.sleepTextTitle}>{translate(ELanguageOptions.sleep)}</Text>
          <View style={styles.averageSleepContainer}>
            <Text style={THEMES.commonRegularTextStyle(COLORS.white)}>{translate(ELanguageOptions.sleep_quality)}</Text>
            <Text style={THEMES.commonMediumTextStyle(COLORS.white)}>{translate(ELanguageOptions.deep_sleep)}</Text>
          </View>
        </LinearGradient>

        {/* WEIGHT */}
        {_renderText(translate(ELanguageOptions.weight))}
        <View style={styles.pieChartWrapper}>
          <View style={styles.pieChartTopWrapper}>
            <View style={styles.LeftPipeChartTopContainer}>
              <View style={styles.topTextPieChart}>
                <Text style={styles.startWeightText}>{translate(ELanguageOptions.current_weight)}: 68.0</Text>
                <Text style={styles.startWeightText}>{translate(ELanguageOptions.target_weight)}: 69.5</Text>
              </View>
              <Text style={styles.bigWeightText}>{translate(ELanguageOptions.weight)}</Text>
            </View>
            <View style={styles.circularContainer}>
              <View style={styles.spacer} />
              <LinearCircularSliderComponent {...styles.CIRCULAR_PROPS} />
            </View>
          </View>
          <View style={styles.pieChartBottomWrapper}>
            <Text style={THEMES.commonRegularTextStyle(COLORS.white)}>
              {translate(ELanguageOptions.your_current_weight)}
            </Text>
            <Text style={THEMES.commonMediumTextStyle(COLORS.white)}>68.5 kg</Text>
          </View>
        </View>
        <View style={styles.scrollViewSpacer} />
      </React.Fragment>
    );
  }, [_addDataToProps, _renderSleepChartBar, _renderText, _renderXYAxis, translate]);

  return (
    <View style={styles.container}>
      <BackgroundHeaderComponent>
        <View style={styles.headerWrapper}>
          <TouchableOpacity onPress={_handleGoToProfile}>
            <FastImageComponent uri={userProfile.avatar as string} pictureStyle={styles.avatarImage} />
          </TouchableOpacity>
          <Text style={styles.allStatsText}>{translate(ELanguageOptions.all_stats)}</Text>
          <TouchableOpacity style={styles.notificationIconContainer}>
            {ICONS.NotificationNewIcon({ focused: true })}
          </TouchableOpacity>
        </View>
      </BackgroundHeaderComponent>

      <FlatList
        ListFooterComponent={_renderFooter}
        style={styles.container}
        showsVerticalScrollIndicator={false}
        data={[]}
        keyExtractor={HelperManager.idGenerator}
        renderItem={() => null}
      />
    </View>
  );
});

HomeScreen.displayName = "HomeScreen";
export default HomeScreen;
