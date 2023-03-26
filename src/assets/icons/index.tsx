import React from "react";

//icon SVG
import Logo from "./Logo.svg";
import EmptySchedule from "./EmptySchedule.svg";
import StackActive from "./StackActive.svg";
import StackInactive from "./StackInactive.svg";
import HealthStatActive from "./HealthStatActive.svg";
import HealthStatInactive from "./HealthStatInactive.svg";
import ChatActive from "./ChatActive.svg";
import ChatInactive from "./ChatInactive.svg";
import Success from "./Success.svg";
import CameraCapture from "./CameraCapture.svg";
import ChatV2 from "./ChatV2.svg";
import FlipCamera from "./FlipCamera.svg";
import Call from "./Call.svg";
import SoundOn from "./SoundOn.svg";
import SoundOff from "./SoundOff.svg";
import MiceOff from "./MiceOff.svg";
import MiceOn from "./MiceOn.svg";
import GreenCheveron from "./GreenCheveron.svg";
import CalendarActive from "./CalendarActive.svg";
import CalendarInactive from "./CalendarInactive.svg";
import CheckBox from "./Checkbox.svg";
import HeartRate from "./HeartRate.svg";
import BloodGlucose from "./BloodGlucose.svg";
import BloodPressureEquipment from "./BloodPressureEquipment.svg";
import WeightEquipment from "./WeightEquipment.svg";
import CloseMark from "./CloseMark.svg";
import ShowPassword from "./ShowPassword.svg";
import HidePassword from "./HidePassword.svg";
import UnCheckbox from "./UnCheckbox.svg";
import NoPhoto from "./NoPhoto.svg";
import Attention from "./Attention.svg";
import Delete from "./Delete.svg";
import Heart from "./Heart.svg";
import Sleep from "./Sleep.svg";
import Weight from "./Weight.svg";
import BloodPressure from "./BloodPressure.svg";
import DeleteMainColor from "./DeleteMainColor.svg";
import Choose from "./Choose.svg";
import FullStar from "./FullStar.svg";
import YellowFullStar from "./YellowFullStar.svg";
import HalfStar from "./HalfStar.svg";
import Calendar from "./Calendar.svg";
import EmptyStar from "./EmptyStar.svg";
import Empty from "./Empty.svg";
import SendEmail from "./SendEmail.svg";
import RedClose from "./RedClose.svg";
import ChangeImage from "./ChangeImage.svg";
import Cancel2 from "./Cancel2.svg";
import GreenChoose from "./GreenChoose.svg";
import ChevBackWard from "./ChevBackWard.svg";
import WhiteChevBackWard from "./WhiteChevBackward.svg";
import Surprise from "./Surprise.svg";
import Info from "./Info.svg";
import Edit from "./Edit.svg";
import DominantCamera from "./DominantCamera.svg";
import RadioButtonChecked from "./RadioButtonChecked.svg";
import RadioButtonUnchecked from "./RadioButtonUnchecked.svg";
import WhiteEdit from "./EditWhite.svg";
import VerifiedCircle from "./VerifiedCircle.svg";
import Contact from "./Contact.svg";
import Logout from "./Logout.svg";
import MedicalReport from "./MedicalReport.svg";
import Prescription from "./Prescription.svg";
import Symptom from "./Symptom.svg";
import Language from "./Language.svg";
import Password from "./Password.svg";
import Payment from "./Payment.svg";
import PreparationDay from "./PreparationDay.svg";
import ShieldDone from "./ShieldDone.svg";
import TermsAndConditions from "./TermsAndConditions.svg";
import WorkDay from "./WorkDay.svg";
import Plus from "./Plus.svg";
import SearchActive from "./SearchActive.svg";
import SearchInactive from "./SearchInactive.svg";
import DropDown from "./DropDown.svg";
import DropUp from "./DropUp.svg";
import SettingActive from "./SettingActive.svg";
import SettingInactive from "./SettingInactive.svg";
import NotificationActive from "./NotificationActive.svg";
import NotificationActiveNew from "./NotificationActiveNew.svg";
import NotificationInactive from "./NotificationInactive.svg";
import NotificationInactiveNew from "./NotificationInactiveNew.svg";
import HeaderBG from "./HeaderBG.svg";
import Search from "./Search.svg";
import ExclamationMark from "./ExclamationMark.svg";
import ScaleManager from "@src/assets/ScaleManager";
import { Animated, View } from "react-native";
import { useEmitter } from "@src/hooks";
import { EDeviceEmitter } from "@src/hooks/useEmitter";

