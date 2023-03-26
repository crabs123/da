import { FlatList, Text, TouchableOpacity, View } from "react-native";
import React from "react";
import { BackgroundHeaderComponent, HeaderComponent } from "@src/components";
import ViewModel from "./ViewModel.StepThreeAppointmentScreen";
import styles from "./Styles.StepThreeAppointmentScreen";
import { ICONS } from "@src/assets";
import { IRenderItemProps } from "@src/models/CommonModel";
import { ISectionInfo } from "./Model.StepThreeAppointmentScreen";
import { useSharedData } from "@src/hooks";
import { ELanguageOptions } from "@src/models/LanguageOptionsModel";

const StepThreeAppointmentScreen = React.memo(() => {
  const { InfoSections, _handleGoToNextStep } = ViewModel();
  const canNext = true;
  const { translate } = useSharedData();

  const _renderItem = React.useCallback(
    ({ item }: IRenderItemProps<ISectionInfo>) => {
      const detailInfos: JSX.Element[] = [];
      for (const detailInfo of item.properties) {
        for (const detail of Object.keys(detailInfo)) {
          detailInfos.push(
            <View style={styles.rowContainer}>
              <Text style={styles.keyText}>{translate(detail as ELanguageOptions)}</Text>
              <Text style={styles.valueText}>{detailInfo[detail]}</Text>
            </View>,
          );
        }
      }
      return (
        <View style={styles.sectionContainer}>
          <Text style={styles.title}>{translate(item.title as ELanguageOptions)}</Text>
          {detailInfos}
        </View>
      );
    },
    [translate],
  );

  const _renderHeader = React.useCallback(() => {
    return (
      <React.Fragment>
        <View style={styles.stepsContainer}>
          <View style={styles.leftStepContainer}>
            <View style={styles.activeStepNumberContainer}>
              <Text style={styles.activeStepNumberText}>2</Text>
            </View>
            <View style={styles.textWrapper}>
              <Text style={styles.activeStepGuideText}>{translate(ELanguageOptions.select_date_and_time)}</Text>
            </View>
          </View>

          <View style={styles.chevBackwardIcon}>{ICONS.ChevBackWardIcon()}</View>

          <View style={styles.rightStepContainer}>
            <View style={styles.inactiveStepNumberContainer}>
              <Text style={styles.inactiveStepNumberText}>3</Text>
            </View>
            <View style={styles.textWrapper}>
              <Text style={styles.inactiveStepGuideText}>{translate(ELanguageOptions.verify)}</Text>
            </View>
          </View>
        </View>
      </React.Fragment>
    );
  }, [translate]);

  const flatListProps = React.useMemo(
    () => ({
      ListHeaderComponent: _renderHeader,
      keyExtractor: (item: ISectionInfo) => item.title,
      data: InfoSections,
      renderItem: _renderItem,
      showsVerticalScrollIndicator: false,
    }),
    [_renderHeader, InfoSections, _renderItem],
  );

  return (
    <View style={styles.container}>
      <BackgroundHeaderComponent>
        <HeaderComponent
          mainTitle={translate(ELanguageOptions.book_appointment)}
          transparentBackground={true}
          showBackButton={true}
        />
      </BackgroundHeaderComponent>
      <View
        style={{
          flex: 1,
          justifyContent: "space-between",
        }}
      >
        <FlatList {...flatListProps} />

        <TouchableOpacity
          disabled={!canNext}
          style={styles.nextButtonContainerStyle(canNext)}
          onPress={_handleGoToNextStep}
        >
          <Text style={styles.nextTextStyle(canNext)}>{translate(ELanguageOptions.next)}</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
});

StepThreeAppointmentScreen.displayName = "StepThreeAppointmentScreen";
export default StepThreeAppointmentScreen;
