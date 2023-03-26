import lodash from "lodash"; // 4.0.8

const DebounceButtonComponent = (WrappedComponent: any) => {
  const PreventDoubleClick = (props: any) => {
    const debouncedOnPress = () => {
      if (props.onPress) {
        props.onPress();
      }
    };

    const onPress = lodash.debounce(debouncedOnPress, 750, {
      leading: true,
      trailing: false,
    });

    return <WrappedComponent {...props} onPress={onPress} />;
  };

  PreventDoubleClick.displayName = `DebounceButtonComponent(${WrappedComponent.displayName || WrappedComponent.name})`;

  return PreventDoubleClick;
};

export default DebounceButtonComponent;