interface ISizeProps {
  size?: number;
}

interface IShowHidePasswordIcon extends ISizeProps {
  show: boolean;
}

interface IChooseIcon extends ISizeProps {
  stroke?: string;
}

interface ICheckedIcon extends ISizeProps {
  isChecked: boolean;
}

const CheckedIcon = ({ size = ScaleManager.scaleSizeHeight(20), isChecked = false }: ICheckedIcon) =>
  isChecked ? <CheckBox width={size} height={size} /> : <UnCheckbox width={size} height={size} />;

const RadioButtonIcon = ({ size = ScaleManager.scaleSizeHeight(20), isChecked = false }: ICheckedIcon) =>
  isChecked ? <RadioButtonChecked width={size} height={size} /> : <RadioButtonUnchecked width={size} height={size} />;

const ShowHidePasswordIcon = ({ size = ScaleManager.scaleSizeHeight(20), show = false }: IShowHidePasswordIcon) =>
  show ? <ShowPassword width={size} height={size} /> : <HidePassword width={size} height={size} />;

const LogoIcon = () => {
  return <Logo />;
};

const CallIcon = () => {
  return <Call />;
};

const MiceOnIcon = () => {
  return <MiceOn />;
};

const MiceOffIcon = () => {
  return <MiceOff />;
};

const MedicalReportIcon = () => {
  return <MedicalReport />;
};

const PrescriptionIcon = () => {
  return <Prescription />;
};

const SymptomIcon = () => {
  return <Symptom />;
};

const HeaderBGIcon = () => {
  return <HeaderBG />;
};

const GreenCheveronIcon = () => {
  return <GreenCheveron />;
};

const SuccessIcon = () => {
  return <Success />;
};

const CloseMarkIcon = () => {
  return <CloseMark />;
};

const HeartIcon = () => {
  return <Heart />;
};

const ChangeImageIcon = () => {
  return <ChangeImage />;
};

const SleepIcon = () => {
  return <Sleep />;
};

const CameraCaptureIcon = () => {
  return <CameraCapture />;
};

const ChatV2Icon = () => {
  return <ChatV2 />;
};

const FlipCameraIcon = () => {
  return <FlipCamera />;
};

const WeightIcon = () => {
  return <Weight />;
};

const BloodPressureIcon = () => {
  return <BloodPressure />;
};

const DeleteIcon = () => {
  return <Delete />;
};

const DominantCameraIcon = () => {
  return <DominantCamera />;
};

const RedCloseIcon = () => {
  return <RedClose />;
};

const EmptyScheduleIcon = () => {
  return <EmptySchedule />;
};

const SearchCyanIcon = () => {
  return <Search />;
};

const SoundOnIcon = () => {
  return <SoundOn />;
};

const SoundOffIcon = () => {
  return <SoundOff />;
};

const HeartRateIcon = () => {
  return <HeartRate />;
};

const BloodGlucoseIcon = () => {
  return <BloodGlucose />;
};

const BloodPressureEquipmentIcon = () => {
  return <BloodPressureEquipment />;
};

const WeightEquipmentIcon = () => {
  return <WeightEquipment />;
};

const DeleteMainColorIcon = () => {
  return <DeleteMainColor />;
};

const InfoIcon = () => {
  return <Info />;
};

const NoPhotoIcon = () => {
  return <NoPhoto />;
};

