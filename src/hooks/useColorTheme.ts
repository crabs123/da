import { Appearance } from "react-native";
import React from "react";
import { COLORS as DARK_COLORS } from "@src/assets";
import { LIGHT_COLORS } from "@src/assets/colors";

const useColorScheme = (delay = 500) => {
  const [colorScheme, setColorScheme] = React.useState(Appearance.getColorScheme());

  const timeout = React.useRef<NodeJS.Timeout | null>(null);

  const resetCurrentTimeout = React.useCallback(() => {
    if (timeout) {
      clearTimeout(timeout.current as NodeJS.Timeout);
    }
  }, [timeout]);

  const onColorSchemeChange = React.useCallback(
    (preferences: Appearance.AppearancePreferences) => {
      resetCurrentTimeout();

      timeout.current = setTimeout(() => {
        setColorScheme(preferences.colorScheme);
      }, delay);
    },
    [delay, resetCurrentTimeout],
  );

  const colorUpdate = React.useCallback(
    <T extends Object>(input: T) => {
      const [darkThemeColors, lightThemeColors] = [Object.values(DARK_COLORS), Object.values(LIGHT_COLORS)];
      const keys = Object.keys(input);

      if (colorScheme === "dark") {
        const values = Object.values(input).map((value) => {
          if (lightThemeColors.includes(value)) {
            const key = Object.keys(LIGHT_COLORS).find((k) => {
              if ((LIGHT_COLORS as any)[k] === value) {
                return k;
              }
            }) as string;
            return (DARK_COLORS as any)[key];
          }
          return value;
        });

        return Object.fromEntries(keys.map((_, i) => [keys[i], values[i]]));
      } else {
        const values = Object.values(input).map((value) => {
          if (darkThemeColors.includes(value)) {
            const key = Object.keys(DARK_COLORS).find((k) => {
              if ((DARK_COLORS as any)[k] === value) {
                return k;
              }
            }) as string;
            return (LIGHT_COLORS as any)[key];
          }
          return value;
        });
        return Object.fromEntries(keys.map((_, i) => [keys[i], values[i]]));
      }
    },
    [colorScheme],
  );

  React.useEffect(() => {
    const listener = Appearance.addChangeListener(onColorSchemeChange);

    return () => {
      resetCurrentTimeout();
      listener.remove();
    };
  }, [onColorSchemeChange, resetCurrentTimeout]);

  return colorUpdate;
};

export default useColorScheme;
