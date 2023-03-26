import { useBackHandler } from "@src/hooks";
import styles from "./Styles.BottomSheetComponent";
import ScaleManager from "@src/assets/ScaleManager";
import {
  EBottomSheetPosition,
  IBottomSheetComponentProps,
  IBottomTabComponentRef,
  IModalBoxComponentProps,
  IModalBoxComponentState,
} from "./Model.BottomSheetComponent";
import React from "react";
import {
  Animated,
  BackHandler,
  Dimensions,
  Easing,
  EmitterSubscription,
  GestureResponderEvent,
  Keyboard,
  KeyboardEvent,
  LayoutChangeEvent,
  Modal,
  PanResponder,
  PanResponderGestureState,
  Platform,
  TouchableWithoutFeedback,
  View,
} from "react-native";

const { height: SCREEN_HEIGHT, width: SCREEN_WIDTH } = Dimensions.get("window");

class ModalBoxComponent extends React.PureComponent<IModalBoxComponentProps, IModalBoxComponentState> {
  static defaultProps = {
    startOpen: false,
    backdropPressToClose: true,
    swipeToClose: true,
    swipeThreshold: 50,
    position: "center",
    backdrop: true,
    backdropOpacity: 0.5,
    backdropColor: "black",
    backdropContent: null,
    animationDuration: 400,
    backButtonClose: false,
    easing: Easing.elastic(0.8),
    coverScreen: false,
    keyboardTopOffset: Platform.OS == "ios" ? 22 : 0,
    useNativeDriver: true,
  };

  onViewLayoutCalculated = null as any;

  subscriptions: EmitterSubscription[] = [];

  constructor(props: IModalBoxComponentProps) {
    super(props);

    this.onBackPress = this.onBackPress.bind(this);
    this.handleOpening = this.handleOpening.bind(this);
    this.onKeyboardHide = this.onKeyboardHide.bind(this);
    this.onKeyboardChange = this.onKeyboardChange.bind(this);
    this.animateBackdropOpen = this.animateBackdropOpen.bind(this);
    this.animateBackdropClose = this.animateBackdropClose.bind(this);
    this.stopAnimateOpen = this.stopAnimateOpen.bind(this);
    this.animateOpen = this.animateOpen.bind(this);
    this.stopAnimateClose = this.stopAnimateClose.bind(this);
    this.animateClose = this.animateClose.bind(this);
    this.calculateModalPosition = this.calculateModalPosition.bind(this);
    this.createPanResponder = this.createPanResponder.bind(this);
    this.onViewLayout = this.onViewLayout.bind(this);
    this.onContainerLayout = this.onContainerLayout.bind(this);
    this.renderBackdrop = this.renderBackdrop.bind(this);
    this.renderContent = this.renderContent.bind(this);
    this.open = this.open.bind(this);
    this.close = this.close.bind(this);

    const position = props.startOpen
      ? new Animated.Value(0)
      : new Animated.Value(props.entry === "top" ? -SCREEN_HEIGHT : SCREEN_HEIGHT);
    this.state = {
      position,
      backdropOpacity: new Animated.Value(0),
      isOpen: props.startOpen,
      isAnimateClose: false,
      isAnimateOpen: false,
      swipeToClose: false,
      height: SCREEN_HEIGHT,
      width: SCREEN_WIDTH,
      containerHeight: SCREEN_HEIGHT,
      containerWidth: SCREEN_WIDTH,
      isInitialized: false,
      keyboardOffset: 0,
      pan: this.createPanResponder(position),
    };

    if (Platform.OS === "ios") {
      this.subscriptions = [
        ...[
          Keyboard.addListener("keyboardWillChangeFrame", this.onKeyboardChange),
          Keyboard.addListener("keyboardDidHide", this.onKeyboardHide),
        ],
      ];
    }
  }

  componentDidMount() {
    this.handleOpening();
  }

