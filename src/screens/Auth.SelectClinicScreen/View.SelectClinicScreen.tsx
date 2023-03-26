import { BackgroundHeaderComponent, FastImageComponent, HeaderComponent } from "@src/components";
import React from "react";
import { FlatList, Keyboard, Pressable, Text, TextInput, TouchableOpacity, View } from "react-native";
import styles from "./Styles.SelectClinicScreen";
import { ICONS } from "@src/assets";
import { FAKE_CLINIC_ARR, IFakeClinic, TSelectClinicScreenProps } from "./Model.SelectClinicScreen";
import { useSharedData } from "@src/hooks";
import ViewModel from "./ViewModel.SelectClinicScreen";
import { IRenderItemProps } from "@src/models/CommonModel";
import { ELanguageOptions } from "@src/models/LanguageOptionsModel";

const SelectClinicScreen: React.FC<TSelectClinicScreenProps> = React.memo(({ route }) => {
  const {
    isFocus,
    inputRef,
    searchValue,
    _handleOnBlur,
    selectedClinic,
    _handlePressOnMask,
    _handleOnChangeText,
    _handleSelectClinic,
    _handleGoToNextScreen,
  } = ViewModel(route?.params);
  const { translate } = useSharedData();

  const _renderItem = React.useCallback(
    ({ item }: IRenderItemProps<IFakeClinic>) => {
      return (
        <Pressable onPress={_handleSelectClinic(item.id)} style={styles.itemContainerStyle(selectedClinic === item.id)}>
          <FastImageComponent uri={item.uri} pictureStyle={styles.pictureStyle}>
            <Text style={styles.clinicNameText}>{item.name}</Text>
          </FastImageComponent>
          <View style={styles.addressContainer}>
            <View style={styles.addressWrapper}>
              <Text style={styles.addressText}>{item.address}</Text>
              <Text style={styles.addressText}>{item.phoneNumber}</Text>
            </View>
            <View style={styles.iconWrapper}>{ICONS.GreenCheveronIcon()}</View>
          </View>
        </Pressable>
      );
    },
    [_handleSelectClinic, selectedClinic],
  );

  return (
    <View style={styles.wrapper}>
      <View style={styles.container}>
        <BackgroundHeaderComponent>
          <HeaderComponent mainTitle={translate(ELanguageOptions.select_clinic)} transparentBackground={true} />
        </BackgroundHeaderComponent>

        <View style={styles.searchContainer}>
          <View style={styles.inputWrapper}>
            <TextInput
              ref={inputRef}
              value={searchValue}
              onChangeText={_handleOnChangeText}
              style={styles.textInputContainer}
              onBlur={_handleOnBlur}
            />
            {!searchValue && !isFocus && (
              <Pressable onPress={_handlePressOnMask} style={styles.maskViewContainer}>
                <Text style={styles.placeHolderText}>{translate(ELanguageOptions.search_by_location)}</Text>
              </Pressable>
            )}

            <View style={styles.searchIconWrapper}>{ICONS.SearchCyanIcon()}</View>
          </View>
        </View>

        <View style={styles.clinicTextResultContainer}>
          <Text style={styles.foundText}>
            {FAKE_CLINIC_ARR.length >= 2
              ? `${FAKE_CLINIC_ARR.length} ${translate(ELanguageOptions.clinic_found)}`
              : `${FAKE_CLINIC_ARR.length} ${translate(ELanguageOptions.clinics_found)}`}{" "}
          </Text>
        </View>
        <View style={styles.flatListContainer}>
          <FlatList
            onScrollBeginDrag={Keyboard.dismiss}
            data={FAKE_CLINIC_ARR}
            keyExtractor={(item) => item.id}
            renderItem={_renderItem}
            showsVerticalScrollIndicator={false}
          />
        </View>
      </View>
      <TouchableOpacity
        onPress={_handleGoToNextScreen}
        disabled={selectedClinic === "-1"}
        style={styles.nextButtonContainerStyle(selectedClinic !== "-1")}
      >
        <Text style={styles.nextTextStyle(selectedClinic !== "-1")}>{translate(ELanguageOptions.next)}</Text>
      </TouchableOpacity>
    </View>
  );
});

SelectClinicScreen.displayName = "SelectClinicScreen";
export default SelectClinicScreen as React.ComponentType;
