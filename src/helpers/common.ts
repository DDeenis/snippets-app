export const nullableArray = <T>(arr?: T[]) => {
  return arr ? arr : [];
};
