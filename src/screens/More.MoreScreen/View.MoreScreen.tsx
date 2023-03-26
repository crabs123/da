import { FlatList, Text, TouchableOpacity, View } from "react-native";
import React from "react";
import { ICONS, THEMES } from "@src/assets";
import { BackgroundHeaderComponent, HeaderComponent, MidPickSliderComponent } from "@src/components";
import styles from "./Styles.MoreScreen";
import NavigationManager from "@helper/NavigationManager";
import { EMoreScreenList } from "@src/models/RouterNamesModel";
import themes from "@src/assets/themes";
import { IIconInMore } from "./Model.MoreScreen";
import { IRenderItemProps } from "../../models/CommonModel";

const MoreScreen = React.memo(() => {
  const buttonArr: IIconInMore[] = React.useMemo(
    () => [
      {
        name: "Education Content",
        function: () => {},
        icon: ICONS.MedicalReportIcon,
      },
      {
        name: "Prescription List",
        function: () => {},
        icon: ICONS.PrescriptionIcon,
      },
      {
        name: "Symptom Survey",
        function: () => {},
        icon: ICONS.SymptomIcon,
      },
    ],
    [],
  );

  const _renderItem = React.useCallback(({ item }: IRenderItemProps<IIconInMore>) => {
    return (
      <TouchableOpacity onPress={item.function} style={styles.buttonContainer}>
        <View style={styles.buttonBodyWrapper}>
          <View style={styles.leftButtonContainer}>
            <View style={styles.iconWrapper}>{item.icon()}</View>
            <View style={styles.textWrapper}>
              <Text style={styles.iconText}>{item.name}</Text>
            </View>
          </View>
          <View style={styles.rightButtonContainer}>{ICONS.ChevBackWardIcon()}</View>
        </View>
      </TouchableOpacity>
    );
  }, []);

  const _renderHeader = React.useCallback(() => <Text style={styles.title}>Additional Function</Text>, []);

  return (
    <View style={styles.container}>
      <BackgroundHeaderComponent>
        <HeaderComponent mainTitle="More Functions" transparentBackground={true} showBackButton={false} />
      </BackgroundHeaderComponent>

      <FlatList<IIconInMore>
        ListHeaderComponent={_renderHeader}
        data={buttonArr}
        keyExtractor={(item) => item.name}
        renderItem={_renderItem}
      />
    </View>
  );
});

MoreScreen.displayName = "MoreScreen";
export default MoreScreen;