const EmptyIcon = ({ size }: ISizeProps) => {
  return <Empty width={size} height={size} />;
};

const PlusIcon = () => {
  return <Plus />;
};

const VerifiedCircleIcon = () => {
  return <VerifiedCircle />;
};

const WhiteChevBackWardIcon = () => {
  return <WhiteChevBackWard />;
};

const ChooseIcon = () => {
  return <Choose />;
};

const ContactIcon = () => {
  return <Contact />;
};

const LanguageIcon = () => {
  return <Language />;
};

const LogoutIcon = () => {
  return (
    <View style={{ transform: [{ translateX: ScaleManager.scaleSizeWidth(2) }] }}>
      <Logout />
    </View>
  );
};

const FullStarIcon = ({ size }: ISizeProps) => {
  return <FullStar width={size} height={size} />;
};

const YellowFullStarIcon = ({ size, stroke }: IChooseIcon) => {
  return <YellowFullStar width={size} height={size} stroke={stroke} fill={stroke} />;
};

const EmptyStarIcon = ({ size }: ISizeProps) => {
  return <EmptyStar width={size} height={size} />;
};

const HalfStarIcon = ({ size }: ISizeProps) => {
  return <HalfStar width={size} height={size} />;
};

const PasswordIcon = () => {
  return <Password />;
};

const CalendarIcon = () => {
  return <Calendar />;
};

const PaymentIcon = () => {
  return <Payment />;
};

const PreparationDayIcon = () => {
  return <PreparationDay />;
};

const ShieldDoneIcon = () => {
  return <ShieldDone />;
};

const TermsAndConditionsIcon = () => {
  return <TermsAndConditions />;
};

const WorkDayIcon = () => {
  return <WorkDay />;
};

const SendEmailIcon = () => {
  return <SendEmail />;
};

const GreenChooseIcon = ({ stroke }: IChooseIcon) => {
  return <GreenChoose stroke={stroke} />;
};

const ExclamationMarkIcon = ({ stroke }: IChooseIcon) => {
  return <ExclamationMark stroke={stroke} />;
};

const ChevBackWardIcon = () => {
  return <ChevBackWard />;
};

const SurpriseIcon = ({ size = ScaleManager.scaleSizeHeight(20) }: ISizeProps) => {
  return <Surprise width={size} height={size} />;
};

const AttentionIcon = () => {
  return <Attention />;
};

const Cancel2Icon = () => {
  return <Cancel2 />;
};

const EditIcon = () => {
  return <Edit />;
};

const WhiteEditIcon = () => {
  return <WhiteEdit />;
};

const NotificationIcon = ({ focused }: { focused: boolean }) => {
  if (focused)
    return (
      <View style={{}}>
        <NotificationActive />
      </View>
    );
  return (
    <View style={{}}>
      <NotificationInactive />
    </View>
  );
};

const DEFAULT_ROTATE_DEG = 15;
const DEFAULT_DURATION_ROTATE = 100;

const NotificationNewIcon = ({ focused }: { focused: boolean }) => {
  const [showNotification, setShowNotification] = React.useState(false);
  const rotate = React.useRef(new Animated.Value(0)).current;
  let output: JSX.Element;
  if (focused) {
    output = <NotificationActiveNew />;
  } else {
    output = <NotificationInactiveNew />;
  }

  useEmitter(EDeviceEmitter.RING_NOTIFICATION_ICON, () => {
    setShowNotification(true);
  });
  React.useEffect(() => {
    if (showNotification) {
      Animated.sequence([
        Animated.timing(rotate, {
          toValue: DEFAULT_ROTATE_DEG,
          duration: DEFAULT_DURATION_ROTATE,
          useNativeDriver: true,
        }),
        Animated.timing(rotate, {
          toValue: -DEFAULT_ROTATE_DEG,
          duration: DEFAULT_DURATION_ROTATE,
          useNativeDriver: true,
        }),
        Animated.timing(rotate, {
          toValue: DEFAULT_ROTATE_DEG,
          duration: DEFAULT_DURATION_ROTATE,
          useNativeDriver: true,
        }),
        Animated.timing(rotate, {
          toValue: 0,
          duration: DEFAULT_DURATION_ROTATE,
          useNativeDriver: true,
        }),
      ]).start(() => {
        setShowNotification(false);
      });
    }
  }, [rotate, showNotification]);

  return (
    <Animated.View
      style={{
        transform: [
          {
            // translateX: language === EAvailableLanguages.cn ? 2 : 0,
            rotate: rotate.interpolate({
              inputRange: [0, 10],
              outputRange: ["0deg", "10deg"],
            }),
          },
        ],
      }}
    >
      {output}
    </Animated.View>
  );
};

