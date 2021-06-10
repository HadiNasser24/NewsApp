export const getCurrentTimeStamp = (): number => {
  const currentDate = new Date();
  const utcDate = currentDate.toUTCString();
  const utcMillDate = new Date(utcDate).getTime();
  return utcMillDate;
};
