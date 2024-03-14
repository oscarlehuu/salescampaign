import dayjs from "dayjs";
import isTodayDayjs from "dayjs/plugin/isToday";

dayjs.extend(isTodayDayjs);

export const formatDay = (date, format) => {
  return dayjs(date).format(format);
};

export const isToday = (date) => {
  return dayjs(date).isToday();
};
