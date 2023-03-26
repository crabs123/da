import { Platform, Text, TouchableOpacity, View } from "react-native";
import React from "react";
import { DismissKeyboardComponent, HeaderComponent } from "@src/components";
import { COLORS, ICONS, THEMES } from "@src/assets";
import DoubleTapComponent from "../../components/DoubleTapComponent/View.DoubleTapComponent";
import DoubleTapMessage from "./components/DoubleTapMessage";
import {
  ActionsProps,
  Bubble,
  BubbleProps,
  Composer,
  ComposerProps,
  GiftedChat,
  IMessage,
  InputToolbar,
  InputToolbarProps,
  LoadEarlier,
  LoadEarlierProps,
  SendProps,
  Time,
} from "react-native-gifted-chat";
import { ITempMessage } from "@src/models/ChatMessagesModel";
import ScaleManager from "@src/assets/ScaleManager";
import { messageTextContainerStyle, messageTextStyle, styles, timeTextStyle } from "./Styles.ChatRoomScreen";
import { MessageMedia } from "./components/MessageMedia";
import MessageAudio from "./components/MessageAudio";
import { AmountLikeMsg } from "./components/AmountLikeMessage";
import { SeenUser } from "./components/SeenUser";
import { SendText } from "./components/SendText";
import NavigationManager from "../../helper/NavigationManager";
export const HEIGHT_INPUT = ScaleManager.scaleSizeHeight(80 - 12 - 20);

