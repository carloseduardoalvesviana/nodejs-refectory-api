var { parseISO, isAfter, parse, format, subHours } = require("date-fns");
var { zonedTimeToUtc } = require("date-fns-tz");
var daysToWeeks = require("date-fns/daysToWeeks");
var { format } = require("date-fns");
exports.dateFormate = function (date, hour) {
  const convertDate = parse(date, "dd/MM/yyyy", new Date());
  const formaTed = format(convertDate, "yyy-MM-dd");
  const hourReserveLoad = subHours(new Date(), 3);

  const iso = parseISO(`${formaTed} ${hour}`);
  const znDate = subHours(zonedTimeToUtc(iso, "America/Sao_Paulo"), 3);

  const validando = isAfter(znDate, hourReserveLoad);

  return validando;
};

exports.dateFormate = function (date, hour) {
  const convertDate = parse(date, "dd/MM/yyyy", new Date());
  const formaTed = format(convertDate, "yyyy-MM-dd");
  const hourReserveLoad = subHours(new Date(), 3);

  const iso = parseISO(`${formaTed} ${hour}:00`);
  const znDate = subHours(zonedTimeToUtc(iso, "America/Sao_Paulo"), 3);

  const validando = isAfter(znDate, hourReserveLoad);

  return validando;
};

exports.date = function (date) {
  const convertDate = parse(date, "dd/MM/yyyy", new Date());
  const formaTed = format(convertDate, "yyyy-MM-dd");

  return formaTed;
};

exports.dayOfWeek = function (date) {
  const convertDate = parse(date, "dd/MM/yyyy", new Date());
  // const formaTed = format(convertDate, "yyyy-MM-dd");

  return format(convertDate, "EEEE");
};
