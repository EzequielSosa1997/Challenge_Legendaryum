
export const isNotMedition = ({
  min,
  observed,
  max,
}: {
  min: number;
  observed: number;
  max: number;
}) => min > observed || max < observed;
