import { View } from "react-native";
import React from "react";
import ImageView from "react-native-image-viewing";
import styles from "./Styles.ViewImageScreen";
import ViewModel from "./ViewMode.ViewImageScreen";

const ViewImageScreen = React.memo(() => {
  const { images, visible, _onRequestClose } = ViewModel();

  if (!visible) return null;

  return (
    <View style={styles.container}>
      <View style={styles.maskViewingPicture} />
      <ImageView
        images={images}
        imageIndex={0}
        visible={visible}
        swipeToCloseEnabled={true}
        onRequestClose={_onRequestClose}
        doubleTapToZoomEnabled={true}
      />
    </View>
  );
});

ViewImageScreen.displayName = "ViewImageScreen";
export default ViewImageScreen;