const SearchIcon = ({ active }: { active: boolean }) => {
  if (active) return <SearchActive />;
  return <SearchInactive />;
};

const StackIcon = ({ focused }: { focused: boolean }) => {
  if (focused) return <StackActive />;
  return <StackInactive />;
};

const HealthStatIcon = ({ focused }: { focused: boolean }) => {
  if (focused) return <HealthStatActive />;
  return <HealthStatInactive />;
};

const CalendarStackIcon = ({ focused }: { focused: boolean }) => {
  if (focused) return <CalendarActive />;
  return <CalendarInactive />;
};

const ChatIcon = ({ focused }: { focused: boolean }) => {
  if (focused) return <ChatActive />;
  return <ChatInactive />;
};

const DropdownIcon = ({ active }: { active: boolean }) => {
  if (active) return <DropUp />;
  return <DropDown />;
};

const SettingIcon = ({ focused }: { size: number; focused: boolean }) => {
  if (focused) return <SettingActive />;
  return <SettingInactive />;
};

const ICONS = {
  CallIcon,
  ChatIcon,
  InfoIcon,
  EditIcon,
  LogoIcon,
  PlusIcon,
  StackIcon,
  EmptyIcon,
  HeartIcon,
  SleepIcon,
  SearchIcon,
  WeightIcon,
  ChatV2Icon,
  MiceOnIcon,
  LogoutIcon,
  ChooseIcon,
  DeleteIcon,
  SuccessIcon,
  SoundOnIcon,
  SymptomIcon,
  NoPhotoIcon,
  MiceOffIcon,
  WorkDayIcon,
  CheckedIcon,
  Cancel2Icon,
  SettingIcon,
  ContactIcon,
  PaymentIcon,
  HeaderBGIcon,
  RedCloseIcon,
  CalendarIcon,
  DropdownIcon,
  LanguageIcon,
  SurpriseIcon,
  PasswordIcon,
  HalfStarIcon,
  FullStarIcon,
  SoundOffIcon,
  SendEmailIcon,
  CloseMarkIcon,
  WhiteEditIcon,
  AttentionIcon,
  EmptyStarIcon,
  HeartRateIcon,
  SearchCyanIcon,
  HealthStatIcon,
  FlipCameraIcon,
  ShieldDoneIcon,
  RadioButtonIcon,
  GreenChooseIcon,
  ChangeImageIcon,
  BloodGlucoseIcon,
  ChevBackWardIcon,
  PrescriptionIcon,
  NotificationIcon,
  BloodPressureIcon,
  MedicalReportIcon,
  GreenCheveronIcon,
  CameraCaptureIcon,
  EmptyScheduleIcon,
  CalendarStackIcon,
  PreparationDayIcon,
  DominantCameraIcon,
  VerifiedCircleIcon,
  YellowFullStarIcon,
  WeightEquipmentIcon,
  DeleteMainColorIcon,
  NotificationNewIcon,
  ExclamationMarkIcon,
  ShowHidePasswordIcon,
  WhiteChevBackWardIcon,
  TermsAndConditionsIcon,
  BloodPressureEquipmentIcon,
} as const;

export default ICONS;
