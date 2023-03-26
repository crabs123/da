import * as React from "react";
import { View } from "react-native";
import { ItemPropTypes } from "./Model.MidPickSliderComponent";
import styles from "./Styles.MidPickSliderComponent";

class MidPickItem extends React.PureComponent<ItemPropTypes> {
  static defaultProps = {
    style: null,
    tenthItemStyle: null,
  };

  render() {
    const { oneColumnSize, borderWidth, index, style, tenthItemStyle } = this.props;

    return (
      <View
        style={[
          styles.subBlock,
          { width: oneColumnSize, borderRightWidth: borderWidth },
          (index + 1) % 10 === 0 ? { borderRightWidth: borderWidth + 2, height: 70 } : null,
          style,
          (index + 1) % 10 === 0 ? tenthItemStyle : null,
        ]}
      />
    );
  }
}

export default MidPickItem;
