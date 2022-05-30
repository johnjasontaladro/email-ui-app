import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";

const util = {
  getDayOfDate,
  getFullMonthOfDate,
  getShortMonthOfDate,
  getYearOfDate,
  getDateWithTime,
  getDateFromNow,
  getNameInitial,
};

function getDayOfDate(dateIsoString) {
  return dayjs(dateIsoString).date();
}

function getFullMonthOfDate(dateIsoString) {
  return dayjs(dateIsoString).format("MMMM");
}

function getShortMonthOfDate(dateIsoString) {
  return dayjs(dateIsoString).format("MMM");
}

function getYearOfDate(dateIsoString) {
  return dayjs(dateIsoString).year();
}

function getDateWithTime(dateIsoString) {
  const cdate = dayjs(dateIsoString);
  return cdate.format("MMMM DD, YYYY [at] hh:mmA");
}

function getDateFromNow(dateIsoString) {
  dayjs.extend(relativeTime);

  return dayjs(dateIsoString).fromNow();
}

function getNameInitial(nameWithEmail) {
  let name = nameWithEmail.split("<");
  name = name[0].trim();

  const nameArr = name.split(" ");
  const initials =
    nameArr && nameArr.length
      ? nameArr[0].substring(0, 1).toUpperCase() +
        nameArr[nameArr.length - 1].substring(0, 1).toUpperCase()
      : "";
  return initials;
}

export default util;