  componentDidUpdate(prevProps: IModalBoxComponentProps) {
    if (this.props.isOpen != prevProps.isOpen) {
      this.handleOpening();
    }
  }

  componentWillUnmount() {
    if (this.subscriptions) this.subscriptions.forEach((sub) => sub.remove());
    if (this.props.backButtonClose && Platform.OS === "android")
      BackHandler.removeEventListener("hardwareBackPress", this.onBackPress);
  }

  onBackPress() {
    this.close();
    return true;
  }

  handleOpening() {
    if (typeof this.props.isOpen == "undefined") return;
    if (this.props.isOpen) this.open();
    else this.close();
  }

  onKeyboardHide() {
    this.setState({ keyboardOffset: 0 });
  }

  onKeyboardChange(evt: KeyboardEvent) {
    if (!evt) return;
    if (!this.state.isOpen) return;
    const keyboardFrame = evt.endCoordinates;
    const keyboardHeight = this.state.containerHeight - keyboardFrame.screenY;

    this.setState({ keyboardOffset: keyboardHeight }, () => {
      this.animateOpen();
    });
  }

  animateBackdropOpen() {
    if (this.state.isAnimateBackdrop && this.state.animBackdrop) {
      this.state.animBackdrop.stop();
    }
    this.setState({ isAnimateBackdrop: true });

    const animBackdrop = Animated.timing(this.state.backdropOpacity, {
      toValue: 1,
      duration: this.props.animationDuration,
      easing: this.props.easing,
      useNativeDriver: true,
    }).start(() => {
      this.setState({
        isAnimateBackdrop: false,
        animBackdrop,
      });
    });
  }

  animateBackdropClose() {
    if (this.state.isAnimateBackdrop && this.state.animBackdrop) {
      this.state.animBackdrop.stop();
    }
    this.setState({ isAnimateBackdrop: true });

    const animBackdrop = Animated.timing(this.state.backdropOpacity, {
      toValue: 0,
      duration: this.props.animationDuration,
      easing: this.props.easing,
      useNativeDriver: true,
    }).start(() => {
      this.setState({
        isAnimateBackdrop: false,
        animBackdrop,
      });
    });
  }

  stopAnimateOpen() {
    if (this.state.isAnimateOpen) {
      if (this.state.animOpen) this.state.animOpen.stop();
      this.setState({ isAnimateOpen: false });
    }
  }

  animateOpen() {
    this.stopAnimateClose();

    if (this.props.backdrop) this.animateBackdropOpen();

    this.setState(
      {
        isAnimateOpen: true,
        isOpen: true,
      },
      () => {
        requestAnimationFrame(() => {
          let positionDest = this.calculateModalPosition(this.state.containerHeight - this.state.keyboardOffset);
          if (this.state.keyboardOffset && positionDest < this.props.keyboardTopOffset) {
            positionDest = this.props.keyboardTopOffset;
          }
          const animOpen = Animated.timing(this.state.position, {
            toValue: positionDest,
            duration: this.props.animationDuration,
            easing: this.props.easing,
            useNativeDriver: true,
          }).start(() => {
            this.setState({
              isAnimateOpen: false,
              animOpen,
              positionDest,
            });
            if (this.props.onOpened) this.props.onOpened();
          });
        });
      },
    );
  }

  stopAnimateClose() {
    if (this.state.isAnimateClose) {
      if (this.state.animClose) this.state.animClose.stop();
      this.setState({ isAnimateClose: false });
    }
  }

  animateClose() {
    this.stopAnimateOpen();
    if (this.props.backdrop) this.animateBackdropClose();

    this.setState(
      {
        isAnimateClose: true,
        isOpen: false,
      },
      () => {
        const animClose = Animated.timing(this.state.position, {
          toValue: this.props.entry === "top" ? -this.state.containerHeight : this.state.containerHeight,
          duration: this.props.animationDuration,
          easing: this.props.easing,
          useNativeDriver: true,
        }).start(() => {
          this.setState(
            {
              isAnimateClose: false,
              animClose,
            },
            () => {
              this.state.position.setValue(
                this.props.entry === "top" ? -this.state.containerHeight : this.state.containerHeight,
              );
            },
          );
          if (this.props.onClosed) this.props.onClosed();
        });
      },
    );
  }

