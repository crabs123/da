import { LayoutAnimation, Platform, Text, View } from "react-native";
import React from "react";
import styles from "./Styles.ShowMoreComponent";

const ShowMoreComponent = ({ children, numberOfLine = null }: any) => {
  const [lines, setLines] = React.useState([]);
  const [showMore, setShowMore] = React.useState(numberOfLine === null ? false : true);

  let string = children;
  if (numberOfLine !== null && showMore) {
    string = "";
    for (let i = 0; i < numberOfLine; i++) {
      if (i + 1 > lines.length) {
        i = 1000;
      } else {
        string = string + (lines[i] as any).text;
        if (i + 1 === numberOfLine) {
          string = string.slice(0, string.length - 14) + "...";
        }
      }
    }
  }

  const _handleSetShowMore = React.useCallback(() => {
    if (Platform.OS === "ios") {
      LayoutAnimation.configureNext(LayoutAnimation.Presets.spring);
    }
    setShowMore(!showMore);
  }, [showMore]);

  return (
    <React.Fragment>
      <View pointerEvents="none" style={styles.container}>
        <Text
          onTextLayout={(e) => {
            setLines(e.nativeEvent.lines as any);
          }}
        >
          {children}
        </Text>
      </View>
      <Text style={styles.descriptionText}>
        {string}
        {lines.length !== 1 && (
          <Text style={styles.showMoreText} onPress={_handleSetShowMore}>
            {showMore ? `  show more` : `  see less}`}
          </Text>
        )}
      </Text>
    </React.Fragment>
  );
};

export default React.memo(ShowMoreComponent);
