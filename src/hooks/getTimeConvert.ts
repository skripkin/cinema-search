export const convertMinutesToHoursAndMinutes = (minutes: number) => {
  const hours = Math.floor(minutes / 60);
  const remainingMinutes = minutes % 60;
  let result = "";
  if (hours > 0) {
    result += `${hours} часов `;
  }
  if (remainingMinutes > 0) {
    result += `${remainingMinutes} минут`;
  }
  return result.trim();
};