  calculateModalPosition(containerHeight: number) {
    let position = 0;

    if (this.props.position == "bottom") {
      position = containerHeight - this.state.height;
    } else if (this.props.position == "center") {
      position = containerHeight / 2 - this.state.height / 2;
    }
    if (position < 0) position = 0;
    return position;
  }

  createPanResponder(position: Animated.Value) {
    let closingState = false;
    let inSwipeArea = false;

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const onPanStart = (evt: GestureResponderEvent, _: PanResponderGestureState) => {
      if (
        !this.props.swipeToClose ||
        this.props.isDisabled ||
        (this.props.swipeArea && evt.nativeEvent.pageY - (this.state as any).positionDest > this.props.swipeArea)
      ) {
        inSwipeArea = false;
        return false;
      }
      inSwipeArea = true;
      return true;
    };

    const animEvt = Animated.event([null, { customY: position }], { useNativeDriver: false });

    interface IExtendedPanResponderGestureState extends PanResponderGestureState {
      customY: number;
    }

    const onPanMove = (evt: GestureResponderEvent, state: PanResponderGestureState) => {
      const newClosingState =
        this.props.entry === "top" ? -state.dy > this.props.swipeThreshold : state.dy > this.props.swipeThreshold;
      if (this.props.entry === "top" ? state.dy > 0 : state.dy < 0) return;
      if (newClosingState != closingState && this.props.onClosingState) this.props.onClosingState(newClosingState);
      closingState = newClosingState;
      (state as IExtendedPanResponderGestureState).customY = state.dy + (this.state as any).positionDest;

      animEvt(evt, state);
    };

    const onPanRelease = (_: GestureResponderEvent, state: PanResponderGestureState) => {
      if (!inSwipeArea) return;
      inSwipeArea = false;
      if (this.props.entry === "top" ? -state.dy > this.props.swipeThreshold : state.dy > this.props.swipeThreshold) {
        this.close();
      } else if (!this.state.isOpen) {
        this.animateOpen();
      }
    };

    return PanResponder.create({
      onStartShouldSetPanResponder: onPanStart,
      onPanResponderMove: onPanMove,
      onPanResponderRelease: onPanRelease,
      onPanResponderTerminate: onPanRelease,
    });
  }

  onViewLayout(evt: LayoutChangeEvent) {
    const height = evt.nativeEvent.layout.height;
    const width = evt.nativeEvent.layout.width;

    const newState: any = {};
    if (height !== this.state.height) newState.height = height;
    if (width !== this.state.width) newState.width = width;
    this.setState(newState);

    if (this.onViewLayoutCalculated) (this as any).onViewLayoutCalculated();
  }

  onContainerLayout(evt: LayoutChangeEvent) {
    const height = evt.nativeEvent.layout.height;
    const width = evt.nativeEvent.layout.width;

    if (height == this.state.containerHeight && width == this.state.containerWidth) {
      this.setState({ isInitialized: true });
      return;
    }

    if (this.state.isOpen || this.state.isAnimateOpen) {
      this.animateOpen();
    }

    if (this.props.onLayout) this.props.onLayout(evt);
    this.setState({
      isInitialized: true,
      containerHeight: height,
      containerWidth: width,
    });
  }

  renderBackdrop() {
    let backdrop = null;

    if (this.props.backdrop) {
      backdrop = (
        <TouchableWithoutFeedback onPress={this.props.backdropPressToClose ? this.close : () => {}}>
          <Animated.View
            importantForAccessibility="no"
            style={[styles.absolute, { opacity: this.state.backdropOpacity }]}
          >
            <View
              style={[
                styles.absolute,
                {
                  backgroundColor: this.props.backdropColor,
                  opacity: this.props.backdropOpacity,
                },
              ]}
            />
            {this.props.backdropContent || []}
          </Animated.View>
        </TouchableWithoutFeedback>
      );
    }

    return backdrop;
  }

