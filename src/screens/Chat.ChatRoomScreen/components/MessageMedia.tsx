import { ICONS } from "@src/assets";
import { FastImageComponent } from "@src/components";
import { IMessageMediaProps } from "@src/models/ChatMessagesModel";
import React from "react";
import { View } from "react-native";
import { styles } from "../Styles.ChatRoomScreen";
import DoubleTapMessage from "./DoubleTapMessage";

export const MessageMedia = React.memo(
  ({ messageId, type, navigation, uri, thumbnail, onDoubleTap, onLongPressMedia, isLike }: IMessageMediaProps) => {
    const isGif = React.useMemo(() => (uri || "").indexOf(".gif") !== -1, [uri]);
    const onPress = React.useCallback(() => {
      if (isGif) {
        return;
      }
      // navigation.push(ROOT_ROUTES.MEDIA, { uri, mimeType: type });
      console.log("📢 [MessageMedia.tsx:15]", "Go to media");
    }, [isGif]);

    const RenderMessage = React.useMemo(() => {
      if (type === "image") {
        return <FastImageComponent uri={uri} pictureStyle={styles.containerVideoMessage} />;
      }
      if (type === "video") {
        return (
          <View style={styles.containerVideoMessage}>
            <View style={styles.viewPlayVideoIcon}>{ICONS.ContactIcon()}</View>
            <FastImageComponent uri={thumbnail || ""} pictureStyle={styles.containerVideoMessage} />
          </View>
        );
      }
      return null;
    }, [type, uri, thumbnail]);

    const onLongPress = React.useCallback(() => {
      onLongPressMedia(messageId, isLike)();
    }, [isLike, messageId, onLongPressMedia]);

    return (
      <DoubleTapMessage onPress={onPress} onLongPress={onLongPress} onDoubleTap={onDoubleTap}>
        {RenderMessage}
      </DoubleTapMessage>
    );
  },
);
