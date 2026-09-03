export const normalize = (values: any) => {
  const keys = Object.keys(values);
  const normalized: any = {};
  keys.forEach((key: any) => {
    normalized[key] = values[key]?.length === 0 ? null : values[key];
  });
  return normalized;
};
