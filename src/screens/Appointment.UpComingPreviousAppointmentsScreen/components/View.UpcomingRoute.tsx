import React from "react";
import { FlatList, Text, TouchableOpacity, View } from "react-native";
import moment from "moment";
import { FAKE_UPCOMING_APPOINTMENTS, IUpcomingRouteItem } from "../Model.UpComingPreviousAppointmentsScreen";
import { IRenderItemProps } from "@src/models/CommonModel";
import styles from "../Styles.UpComingPreviousAppointmentsScreen";
import { ICONS } from "@src/assets";
import ScaleManager from "@src/assets/ScaleManager";
import { useAuth, useDispatch, useSelector, useSharedData, useVideoCall } from "@src/hooks";
import { ELanguageOptions } from "@src/models/LanguageOptionsModel";
import NavigationManager from "@src/helper/NavigationManager";
import { EAppointmentScreenList } from "@models/RouterNamesModel";
import { EWebsocketMediaEvents, EWebsocketMediaStatus, IVideoCallDetail } from "@src/models/MediaServiceModel";
import { CommunicationServices } from "@src/services";
import HelperManager from "@src/helper/HelperManager";
import MediaActions from "@src/globalState/mediaState/media.actions";

const UpcomingRoute = React.memo(
  () => {
    const { translate } = useSharedData();
    const userProfileAuth = useAuth();
    const { userProfile } = useSelector((state) => state.auth);
    const dispatch = useDispatch();
    const { socketIO } = useSharedData();
    const { _ring } = useVideoCall();
    const _renderEmpty = React.useCallback(() => {
      return (
        <View style={styles.emptyContainer}>
          <View style={styles.emptyIcon}>{ICONS.EmptyIcon({ size: ScaleManager.scaleSizeHeight(100) })}</View>
          <Text style={styles.emptyText}>{translate(ELanguageOptions.you_have_no_appointments)}</Text>
          <Text style={styles.emptyText}>{translate(ELanguageOptions.need_to_make_a_booking)}</Text>
          <Text style={styles.emptyText}>{translate(ELanguageOptions.please_select_a_doctor_and_reach_us)}</Text>
        </View>
      );
    }, [translate]);

    const _handleCallDoctor = React.useCallback(async () => {
      socketIO.emit(EWebsocketMediaEvents.user_status, {
        userId: userProfileAuth.userId,
        status: EWebsocketMediaStatus.online,
      });
      try {
        const ROOM_NAME = HelperManager.idGenerator();
        const [callerSocketId, receiverSocketId] = await Promise.all([
          CommunicationServices.getRoomTokenApi(ROOM_NAME),
          CommunicationServices.getRoomTokenApi(ROOM_NAME),
        ]);
        _ring();
        if (!!callerSocketId && !!receiverSocketId) {
          const { firstName, middleName, lastName } = userProfile;
          const param: IVideoCallDetail = {
            callerInfo: {
              callerId: userProfileAuth.userId,
              callerSocketId: callerSocketId.token,
              callerName: `${firstName} ${middleName} ${lastName}`,
            },
            receiverInfo: {
              receiverId: "555",
              receiverSocketId: receiverSocketId.token,
              receiverName: "test",
            },
            status: EWebsocketMediaStatus.calling,
            roomName: ROOM_NAME,
          };
          socketIO.emit(EWebsocketMediaEvents.calling_status, param);
          dispatch(MediaActions._setVideoCallDetailsAction(param));
          NavigationManager.navigate(EAppointmentScreenList.APPOINTMENT_VIDEO_CALL_SCREEN);
        }
      } catch (error) {
        console.log("📢 [View.UpcomingRoute.tsx:41]", error);
      }
    }, [_ring, dispatch, socketIO, userProfile, userProfileAuth.userId]);

    return (
      <View style={styles.container}>
        <FlatList<IUpcomingRouteItem>
          style={styles.flatlist}
          ListEmptyComponent={_renderEmpty}
          showsVerticalScrollIndicator={false}
          keyExtractor={(item) => item.id}
          data={FAKE_UPCOMING_APPOINTMENTS}
          renderItem={({ item, index }: IRenderItemProps<IUpcomingRouteItem>) => (
            <View style={styles.upcomingRouteItemWrapperStyle(index === FAKE_UPCOMING_APPOINTMENTS.length - 1)}>
              <View style={styles.upcomingRouteItemSubWrapper}>
                <View style={styles.timeWrapper}>
                  <Text style={styles.dateTimeText}>{moment(item.date).format("DD MMM")}</Text>
                  <Text style={styles.minuteTimeText}>{moment(item.date).format("hh:mm a")}</Text>
                </View>

                <View style={styles.appointmentInfoWrapper}>
                  <Text style={styles.doctorNameText}>{item.doctorName}</Text>
                  <Text style={styles.appointmentInfoText}>{item.serviceName}</Text>
                  <Text style={styles.appointmentInfoText}>{item.clinicName}</Text>
                  <Text style={styles.appointmentInfoText}>{item.duration}</Text>
                </View>
              </View>

              <View style={styles.footerButton}>
                <TouchableOpacity onPress={_handleCallDoctor} style={styles.callOrEditButtonStyle(true)}>
                  <Text style={styles.callOrEditTextStyle(true)}>{translate(ELanguageOptions.call)}</Text>
                </TouchableOpacity>

                <TouchableOpacity style={styles.callOrEditButtonStyle(false)}>
                  <Text style={styles.callOrEditTextStyle(false)}>{translate(ELanguageOptions.edit)}</Text>
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

export default UpcomingRoute;
