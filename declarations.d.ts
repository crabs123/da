declare module "*.svg" {
  import React from "react";
  import { SvgProps } from "react-native-svg";
  const content: React.FC<SvgProps>;
  export default content;
}

declare module "react-native-pinchable";
declare module "lodash";
declare module "react-native-incoming-call";
declare module "react-native-apple-health-kit-records";
