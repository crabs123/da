import React from "react";
import { FlatList, Text, TouchableOpacity, View } from "react-native";
import moment from "moment";
import { FAKE_UPCOMING_APPOINTMENTS, IUpcomingRouteItem } from "../Model.UpComingPreviousAppointmentsScreen";
import styles from "../Styles.UpComingPreviousAppointmentsScreen";
import { IRenderItemProps } from "@src/models/CommonModel";
import { ICONS } from "@src/assets";
import ScaleManager from "@src/assets/ScaleManager";
import { useSharedData } from "@src/hooks";
import { ELanguageOptions } from "@src/models/LanguageOptionsModel";

const PreviousRoute = React.memo(
  () => {
    const { translate } = useSharedData();
    const _renderEmpty = React.useCallback(() => {
      return (
        <View style={styles.emptyContainer}>
          <View style={styles.emptyIcon}>{ICONS.EmptyIcon({ size: ScaleManager.scaleSizeHeight(100) })}</View>
          <Text style={styles.emptyText}>{translate(ELanguageOptions.you_have_no_appointments)}</Text>
        </View>
      );
    }, [translate]);

    return (
      <View style={styles.container}>
        <FlatList<IUpcomingRouteItem>
          style={styles.flatlist}
          keyExtractor={(item) => item.id}
          data={[]}
          showsVerticalScrollIndicator={false}
          ListEmptyComponent={_renderEmpty}
          renderItem={({ item, index }: IRenderItemProps<IUpcomingRouteItem>) => (
            <View style={styles.upcomingRouteItemWrapperStyle(index === FAKE_UPCOMING_APPOINTMENTS.length - 1)}>
              <View style={styles.upcomingRouteItemSubWrapper}>
                <View style={styles.timeWrapper}>
                  <Text style={styles.dateTimeText}>{moment(item.date).format("DD MMM")}</Text>
                  <Text style={styles.minuteTimeText}>{moment(item.date).format("hh:mm A")}</Text>
                </View>

                <View style={styles.appointmentInfoWrapper}>
                  <Text style={styles.doctorNameText}>{item.doctorName}</Text>
                  <Text style={styles.appointmentInfoText}>{item.serviceName}</Text>
                  <Text style={styles.appointmentInfoText}>{item.clinicName}</Text>
                  <Text style={styles.appointmentInfoText}>{item.duration}</Text>
                </View>
              </View>

              <View style={styles.footerButton}>
                <TouchableOpacity style={styles.viewDetailButton}>
                  <Text style={styles.callOrEditTextStyle(false)}>{translate(ELanguageOptions.view_details)}</Text>
                </TouchableOpacity>
              </View>
            </View>
          )}
        />
      </View>
    );
  },
  () => true,
);

export default PreviousRoute;