  renderContent() {
    const size = {
      height: this.state.containerHeight,
      width: this.state.containerWidth,
    };
    const offsetX = (this.state.containerWidth - this.state.width) / 2;

    return (
      <Animated.View
        onLayout={this.onViewLayout}
        style={[
          styles.wrapper,
          size,
          this.props.style,
          {
            transform: [{ translateY: this.state.position }, { translateX: offsetX }],
          },
        ]}
        {...this.state.pan.panHandlers}
      >
        {this.props.children}
      </Animated.View>
    );
  }

  render() {
    const visible = this.state.isOpen || this.state.isAnimateOpen || this.state.isAnimateClose;

    if (!visible) return <View />;

    const content = (
      <View
        importantForAccessibility="yes"
        accessibilityViewIsModal={true}
        style={[styles.transparent, styles.absolute]}
        pointerEvents={"box-none"}
      >
        <View style={{ flex: 1 }} pointerEvents={"box-none"} onLayout={this.onContainerLayout}>
          {visible && this.renderBackdrop()}
          {visible && this.renderContent()}
        </View>
      </View>
    );

    if (!this.props.coverScreen) return content;

    return (
      <Modal
        onRequestClose={() => {
          if (this.props.backButtonClose) {
            this.close();
          }
        }}
        supportedOrientations={["landscape", "portrait", "portrait-upside-down"]}
        transparent
        visible={visible}
        hardwareAccelerated={true}
      >
        {content}
      </Modal>
    );
  }

  open() {
    if (this.props.isDisabled) return;
    if (!this.state.isAnimateOpen && (!this.state.isOpen || this.state.isAnimateClose)) {
      this.onViewLayoutCalculated = () => {
        this.animateOpen();
        if (this.props.backButtonClose && Platform.OS === "android")
          BackHandler.addEventListener("hardwareBackPress", this.onBackPress);
        this.onViewLayoutCalculated = null;
      };
      this.setState({ isAnimateOpen: true });
    }
  }

  close() {
    if (this.props.isDisabled) return;
    if (!this.state.isAnimateClose && (this.state.isOpen || this.state.isAnimateOpen)) {
      this.animateClose();
      if (this.props.backButtonClose && Platform.OS === "android")
        BackHandler.removeEventListener("hardwareBackPress", this.onBackPress);
    }
  }
}

const BottomSheetComponent = React.forwardRef<IBottomTabComponentRef, IBottomSheetComponentProps>(
  (props: IBottomSheetComponentProps, ref) => {
    const bottomSheetRef = React.createRef<ModalBoxComponent>();

    const { children, position = EBottomSheetPosition.bottom, height = ScaleManager.scaleSizeHeight(250) } = props;

    React.useImperativeHandle(ref, () => {
      return {
        show: () => {
          bottomSheetRef?.current?.open();
        },
        close: () => {
          bottomSheetRef?.current?.close();
        },
      };
    });

    useBackHandler(() => {
      bottomSheetRef?.current?.close();
    });

    const _onClose = React.useCallback(() => {
      if (!!props?.onClosed) {
        (props?.onClosed as Function)();
      }
    }, [props?.onClosed]);

    return (
      <ModalBoxComponent
        {...(props as unknown as IModalBoxComponentProps)}
        onClosed={_onClose}
        ref={bottomSheetRef}
        useNativeDriver={true}
        position={position}
        swipeToClose={props.swipeToClose ?? true}
        backdropPressToClose={true}
        animationDuration={400}
        style={styles.containerStyle(height)}
      >
        <View style={styles.handle} />
        {children}
      </ModalBoxComponent>
    );
  },
);

export default React.memo(BottomSheetComponent);
