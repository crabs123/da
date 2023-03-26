export function LinearInterpolation({
  value,
  inputRange,
  outputRange,
}: {
  value: number;
  inputRange: [number, number];
  outputRange: [number, number];
}) {
  const minInputRange = Math.min(...inputRange);
  const maxInputRange = Math.max(...inputRange);
  const minOutPutRange = Math.min(...outputRange);
  const maxOutPutRange = Math.max(...outputRange);

  if (value > maxInputRange) {
    return maxOutPutRange;
  } else if (value < minInputRange) {
    return minOutPutRange;
  }

  const percentage = getPercentageRange({
    value,
    min: minInputRange,
    max: maxInputRange,
  });

  return (1 - percentage) * minOutPutRange + percentage * maxOutPutRange;
}

function getPercentageRange({ value, min, max }: { value: number; min: number; max: number }): number {
  return ((value - min) * 100) / (max - min) / 100;
}
