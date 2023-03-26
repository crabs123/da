import React from "react";

const NoRender: React.FC = React.memo(
  (): JSX.Element => <React.Fragment></React.Fragment>,
  () => false,
);

export default NoRender;
