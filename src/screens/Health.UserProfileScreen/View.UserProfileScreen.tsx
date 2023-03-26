import { BackgroundHeaderComponent, BottomSheetComponent, FastImageComponent, HeaderComponent } from "@src/components";
import React from "react";
import { FlatList, Text, TouchableOpacity, View } from "react-native";
import styles from "./Styles.UserProfileScreen";
import { ICONS } from "@src/assets";
import { IPersonalInfoSection } from "./Model.UserProfileScreen";
import { IRenderItemProps } from "@src/models/CommonModel";
import ViewModel from "./ViewModel.UserProfileScreen";
import { useSharedData } from "@src/hooks";
import { ELanguageOptions } from "@src/models/LanguageOptionsModel";

const UserProfileScreen = React.memo(() => {
  const {
    userData,
    userProfile,
    _handleLogout,
    _handleChangeAvatar,
    _handleDeleteAccount,
    bottomSheetForwardRef,
    _handleOpenModalLogout,
    bottomSheetForwardRefV2,
    _handleCloseBottomSheet,
    _handleGoToUpdateProfile,
    _handleConfirmDeleteAccount,
  } = ViewModel();
  const { translate } = useSharedData();

  const _renderItem = React.useCallback(({ item }: IRenderItemProps<IPersonalInfoSection>) => {
    const detailInfos: JSX.Element[] = [];
    for (const detailInfo of item.details) {
      for (const detail of Object.keys(detailInfo)) {
        detailInfos.push(
          <View style={styles.rowContainer}>
            <Text style={styles.keyText}>{detail}</Text>
            <Text style={styles.valueText}>{detailInfo[detail]}</Text>
          </View>,
        );
      }
    }
    return (
      <View style={styles.sectionContainer}>
        <Text style={styles.title}>{item.title}</Text>
        {detailInfos}
      </View>
    );
  }, []);

  const _renderHeader = React.useCallback(() => {
    return (
      <React.Fragment>
        <TouchableOpacity style={{}} onPress={_handleChangeAvatar}>
          <FastImageComponent uri={userProfile.avatar as string} pictureStyle={styles.avatarImage} />
          <View style={styles.editIconContainer}>{ICONS.ChangeImageIcon()}</View>
        </TouchableOpacity>
      </React.Fragment>
    );
  }, [_handleChangeAvatar, userProfile.avatar]);

  const _renderFooter = React.useCallback(() => {
    return (
      <View style={styles.bottomWrapper}>
        <TouchableOpacity onPress={_handleGoToUpdateProfile} style={styles.buttonContainerStyle(true)}>
          <Text style={styles.buttonTextStyle(true)}>{translate(ELanguageOptions.update_my_account)}</Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={_handleDeleteAccount} style={styles.buttonContainerStyle(false)}>
          <Text style={styles.buttonTextStyle(false)}>{translate(ELanguageOptions.delete_account)}</Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={_handleOpenModalLogout} style={styles.buttonContainerStyle(false)}>
          <Text style={styles.buttonTextStyle(false)}>{translate(ELanguageOptions.log_out)}</Text>
        </TouchableOpacity>
      </View>
    );
  }, [_handleGoToUpdateProfile, translate, _handleDeleteAccount, _handleOpenModalLogout]);

  const flatListProps = React.useMemo(
    () => ({
      ListHeaderComponent: _renderHeader,
      keyExtractor: (item: IPersonalInfoSection) => item.title,
      data: userData,
      renderItem: _renderItem,
      showsVerticalScrollIndicator: false,
      ListFooterComponent: _renderFooter,
    }),
    [_renderHeader, userData, _renderItem, _renderFooter],
  );

  return (
    <View style={styles.container}>
      <BackgroundHeaderComponent>
        <HeaderComponent mainTitle="User Profile" transparentBackground={true} />
      </BackgroundHeaderComponent>

      <FlatList {...flatListProps} />

      <BottomSheetComponent ref={bottomSheetForwardRef}>
        <View style={styles.bodyBottomSheetContainer}>
          <Text style={styles.titleLogoutText}>{translate(ELanguageOptions.log_out)}</Text>
          <Text style={styles.areYouSureText}>{"Are you sure to log out?"}</Text>
          <View style={styles.bottomSheetButtonWrapper}>
            <TouchableOpacity onPress={_handleCloseBottomSheet} style={styles.cancelButton}>
              <Text style={styles.cancelText}>{translate(ELanguageOptions.cancel)}</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={_handleLogout} style={styles.logoutButton}>
              <Text style={styles.logoutText}>{translate(ELanguageOptions.yes)}</Text>
            </TouchableOpacity>
          </View>
        </View>
      </BottomSheetComponent>

      <BottomSheetComponent ref={bottomSheetForwardRefV2}>
        <View style={styles.bodyBottomSheetContainer}>
          <Text style={styles.titleLogoutText}>{translate(ELanguageOptions.delete_account)}</Text>
          <Text style={styles.areYouSureText}>{"Are you sure to delete this account?"}</Text>
          <View style={styles.bottomSheetButtonWrapper}>
            <TouchableOpacity onPress={_handleCloseBottomSheet} style={styles.cancelButton}>
              <Text style={styles.cancelText}>{translate(ELanguageOptions.cancel)}</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={_handleConfirmDeleteAccount} style={styles.logoutButton}>
              <Text style={styles.logoutText}>{translate(ELanguageOptions.yes)}</Text>
            </TouchableOpacity>
          </View>
        </View>
      </BottomSheetComponent>
    </View>
  );
});

UserProfileScreen.displayName = "UserProfileScreen";
export default UserProfileScreen as React.ComponentType;
