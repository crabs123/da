import { Animated, LayoutAnimation, Text, TextStyle, TouchableOpacity, View, ViewStyle } from "react-native";
import React from "react";
import moment from "moment";
import { useTranslate } from "@src/hooks";
import ScaleManager from "@src/assets/ScaleManager";
import { DateManager, IDay, TMonth, TWeek } from "@src/helper/DateManager";
import HelperManager from "@src/helper/HelperManager";
import { COLORS, ICONS } from "@src/assets";
import { ELanguageOptions } from "@src/models/LanguageOptionsModel";
import styles from "./Styles.CalendarComponent";
import {
  EBackOrForward,
  ICalendarComponentProps,
  ICalendarComponentRef,
  ICustomizedCalendar,
} from "./Model.CalendarComponent";

export const DEFAULT_SELECTED_DATES: ICustomizedCalendar = {
  singleDate: {} as IDay,
  startDate: {} as IDay,
  endDate: {} as IDay,
};

const CalendarComponent = React.forwardRef<ICalendarComponentRef, ICalendarComponentProps>(
  (
    {
      selectedMonth,
      setSelectedMonth,
      MyCalendar,
      selectedDates,
      disableRange = true,
      notShowOutOfMonth = true,
      setSelectedDates,
    },
    ref,
  ) => {
    const translate = useTranslate();
    const currentMonthDetail = React.useMemo(
      () => MyCalendar.find((m) => Object.keys(m)[0] === selectedMonth) as TMonth,
      [MyCalendar, selectedMonth],
    );

    React.useImperativeHandle(ref, () => {
      return {
        show: () => {},
        hide: () => {},
        submit: () => {},
      };
    });

    const handleForwardMonth = React.useCallback(
      (type: EBackOrForward) => () => {
        LayoutAnimation.configureNext(LayoutAnimation.Presets.spring);
        setSelectedMonth((prev: string) => {
          let newMonthName = "";

          if (type === EBackOrForward.backward) {
            newMonthName = moment(new Date(prev + "/01").getTime())
              .subtract(1, "months")
              .format(DateManager.MONTH_NAME);
          } else {
            newMonthName = moment(new Date(prev + "/01").getTime())
              .add(1, "months")
              .format(DateManager.MONTH_NAME);
          }
          return newMonthName;
        });
      },
      [setSelectedMonth],
    );

    const _handleSelectedDate = React.useCallback(
      (date: IDay) => () => {
        setSelectedDates(
          Object.assign(
            {},
            {
              singleDate: date,
              startDate: date,
              endDate: date,
            },
          ),
        );
      },
      [setSelectedDates],
    );

    const _isSelectedOrInRange = React.useCallback(
      (date: IDay) => {
        const dateStyle: ViewStyle = {
          ...styles.dateItemWrapper,
        };
        const leftMaskViewDateStyle: ViewStyle = {
          ...styles.maskViewDate,
          left: 0,
        };
        const rightMaskViewDateStyle: ViewStyle = {
          ...styles.maskViewDate,
          right: 0,
        };
        const textStyle: TextStyle = {
          ...styles.dayNameText,
        };
        const dateWrapperStyle: ViewStyle = {
          ...styles.dateWrapper,
        };
        if (date.monthName !== selectedMonth) {
          textStyle.color = "#B9BCC0";
        }
        const isTail = selectedDates.endDate.millisecondCount === date.millisecondCount;
        const isHead = selectedDates.startDate.millisecondCount === date.millisecondCount;
        const inRange =
          selectedDates.startDate.millisecondCount <= date.millisecondCount &&
          date.millisecondCount <= selectedDates.endDate.millisecondCount &&
          !disableRange;

        if (inRange && !disableRange) {
          dateStyle.backgroundColor = COLORS.mainSubtleColor;
          dateWrapperStyle.backgroundColor = COLORS.mainSubtleColor;
          textStyle.color = "black";
        }

        const isOutOfCurrentMonthRange = date.monthName !== selectedMonth;

        if (isOutOfCurrentMonthRange && !!notShowOutOfMonth) {
          dateWrapperStyle.backgroundColor = COLORS.white;
          textStyle.color = COLORS.white;
        }

        if (isTail || isHead) {
          dateStyle.backgroundColor = COLORS.mainColor;
          textStyle.color = COLORS.white;
        }

        if (isHead && !disableRange) {
          leftMaskViewDateStyle.backgroundColor = COLORS.lightFourColor;
          leftMaskViewDateStyle.backgroundColor = COLORS.white;
        }

        if (isTail && !disableRange) {
          leftMaskViewDateStyle.backgroundColor = COLORS.lightFourColor;
          rightMaskViewDateStyle.backgroundColor = COLORS.white;
        }

        return {
          isTail,
          isHead,
          dateStyle,
          textStyle,
          dateWrapperStyle,
          leftMaskViewDateStyle,
          rightMaskViewDateStyle,
          isOutOfCurrentMonthRange,
        };
      },
      [
        disableRange,
        selectedDates.endDate.millisecondCount,
        selectedDates.startDate.millisecondCount,
        notShowOutOfMonth,
        selectedMonth,
      ],
    );

    const _renderWeekContainer = React.useCallback(
      (weekList: TWeek[]) => {
        const output: JSX.Element[] = [];
        for (const week of Object.values(weekList)) {
          const dayList: JSX.Element[] = [];
          for (const date of week) {
            const dateStrArr = date.dayName.split("/");
            const dateNumber = dateStrArr[dateStrArr.length - 1];
            const {
              isTail,
              isHead,
              dateStyle,
              textStyle,
              dateWrapperStyle,
              leftMaskViewDateStyle,
              rightMaskViewDateStyle,
              isOutOfCurrentMonthRange,
            } = _isSelectedOrInRange(date);
            dayList.push(
              <View key={date.dayName} style={dateWrapperStyle}>
                <TouchableOpacity
                  disabled={isOutOfCurrentMonthRange}
                  onPress={_handleSelectedDate(date)}
                  style={dateStyle}
                >
                  <Text style={textStyle}>{dateNumber}</Text>
                </TouchableOpacity>
                {isHead && <View style={leftMaskViewDateStyle} />}
                {isTail && <View style={rightMaskViewDateStyle} />}
              </View>,
            );
          }
          output.push(
            <View
              key={HelperManager.idGenerator()}
              style={[styles.weekContainer, { marginTop: ScaleManager.scaleSizeHeight(5) }]}
            >
              {dayList}
            </View>,
          );
        }

        return output;
      },
      [_handleSelectedDate, _isSelectedOrInRange],
    );

    const _renderMonthContainer = React.useCallback(() => {
      const output: JSX.Element[][] = [];
      for (const week of Object.values(currentMonthDetail)) {
        output.push(_renderWeekContainer(week));
      }
      return <View style={styles.monthContainer}>{output}</View>;
    }, [currentMonthDetail, _renderWeekContainer]);

    const dateNameOfTheWeekArr = React.useMemo(() => {
      return [
        translate(ELanguageOptions.monday),
        translate(ELanguageOptions.tuesday),
        translate(ELanguageOptions.wednesday),
        translate(ELanguageOptions.thursday),
        translate(ELanguageOptions.friday),
        translate(ELanguageOptions.saturday),
        translate(ELanguageOptions.sunday),
      ];
    }, [translate]);

    const _renderDateNameOfTheWeek = React.useCallback(() => {
      const output: JSX.Element[] = [];

      for (const dateName of dateNameOfTheWeekArr) {
        output.push(
          <View key={dateName} style={styles.dateWrapper}>
            <View style={styles.dateItemWrapper}>
              <Text style={styles.dayNameTextHeader}>{dateName.substring(0, 3)}</Text>
            </View>
          </View>,
        );
      }

      return output;
    }, [dateNameOfTheWeekArr]);

    const monthHeaderText = React.useMemo(() => {
      let output = "";
      const text = moment(selectedMonth + "/01").format("MMMM yyyy");
      output = translate(text.split(" ")[0] as ELanguageOptions) + moment(selectedMonth + "/01").format(" yyyy");

      return output;
    }, [translate, selectedMonth]);

    const _renderHeaderComponent = React.useCallback(() => {
      return (
        <View style={styles.headerContainer}>
          <View style={styles.monthHeaderTextWrapper}>
            <Text style={styles.monthHeaderText}>{monthHeaderText}</Text>
          </View>
          <View style={styles.arrowWrapperRow}>
            <TouchableOpacity style={styles.arrowLeftButton} onPress={handleForwardMonth(EBackOrForward.backward)}>
              {ICONS.ChevBackWardIcon()}
            </TouchableOpacity>
            <TouchableOpacity style={styles.arrowRightButton} onPress={handleForwardMonth(EBackOrForward.forward)}>
              {ICONS.ChevBackWardIcon()}
            </TouchableOpacity>
          </View>
        </View>
      );
    }, [handleForwardMonth, monthHeaderText]);

    return (
      <Animated.View style={styles.container}>
        {_renderHeaderComponent()}
        <View style={styles.weekContainer}>{_renderDateNameOfTheWeek()}</View>
        {_renderMonthContainer()}
      </Animated.View>
    );
  },
);

export default React.memo(CalendarComponent);
