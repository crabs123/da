import { ICONS } from "@src/assets";
import { useDispatch } from "@src/hooks";
import { ISendTextProps, ITempMessage } from "@src/models/ChatMessagesModel";
import React from "react";
import { Send } from "react-native-gifted-chat";
import { styles } from "../Styles.ChatRoomScreen";

export const SendText = React.memo(({ userGiftedChat, onSend, ...rest }: ISendTextProps) => {
  const dispatch = useDispatch();
  const onSendText = React.useCallback(
    ({ text }: { text: string }, should: boolean) => {
      const tempId = Date.now();
      const newMsgPending = {
        _id: tempId,
        tempId,
        text: text.trim(),
        createdAt: new Date().getTime(),
        thumbnail: "",
        user: userGiftedChat,
        pending: true,
      } as Partial<ITempMessage> | Partial<ITempMessage>;
      // dispatch(chatSlice.actions.appendMessagePending([newMsgPending]));
      if (onSend) {
        onSend([newMsgPending], true);
      }
    },
    [onSend, userGiftedChat],
  );

  return rest.text ? (
    <Send {...rest} containerStyle={styles.sendContainerStyle} onSend={onSendText}>
      {ICONS.ContactIcon()}
    </Send>
  ) : null;
});