const ChatDetailScreen = React.memo(() => {
  const [state, setState] = React.useState({
    isLoadMore: false,
    inputHeightChange: HEIGHT_INPUT,
  });
  const [messages, setMessages] = React.useState<IMessage[]>([]);
  const giftedChatRef = React.useRef<GiftedChat>();
  const userGiftedChat = React.useMemo(
    () => ({
      _id: 1,
      avatar:
        "https://i0.wp.com/thatnhucuocsong.com.vn/wp-content/uploads/2022/01/anh-avatar-doremon-nen-hong.jpg?ssl=1",
      name: `Doraemon`,
    }),
    [],
  );
  const NoRender = React.useMemo(() => () => <></>, []);

  const likeMsg = React.useCallback((messageId: number) => async () => {}, []);

  const onLongPress = React.useCallback(
    (messageId: number | string, isLike: boolean) => () => {
      try {
        const buttons = [
          {
            label: isLike ? "Unlike" : "Like",
            color: COLORS.errorColor,
            onPress: async () => {
              // buttonSheetRef.current?.close();
              if (typeof messageId !== "number") {
                return;
              }
            },
          },
        ];
        // buttonSheetRef.current?.setButtons(buttons);
        // buttonSheetRef.current?.open();
      } catch (error) {
        console.log(error);
      }
    },
    [],
  );

  const renderBubble = React.useMemo(
    () => (props: BubbleProps<ITempMessage>) => {
      let renderTime = true;
      let messCurrentUser = true;
      let diff = 1;
      if (props.previousMessage) {
        let sameUserInPrevMessage = false;
        if (props.previousMessage?.user !== undefined && props.previousMessage?.user) {
          sameUserInPrevMessage = !!(props.previousMessage?.user?._id === props.currentMessage?.user?._id);
        }
        messCurrentUser = props.user?._id === props.currentMessage?.user?._id;
        const currentTime = props.currentMessage?.createdAt ? new Date(props.currentMessage?.createdAt) : new Date();
        const previousTime = props.previousMessage?.createdAt ? new Date(props.previousMessage?.createdAt) : new Date();
        // diff = differenceInMinutes(previousTime, currentTime);
        diff = Math.floor(Math.random() * 10);
        renderTime = messCurrentUser && props.user?._id !== props.previousMessage?.user?._id;
      }

      const seenUserWithoutSender = (props.currentMessage?.seenUsers || []).filter(
        (user) => user.id !== props.currentMessage?.user?._id,
      );

      const isLike = !!props.currentMessage?.likedBy?.find((user) => user.id === props.user?._id);

      const condition = true;
      // Object.prototype.hasOwnProperty.call(props.ppreviousMessage, "_id") ||
      // (diff !== 0 && props.previousMessage?.user._id === props.currentMessage?.user?._id) ||
      // props.previousMessage?.user?._id !== props.currentMessage?.user?._id;

      return (
        <DoubleTapMessage
          onDoubleTap={likeMsg(props.currentMessage?._id || 0)}
          onLongPress={onLongPress(props.currentMessage?._id || 0, isLike)}
          style={{
            flexDirection: "column",
            alignItems: !messCurrentUser ? "flex-start" : "flex-end",
            width: "80%",
            marginBottom: props.currentMessage?.likedBy?.length ? ScaleManager.scaleSizeHeight(8) : 0,
            marginTop: ScaleManager.scaleSizeHeight(6),
          }}
        >
          {/*NOTE note here */}
          {condition ? <Time {...props} timeTextStyle={timeTextStyle} /> : null}
          <View style={styles.rowFlexEnd}>
            {props.currentMessage?.text ? (
              <Bubble
                {...props}
                renderUsernameOnMessage={true}
                touchableProps={{
                  disabled: true,
                }}
                renderTicks={NoRender}
                textStyle={messageTextStyle}
                wrapperStyle={messageTextContainerStyle}
              />
            ) : null}
            {props.currentMessage?.image ? (
              <MessageMedia
                messageId={props.currentMessage._id}
                isLike={isLike}
                uri={props.currentMessage?.image}
                type={"image"}
                onLongPressMedia={onLongPress}
                onDoubleTap={likeMsg(props.currentMessage._id || 0)}
              />
            ) : null}
            {props.currentMessage?.video ? (
              <MessageMedia
                isLike={isLike}
                messageId={props.currentMessage._id}
                uri={props.currentMessage?.video}
                thumbnail={props.currentMessage?.thumbnail}
                type={"video"}
                onLongPressMedia={onLongPress}
                onDoubleTap={likeMsg(props.currentMessage._id || 0)}
              />
            ) : null}
            {props.currentMessage?.audio ? (
              <MessageAudio
                isLike={isLike}
                messageId={props.currentMessage._id}
                position={props.position}
                uri={props.currentMessage?.audio}
                onLongPressAudio={onLongPress}
                onDoubleTap={likeMsg(props.currentMessage._id || 0)}
              />
            ) : null}
            {messCurrentUser && props.currentMessage?.pending ? (
              <View style={styles.tickPending} />
            ) : (
              <View style={[styles.tickPending, styles.hiddenTick]} />
            )}
            <AmountLikeMsg
              position={props.position}
              likedBy={props.currentMessage?.likedBy || []}
              messageId={props.currentMessage?._id || 0}
            />
          </View>
          {props.position === "right" && seenUserWithoutSender.length ? (
            <View
              style={{
                ...styles.wrapperSeenUser,
                marginTop: props.currentMessage?.likedBy ? ScaleManager.scaleSizeHeight(8) : 0,
              }}
            >
              {seenUserWithoutSender?.map((user) => (
                <SeenUser key={user.id} avatar={user?.avatar} />
              ))}
            </View>
          ) : null}
        </DoubleTapMessage>
      );
    },
    [likeMsg, onLongPress, NoRender],
  );

  React.useEffect(() => {
    setMessages([
      {
        _id: 1,
        text: "How we can help you sir?",
        createdAt: new Date(new Date().getMilliseconds() + 200),
        user: {
          _id: 2,
          name: "Clinic Assistant",
          avatar:
            "https://img.freepik.com/free-photo/smiling-pretty-doctor-standing-hospital-office-with-paper-folder_1098-18884.jpg?w=2000&t=st=1676797270~exp=1676797870~hmac=3022b588043c6a78c81af26cdb5724f6d4c0c50d850e5fbda9fcb0c59934b3ce",
        },
      },
      {
        _id: 2,
        text: "",
        createdAt: new Date(),
        user: {
          _id: 2,
          name: "Clinic Assistant",
          avatar:
            "https://img.freepik.com/free-photo/smiling-pretty-doctor-standing-hospital-office-with-paper-folder_1098-18884.jpg?w=2000&t=st=1676797270~exp=1676797870~hmac=3022b588043c6a78c81af26cdb5724f6d4c0c50d850e5fbda9fcb0c59934b3ce",
        },
        image: "https://www.myhealth.ph/wp-content/uploads/2019/08/rpm.jpg",
      },

      // {
      //   _id: 1,
      //   text: "My message",
      //   createdAt: new Date(Date.UTC(2016, 5, 11, 17, 20, 0)),
      //   user: {
      //     _id: 3,
      //     name: "React Native",
      //     avatar: "https://facebook.github.io/react/img/logo_og.png",
      //   },
      //   image:
      //     "https://i0.wp.com/thatnhucuocsong.com.vn/wp-content/uploads/2022/01/anh-avatar-doremon-nen-hong.jpg?ssl=1",
      //   // You can also add a video prop:
      //   video: "http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4",
      //   // Mark the message as sent, using one tick
      //   sent: true,
      //   // Mark the message as received, using two tick
      //   received: true,
      // },
    ]);
  }, []);

  const onSend = React.useCallback((messages: IMessage[] = []) => {
    setMessages((previousMessages) => GiftedChat.append(previousMessages, messages));
  }, []);

  const renderSend = React.useMemo(
    () => (props: SendProps<ITempMessage>) =>
      !props.text ? (
        <View style={styles.containerRenderSend}>
          <TouchableOpacity style={styles.sendContainerStyle} onPress={() => {}}>
            {ICONS.ContactIcon()}
          </TouchableOpacity>
          {/* <LaunchGallery
            onChange={onSend}
            userGiftedChat={userGiftedChat}
            containerStyle={styles.sendContainerStyle}
            mode={'pick'}
          /> */}
          {/* <LaunchGif containerStyle={styles.sendContainerStyle} onChange={onSend} userGiftedChat={userGiftedChat} /> */}
        </View>
      ) : (
        <SendText {...props} userGiftedChat={userGiftedChat} />
      ),
    [userGiftedChat],
  );

  const onPressAvatar = React.useCallback((user: any) => {
    try {
      if (!user._id) {
        return;
      }
      // isBlockMe(user._id);
      console.log("📢 [View.ChatRoomScreen.tsx:212]", "go to profile");
      // navigation.navigate(APP_NAVIGATION.PROFILE, {
      //   screen: PROFILE_NAVIGATION.VIEW_PROFILE,
      //   initial: false,
      //   params: { userId: user._id, screen },
      // });
    } catch (error) {
      console.log(error);
    }
  }, []);

  const isCloseToTop = React.useCallback(({ layoutMeasurement, contentOffset, contentSize }: any) => {
    const paddingToTop = ScaleManager.scaleSizeHeight(50);
    return contentSize.height - layoutMeasurement.height - paddingToTop <= contentOffset.y;
  }, []);

  const listViewProps = React.useMemo(
    () => ({
      scrollEventThrottle: 400,
      onScroll: ({ nativeEvent }: any) => {
        if (isCloseToTop(nativeEvent)) {
          console.log("📢 [View.ChatRoomScreen.tsx:235]", "load more");
          // loadMoreMessage();
        }
      },
    }),
    [isCloseToTop],
  );

  const renderInputToolbar = React.useMemo(
    () => (props: InputToolbarProps<any>) => {
      return (
        <View
          style={{
            flex: 1,
            backgroundColor: "transparent",
            transform: [{ translateY: ScaleManager.scaleSizeHeight(30) }],
          }}
        >
          <InputToolbar
            {...props}
            containerStyle={styles.inputToolbarContainerStyle}
            primaryStyle={styles.inputToolbarPrimaryStyle}
          />
        </View>
      );
    },
    [],
  );

  const onInputSizeChanged = React.useCallback(({ width, height }: any) => {
    if (height > 2 * HEIGHT_INPUT) {
      return;
    }
    if (height > HEIGHT_INPUT) {
      setState((prev) => ({ ...prev, inputHeightChange: height }));
    } else {
      setState((prev) => ({ ...prev, inputHeightChange: HEIGHT_INPUT }));
    }
  }, []);

  const renderComposer = React.useMemo(
    () => (props: ComposerProps) =>
      (
        <Composer
          {...props}
          placeholder="Messages..."
          onInputSizeChanged={onInputSizeChanged}
          composerHeight={state.inputHeightChange}
          textInputStyle={styles.composerTextInputStyle}
        />
      ),
    [state, onInputSizeChanged],
  );

  return (
    <DismissKeyboardComponent>
      <View
        style={{
          flex: 1,
          backgroundColor: COLORS.lightFourColor,
        }}
      >
        <TouchableOpacity
          style={{
            marginTop: ScaleManager.HEADER_COMPONENT_HEIGHT,
            width: ScaleManager.WIDTH_SCREEN_MINUS_PADDING,
            paddingLeft: ScaleManager.PADDING_SIZE,
          }}
          onPress={NavigationManager.goBack}
        >
          {ICONS.ChevBackWardIcon()}
        </TouchableOpacity>
        <GiftedChat
          ref={giftedChatRef as React.LegacyRef<GiftedChat<IMessage>>}
          listViewProps={listViewProps}
          messages={messages}
          onSend={(messages) => onSend(messages)}
          scrollToBottom={true}
          scrollToBottomComponent={NoRender}
          alignTop={true}
          alwaysShowSend={true}
          bottomOffset={Platform.OS === "ios" ? ScaleManager.scaleSizeHeight(80) : undefined}
          renderBubble={renderBubble}
          renderTime={NoRender}
          messagesContainerStyle={styles.messagesContainerStyle}
          keyboardShouldPersistTaps="never"
          onPressAvatar={onPressAvatar}
          user={userGiftedChat}
          renderSend={renderSend}
          renderComposer={renderComposer}
          renderInputToolbar={renderInputToolbar}
          minInputToolbarHeight={ScaleManager.scaleSizeHeight(140)}
        />
      </View>
    </DismissKeyboardComponent>
  );
});

ChatDetailScreen.displayName = "ChatDetailScreen";
export default ChatDetailScreen;
