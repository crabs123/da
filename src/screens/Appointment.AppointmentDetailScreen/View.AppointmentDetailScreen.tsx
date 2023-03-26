import { FlatList, Text, TouchableOpacity, View } from "react-native";
import React from "react";
import { BackgroundHeaderComponent, HeaderComponent } from "@src/components";
import { COLORS, THEMES } from "@src/assets";
import { IRenderItemProps } from "@src/models/CommonModel";
import { useSharedData } from "@src/hooks";
import { ELanguageOptions } from "@src/models/LanguageOptionsModel";
import ViewModel from "./ViewModel.AppointmentDetailScreen";
import styles from "./Styles.AppointmentDetailScreen";
import { ISectionInfo } from "../Appointment.StepThreeAppointmentScreen/Model.StepThreeAppointmentScreen";

const AppointmentDetailScreen = React.memo(() => {
  const { InfoSections, _handleCallNow } = ViewModel();
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
  const flatListProps = React.useMemo(
    () => ({
      keyExtractor: (item: ISectionInfo) => item.title,
      data: InfoSections,
      renderItem: _renderItem,
      showsVerticalScrollIndicator: false,
    }),
    [InfoSections, _renderItem],
  );

  return (
    <View style={styles.container}>
      <BackgroundHeaderComponent>
        <HeaderComponent
          mainTitle={translate(ELanguageOptions.appointment)}
          transparentBackground={true}
          showBackButton={true}
        />
      </BackgroundHeaderComponent>
      <View style={styles.footerWrapper}>
        <FlatList {...flatListProps} />

        <View>
          <TouchableOpacity style={THEMES.commonButtonStyle(COLORS.primaryOrange)} onPress={_handleCallNow}>
            <Text style={THEMES.commonMediumTextStyle(COLORS.white)}>{translate(ELanguageOptions.call_now)}</Text>
          </TouchableOpacity>

          <TouchableOpacity style={THEMES.commonButtonStyle(COLORS.white)} onPress={() => {}}>
            <Text style={styles.noText}>{translate(ELanguageOptions.cancel)}</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
});

AppointmentDetailScreen.displayName = "AppointmentDetailScreen";
export default AppointmentDetailScreen;
