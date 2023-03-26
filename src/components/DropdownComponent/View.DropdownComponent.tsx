/* eslint-disable indent */
/* eslint-disable @typescript-eslint/indent */
import React from "react";
import {
  Dimensions,
  FlatList,
  I18nManager,
  Keyboard,
  KeyboardEvent,
  Modal,
  Text,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
  ViewStyle,
} from "react-native";
import CInput from "./TextInput";
import type { DropdownProps } from "./Model.DropdownComponent";
import lodash from "lodash";
import { useDetectDevice, useDeviceOrientation } from "@src/hooks";
import ICONS from "@src/assets/icons";
import { Shadow } from "react-native-shadow-2";
import styles from "./Styles.DropdownComponent";

const { isTablet, isIOS } = useDetectDevice;

const defaultProps = {
  placeholder: "Select item",
  activeColor: "#F6F7F8",
  data: [],
  style: {},
  selectedTextProps: {},
};

const DropdownComponent = React.forwardRef<any, DropdownProps>((props, currentRef) => {
  const orientation = useDeviceOrientation();
  const {
    testID,
    itemTestIDField,
    onChange,
    style,
    containerStyle,
    placeholderStyle,
    selectedTextStyle,
    itemContainerStyle,
    itemTextStyle,
    inputSearchStyle,
    iconStyle,
    selectedTextProps,
    data,
    labelField,
    valueField,
    value,
    activeColor,
    fontFamily,
    iconColor = "gray",
    searchPlaceholder,
    placeholder,
    search = false,
    maxHeight = 340,
    disable = false,
    keyboardAvoiding = true,
    renderLeftIcon,
    renderRightIcon,
    renderItem,
    renderInputSearch,
    onFocus,
    onBlur,
    autoScroll = true,
    showsVerticalScrollIndicator = true,
    dropdownPosition = "auto",
    flatListProps,
    searchQuery,
    statusBarIsTranslucent,
    backgroundColor,
    onChangeText,
  } = props;

  const ref = React.useRef<View>(null);
  const refList = React.useRef<FlatList>(null);
  const [visible, setVisible] = React.useState<boolean>(false);
  const [currentValue, setCurrentValue] = React.useState<any>(null);
  const [listData, setListData] = React.useState<any[]>(data);
  const [position, setPosition] = React.useState<any>();
  const [focus, setFocus] = React.useState<boolean>(false);
  const [keyboardHeight, setKeyboardHeight] = React.useState<number>(0);
  const [searchText, setSearchText] = React.useState("");

  const { width: W, height: H } = Dimensions.get("window");
  const styleContainerVertical: ViewStyle = React.useMemo(() => {
    return {
      backgroundColor: "rgba(0,0,0,0.1)",
      alignItems: "center",
    };
  }, []);
  const styleHorizontal: ViewStyle = React.useMemo(() => {
    return {
      marginBottom: 20,
      width: W / 2,
      alignSelf: "center",
    };
  }, [W]);

  React.useImperativeHandle(currentRef, () => {
    return { open: eventOpen, close: eventClose };
  });

  React.useEffect(() => {
    setListData([...data]);
    if (searchText) {
      onSearch(searchText);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data, searchText]);

  const eventOpen = () => {
    if (!disable) {
      setVisible(true);
      if (onFocus) {
        onFocus();
      }
    }
  };

  const eventClose = React.useCallback(() => {
    if (!disable) {
      setVisible(false);
      if (onBlur) {
        onBlur();
      }
    }
  }, [disable, onBlur]);

  const font = React.useCallback(() => {
    if (fontFamily) {
      return {
        fontFamily: fontFamily,
      };
    } else {
      return {};
    }
  }, [fontFamily]);

  const _measure = React.useCallback(() => {
    if (ref && ref?.current) {
      ref.current.measure((_width, _height, px, py, fx, fy) => {
        const isFull = orientation === "LANDSCAPE" && !isTablet;
        const w = Math.floor(px);
        const top = isFull ? 20 : Math.floor(py) + Math.floor(fy) + 2;
        const bottom = H - top;
        const left = I18nManager.isRTL ? W - Math.floor(px) - Math.floor(fx) : Math.floor(fx);

        setPosition({
          isFull,
          w,
          top,
          bottom: Math.floor(bottom),
          left,
          height: Math.floor(py),
        });
      });
    }
  }, [H, W, orientation]);

  const onKeyboardDidShow = React.useCallback(
    (e: KeyboardEvent) => {
      _measure();
      setKeyboardHeight(e.endCoordinates.height);
    },
    [_measure],
  );

  const onKeyboardDidHide = () => {
    setKeyboardHeight(0);
  };

  React.useEffect(() => {
    const subscriptionKeyboardDidShow = Keyboard.addListener("keyboardDidShow", onKeyboardDidShow);
    const subscriptionKeyboardDidHide = Keyboard.addListener("keyboardDidHide", onKeyboardDidHide);

    return () => {
      subscriptionKeyboardDidShow.remove();
      subscriptionKeyboardDidHide.remove();
    };
  }, [onKeyboardDidShow]);

  const getValue = React.useCallback(() => {
    const defaultValue = typeof value === "object" ? lodash.get(value, valueField) : value;

    const getItem = data.filter((e) => lodash.isEqual(defaultValue, lodash.get(e, valueField)));

    if (getItem.length > 0) {
      setCurrentValue(getItem[0]);
    } else {
      setCurrentValue(null);
    }
  }, [data, value, valueField]);

  React.useEffect(() => {
    getValue();
  }, [value, data, getValue]);

  const scrollIndex = React.useCallback(() => {
    if (autoScroll && data.length > 0 && listData.length === data.length) {
      setTimeout(() => {
        if (refList && refList?.current) {
          const defaultValue = typeof value === "object" ? lodash.get(value, valueField) : value;

          const index = lodash.findIndex(listData, (e: any) => lodash.isEqual(defaultValue, lodash.get(e, valueField)));
          if (index > -1 && index <= listData.length - 1) {
            refList?.current?.scrollToIndex({
              index: index,
              animated: false,
            });
          }
        }
      }, 200);
    }
  }, [autoScroll, data.length, listData, value, valueField]);

  const showOrClose = React.useCallback(() => {
    if (!disable) {
      _measure();
      setVisible(!visible);
      setListData(data);

      if (!visible) {
        if (onFocus) {
          onFocus();
        }
      } else {
        if (onBlur) {
          onBlur();
        }
      }
    }
    scrollIndex();
  }, [_measure, data, disable, onBlur, onFocus, scrollIndex, visible]);

  const onSearch = React.useCallback(
    (text: string) => {
      if (text.length > 0) {
        const defaultFilterFunction = (e: any) => {
          const item = lodash
            .get(e, labelField)
            ?.toLowerCase()
            .replace(" ", "")
            .normalize("NFD")
            .replace(/[\u0300-\u036f]/g, "");
          const key = text
            .toLowerCase()
            .replace(" ", "")
            .normalize("NFD")
            .replace(/[\u0300-\u036f]/g, "");

          return item.indexOf(key) >= 0;
        };

        const propSearchFunction = (e: any) => {
          const labelText = lodash.get(e, labelField);

          return searchQuery?.(text, labelText);
        };

        const dataSearch = data.filter(searchQuery ? propSearchFunction : defaultFilterFunction);
        setListData(dataSearch);
      } else {
        setListData(data);
      }
    },
    [data, labelField, searchQuery],
  );

  const onSelect = React.useCallback(
    (item: any) => {
      if (onChangeText) {
        setSearchText("");
      }
      onSearch("");
      setCurrentValue(item);
      onChange(item);
      eventClose();
    },
    [eventClose, onChange, onChangeText, onSearch],
  );

  const _renderDropdown = () => {
    const isSelected = currentValue && lodash.get(currentValue, valueField);
    return (
      <TouchableWithoutFeedback testID={testID} onPress={showOrClose}>
        <View style={styles.dropdown}>
          {renderLeftIcon?.()}
          <Text
            style={[styles.textItem, isSelected !== null ? selectedTextStyle : placeholderStyle, font()]}
            {...selectedTextProps}
          >
            {isSelected !== null ? lodash.get(currentValue, labelField) : placeholder}
          </Text>
          {renderRightIcon ? renderRightIcon() : ICONS.DropdownIcon({ active: false })}
        </View>
      </TouchableWithoutFeedback>
    );
  };

  const _renderItem = React.useCallback(
    ({ item, index }: { item: any; index: number }) => {
      const isSelected = currentValue && lodash.get(currentValue, valueField);
      const selected = lodash.isEqual(lodash.get(item, valueField), isSelected);
      return (
        <TouchableOpacity
          testID={lodash.get(item, itemTestIDField || labelField)}
          key={index.toString()}
          onPress={() => onSelect(item)}
          style={[
            itemContainerStyle,
            selected && {
              backgroundColor: activeColor,
            },
          ]}
        >
          {renderItem ? (
            renderItem(item, selected)
          ) : (
            <View style={styles.item}>
              <Text style={[styles.textItem, itemTextStyle, font()]}>{lodash.get(item, labelField)}</Text>
            </View>
          )}
        </TouchableOpacity>
      );
    },
    [
      activeColor,
      currentValue,
      font,
      itemContainerStyle,
      itemTestIDField,
      itemTextStyle,
      labelField,
      onSelect,
      renderItem,
      valueField,
    ],
  );

  const _renderSearch = React.useCallback(() => {
    if (search) {
      if (renderInputSearch) {
        return renderInputSearch((text) => {
          if (onChangeText) {
            setSearchText(text);
            onChangeText(text);
          }
          onSearch(text);
        });
      } else {
        return (
          <CInput
            testID={testID + " input"}
            style={[styles.input, inputSearchStyle]}
            inputStyle={[inputSearchStyle, font()]}
            autoCorrect={false}
            keyboardType={isIOS ? "default" : "visible-password"}
            placeholder={searchPlaceholder}
            onChangeText={(e: string) => {
              if (onChangeText) {
                setSearchText(e);
                onChangeText(e);
              }
              onSearch(e);
            }}
            placeholderTextColor="gray"
            iconStyle={[{ tintColor: iconColor }, iconStyle]}
            onFocus={() => setFocus(true)}
            onBlur={() => {
              setFocus(false);
            }}
          />
        );
      }
    }
    return null;
  }, [
    font,
    iconColor,
    iconStyle,
    inputSearchStyle,
    onChangeText,
    onSearch,
    renderInputSearch,
    search,
    searchPlaceholder,
    testID,
  ]);

  const _renderListTop = React.useCallback(() => {
    return (
      <TouchableWithoutFeedback>
        <View style={styles.flexShrink}>
          <Shadow distance={4} startColor={"#00000006"} offset={[0, 4]}>
            <FlatList
              style={{ borderRadius: 16 }}
              testID={testID + " flatlist"}
              keyboardShouldPersistTaps="handled"
              ref={refList}
              onScrollToIndexFailed={scrollIndex}
              data={listData}
              inverted
              renderItem={_renderItem}
              keyExtractor={(_item, index) => index.toString()}
              showsVerticalScrollIndicator={showsVerticalScrollIndicator}
              {...flatListProps}
            />
          </Shadow>
          {_renderSearch()}
        </View>
      </TouchableWithoutFeedback>
    );
  }, [_renderItem, flatListProps, listData, _renderSearch, scrollIndex, showsVerticalScrollIndicator, testID]);

  const _renderListBottom = React.useCallback(() => {
    return (
      <TouchableWithoutFeedback>
        <View style={styles.flexShrink}>
          {_renderSearch()}
          <Shadow distance={5} startColor={"#00000006"} offset={[0, 5]}>
            <FlatList
              style={{ borderRadius: 16 }}
              testID={testID + " flatlist"}
              keyboardShouldPersistTaps="handled"
              ref={refList}
              onScrollToIndexFailed={scrollIndex}
              data={listData}
              renderItem={_renderItem}
              keyExtractor={(_item, index) => index.toString()}
              showsVerticalScrollIndicator={showsVerticalScrollIndicator}
              {...flatListProps}
            />
          </Shadow>
        </View>
      </TouchableWithoutFeedback>
    );
  }, [_renderItem, flatListProps, listData, _renderSearch, scrollIndex, showsVerticalScrollIndicator, testID]);

  const _renderModal = React.useCallback(() => {
    if (visible && position) {
      const { isFull, w, top, bottom, left, height } = position;
      if (w && top && bottom) {
        const styleVertical: ViewStyle = { left: left, maxHeight: maxHeight };
        const isTopPosition =
          dropdownPosition === "auto"
            ? bottom < (isIOS ? 200 : search ? 310 : 300)
            : dropdownPosition === "top"
            ? true
            : false;
        let topHeight = isTopPosition ? top - height : top;

        let keyboardStyle: ViewStyle = {};

        if (keyboardAvoiding) {
          if (renderInputSearch) {
            if (keyboardHeight > 0 && bottom < keyboardHeight + height) {
              if (isTopPosition) {
                topHeight = H - keyboardHeight;
              } else {
                keyboardStyle = { backgroundColor: "rgba(0,0,0,0.1)" };
                topHeight = H - keyboardHeight - 55;
              }
            }
          } else {
            if (focus && keyboardHeight > 0 && bottom < keyboardHeight + height) {
              if (isTopPosition) {
                topHeight = H - keyboardHeight;
              } else {
                keyboardStyle = { backgroundColor: "rgba(0,0,0,0.1)" };
                topHeight = H - keyboardHeight - 55;
              }
            }
          }
        }

        return (
          <Modal
            transparent
            statusBarTranslucent={statusBarIsTranslucent}
            visible={visible}
            supportedOrientations={["landscape", "portrait"]}
            onRequestClose={showOrClose}
          >
            <TouchableWithoutFeedback onPress={showOrClose}>
              <View
                style={[
                  styles.flex1,
                  isFull && styleContainerVertical,
                  backgroundColor && { backgroundColor: backgroundColor },
                  keyboardStyle,
                ]}
              >
                <View
                  style={[
                    styles.wrapTop,
                    {
                      height: topHeight,
                      width: w,
                    },
                  ]}
                >
                  {isTopPosition && (
                    <View
                      style={[
                        {
                          width: w,
                          marginBottom: 10,
                        },
                        styles.container,
                        containerStyle,
                        isFull ? styleHorizontal : styleVertical,
                      ]}
                    >
                      {_renderListTop()}
                    </View>
                  )}
                </View>
                <View style={styles.flex1}>
                  {!isTopPosition && (
                    <View
                      style={[
                        {
                          width: w,
                          marginTop: 10,
                        },
                        styles.container,
                        containerStyle,
                        isFull ? styleHorizontal : styleVertical,
                      ]}
                    >
                      {_renderListBottom()}
                    </View>
                  )}
                </View>
              </View>
            </TouchableWithoutFeedback>
          </Modal>
        );
      }
      return null;
    }
    return null;
  }, [
    visible,
    position,
    maxHeight,
    dropdownPosition,
    search,
    keyboardAvoiding,
    statusBarIsTranslucent,
    showOrClose,
    styleContainerVertical,
    backgroundColor,
    containerStyle,
    styleHorizontal,
    _renderListTop,
    _renderListBottom,
    renderInputSearch,
    keyboardHeight,
    H,
    focus,
  ]);

  return (
    <View style={[styles.mainWrap, style]} ref={ref} onLayout={_measure}>
      {_renderDropdown()}
      {_renderModal()}
    </View>
  );
});

DropdownComponent.defaultProps = defaultProps;

export default DropdownComponent;
