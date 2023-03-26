import moment from "moment";
import React from "react";
import { Platform } from "react-native";
import AppleHealthKit, {
  BloodPressureSampleValue,
  HealthActivitySummary,
  HealthKitPermissions,
  HealthUnit,
  HealthValue,
} from "react-native-health";

const permissions = {
  permissions: {
    read: [
      AppleHealthKit.Constants.Permissions.HeartRate,
      AppleHealthKit.Constants.Permissions.Steps,
      AppleHealthKit.Constants.Permissions.SleepAnalysis,
      AppleHealthKit.Constants.Permissions.Weight,
      AppleHealthKit.Constants.Permissions.ActivitySummary,
      AppleHealthKit.Constants.Permissions.BloodType,
      AppleHealthKit.Constants.Permissions.StepCount,
      AppleHealthKit.Constants.Permissions.AppleStandTime,
      AppleHealthKit.Constants.Permissions.BloodGlucose,
      AppleHealthKit.Constants.Permissions.BloodPressureDiastolic,
      AppleHealthKit.Constants.Permissions.BloodPressureSystolic,
    ],
    write: [AppleHealthKit.Constants.Permissions.Weight, AppleHealthKit.Constants.Permissions.BloodGlucose],
  },
} as HealthKitPermissions;

const useHealthKit = () => {
  if (Platform.OS === "ios") {
    AppleHealthKit.initHealthKit(permissions, (error: string) => {
      /* Called after we receive a response from the system */

      if (error) {
        console.log("[ERROR] Cannot grant permissions!");
      }

      /* Can now read or write to HealthKit */

      const options = {
        startDate: new Date(2022, 1, 1).toISOString(),
        endDate: new Date(2023, 3, 18).toISOString(),
      };

      // AppleHealthKit.getHeartRateSamples(options, (callbackError: string, results: HealthValue[]) => {
      //   console.log("📢 [getHeartRateSamples]", results);
      // });

      // AppleHealthKit.getActivitySummary(options, (callbackError: string, results: HealthActivitySummary[]) => {
      //   console.log("📢 [getHeartRateSamples]", results);
      // });

      // AppleHealthKit.getBloodType({}, (callbackError: string, results: HealthValue) => {
      //   console.log("📢 [getHeartRateSamples]", results);
      // });

      // AppleHealthKit.getDailyStepCountSamples(options, (callbackError: string, results: HealthValue[]) => {
      //   console.log("📢 [getHeartRateSamples]", results);
      // });

      // AppleHealthKit.getHeartRateSamples(options, (callbackError: string, results: HealthValue[]) => {
      //   console.log("📢 [getHeartRateSamples]", results);
      // });

      // AppleHealthKit.getBloodPressureSamples(options, (callbackError: string, results: BloodPressureSampleValue[]) => {
      //   console.log("📢 [getBloodPressureSamples]", results);
      // });

      // AppleHealthKit.getBloodGlucoseSamples(options, (callbackError: string, results: HealthValue[]) => {
      //   console.log("📢 [getBloodGlucoseSamples]", results);
      // });

      // AppleHealthKit.getLatestWeight({}, (callbackError: string, results: HealthValue) => {
      //   console.log("📢 [getLatestWeight]", results);
      // });

      // AppleHealthKit.saveWeight(
      //   {
      //     value: 165,
      //     unit: AppleHealthKit.Constants.Units.pound,
      //     startDate: new Date().toISOString(),
      //   },
      //   (callbackError: string, results: HealthValue) => {
      //     console.log("📢 [saveWeight]", results);
      //   },
      // );
    });
  }
};

export default useHealthKit;
