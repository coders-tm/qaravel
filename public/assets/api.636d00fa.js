import { P as Plugin$1, p as pad, j as isDate, k as defaultLang, l as capitalize$1, m as Platform, n as noop, q as Plugin$2, N as Notify, D as Dialog, u as uid, t as format, v as createComponent, r as ref, c as computed, o as onMounted, x as onBeforeUnmount, h, g as getCurrentInstance, y as between, z as defineReactivePlugin, A as createGlobalNode, B as createChildApp, C as isObject, E as router } from "./index.94c1c68b.js";
import { B as BaseAlert } from "./BaseAlert.abd8bfd6.js";
function fallback(text) {
  const area = document.createElement("textarea");
  area.value = text;
  area.contentEditable = "true";
  area.style.position = "fixed";
  document.body.appendChild(area);
  area.focus();
  area.select();
  const res = document.execCommand("copy");
  area.remove();
  return res;
}
function copyToClipboard(text) {
  return navigator.clipboard !== void 0 ? navigator.clipboard.writeText(text) : new Promise((resolve, reject) => {
    const res = fallback(text);
    if (res) {
      resolve(true);
    } else {
      reject(res);
    }
  });
}
const breaks = [
  -61,
  9,
  38,
  199,
  426,
  686,
  756,
  818,
  1111,
  1181,
  1210,
  1635,
  2060,
  2097,
  2192,
  2262,
  2324,
  2394,
  2456,
  3178
];
function isLeapJalaaliYear(jy) {
  return jalCalLeap(jy) === 0;
}
function jalaaliMonthLength(jy, jm) {
  if (jm <= 6)
    return 31;
  if (jm <= 11)
    return 30;
  if (isLeapJalaaliYear(jy))
    return 30;
  return 29;
}
function jalCalLeap(jy) {
  const bl = breaks.length;
  let jp = breaks[0], jm, jump, leap, n, i;
  if (jy < jp || jy >= breaks[bl - 1]) {
    throw new Error("Invalid Jalaali year " + jy);
  }
  for (i = 1; i < bl; i += 1) {
    jm = breaks[i];
    jump = jm - jp;
    if (jy < jm) {
      break;
    }
    jp = jm;
  }
  n = jy - jp;
  if (jump - n < 6) {
    n = n - jump + div(jump + 4, 33) * 33;
  }
  leap = mod(mod(n + 1, 33) - 1, 4);
  if (leap === -1) {
    leap = 4;
  }
  return leap;
}
function div(a, b) {
  return ~~(a / b);
}
function mod(a, b) {
  return a - ~~(a / b) * b;
}
const MILLISECONDS_IN_DAY = 864e5, MILLISECONDS_IN_HOUR = 36e5, MILLISECONDS_IN_MINUTE = 6e4, defaultMask = "YYYY-MM-DDTHH:mm:ss.SSSZ", token = /\[((?:[^\]\\]|\\]|\\)*)\]|d{1,4}|M{1,4}|m{1,2}|w{1,2}|Qo|Do|D{1,4}|YY(?:YY)?|H{1,2}|h{1,2}|s{1,2}|S{1,3}|Z{1,2}|a{1,2}|[AQExX]/g, reverseToken = /(\[[^\]]*\])|d{1,4}|M{1,4}|m{1,2}|w{1,2}|Qo|Do|D{1,4}|YY(?:YY)?|H{1,2}|h{1,2}|s{1,2}|S{1,3}|Z{1,2}|a{1,2}|[AQExX]|([.*+:?^,\s${}()|\\]+)/g, regexStore = {};
function getRegexData(mask, dateLocale) {
  const days = "(" + dateLocale.days.join("|") + ")", key = mask + days;
  if (regexStore[key] !== void 0) {
    return regexStore[key];
  }
  const daysShort = "(" + dateLocale.daysShort.join("|") + ")", months = "(" + dateLocale.months.join("|") + ")", monthsShort = "(" + dateLocale.monthsShort.join("|") + ")";
  const map = {};
  let index = 0;
  const regexText = mask.replace(reverseToken, (match) => {
    index++;
    switch (match) {
      case "YY":
        map.YY = index;
        return "(-?\\d{1,2})";
      case "YYYY":
        map.YYYY = index;
        return "(-?\\d{1,4})";
      case "M":
        map.M = index;
        return "(\\d{1,2})";
      case "MM":
        map.M = index;
        return "(\\d{2})";
      case "MMM":
        map.MMM = index;
        return monthsShort;
      case "MMMM":
        map.MMMM = index;
        return months;
      case "D":
        map.D = index;
        return "(\\d{1,2})";
      case "Do":
        map.D = index++;
        return "(\\d{1,2}(st|nd|rd|th))";
      case "DD":
        map.D = index;
        return "(\\d{2})";
      case "H":
        map.H = index;
        return "(\\d{1,2})";
      case "HH":
        map.H = index;
        return "(\\d{2})";
      case "h":
        map.h = index;
        return "(\\d{1,2})";
      case "hh":
        map.h = index;
        return "(\\d{2})";
      case "m":
        map.m = index;
        return "(\\d{1,2})";
      case "mm":
        map.m = index;
        return "(\\d{2})";
      case "s":
        map.s = index;
        return "(\\d{1,2})";
      case "ss":
        map.s = index;
        return "(\\d{2})";
      case "S":
        map.S = index;
        return "(\\d{1})";
      case "SS":
        map.S = index;
        return "(\\d{2})";
      case "SSS":
        map.S = index;
        return "(\\d{3})";
      case "A":
        map.A = index;
        return "(AM|PM)";
      case "a":
        map.a = index;
        return "(am|pm)";
      case "aa":
        map.aa = index;
        return "(a\\.m\\.|p\\.m\\.)";
      case "ddd":
        return daysShort;
      case "dddd":
        return days;
      case "Q":
      case "d":
      case "E":
        return "(\\d{1})";
      case "Qo":
        return "(1st|2nd|3rd|4th)";
      case "DDD":
      case "DDDD":
        return "(\\d{1,3})";
      case "w":
        return "(\\d{1,2})";
      case "ww":
        return "(\\d{2})";
      case "Z":
        map.Z = index;
        return "(Z|[+-]\\d{2}:\\d{2})";
      case "ZZ":
        map.ZZ = index;
        return "(Z|[+-]\\d{2}\\d{2})";
      case "X":
        map.X = index;
        return "(-?\\d+)";
      case "x":
        map.x = index;
        return "(-?\\d{4,})";
      default:
        index--;
        if (match[0] === "[") {
          match = match.substring(1, match.length - 1);
        }
        return match.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
    }
  });
  const res = { map, regex: new RegExp("^" + regexText) };
  regexStore[key] = res;
  return res;
}
function getDateLocale(paramDateLocale, langProps) {
  return paramDateLocale !== void 0 ? paramDateLocale : langProps !== void 0 ? langProps.date : defaultLang.date;
}
function formatTimezone(offset, delimeter = "") {
  const sign = offset > 0 ? "-" : "+", absOffset = Math.abs(offset), hours = Math.floor(absOffset / 60), minutes = absOffset % 60;
  return sign + pad(hours) + delimeter + pad(minutes);
}
function applyYearMonthDayChange(date2, mod2, sign) {
  let year = date2.getFullYear(), month = date2.getMonth();
  const day = date2.getDate();
  if (mod2.year !== void 0) {
    year += sign * mod2.year;
    delete mod2.year;
  }
  if (mod2.month !== void 0) {
    month += sign * mod2.month;
    delete mod2.month;
  }
  date2.setDate(1);
  date2.setMonth(2);
  date2.setFullYear(year);
  date2.setMonth(month);
  date2.setDate(Math.min(day, daysInMonth(date2)));
  if (mod2.date !== void 0) {
    date2.setDate(date2.getDate() + sign * mod2.date);
    delete mod2.date;
  }
  return date2;
}
function applyYearMonthDay(date2, mod2, middle) {
  const year = mod2.year !== void 0 ? mod2.year : date2[`get${middle}FullYear`](), month = mod2.month !== void 0 ? mod2.month - 1 : date2[`get${middle}Month`](), maxDay = new Date(year, month + 1, 0).getDate(), day = Math.min(maxDay, mod2.date !== void 0 ? mod2.date : date2[`get${middle}Date`]());
  date2[`set${middle}Date`](1);
  date2[`set${middle}Month`](2);
  date2[`set${middle}FullYear`](year);
  date2[`set${middle}Month`](month);
  date2[`set${middle}Date`](day);
  delete mod2.year;
  delete mod2.month;
  delete mod2.date;
  return date2;
}
function getChange(date2, rawMod, sign) {
  const mod2 = normalizeMod(rawMod), d = new Date(date2), t = mod2.year !== void 0 || mod2.month !== void 0 || mod2.date !== void 0 ? applyYearMonthDayChange(d, mod2, sign) : d;
  for (const key in mod2) {
    const op = capitalize$1(key);
    t[`set${op}`](t[`get${op}`]() + sign * mod2[key]);
  }
  return t;
}
function normalizeMod(mod2) {
  const acc = { ...mod2 };
  if (mod2.years !== void 0) {
    acc.year = mod2.years;
    delete acc.years;
  }
  if (mod2.months !== void 0) {
    acc.month = mod2.months;
    delete acc.months;
  }
  if (mod2.days !== void 0) {
    acc.date = mod2.days;
    delete acc.days;
  }
  if (mod2.day !== void 0) {
    acc.date = mod2.day;
    delete acc.day;
  }
  if (mod2.hour !== void 0) {
    acc.hours = mod2.hour;
    delete acc.hour;
  }
  if (mod2.minute !== void 0) {
    acc.minutes = mod2.minute;
    delete acc.minute;
  }
  if (mod2.second !== void 0) {
    acc.seconds = mod2.second;
    delete acc.second;
  }
  if (mod2.millisecond !== void 0) {
    acc.milliseconds = mod2.millisecond;
    delete acc.millisecond;
  }
  return acc;
}
function adjustDate(date2, rawMod, utc) {
  const mod2 = normalizeMod(rawMod), middle = utc === true ? "UTC" : "", d = new Date(date2), t = mod2.year !== void 0 || mod2.month !== void 0 || mod2.date !== void 0 ? applyYearMonthDay(d, mod2, middle) : d;
  for (const key in mod2) {
    const op = key.charAt(0).toUpperCase() + key.slice(1);
    t[`set${middle}${op}`](mod2[key]);
  }
  return t;
}
function extractDate(str, mask, dateLocale) {
  const d = __splitDate(str, mask, dateLocale);
  const date2 = new Date(
    d.year,
    d.month === null ? null : d.month - 1,
    d.day === null ? 1 : d.day,
    d.hour,
    d.minute,
    d.second,
    d.millisecond
  );
  const tzOffset = date2.getTimezoneOffset();
  return d.timezoneOffset === null || d.timezoneOffset === tzOffset ? date2 : getChange(date2, { minutes: d.timezoneOffset - tzOffset }, 1);
}
function __splitDate(str, mask, dateLocale, calendar, defaultModel) {
  const date2 = {
    year: null,
    month: null,
    day: null,
    hour: null,
    minute: null,
    second: null,
    millisecond: null,
    timezoneOffset: null,
    dateHash: null,
    timeHash: null
  };
  defaultModel !== void 0 && Object.assign(date2, defaultModel);
  if (str === void 0 || str === null || str === "" || typeof str !== "string") {
    return date2;
  }
  if (mask === void 0) {
    mask = defaultMask;
  }
  const langOpts = getDateLocale(dateLocale, Plugin$1.props), months = langOpts.months, monthsShort = langOpts.monthsShort;
  const { regex, map } = getRegexData(mask, langOpts);
  const match = str.match(regex);
  if (match === null) {
    return date2;
  }
  let tzString = "";
  if (map.X !== void 0 || map.x !== void 0) {
    const stamp = parseInt(match[map.X !== void 0 ? map.X : map.x], 10);
    if (isNaN(stamp) === true || stamp < 0) {
      return date2;
    }
    const d = new Date(stamp * (map.X !== void 0 ? 1e3 : 1));
    date2.year = d.getFullYear();
    date2.month = d.getMonth() + 1;
    date2.day = d.getDate();
    date2.hour = d.getHours();
    date2.minute = d.getMinutes();
    date2.second = d.getSeconds();
    date2.millisecond = d.getMilliseconds();
  } else {
    if (map.YYYY !== void 0) {
      date2.year = parseInt(match[map.YYYY], 10);
    } else if (map.YY !== void 0) {
      const y = parseInt(match[map.YY], 10);
      date2.year = y < 0 ? y : 2e3 + y;
    }
    if (map.M !== void 0) {
      date2.month = parseInt(match[map.M], 10);
      if (date2.month < 1 || date2.month > 12) {
        return date2;
      }
    } else if (map.MMM !== void 0) {
      date2.month = monthsShort.indexOf(match[map.MMM]) + 1;
    } else if (map.MMMM !== void 0) {
      date2.month = months.indexOf(match[map.MMMM]) + 1;
    }
    if (map.D !== void 0) {
      date2.day = parseInt(match[map.D], 10);
      if (date2.year === null || date2.month === null || date2.day < 1) {
        return date2;
      }
      const maxDay = calendar !== "persian" ? new Date(date2.year, date2.month, 0).getDate() : jalaaliMonthLength(date2.year, date2.month);
      if (date2.day > maxDay) {
        return date2;
      }
    }
    if (map.H !== void 0) {
      date2.hour = parseInt(match[map.H], 10) % 24;
    } else if (map.h !== void 0) {
      date2.hour = parseInt(match[map.h], 10) % 12;
      if (map.A && match[map.A] === "PM" || map.a && match[map.a] === "pm" || map.aa && match[map.aa] === "p.m.") {
        date2.hour += 12;
      }
      date2.hour = date2.hour % 24;
    }
    if (map.m !== void 0) {
      date2.minute = parseInt(match[map.m], 10) % 60;
    }
    if (map.s !== void 0) {
      date2.second = parseInt(match[map.s], 10) % 60;
    }
    if (map.S !== void 0) {
      date2.millisecond = parseInt(match[map.S], 10) * 10 ** (3 - match[map.S].length);
    }
    if (map.Z !== void 0 || map.ZZ !== void 0) {
      tzString = map.Z !== void 0 ? match[map.Z].replace(":", "") : match[map.ZZ];
      date2.timezoneOffset = (tzString[0] === "+" ? -1 : 1) * (60 * tzString.slice(1, 3) + 1 * tzString.slice(3, 5));
    }
  }
  date2.dateHash = pad(date2.year, 6) + "/" + pad(date2.month) + "/" + pad(date2.day);
  date2.timeHash = pad(date2.hour) + ":" + pad(date2.minute) + ":" + pad(date2.second) + tzString;
  return date2;
}
function isValid(date2) {
  return typeof date2 === "number" ? true : isNaN(Date.parse(date2)) === false;
}
function buildDate(mod2, utc) {
  return adjustDate(new Date(), mod2, utc);
}
function getDayOfWeek(date2) {
  const dow = new Date(date2).getDay();
  return dow === 0 ? 7 : dow;
}
function getWeekOfYear(date2) {
  const thursday = new Date(date2.getFullYear(), date2.getMonth(), date2.getDate());
  thursday.setDate(thursday.getDate() - (thursday.getDay() + 6) % 7 + 3);
  const firstThursday = new Date(thursday.getFullYear(), 0, 4);
  firstThursday.setDate(firstThursday.getDate() - (firstThursday.getDay() + 6) % 7 + 3);
  const ds = thursday.getTimezoneOffset() - firstThursday.getTimezoneOffset();
  thursday.setHours(thursday.getHours() - ds);
  const weekDiff = (thursday - firstThursday) / (MILLISECONDS_IN_DAY * 7);
  return 1 + Math.floor(weekDiff);
}
function getDayIdentifier(date2) {
  return date2.getFullYear() * 1e4 + date2.getMonth() * 100 + date2.getDate();
}
function getDateIdentifier(date2, onlyDate) {
  const d = new Date(date2);
  return onlyDate === true ? getDayIdentifier(d) : d.getTime();
}
function isBetweenDates(date2, from, to, opts = {}) {
  const d1 = getDateIdentifier(from, opts.onlyDate), d2 = getDateIdentifier(to, opts.onlyDate), cur = getDateIdentifier(date2, opts.onlyDate);
  return (cur > d1 || opts.inclusiveFrom === true && cur === d1) && (cur < d2 || opts.inclusiveTo === true && cur === d2);
}
function addToDate(date2, mod2) {
  return getChange(date2, mod2, 1);
}
function subtractFromDate(date2, mod2) {
  return getChange(date2, mod2, -1);
}
function startOfDate(date2, unit, utc) {
  const t = new Date(date2), prefix = `set${utc === true ? "UTC" : ""}`;
  switch (unit) {
    case "year":
    case "years":
      t[`${prefix}Month`](0);
    case "month":
    case "months":
      t[`${prefix}Date`](1);
    case "day":
    case "days":
    case "date":
      t[`${prefix}Hours`](0);
    case "hour":
    case "hours":
      t[`${prefix}Minutes`](0);
    case "minute":
    case "minutes":
      t[`${prefix}Seconds`](0);
    case "second":
    case "seconds":
      t[`${prefix}Milliseconds`](0);
  }
  return t;
}
function endOfDate(date2, unit, utc) {
  const t = new Date(date2), prefix = `set${utc === true ? "UTC" : ""}`;
  switch (unit) {
    case "year":
    case "years":
      t[`${prefix}Month`](11);
    case "month":
    case "months":
      t[`${prefix}Date`](daysInMonth(t));
    case "day":
    case "days":
    case "date":
      t[`${prefix}Hours`](23);
    case "hour":
    case "hours":
      t[`${prefix}Minutes`](59);
    case "minute":
    case "minutes":
      t[`${prefix}Seconds`](59);
    case "second":
    case "seconds":
      t[`${prefix}Milliseconds`](999);
  }
  return t;
}
function getMaxDate(date2) {
  let t = new Date(date2);
  Array.prototype.slice.call(arguments, 1).forEach((d) => {
    t = Math.max(t, new Date(d));
  });
  return t;
}
function getMinDate(date2) {
  let t = new Date(date2);
  Array.prototype.slice.call(arguments, 1).forEach((d) => {
    t = Math.min(t, new Date(d));
  });
  return t;
}
function getDiff(t, sub, interval) {
  return (t.getTime() - t.getTimezoneOffset() * MILLISECONDS_IN_MINUTE - (sub.getTime() - sub.getTimezoneOffset() * MILLISECONDS_IN_MINUTE)) / interval;
}
function getDateDiff(date2, subtract, unit = "days") {
  const t = new Date(date2), sub = new Date(subtract);
  switch (unit) {
    case "years":
    case "year":
      return t.getFullYear() - sub.getFullYear();
    case "months":
    case "month":
      return (t.getFullYear() - sub.getFullYear()) * 12 + t.getMonth() - sub.getMonth();
    case "days":
    case "day":
    case "date":
      return getDiff(startOfDate(t, "day"), startOfDate(sub, "day"), MILLISECONDS_IN_DAY);
    case "hours":
    case "hour":
      return getDiff(startOfDate(t, "hour"), startOfDate(sub, "hour"), MILLISECONDS_IN_HOUR);
    case "minutes":
    case "minute":
      return getDiff(startOfDate(t, "minute"), startOfDate(sub, "minute"), MILLISECONDS_IN_MINUTE);
    case "seconds":
    case "second":
      return getDiff(startOfDate(t, "second"), startOfDate(sub, "second"), 1e3);
  }
}
function getDayOfYear(date2) {
  return getDateDiff(date2, startOfDate(date2, "year"), "days") + 1;
}
function inferDateFormat(date2) {
  return isDate(date2) === true ? "date" : typeof date2 === "number" ? "number" : "string";
}
function getDateBetween(date2, min, max) {
  const t = new Date(date2);
  if (min) {
    const low = new Date(min);
    if (t < low) {
      return low;
    }
  }
  if (max) {
    const high = new Date(max);
    if (t > high) {
      return high;
    }
  }
  return t;
}
function isSameDate(date2, date22, unit) {
  const t = new Date(date2), d = new Date(date22);
  if (unit === void 0) {
    return t.getTime() === d.getTime();
  }
  switch (unit) {
    case "second":
    case "seconds":
      if (t.getSeconds() !== d.getSeconds()) {
        return false;
      }
    case "minute":
    case "minutes":
      if (t.getMinutes() !== d.getMinutes()) {
        return false;
      }
    case "hour":
    case "hours":
      if (t.getHours() !== d.getHours()) {
        return false;
      }
    case "day":
    case "days":
    case "date":
      if (t.getDate() !== d.getDate()) {
        return false;
      }
    case "month":
    case "months":
      if (t.getMonth() !== d.getMonth()) {
        return false;
      }
    case "year":
    case "years":
      if (t.getFullYear() !== d.getFullYear()) {
        return false;
      }
      break;
    default:
      throw new Error(`date isSameDate unknown unit ${unit}`);
  }
  return true;
}
function daysInMonth(date2) {
  return new Date(date2.getFullYear(), date2.getMonth() + 1, 0).getDate();
}
function getOrdinal(n) {
  if (n >= 11 && n <= 13) {
    return `${n}th`;
  }
  switch (n % 10) {
    case 1:
      return `${n}st`;
    case 2:
      return `${n}nd`;
    case 3:
      return `${n}rd`;
  }
  return `${n}th`;
}
const formatter = {
  YY(date2, dateLocale, forcedYear) {
    const y = this.YYYY(date2, dateLocale, forcedYear) % 100;
    return y >= 0 ? pad(y) : "-" + pad(Math.abs(y));
  },
  YYYY(date2, _dateLocale, forcedYear) {
    return forcedYear !== void 0 && forcedYear !== null ? forcedYear : date2.getFullYear();
  },
  M(date2) {
    return date2.getMonth() + 1;
  },
  MM(date2) {
    return pad(date2.getMonth() + 1);
  },
  MMM(date2, dateLocale) {
    return dateLocale.monthsShort[date2.getMonth()];
  },
  MMMM(date2, dateLocale) {
    return dateLocale.months[date2.getMonth()];
  },
  Q(date2) {
    return Math.ceil((date2.getMonth() + 1) / 3);
  },
  Qo(date2) {
    return getOrdinal(this.Q(date2));
  },
  D(date2) {
    return date2.getDate();
  },
  Do(date2) {
    return getOrdinal(date2.getDate());
  },
  DD(date2) {
    return pad(date2.getDate());
  },
  DDD(date2) {
    return getDayOfYear(date2);
  },
  DDDD(date2) {
    return pad(getDayOfYear(date2), 3);
  },
  d(date2) {
    return date2.getDay();
  },
  dd(date2, dateLocale) {
    return this.dddd(date2, dateLocale).slice(0, 2);
  },
  ddd(date2, dateLocale) {
    return dateLocale.daysShort[date2.getDay()];
  },
  dddd(date2, dateLocale) {
    return dateLocale.days[date2.getDay()];
  },
  E(date2) {
    return date2.getDay() || 7;
  },
  w(date2) {
    return getWeekOfYear(date2);
  },
  ww(date2) {
    return pad(getWeekOfYear(date2));
  },
  H(date2) {
    return date2.getHours();
  },
  HH(date2) {
    return pad(date2.getHours());
  },
  h(date2) {
    const hours = date2.getHours();
    return hours === 0 ? 12 : hours > 12 ? hours % 12 : hours;
  },
  hh(date2) {
    return pad(this.h(date2));
  },
  m(date2) {
    return date2.getMinutes();
  },
  mm(date2) {
    return pad(date2.getMinutes());
  },
  s(date2) {
    return date2.getSeconds();
  },
  ss(date2) {
    return pad(date2.getSeconds());
  },
  S(date2) {
    return Math.floor(date2.getMilliseconds() / 100);
  },
  SS(date2) {
    return pad(Math.floor(date2.getMilliseconds() / 10));
  },
  SSS(date2) {
    return pad(date2.getMilliseconds(), 3);
  },
  A(date2) {
    return this.H(date2) < 12 ? "AM" : "PM";
  },
  a(date2) {
    return this.H(date2) < 12 ? "am" : "pm";
  },
  aa(date2) {
    return this.H(date2) < 12 ? "a.m." : "p.m.";
  },
  Z(date2, _dateLocale, _forcedYear, forcedTimezoneOffset) {
    const tzOffset = forcedTimezoneOffset === void 0 || forcedTimezoneOffset === null ? date2.getTimezoneOffset() : forcedTimezoneOffset;
    return formatTimezone(tzOffset, ":");
  },
  ZZ(date2, _dateLocale, _forcedYear, forcedTimezoneOffset) {
    const tzOffset = forcedTimezoneOffset === void 0 || forcedTimezoneOffset === null ? date2.getTimezoneOffset() : forcedTimezoneOffset;
    return formatTimezone(tzOffset);
  },
  X(date2) {
    return Math.floor(date2.getTime() / 1e3);
  },
  x(date2) {
    return date2.getTime();
  }
};
function formatDate(val, mask, dateLocale, __forcedYear, __forcedTimezoneOffset) {
  if (val !== 0 && !val || val === Infinity || val === -Infinity) {
    return;
  }
  const date2 = new Date(val);
  if (isNaN(date2)) {
    return;
  }
  if (mask === void 0) {
    mask = defaultMask;
  }
  const locale = getDateLocale(dateLocale, Plugin$1.props);
  return mask.replace(
    token,
    (match, text) => match in formatter ? formatter[match](date2, locale, __forcedYear, __forcedTimezoneOffset) : text === void 0 ? match : text.split("\\]").join("]")
  );
}
function clone(date2) {
  return isDate(date2) === true ? new Date(date2.getTime()) : date2;
}
var date = {
  isValid,
  extractDate,
  buildDate,
  getDayOfWeek,
  getWeekOfYear,
  isBetweenDates,
  addToDate,
  subtractFromDate,
  adjustDate,
  startOfDate,
  endOfDate,
  getMaxDate,
  getMinDate,
  getDateDiff,
  getDayOfYear,
  inferDateFormat,
  getDateBetween,
  isSameDate,
  daysInMonth,
  formatDate,
  clone
};
function clean(link) {
  setTimeout(() => {
    window.URL.revokeObjectURL(link.href);
  }, 1e4);
  link.remove();
}
function exportFile(fileName, rawData, opts = {}) {
  const { mimeType, byteOrderMark, encoding } = typeof opts === "string" ? { mimeType: opts } : opts;
  const data = encoding !== void 0 ? new TextEncoder(encoding).encode([rawData]) : rawData;
  const blobData = byteOrderMark !== void 0 ? [byteOrderMark, data] : [data];
  const blob = new Blob(blobData, { type: mimeType || "application/octet-stream" });
  const link = document.createElement("a");
  link.href = window.URL.createObjectURL(blob);
  link.setAttribute("download", fileName);
  if (typeof link.download === "undefined") {
    link.setAttribute("target", "_blank");
  }
  link.classList.add("hidden");
  link.style.position = "fixed";
  document.body.appendChild(link);
  try {
    link.click();
    clean(link);
    return true;
  } catch (err) {
    clean(link);
    return err;
  }
}
function parseFeatures(winFeatures) {
  const cfg = Object.assign({ noopener: true }, winFeatures);
  const feat = [];
  for (const key in cfg) {
    if (cfg[key] === true) {
      feat.push(key);
    }
  }
  return feat.join(",");
}
function openWindow(url, reject, windowFeatures) {
  let open2 = window.open;
  if (Platform.is.cordova === true) {
    if (cordova !== void 0 && cordova.InAppBrowser !== void 0 && cordova.InAppBrowser.open !== void 0) {
      open2 = cordova.InAppBrowser.open;
    } else if (navigator !== void 0 && navigator.app !== void 0) {
      return navigator.app.loadUrl(url, {
        openExternal: true
      });
    }
  }
  const win = open2(url, "_blank", parseFeatures(windowFeatures));
  if (win) {
    Platform.is.desktop && win.focus();
    return win;
  } else {
    reject && reject();
  }
}
var openURL = (url, reject, windowFeatures) => {
  if (Platform.is.ios === true && window.SafariViewController !== void 0) {
    window.SafariViewController.isAvailable((available) => {
      if (available) {
        window.SafariViewController.show(
          { url },
          noop,
          reject
        );
      } else {
        openWindow(url, reject, windowFeatures);
      }
    });
    return;
  }
  return openWindow(url, reject, windowFeatures);
};
/**
 * Vue Number Input 1.0.0
 * (c) 2021-2022 Dipak Sarkar <hello@dipaksarkar.in> (https://dipaksarkar.in/)
 * @license MIT
 */
var options = {
  prefix: "",
  suffix: "",
  separator: ",",
  decimal: ".",
  precision: 2,
  minimumFractionDigits: false,
  prefill: true,
  reverseFill: false,
  min: false,
  max: false,
  nullValue: ""
};
function NumberFormat(config = options) {
  this.options = Object.assign(options, config);
  this.input = "";
  this.number = "";
  this.isClean = false;
  this.isNull = (input = this.input) => !this.numberOnly(input, new RegExp("[^0-9]+", "gi"));
  this.clean = (clean2 = false) => {
    this.isClean = clean2;
    return this;
  };
  this.sign = () => {
    const sign = this.input.toString().indexOf("-") >= 0 && this.realNumber() > 0 ? "-" : "";
    return sign;
  };
  function between2(min, n, max) {
    return Math.max(min, Math.min(n, max));
  }
  function fixed(precision) {
    return between2(0, precision, 20);
  }
  function toFixed(numbers, precision) {
    var exp = Math.pow(10, precision);
    var float = parseFloat(numbers) / exp || 0;
    return float.toFixed(fixed(precision));
  }
  this.toNumber = (string) => Number(string);
  this.numberOnly = (string, regExp) => string.toString().replace(regExp, "");
  this.isNegative = this.sign() === "-";
  this.numbers = () => {
    if (this.options.reverseFill) {
      this.number = toFixed(
        this.numberOnly(this.input, /\D+/g),
        this.options.precision
      ).replace(".", this.options.decimal);
    } else if (typeof this.input === "number") {
      this.number = this.parts(
        this.input.toString().replace("-", ""),
        "."
      ).join(this.options.decimal);
    } else {
      this.number = this.numberOnly(
        this.input,
        new RegExp(`[^0-9\\${this.options.decimal}]+`, "gi")
      );
      this.number = this.parts(this.number).join(this.options.decimal);
    }
    return this.number;
  };
  this.realNumber = () => {
    return this.numbers().toString().replace(this.options.decimal, ".");
  };
  this.parts = (number = "", decimal = this.options.decimal) => {
    var parts = number.toString().split(decimal);
    parts[0] = this.toNumber(parts[0]) || 0;
    if (parts.length > 1) {
      parts[1] = parts.slice(1, parts.length).join("");
      parts = parts.slice(0, 2);
    }
    if (this.isClean) {
      const newNumber = this.toNumber(parts.join(".")).toFixed(
        this.options.precision
      );
      const cleanNumber = this.toNumber(newNumber);
      const minimumDigits = cleanNumber.toFixed(
        this.options.minimumFractionDigits
      );
      if (this.options.minimumFractionDigits && this.options.minimumFractionDigits >= 0 && cleanNumber.toString().length < minimumDigits.length) {
        parts = minimumDigits.toString().split(".");
      } else {
        parts = cleanNumber.toString().split(".");
      }
    }
    return parts.slice(0, 2);
  };
  this.addSeparator = () => {
    var parts = this.numbers().split(this.options.decimal);
    parts[0] = parts[0].toString().replace(/(\d)(?=(?:\d{3})+\b)/gm, `$1${this.options.separator}`);
    return parts.join(this.options.decimal);
  };
  this.format = (input) => {
    if (input === "")
      return this.options.nullValue;
    this.input = input || this.options.nullValue;
    if (this.isNull() && !this.options.reverseFill)
      return this.options.nullValue;
    return this.sign() + this.options.prefix + this.addSeparator() + this.options.suffix;
  };
  this.unformat = (input) => {
    if (input === "")
      return this.options.nullValue;
    this.input = input || this.options.nullValue;
    if (this.isNull() && !this.options.reverseFill)
      return this.options.nullValue;
    return this.sign() + this.realNumber();
  };
}
const CONFIG_KEY$1 = "__input-facade__";
function FacadeInputEvent() {
  return new CustomEvent("input", {
    bubbles: true,
    cancelable: true,
    detail: { facade: true }
  });
}
function FacadeChangeEvent() {
  return new CustomEvent("change", {
    bubbles: true,
    cancelable: true,
    detail: { facade: true }
  });
}
function getInputElement(el) {
  const inputElement = el instanceof HTMLInputElement ? el : el.querySelector("input");
  if (!inputElement) {
    throw new Error("facade directive requires an input element");
  }
  return inputElement;
}
function updateCursor(el, position) {
  const setSelectionRange = () => {
    el.setSelectionRange(position, position);
  };
  setSelectionRange();
  setTimeout(setSelectionRange(), 1);
}
function updateValue(el, vnode, { emit = true, force = false, clean: clean2 = false } = {}) {
  const { config } = el[CONFIG_KEY$1];
  let { oldValue } = el[CONFIG_KEY$1];
  let currentValue = vnode && vnode.props ? vnode.props.value : el.value;
  oldValue = oldValue || "";
  currentValue = currentValue || "";
  if (force || oldValue !== currentValue) {
    const number = new NumberFormat(config).clean(clean2 && !config.reverseFill);
    let masked = number.format(currentValue);
    let unmasked = number.clean(!config.reverseFill).unformat(currentValue);
    if (clean2) {
      if (Number(config.max) && unmasked > Number(config.max)) {
        masked = number.format(config.max);
        unmasked = number.unformat(config.max);
      } else if (Number(config.min) && unmasked < Number(config.min)) {
        masked = number.format(config.min);
        unmasked = number.unformat(config.min);
      }
    }
    el[CONFIG_KEY$1].oldValue = masked;
    el.unmaskedValue = unmasked;
    if (el.value !== masked) {
      el.value = masked;
    }
    return emit && el.dispatchEvent(FacadeInputEvent());
  }
}
function inputHandler(event) {
  const { target, detail } = event;
  if (detail == null ? void 0 : detail.facade) {
    return false;
  }
  event.stopPropagation();
  let positionFromEnd = target.value.length - target.selectionEnd;
  const { oldValue, config } = target[CONFIG_KEY$1];
  updateValue(target, null, { emit: false });
  positionFromEnd = Math.max(positionFromEnd, config.suffix.length);
  positionFromEnd = target.value.length - positionFromEnd;
  positionFromEnd = Math.max(positionFromEnd, config.prefix.length);
  updateCursor(target, positionFromEnd);
  if (oldValue !== target.value) {
    target.dispatchEvent(FacadeInputEvent());
  }
}
function blurHandler(event) {
  const { target, detail } = event;
  if (detail == null ? void 0 : detail.facade) {
    return false;
  }
  const { oldValue } = target[CONFIG_KEY$1];
  updateValue(target, null, { force: true, emit: false, clean: true });
  if (oldValue !== target.value) {
    target.dispatchEvent(FacadeChangeEvent());
  }
}
const CONFIG_KEY = CONFIG_KEY$1;
var vNumber = {
  beforeMount: (el, { value, modifiers }, vnode) => {
    el = getInputElement(el);
    const config = Object.assign({}, options, value, modifiers);
    el[CONFIG_KEY] = { config };
    updateValue(el, vnode, { force: config.prefill, clean: true });
  },
  mounted: (el) => {
    el = getInputElement(el);
    const option = el[CONFIG_KEY];
    const { config } = option;
    const handlerOwner = el.parentElement || el;
    const oninput = (e) => {
      if (e.target !== el) {
        return;
      }
      inputHandler(e);
    };
    handlerOwner.addEventListener("input", oninput, true);
    el.onblur = (e) => blurHandler(e);
    el.onkeydown = (e) => {
      if (([110, 190].includes(e.keyCode) || e.key === config.decimal) && !el.value.includes(config.decimal)) {
        e.preventDefault();
        el.setRangeText(config.decimal);
        el.dispatchEvent(new Event("input"));
        updateCursor(el, el.value.indexOf(config.decimal) + 1);
      } else if (([110, 190].includes(e.keyCode) || e.key === config.decimal) && el.value.includes(config.decimal)) {
        e.preventDefault();
      } else if ([8].includes(e.keyCode)) {
        const character = el.value.slice(el.selectionEnd - 1, el.selectionEnd);
        const replace = el.value.slice(el.selectionEnd - 2, el.selectionEnd);
        if (character === config.separator) {
          e.preventDefault();
          let positionFromEnd = el.value.length - el.selectionEnd;
          el.value = el.value.replace(replace, "");
          positionFromEnd = Math.max(positionFromEnd, config.suffix.length);
          positionFromEnd = el.value.length - positionFromEnd;
          positionFromEnd = Math.max(positionFromEnd, config.prefix.length);
          updateCursor(el, positionFromEnd);
          el.dispatchEvent(new Event("input"));
        }
      }
    };
    option.cleanup = () => handlerOwner.removeEventListener("input", oninput, true);
  },
  updated: (el, { value, oldValue, modifiers }, vnode) => {
    el = getInputElement(el);
    if (value !== oldValue) {
      const { config } = el[CONFIG_KEY];
      el[CONFIG_KEY].config = Object.assign({}, config, value, modifiers);
      updateValue(el, vnode, { force: true, clean: true });
    } else {
      updateValue(el, vnode);
    }
  },
  unmounted: (el) => {
    getInputElement(el)[CONFIG_KEY].cleanup();
  }
};
({
  name: "Number",
  props: {
    modelValue: {
      required: true
    },
    nullValue: {
      type: [Number, String],
      default: () => options.nullValue
    },
    masked: {
      type: Boolean,
      default: false
    },
    reverseFill: {
      type: Boolean,
      default: options.reverseFill
    },
    prefill: {
      type: Boolean,
      default: options.prefill
    },
    precision: {
      type: Number,
      default: () => options.precision
    },
    minimumFractionDigits: {
      type: [Number, Boolean],
      default: () => options.minimumFractionDigits
    },
    decimal: {
      type: String,
      default: () => options.decimal
    },
    min: {
      type: [Number, Boolean],
      default: () => options.min
    },
    max: {
      type: [Number, Boolean],
      default: () => options.max
    },
    separator: {
      type: String,
      default: () => options.separator
    },
    prefix: {
      type: String,
      default: () => options.prefix
    },
    suffix: {
      type: String,
      default: () => options.suffix
    }
  },
  directives: {
    number: vNumber
  },
  emits: ["update:model-value", "input:model-value"],
  data() {
    return {
      maskedValue: this.modelValue,
      unmaskedValue: null
    };
  },
  methods: {
    input({ target }) {
      this.maskedValue = target.value;
      this.unmaskedValue = target.unmaskedValue;
      this.$emit("input:model-value", this.emittedValue);
    },
    change() {
      this.$emit("update:model-value", this.emittedValue);
    }
  },
  computed: {
    emittedValue() {
      return this.masked ? this.maskedValue : this.unmaskedValue;
    },
    config() {
      const config = {};
      Object.keys(this.$props).filter((item) => item !== "modelValue").forEach((item) => {
        config[item] = this.$props[item];
      });
      return config;
    }
  },
  watch: {
    modelValue(val) {
      if (this.unmaskedValue !== val) {
        this.maskedValue = val;
      }
    }
  }
});
const { capitalize, humanStorageSize } = format;
let emitTimer;
var core = {
  modules: {},
  async init() {
    console.func("services/core:init()", arguments);
    if (Plugin$2.has("qaravel-gdpr-accept") !== true) {
      Notify.create({
        message: "We use cookies to improve user experience, manage user sessions and analyze website traffic. By clicking \u201CAccept\u201D you consent to store on your device all the technologies described in our Cookie Policy. Please read our Terms and Conditions and Privacy Policy for full details by clicking the Learn More button.",
        multiline: true,
        classes: "bg-grey-10",
        timeout: 0,
        position: "bottom-right",
        actions: [
          {
            label: "Accept",
            color: "yellow",
            handler() {
              Plugin$2.set("qaravel-gdpr-accept", true, {
                expires: 5 * 365
              });
            }
          },
          {
            label: "Learn more",
            color: "grey",
            noDismiss: true,
            handler() {
              openURL("");
            }
          }
        ]
      });
    }
  },
  app: {},
  closeDate(refs) {
    Object.keys(refs).forEach((ref2) => {
      if (ref2.indexOf("ds_") !== -1) {
        refs[ref2].hide();
      }
    });
  },
  confirm(msg, o) {
    console.func("services/core:confirm()", arguments);
    return new Promise((resolve, reject) => {
      var strMsg = [];
      if (typeof msg === "object") {
        strMsg.push(msg.message);
      } else {
        strMsg.push(msg);
      }
      Dialog.create({
        component: BaseAlert,
        componentProps: {
          msg: strMsg,
          icon: "warning",
          title: o && o.title ? o.title : "Please Confirm",
          subTitle: o && o.subTitle ? o.subTitle : false,
          ok: {
            label: o && o.ok ? o.ok : "Confirm",
            color: o && o.okColor ? o.okColor : "positive"
          },
          cancel: {
            label: o && o.cancel ? o.cancel : "Cancel",
            color: o && o.cancelColor ? o.cancelColor : "grey"
          }
        }
      }).onOk(() => {
        resolve("ok");
      }).onCancel(() => {
        reject("cancel");
      });
    });
  },
  error(msg, o) {
    console.func("services/core:error()", arguments);
    var strMsg = [];
    if (typeof msg === "object") {
      if (msg.errors) {
        Object.keys(msg.errors).forEach(function(key) {
          if (typeof msg.errors[key] === "string") {
            strMsg.push({
              icon: "exclamation-circle",
              text: msg.errors[key]
            });
          } else {
            msg.errors[key].forEach((val) => {
              strMsg.push({
                color: "negative",
                icon: "exclamation-circle",
                text: val
              });
            });
          }
        });
      } else {
        strMsg.push(msg.message);
      }
    } else {
      strMsg.push(msg);
    }
    Dialog.create({
      component: BaseAlert,
      componentProps: {
        msg: strMsg,
        icon: "error",
        title: o && o.title ? o.title : "Error"
      }
    }).onOk(() => {
      console.log("OK");
    });
  },
  success(msg, o) {
    console.func("services/core:success()", arguments);
    Dialog.create({
      component: BaseAlert,
      componentProps: {
        msg,
        icon: o && o.icon ? o.icon : "success",
        title: o && o.title ? o.title : "Success"
      }
    }).onOk(() => {
      console.log("OK");
    });
  },
  random(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min);
  },
  data(min, max, limit) {
    const data = [];
    for (let i = 0; i <= limit; i++) {
      data.push(this.random(min, max));
    }
    return data;
  },
  slug(obj) {
    return obj.toString().trim().toLowerCase().replace(/ /g, "-").replace(/[^\w-]+/g, "");
  },
  category(list, key) {
    return list.map((element) => element[key]).join(", ");
  },
  async importScript(src) {
    return new Promise((resolve, reject) => {
      const script = document.createElement("script");
      script.async = true;
      script.src = src;
      script.addEventListener("load", (event) => {
        resolve();
      });
      script.addEventListener(
        "error",
        () => reject('Error loading script "' + src + '"')
      );
      script.addEventListener(
        "abort",
        () => reject('Script loading aborted for "' + src + '"')
      );
      document.head.appendChild(script);
    });
  },
  wrapCsvValue(val, formatFn) {
    let formatted = formatFn !== void 0 ? formatFn(val) : val;
    formatted = formatted === void 0 || formatted === null ? "" : String(formatted);
    formatted = formatted.split('"').join('""');
    return `"${formatted}"`;
  },
  export(table, name, type = "text/csv") {
    const content = [table.columns.map((col) => this.wrapCsvValue(col.label))].concat(
      table.data.map(
        (row) => table.columns.map(
          (col) => this.wrapCsvValue(
            typeof col.field === "function" ? col.field(row) : row[col.field === void 0 ? col.name : col.field],
            col.format
          )
        ).join(",")
      )
    ).join("\r\n");
    const status = exportFile(name + "_" + Date.now() + ".csv", content, type);
    if (status !== true) {
      Notify.create({
        message: "Browser denied file download...",
        color: "negative",
        icon: "warning"
      });
    }
  },
  b64toBlob(b64Data, contentType = "", sliceSize = 512) {
    const byteCharacters = atob(b64Data);
    const byteArrays = [];
    for (let offset = 0; offset < byteCharacters.length; offset += sliceSize) {
      const slice = byteCharacters.slice(offset, offset + sliceSize);
      const byteNumbers = new Array(slice.length);
      for (let i = 0; i < slice.length; i++) {
        byteNumbers[i] = slice.charCodeAt(i);
      }
      const byteArray = new Uint8Array(byteNumbers);
      byteArrays.push(byteArray);
    }
    const blob = new Blob(byteArrays, {
      type: contentType
    });
    return blob;
  },
  getBlobURL(data) {
    const blob = this.b64toBlob(data, "text/plain");
    const url = URL.createObjectURL(blob);
    setTimeout(() => {
      URL.revokeObjectURL(url);
    }, 1e4);
    return url;
  },
  getDate(d) {
    if (d && typeof d === "string") {
      if (d.indexOf("-") !== -1) {
        d = date.extractDate(d, "YYYY-MM-DD");
      } else if (d.indexOf("/") !== -1) {
        d = date.extractDate(d, "DD/MM/YYYY");
      }
    } else if (!d || typeof d === "string") {
      d = new Date();
    }
    return d;
  },
  length(obj, o) {
    var len = 0;
    if (obj && typeof obj.length === "undefined") {
      Object.keys(obj).forEach(function(key) {
        len++;
      });
    } else if (obj) {
      len = obj.length;
    }
    return len;
  },
  sort(arr, field, dir) {
    console.log("core.sort()", arguments);
    if (dir) {
      return arr.sort(
        (a, b) => a[field] > b[field] ? 1 : b[field] > a[field] ? -1 : 0
      );
    } else {
      return arr.sort(
        (a, b) => a[field] > b[field] ? -1 : b[field] > a[field] ? 1 : 0
      );
    }
  },
  humanSize(number) {
    return humanStorageSize(number);
  },
  capitalize(text) {
    if (text) {
      return capitalize(text);
    } else {
      return text;
    }
  },
  valid: {
    email: function(email) {
      var re = /^(([^<>()[\]\\.,;:\s@']+(\.[^<>()[\]\\.,;:\s@']+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
      return re.test(email);
    }
  },
  formatDate(d, type) {
    var format2 = "DD/MM/YYYY";
    switch (type) {
      case "sql":
        format2 = "YYYY-MM-DD";
        break;
    }
    if (d && typeof d === "string") {
      d = this.getDate(d);
    }
    if (typeof d.getMonth === "function") {
      d = date.formatDate(d, format2);
    }
    return d;
  },
  openURL(url) {
    console.func("services/core:openURL()", arguments);
    openURL(url);
  },
  uid() {
    console.func("services/core:uid()", arguments);
    return uid();
  },
  dataURLtoFile(dataurl, filename) {
    console.func("services/core:dataURLtoFile()", arguments);
    var arr = dataurl.split(","), mime = arr[0].match(/:(.*?);/)[1], bstr = atob(arr[1]), n = bstr.length, u8arr = new Uint8Array(n);
    while (n--) {
      u8arr[n] = bstr.charCodeAt(n);
    }
    return new File([u8arr], filename, { type: mime });
  },
  combinations(...args) {
    var r = [], max = args.length - 1;
    function helper(arr, i) {
      for (var j = 0, l = args[i].length; j < l; j++) {
        var a = arr.slice(0);
        a.push(args[i][j]);
        if (i === max) {
          r.push(a);
        } else {
          helper(a, i + 1);
        }
      }
    }
    helper([], 0);
    return r;
  },
  money(value, config = {}) {
    return this.formatNumber(value, config);
  },
  formatNumber(value, config = {}) {
    const options2 = Object.assign(
      {
        prefix: "\xA3",
        reverseFill: true,
        precision: 2
      },
      config
    );
    const integer = parseInt(
      Number(value).toFixed(options2.precision) * Number(`1e${options2.precision + 1}`) / 10
    );
    return new NumberFormat(options2).format(integer);
  },
  debounce(func, wait, immediate) {
    console.func("services/core:debounce()", arguments);
    if (immediate) {
      return func.call();
    }
    clearTimeout(emitTimer);
    emitTimer = setTimeout(() => {
      return func.call();
    }, wait);
  },
  copyToClipboard(text, message) {
    console.func("services/core:copyToClipboard()", arguments);
    copyToClipboard(text).then(() => {
      Notify.create({
        message: message || "Successfully coppied to clipboard."
      });
    });
  },
  errorMessage(key, errors) {
    return this.hasError(key, errors) ? errors[key].join(", ") : "";
  },
  hasError(key, errors) {
    return key in errors;
  },
  getLocation() {
    return new Promise(function(resolve, reject) {
      navigator.geolocation.getCurrentPosition(
        (position) => resolve(position),
        (error) => reject(error)
      );
    });
  }
};
const xhr = XMLHttpRequest, open = xhr.prototype.open, positionValues = ["top", "right", "bottom", "left"];
let stack = [];
let highjackCount = 0;
function translate({ p, pos, active, horiz, reverse, dir }) {
  let x = 1, y = 1;
  if (horiz === true) {
    if (reverse === true) {
      x = -1;
    }
    if (pos === "bottom") {
      y = -1;
    }
    return { transform: `translate3d(${x * (p - 100)}%,${active ? 0 : y * -200}%,0)` };
  }
  if (reverse === true) {
    y = -1;
  }
  if (pos === "right") {
    x = -1;
  }
  return { transform: `translate3d(${active ? 0 : dir * x * -200}%,${y * (p - 100)}%,0)` };
}
function inc(p, amount) {
  if (typeof amount !== "number") {
    if (p < 25) {
      amount = Math.random() * 3 + 3;
    } else if (p < 65) {
      amount = Math.random() * 3;
    } else if (p < 85) {
      amount = Math.random() * 2;
    } else if (p < 99) {
      amount = 0.6;
    } else {
      amount = 0;
    }
  }
  return between(p + amount, 0, 100);
}
function highjackAjax(stackEntry) {
  highjackCount++;
  stack.push(stackEntry);
  if (highjackCount > 1) {
    return;
  }
  xhr.prototype.open = function(_, url) {
    const stopStack = [];
    const loadStart = () => {
      stack.forEach((entry) => {
        if (entry.hijackFilter.value === null || entry.hijackFilter.value(url) === true) {
          entry.start();
          stopStack.push(entry.stop);
        }
      });
    };
    const loadEnd = () => {
      stopStack.forEach((stop) => {
        stop();
      });
    };
    this.addEventListener("loadstart", loadStart, { once: true });
    this.addEventListener("loadend", loadEnd, { once: true });
    open.apply(this, arguments);
  };
}
function restoreAjax(start) {
  stack = stack.filter((entry) => entry.start !== start);
  highjackCount = Math.max(0, highjackCount - 1);
  if (highjackCount === 0) {
    xhr.prototype.open = open;
  }
}
var QAjaxBar = createComponent({
  name: "QAjaxBar",
  props: {
    position: {
      type: String,
      default: "top",
      validator: (val) => positionValues.includes(val)
    },
    size: {
      type: String,
      default: "2px"
    },
    color: String,
    skipHijack: Boolean,
    reverse: Boolean,
    hijackFilter: Function
  },
  emits: ["start", "stop"],
  setup(props, { emit }) {
    const { proxy } = getCurrentInstance();
    const progress = ref(0);
    const onScreen = ref(false);
    const animate = ref(true);
    let sessions = 0, timer, speed;
    const classes = computed(
      () => `q-loading-bar q-loading-bar--${props.position}` + (props.color !== void 0 ? ` bg-${props.color}` : "") + (animate.value === true ? "" : " no-transition")
    );
    const horizontal = computed(() => props.position === "top" || props.position === "bottom");
    const sizeProp = computed(() => horizontal.value === true ? "height" : "width");
    const style = computed(() => {
      const active = onScreen.value;
      const obj = translate({
        p: progress.value,
        pos: props.position,
        active,
        horiz: horizontal.value,
        reverse: proxy.$q.lang.rtl === true && ["top", "bottom"].includes(props.position) ? props.reverse === false : props.reverse,
        dir: proxy.$q.lang.rtl === true ? -1 : 1
      });
      obj[sizeProp.value] = props.size;
      obj.opacity = active ? 1 : 0;
      return obj;
    });
    const attributes = computed(() => onScreen.value === true ? {
      role: "progressbar",
      "aria-valuemin": 0,
      "aria-valuemax": 100,
      "aria-valuenow": progress.value
    } : { "aria-hidden": "true" });
    function start(newSpeed = 300) {
      const oldSpeed = speed;
      speed = Math.max(0, newSpeed) || 0;
      sessions++;
      if (sessions > 1) {
        if (oldSpeed === 0 && newSpeed > 0) {
          planNextStep();
        } else if (oldSpeed > 0 && newSpeed <= 0) {
          clearTimeout(timer);
        }
        return sessions;
      }
      clearTimeout(timer);
      emit("start");
      progress.value = 0;
      timer = setTimeout(() => {
        animate.value = true;
        newSpeed > 0 && planNextStep();
      }, onScreen.value === true ? 500 : 1);
      if (onScreen.value !== true) {
        onScreen.value = true;
        animate.value = false;
      }
      return sessions;
    }
    function increment(amount) {
      if (sessions > 0) {
        progress.value = inc(progress.value, amount);
      }
      return sessions;
    }
    function stop() {
      sessions = Math.max(0, sessions - 1);
      if (sessions > 0) {
        return sessions;
      }
      clearTimeout(timer);
      emit("stop");
      const end = () => {
        animate.value = true;
        progress.value = 100;
        timer = setTimeout(() => {
          onScreen.value = false;
        }, 1e3);
      };
      if (progress.value === 0) {
        timer = setTimeout(end, 1);
      } else {
        end();
      }
      return sessions;
    }
    function planNextStep() {
      if (progress.value < 100) {
        timer = setTimeout(() => {
          increment();
          planNextStep();
        }, speed);
      }
    }
    let hijacked;
    onMounted(() => {
      if (props.skipHijack !== true) {
        hijacked = true;
        highjackAjax({
          start,
          stop,
          hijackFilter: computed(() => props.hijackFilter || null)
        });
      }
    });
    onBeforeUnmount(() => {
      clearTimeout(timer);
      hijacked === true && restoreAjax(start);
    });
    Object.assign(proxy, { start, stop, increment });
    return () => h("div", {
      class: classes.value,
      style: style.value,
      ...attributes.value
    });
  }
});
const barRef = ref(null);
const Plugin = defineReactivePlugin({
  isActive: false
}, {
  start: noop,
  stop: noop,
  increment: noop,
  setDefaults: noop,
  install({ $q, parentApp }) {
    $q.loadingBar = this;
    if (this.__installed === true) {
      if ($q.config.loadingBar !== void 0) {
        this.setDefaults($q.config.loadingBar);
      }
      return;
    }
    const props = ref(
      $q.config.loadingBar !== void 0 ? { ...$q.config.loadingBar } : {}
    );
    function onStart() {
      Plugin.isActive = true;
    }
    function onStop() {
      Plugin.isActive = false;
    }
    const el = createGlobalNode("q-loading-bar");
    createChildApp({
      name: "LoadingBar",
      devtools: { hide: true },
      setup: () => () => h(QAjaxBar, { ...props.value, onStart, onStop, ref: barRef })
    }, parentApp).mount(el);
    Object.assign(this, {
      start(speed) {
        barRef.value.start(speed);
      },
      stop() {
        barRef.value.stop();
      },
      increment() {
        barRef.value.increment.apply(null, arguments);
      },
      setDefaults(opts) {
        if (isObject(opts) === true) {
          Object.assign(props.value, opts);
        }
      }
    });
  }
});
var Api = {
  cache: {},
  init() {
    console.log("api.init()", arguments);
  },
  async call(method, endpoint, data, o) {
    console.func("services/api:request.call()", arguments);
    Plugin.start();
    return new Promise((resolve, reject) => {
      var playload = {
        url: endpoint,
        method,
        onUploadProgress: (event) => {
          const progress = parseInt(
            Math.round(event.loaded * 100 / event.total)
          );
          Plugin.increment(progress);
        },
        onDownloadProgress: (event) => {
          const progress = parseInt(
            Math.round(event.loaded * 100 / event.total)
          );
          Plugin.increment(progress);
        }
      };
      if (method === "get") {
        playload.params = data;
      } else {
        playload.data = data;
      }
      if (o && o.responseType) {
        playload.responseType = o.responseType;
      }
      core.$axios(playload).then((response) => {
        resolve(response.data);
        Plugin.stop();
      }).catch((error) => {
        Plugin.stop();
        if (error.response) {
          if (["419", "401"].includes(error.response.status)) {
            router.push({
              name: "Login"
            });
          } else if (error.response.status === 404) {
            router.push({
              name: "Error 404"
            });
          }
          if (error.response.data) {
            reject(
              error.response.data.data ? error.response.data.data : error.response.data
            );
          } else {
            reject(error);
          }
          return;
        }
        reject(error);
      });
    });
  },
  get(endpoint, data, o) {
    console.func("services/core:request.get()", arguments);
    return new Promise((resolve, reject) => {
      this.call("get", endpoint, data, o).then((response) => {
        resolve(response);
      }).catch((error) => {
        reject(error);
      });
    });
  },
  post(endpoint, data, o) {
    console.func("services/core:request.post()", arguments);
    return new Promise((resolve, reject) => {
      this.call("post", endpoint, data, o).then((response) => {
        resolve(response);
      }).catch((error) => {
        reject(error);
      });
    });
  },
  put(endpoint, data, o) {
    console.func("services/core:request.put()", arguments);
    return new Promise((resolve, reject) => {
      this.call("put", endpoint, data, o).then((response) => {
        resolve(response);
      }).catch((error) => {
        reject(error);
      });
    });
  },
  delete(endpoint, data, o) {
    console.func("services/core:request.delete()", arguments);
    return new Promise((resolve, reject) => {
      this.call("delete", endpoint, data, o).then((response) => {
        resolve(response);
      }).catch((error) => {
        reject(error);
      });
    });
  },
  download(endpoint, data, o = {}) {
    console.func("services/core:request.download()", arguments);
    Object.assign(o, {
      responseType: "blob"
    });
    return new Promise((resolve, reject) => {
      this.call("get", endpoint, data, o).then((response) => {
        resolve(response);
      }).catch((error) => {
        reject(error);
      });
    });
  }
};
export { Api as A, core as c };
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYXBpLjYzNmQwMGZhLmpzIiwic291cmNlcyI6WyIuLi8uLi8uLi9ub2RlX21vZHVsZXMvcXVhc2FyL3NyYy91dGlscy9jb3B5LXRvLWNsaXBib2FyZC5qcyIsIi4uLy4uLy4uL25vZGVfbW9kdWxlcy9xdWFzYXIvc3JjL3V0aWxzL3ByaXZhdGUvZGF0ZS1wZXJzaWFuLmpzIiwiLi4vLi4vLi4vbm9kZV9tb2R1bGVzL3F1YXNhci9zcmMvdXRpbHMvZGF0ZS5qcyIsIi4uLy4uLy4uL25vZGVfbW9kdWxlcy9xdWFzYXIvc3JjL3V0aWxzL2V4cG9ydC1maWxlLmpzIiwiLi4vLi4vLi4vbm9kZV9tb2R1bGVzL3F1YXNhci9zcmMvdXRpbHMvb3Blbi11cmwuanMiLCIuLi8uLi8uLi9ub2RlX21vZHVsZXMvQGNvZGVycy10bS92dWUtbnVtYmVyLWZvcm1hdC9kaXN0L2luZGV4LmVzbS5qcyIsIi4uLy4uLy4uL3NyYy9zZXJ2aWNlcy9jb3JlLmpzIiwiLi4vLi4vLi4vbm9kZV9tb2R1bGVzL3F1YXNhci9zcmMvY29tcG9uZW50cy9hamF4LWJhci9RQWpheEJhci5qcyIsIi4uLy4uLy4uL25vZGVfbW9kdWxlcy9xdWFzYXIvc3JjL3BsdWdpbnMvTG9hZGluZ0Jhci5qcyIsIi4uLy4uLy4uL3NyYy9zZXJ2aWNlcy9hcGkuanMiXSwic291cmNlc0NvbnRlbnQiOlsiZnVuY3Rpb24gZmFsbGJhY2sgKHRleHQpIHtcbiAgY29uc3QgYXJlYSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ3RleHRhcmVhJylcbiAgYXJlYS52YWx1ZSA9IHRleHRcbiAgYXJlYS5jb250ZW50RWRpdGFibGUgPSAndHJ1ZSdcbiAgYXJlYS5zdHlsZS5wb3NpdGlvbiA9ICdmaXhlZCcgLy8gYXZvaWQgc2Nyb2xsaW5nIHRvIGJvdHRvbVxuXG4gIGRvY3VtZW50LmJvZHkuYXBwZW5kQ2hpbGQoYXJlYSlcbiAgYXJlYS5mb2N1cygpXG4gIGFyZWEuc2VsZWN0KClcblxuICBjb25zdCByZXMgPSBkb2N1bWVudC5leGVjQ29tbWFuZCgnY29weScpXG5cbiAgYXJlYS5yZW1vdmUoKVxuICByZXR1cm4gcmVzXG59XG5cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uICh0ZXh0KSB7XG4gIHJldHVybiBuYXZpZ2F0b3IuY2xpcGJvYXJkICE9PSB2b2lkIDBcbiAgICA/IG5hdmlnYXRvci5jbGlwYm9hcmQud3JpdGVUZXh0KHRleHQpXG4gICAgOiBuZXcgUHJvbWlzZSgocmVzb2x2ZSwgcmVqZWN0KSA9PiB7XG4gICAgICBjb25zdCByZXMgPSBmYWxsYmFjayh0ZXh0KVxuICAgICAgaWYgKHJlcykge1xuICAgICAgICByZXNvbHZlKHRydWUpXG4gICAgICB9XG4gICAgICBlbHNlIHtcbiAgICAgICAgcmVqZWN0KHJlcylcbiAgICAgIH1cbiAgICB9KVxufVxuIiwiLy8gdGFrZW4gZnJvbSBodHRwczovL2dpdGh1Yi5jb20vamFsYWFsaS9qYWxhYWxpLWpzXG5cbi8qXG4gIEphbGFhbGkgeWVhcnMgc3RhcnRpbmcgdGhlIDMzLXllYXIgcnVsZS5cbiovXG5jb25zdCBicmVha3MgPSBbXG4gIC02MSwgOSwgMzgsIDE5OSwgNDI2LCA2ODYsIDc1NiwgODE4LCAxMTExLCAxMTgxLCAxMjEwLFxuICAxNjM1LCAyMDYwLCAyMDk3LCAyMTkyLCAyMjYyLCAyMzI0LCAyMzk0LCAyNDU2LCAzMTc4XG5dXG5cbi8qXG4gIENvbnZlcnRzIGEgR3JlZ29yaWFuIGRhdGUgdG8gSmFsYWFsaS5cbiovXG5leHBvcnQgZnVuY3Rpb24gdG9KYWxhYWxpIChneSwgZ20sIGdkKSB7XG4gIGlmIChPYmplY3QucHJvdG90eXBlLnRvU3RyaW5nLmNhbGwoZ3kpID09PSAnW29iamVjdCBEYXRlXScpIHtcbiAgICBnZCA9IGd5LmdldERhdGUoKVxuICAgIGdtID0gZ3kuZ2V0TW9udGgoKSArIDFcbiAgICBneSA9IGd5LmdldEZ1bGxZZWFyKClcbiAgfVxuICByZXR1cm4gZDJqKGcyZChneSwgZ20sIGdkKSlcbn1cblxuLypcbiAgQ29udmVydHMgYSBKYWxhYWxpIGRhdGUgdG8gR3JlZ29yaWFuLlxuKi9cbmV4cG9ydCBmdW5jdGlvbiB0b0dyZWdvcmlhbiAoanksIGptLCBqZCkge1xuICByZXR1cm4gZDJnKGoyZChqeSwgam0sIGpkKSlcbn1cblxuLypcbiAgSXMgdGhpcyBhIGxlYXAgeWVhciBvciBub3Q/XG4qL1xuZnVuY3Rpb24gaXNMZWFwSmFsYWFsaVllYXIgKGp5KSB7XG4gIHJldHVybiBqYWxDYWxMZWFwKGp5KSA9PT0gMFxufVxuXG4vKlxuICBOdW1iZXIgb2YgZGF5cyBpbiBhIGdpdmVuIG1vbnRoIGluIGEgSmFsYWFsaSB5ZWFyLlxuKi9cbmV4cG9ydCBmdW5jdGlvbiBqYWxhYWxpTW9udGhMZW5ndGggKGp5LCBqbSkge1xuICBpZiAoam0gPD0gNikgcmV0dXJuIDMxXG4gIGlmIChqbSA8PSAxMSkgcmV0dXJuIDMwXG4gIGlmIChpc0xlYXBKYWxhYWxpWWVhcihqeSkpIHJldHVybiAzMFxuICByZXR1cm4gMjlcbn1cblxuLypcbiAgICBUaGlzIGZ1bmN0aW9uIGRldGVybWluZXMgaWYgdGhlIEphbGFhbGkgKFBlcnNpYW4pIHllYXIgaXNcbiAgICBsZWFwICgzNjYtZGF5IGxvbmcpIG9yIGlzIHRoZSBjb21tb24geWVhciAoMzY1IGRheXMpXG5cbiAgICBAcGFyYW0gankgSmFsYWFsaSBjYWxlbmRhciB5ZWFyICgtNjEgdG8gMzE3NylcbiAgICBAcmV0dXJucyBudW1iZXIgb2YgeWVhcnMgc2luY2UgdGhlIGxhc3QgbGVhcCB5ZWFyICgwIHRvIDQpXG4gKi9cbmZ1bmN0aW9uIGphbENhbExlYXAgKGp5KSB7XG4gIGNvbnN0IGJsID0gYnJlYWtzLmxlbmd0aFxuICBsZXRcbiAgICBqcCA9IGJyZWFrc1sgMCBdLFxuICAgIGptLFxuICAgIGp1bXAsXG4gICAgbGVhcCxcbiAgICBuLFxuICAgIGlcblxuICBpZiAoankgPCBqcCB8fCBqeSA+PSBicmVha3NbIGJsIC0gMSBdKSB7IHRocm93IG5ldyBFcnJvcignSW52YWxpZCBKYWxhYWxpIHllYXIgJyArIGp5KSB9XG5cbiAgZm9yIChpID0gMTsgaSA8IGJsOyBpICs9IDEpIHtcbiAgICBqbSA9IGJyZWFrc1sgaSBdXG4gICAganVtcCA9IGptIC0ganBcbiAgICBpZiAoankgPCBqbSkgeyBicmVhayB9XG4gICAganAgPSBqbVxuICB9XG4gIG4gPSBqeSAtIGpwXG5cbiAgaWYgKGp1bXAgLSBuIDwgNikgeyBuID0gbiAtIGp1bXAgKyBkaXYoanVtcCArIDQsIDMzKSAqIDMzIH1cbiAgbGVhcCA9IG1vZChtb2QobiArIDEsIDMzKSAtIDEsIDQpXG4gIGlmIChsZWFwID09PSAtMSkge1xuICAgIGxlYXAgPSA0XG4gIH1cblxuICByZXR1cm4gbGVhcFxufVxuXG4vKlxuICBUaGlzIGZ1bmN0aW9uIGRldGVybWluZXMgaWYgdGhlIEphbGFhbGkgKFBlcnNpYW4pIHllYXIgaXNcbiAgbGVhcCAoMzY2LWRheSBsb25nKSBvciBpcyB0aGUgY29tbW9uIHllYXIgKDM2NSBkYXlzKSwgYW5kXG4gIGZpbmRzIHRoZSBkYXkgaW4gTWFyY2ggKEdyZWdvcmlhbiBjYWxlbmRhcikgb2YgdGhlIGZpcnN0XG4gIGRheSBvZiB0aGUgSmFsYWFsaSB5ZWFyIChqeSkuXG5cbiAgQHBhcmFtIGp5IEphbGFhbGkgY2FsZW5kYXIgeWVhciAoLTYxIHRvIDMxNzcpXG4gIEBwYXJhbSB3aXRob3V0TGVhcCB3aGVuIGRvbid0IG5lZWQgbGVhcCAodHJ1ZSBvciBmYWxzZSkgZGVmYXVsdCBpcyBmYWxzZVxuICBAcmV0dXJuXG4gICAgbGVhcDogbnVtYmVyIG9mIHllYXJzIHNpbmNlIHRoZSBsYXN0IGxlYXAgeWVhciAoMCB0byA0KVxuICAgIGd5OiBHcmVnb3JpYW4geWVhciBvZiB0aGUgYmVnaW5uaW5nIG9mIEphbGFhbGkgeWVhclxuICAgIG1hcmNoOiB0aGUgTWFyY2ggZGF5IG9mIEZhcnZhcmRpbiB0aGUgMXN0ICgxc3QgZGF5IG9mIGp5KVxuICBAc2VlOiBodHRwOi8vd3d3LmFzdHJvLnVuaS50b3J1bi5wbC9+a2IvUGFwZXJzL0VNUC9QZXJzaWFuQy1FTVAuaHRtXG4gIEBzZWU6IGh0dHA6Ly93d3cuZm91cm1pbGFiLmNoL2RvY3VtZW50cy9jYWxlbmRhci9cbiovXG5mdW5jdGlvbiBqYWxDYWwgKGp5LCB3aXRob3V0TGVhcCkge1xuICBjb25zdFxuICAgIGJsID0gYnJlYWtzLmxlbmd0aCxcbiAgICBneSA9IGp5ICsgNjIxXG4gIGxldFxuICAgIGxlYXBKID0gLTE0LFxuICAgIGpwID0gYnJlYWtzWyAwIF0sXG4gICAgam0sXG4gICAganVtcCxcbiAgICBsZWFwLFxuICAgIG4sXG4gICAgaVxuXG4gIGlmIChqeSA8IGpwIHx8IGp5ID49IGJyZWFrc1sgYmwgLSAxIF0pIHsgdGhyb3cgbmV3IEVycm9yKCdJbnZhbGlkIEphbGFhbGkgeWVhciAnICsgankpIH1cblxuICAvLyBGaW5kIHRoZSBsaW1pdGluZyB5ZWFycyBmb3IgdGhlIEphbGFhbGkgeWVhciBqeS5cbiAgZm9yIChpID0gMTsgaSA8IGJsOyBpICs9IDEpIHtcbiAgICBqbSA9IGJyZWFrc1sgaSBdXG4gICAganVtcCA9IGptIC0ganBcbiAgICBpZiAoankgPCBqbSkgeyBicmVhayB9XG4gICAgbGVhcEogPSBsZWFwSiArIGRpdihqdW1wLCAzMykgKiA4ICsgZGl2KG1vZChqdW1wLCAzMyksIDQpXG4gICAganAgPSBqbVxuICB9XG4gIG4gPSBqeSAtIGpwXG5cbiAgLy8gRmluZCB0aGUgbnVtYmVyIG9mIGxlYXAgeWVhcnMgZnJvbSBBRCA2MjEgdG8gdGhlIGJlZ2lubmluZ1xuICAvLyBvZiB0aGUgY3VycmVudCBKYWxhYWxpIHllYXIgaW4gdGhlIFBlcnNpYW4gY2FsZW5kYXIuXG4gIGxlYXBKID0gbGVhcEogKyBkaXYobiwgMzMpICogOCArIGRpdihtb2QobiwgMzMpICsgMywgNClcbiAgaWYgKG1vZChqdW1wLCAzMykgPT09IDQgJiYganVtcCAtIG4gPT09IDQpIHsgbGVhcEogKz0gMSB9XG5cbiAgLy8gQW5kIHRoZSBzYW1lIGluIHRoZSBHcmVnb3JpYW4gY2FsZW5kYXIgKHVudGlsIHRoZSB5ZWFyIGd5KS5cbiAgY29uc3QgbGVhcEcgPSBkaXYoZ3ksIDQpIC0gZGl2KChkaXYoZ3ksIDEwMCkgKyAxKSAqIDMsIDQpIC0gMTUwXG5cbiAgLy8gRGV0ZXJtaW5lIHRoZSBHcmVnb3JpYW4gZGF0ZSBvZiBGYXJ2YXJkaW4gdGhlIDFzdC5cbiAgY29uc3QgbWFyY2ggPSAyMCArIGxlYXBKIC0gbGVhcEdcblxuICAvLyBGaW5kIGhvdyBtYW55IHllYXJzIGhhdmUgcGFzc2VkIHNpbmNlIHRoZSBsYXN0IGxlYXAgeWVhci5cbiAgaWYgKCF3aXRob3V0TGVhcCkge1xuICAgIGlmIChqdW1wIC0gbiA8IDYpIHsgbiA9IG4gLSBqdW1wICsgZGl2KGp1bXAgKyA0LCAzMykgKiAzMyB9XG4gICAgbGVhcCA9IG1vZChtb2QobiArIDEsIDMzKSAtIDEsIDQpXG4gICAgaWYgKGxlYXAgPT09IC0xKSB7XG4gICAgICBsZWFwID0gNFxuICAgIH1cbiAgfVxuXG4gIHJldHVybiB7XG4gICAgbGVhcDogbGVhcCxcbiAgICBneTogZ3ksXG4gICAgbWFyY2g6IG1hcmNoXG4gIH1cbn1cblxuLypcbiAgQ29udmVydHMgYSBkYXRlIG9mIHRoZSBKYWxhYWxpIGNhbGVuZGFyIHRvIHRoZSBKdWxpYW4gRGF5IG51bWJlci5cblxuICBAcGFyYW0gankgSmFsYWFsaSB5ZWFyICgxIHRvIDMxMDApXG4gIEBwYXJhbSBqbSBKYWxhYWxpIG1vbnRoICgxIHRvIDEyKVxuICBAcGFyYW0gamQgSmFsYWFsaSBkYXkgKDEgdG8gMjkvMzEpXG4gIEByZXR1cm4gSnVsaWFuIERheSBudW1iZXJcbiovXG5mdW5jdGlvbiBqMmQgKGp5LCBqbSwgamQpIHtcbiAgY29uc3QgciA9IGphbENhbChqeSwgdHJ1ZSlcbiAgcmV0dXJuIGcyZChyLmd5LCAzLCByLm1hcmNoKSArIChqbSAtIDEpICogMzEgLSBkaXYoam0sIDcpICogKGptIC0gNykgKyBqZCAtIDFcbn1cblxuLypcbiAgQ29udmVydHMgdGhlIEp1bGlhbiBEYXkgbnVtYmVyIHRvIGEgZGF0ZSBpbiB0aGUgSmFsYWFsaSBjYWxlbmRhci5cblxuICBAcGFyYW0gamRuIEp1bGlhbiBEYXkgbnVtYmVyXG4gIEByZXR1cm5cbiAgICBqeTogSmFsYWFsaSB5ZWFyICgxIHRvIDMxMDApXG4gICAgam06IEphbGFhbGkgbW9udGggKDEgdG8gMTIpXG4gICAgamQ6IEphbGFhbGkgZGF5ICgxIHRvIDI5LzMxKVxuKi9cbmZ1bmN0aW9uIGQyaiAoamRuKSB7XG4gIGNvbnN0IGd5ID0gZDJnKGpkbikuZ3kgLy8gQ2FsY3VsYXRlIEdyZWdvcmlhbiB5ZWFyIChneSkuXG4gIGxldFxuICAgIGp5ID0gZ3kgLSA2MjEsXG4gICAgamQsXG4gICAgam0sXG4gICAga1xuICBjb25zdFxuICAgIHIgPSBqYWxDYWwoanksIGZhbHNlKSxcbiAgICBqZG4xZiA9IGcyZChneSwgMywgci5tYXJjaClcblxuICAvLyBGaW5kIG51bWJlciBvZiBkYXlzIHRoYXQgcGFzc2VkIHNpbmNlIDEgRmFydmFyZGluLlxuICBrID0gamRuIC0gamRuMWZcbiAgaWYgKGsgPj0gMCkge1xuICAgIGlmIChrIDw9IDE4NSkge1xuICAgICAgLy8gVGhlIGZpcnN0IDYgbW9udGhzLlxuICAgICAgam0gPSAxICsgZGl2KGssIDMxKVxuICAgICAgamQgPSBtb2QoaywgMzEpICsgMVxuICAgICAgcmV0dXJuIHtcbiAgICAgICAgank6IGp5LFxuICAgICAgICBqbTogam0sXG4gICAgICAgIGpkOiBqZFxuICAgICAgfVxuICAgIH1cbiAgICBlbHNlIHtcbiAgICAgIC8vIFRoZSByZW1haW5pbmcgbW9udGhzLlxuICAgICAgayAtPSAxODZcbiAgICB9XG4gIH1cbiAgZWxzZSB7XG4gICAgLy8gUHJldmlvdXMgSmFsYWFsaSB5ZWFyLlxuICAgIGp5IC09IDFcbiAgICBrICs9IDE3OVxuICAgIGlmIChyLmxlYXAgPT09IDEpIHsgayArPSAxIH1cbiAgfVxuICBqbSA9IDcgKyBkaXYoaywgMzApXG4gIGpkID0gbW9kKGssIDMwKSArIDFcbiAgcmV0dXJuIHtcbiAgICBqeToganksXG4gICAgam06IGptLFxuICAgIGpkOiBqZFxuICB9XG59XG5cbi8qXG4gIENhbGN1bGF0ZXMgdGhlIEp1bGlhbiBEYXkgbnVtYmVyIGZyb20gR3JlZ29yaWFuIG9yIEp1bGlhblxuICBjYWxlbmRhciBkYXRlcy4gVGhpcyBpbnRlZ2VyIG51bWJlciBjb3JyZXNwb25kcyB0byB0aGUgbm9vbiBvZlxuICB0aGUgZGF0ZSAoaS5lLiAxMiBob3VycyBvZiBVbml2ZXJzYWwgVGltZSkuXG4gIFRoZSBwcm9jZWR1cmUgd2FzIHRlc3RlZCB0byBiZSBnb29kIHNpbmNlIDEgTWFyY2gsIC0xMDAxMDAgKG9mIGJvdGhcbiAgY2FsZW5kYXJzKSB1cCB0byBhIGZldyBtaWxsaW9uIHllYXJzIGludG8gdGhlIGZ1dHVyZS5cblxuICBAcGFyYW0gZ3kgQ2FsZW5kYXIgeWVhciAoeWVhcnMgQkMgbnVtYmVyZWQgMCwgLTEsIC0yLCAuLi4pXG4gIEBwYXJhbSBnbSBDYWxlbmRhciBtb250aCAoMSB0byAxMilcbiAgQHBhcmFtIGdkIENhbGVuZGFyIGRheSBvZiB0aGUgbW9udGggKDEgdG8gMjgvMjkvMzAvMzEpXG4gIEByZXR1cm4gSnVsaWFuIERheSBudW1iZXJcbiovXG5mdW5jdGlvbiBnMmQgKGd5LCBnbSwgZ2QpIHtcbiAgbGV0IGQgPSBkaXYoKGd5ICsgZGl2KGdtIC0gOCwgNikgKyAxMDAxMDApICogMTQ2MSwgNClcbiAgICAgICsgZGl2KDE1MyAqIG1vZChnbSArIDksIDEyKSArIDIsIDUpXG4gICAgICArIGdkIC0gMzQ4NDA0MDhcbiAgZCA9IGQgLSBkaXYoZGl2KGd5ICsgMTAwMTAwICsgZGl2KGdtIC0gOCwgNiksIDEwMCkgKiAzLCA0KSArIDc1MlxuICByZXR1cm4gZFxufVxuXG4vKlxuICBDYWxjdWxhdGVzIEdyZWdvcmlhbiBhbmQgSnVsaWFuIGNhbGVuZGFyIGRhdGVzIGZyb20gdGhlIEp1bGlhbiBEYXkgbnVtYmVyXG4gIChqZG4pIGZvciB0aGUgcGVyaW9kIHNpbmNlIGpkbj0tMzQ4Mzk2NTUgKGkuZS4gdGhlIHllYXIgLTEwMDEwMCBvZiBib3RoXG4gIGNhbGVuZGFycykgdG8gc29tZSBtaWxsaW9ucyB5ZWFycyBhaGVhZCBvZiB0aGUgcHJlc2VudC5cblxuICBAcGFyYW0gamRuIEp1bGlhbiBEYXkgbnVtYmVyXG4gIEByZXR1cm5cbiAgICBneTogQ2FsZW5kYXIgeWVhciAoeWVhcnMgQkMgbnVtYmVyZWQgMCwgLTEsIC0yLCAuLi4pXG4gICAgZ206IENhbGVuZGFyIG1vbnRoICgxIHRvIDEyKVxuICAgIGdkOiBDYWxlbmRhciBkYXkgb2YgdGhlIG1vbnRoIE0gKDEgdG8gMjgvMjkvMzAvMzEpXG4qL1xuZnVuY3Rpb24gZDJnIChqZG4pIHtcbiAgbGV0IGogPSA0ICogamRuICsgMTM5MzYxNjMxXG4gIGogPSBqICsgZGl2KGRpdig0ICogamRuICsgMTgzMTg3NzIwLCAxNDYwOTcpICogMywgNCkgKiA0IC0gMzkwOFxuICBjb25zdFxuICAgIGkgPSBkaXYobW9kKGosIDE0NjEpLCA0KSAqIDUgKyAzMDgsXG4gICAgZ2QgPSBkaXYobW9kKGksIDE1MyksIDUpICsgMSxcbiAgICBnbSA9IG1vZChkaXYoaSwgMTUzKSwgMTIpICsgMSxcbiAgICBneSA9IGRpdihqLCAxNDYxKSAtIDEwMDEwMCArIGRpdig4IC0gZ20sIDYpXG4gIHJldHVybiB7XG4gICAgZ3k6IGd5LFxuICAgIGdtOiBnbSxcbiAgICBnZDogZ2RcbiAgfVxufVxuXG4vKlxuICBVdGlsaXR5IGhlbHBlciBmdW5jdGlvbnMuXG4qL1xuXG5mdW5jdGlvbiBkaXYgKGEsIGIpIHtcbiAgcmV0dXJuIH5+KGEgLyBiKVxufVxuXG5mdW5jdGlvbiBtb2QgKGEsIGIpIHtcbiAgcmV0dXJuIGEgLSB+fihhIC8gYikgKiBiXG59XG4iLCIvKiBlc2xpbnQgbm8tZmFsbHRocm91Z2g6IDAgKi9cblxuaW1wb3J0IHsgaXNEYXRlIH0gZnJvbSAnLi9wcml2YXRlL2lzLmpzJ1xuaW1wb3J0IHsgcGFkLCBjYXBpdGFsaXplIH0gZnJvbSAnLi9mb3JtYXQuanMnXG5pbXBvcnQgeyBqYWxhYWxpTW9udGhMZW5ndGggfSBmcm9tICcuL3ByaXZhdGUvZGF0ZS1wZXJzaWFuLmpzJ1xuaW1wb3J0IGxhbmcsIHsgZGVmYXVsdExhbmcgfSBmcm9tICcuLi9sYW5nLmpzJ1xuXG5jb25zdFxuICBNSUxMSVNFQ09ORFNfSU5fREFZID0gODY0MDAwMDAsXG4gIE1JTExJU0VDT05EU19JTl9IT1VSID0gMzYwMDAwMCxcbiAgTUlMTElTRUNPTkRTX0lOX01JTlVURSA9IDYwMDAwLFxuICBkZWZhdWx0TWFzayA9ICdZWVlZLU1NLUREVEhIOm1tOnNzLlNTU1onLFxuICB0b2tlbiA9IC9cXFsoKD86W15cXF1cXFxcXXxcXFxcXXxcXFxcKSopXFxdfGR7MSw0fXxNezEsNH18bXsxLDJ9fHd7MSwyfXxRb3xEb3xEezEsNH18WVkoPzpZWSk/fEh7MSwyfXxoezEsMn18c3sxLDJ9fFN7MSwzfXxaezEsMn18YXsxLDJ9fFtBUUV4WF0vZyxcbiAgcmV2ZXJzZVRva2VuID0gLyhcXFtbXlxcXV0qXFxdKXxkezEsNH18TXsxLDR9fG17MSwyfXx3ezEsMn18UW98RG98RHsxLDR9fFlZKD86WVkpP3xIezEsMn18aHsxLDJ9fHN7MSwyfXxTezEsM318WnsxLDJ9fGF7MSwyfXxbQVFFeFhdfChbLiorOj9eLFxccyR7fSgpfFxcXFxdKykvZyxcbiAgcmVnZXhTdG9yZSA9IHt9XG5cbmZ1bmN0aW9uIGdldFJlZ2V4RGF0YSAobWFzaywgZGF0ZUxvY2FsZSkge1xuICBjb25zdFxuICAgIGRheXMgPSAnKCcgKyBkYXRlTG9jYWxlLmRheXMuam9pbignfCcpICsgJyknLFxuICAgIGtleSA9IG1hc2sgKyBkYXlzXG5cbiAgaWYgKHJlZ2V4U3RvcmVbIGtleSBdICE9PSB2b2lkIDApIHtcbiAgICByZXR1cm4gcmVnZXhTdG9yZVsga2V5IF1cbiAgfVxuXG4gIGNvbnN0XG4gICAgZGF5c1Nob3J0ID0gJygnICsgZGF0ZUxvY2FsZS5kYXlzU2hvcnQuam9pbignfCcpICsgJyknLFxuICAgIG1vbnRocyA9ICcoJyArIGRhdGVMb2NhbGUubW9udGhzLmpvaW4oJ3wnKSArICcpJyxcbiAgICBtb250aHNTaG9ydCA9ICcoJyArIGRhdGVMb2NhbGUubW9udGhzU2hvcnQuam9pbignfCcpICsgJyknXG5cbiAgY29uc3QgbWFwID0ge31cbiAgbGV0IGluZGV4ID0gMFxuXG4gIGNvbnN0IHJlZ2V4VGV4dCA9IG1hc2sucmVwbGFjZShyZXZlcnNlVG9rZW4sIG1hdGNoID0+IHtcbiAgICBpbmRleCsrXG4gICAgc3dpdGNoIChtYXRjaCkge1xuICAgICAgY2FzZSAnWVknOlxuICAgICAgICBtYXAuWVkgPSBpbmRleFxuICAgICAgICByZXR1cm4gJygtP1xcXFxkezEsMn0pJ1xuICAgICAgY2FzZSAnWVlZWSc6XG4gICAgICAgIG1hcC5ZWVlZID0gaW5kZXhcbiAgICAgICAgcmV0dXJuICcoLT9cXFxcZHsxLDR9KSdcbiAgICAgIGNhc2UgJ00nOlxuICAgICAgICBtYXAuTSA9IGluZGV4XG4gICAgICAgIHJldHVybiAnKFxcXFxkezEsMn0pJ1xuICAgICAgY2FzZSAnTU0nOlxuICAgICAgICBtYXAuTSA9IGluZGV4IC8vIGJ1bXBpbmcgdG8gTVxuICAgICAgICByZXR1cm4gJyhcXFxcZHsyfSknXG4gICAgICBjYXNlICdNTU0nOlxuICAgICAgICBtYXAuTU1NID0gaW5kZXhcbiAgICAgICAgcmV0dXJuIG1vbnRoc1Nob3J0XG4gICAgICBjYXNlICdNTU1NJzpcbiAgICAgICAgbWFwLk1NTU0gPSBpbmRleFxuICAgICAgICByZXR1cm4gbW9udGhzXG4gICAgICBjYXNlICdEJzpcbiAgICAgICAgbWFwLkQgPSBpbmRleFxuICAgICAgICByZXR1cm4gJyhcXFxcZHsxLDJ9KSdcbiAgICAgIGNhc2UgJ0RvJzpcbiAgICAgICAgbWFwLkQgPSBpbmRleCsrIC8vIGJ1bXBpbmcgdG8gRFxuICAgICAgICByZXR1cm4gJyhcXFxcZHsxLDJ9KHN0fG5kfHJkfHRoKSknXG4gICAgICBjYXNlICdERCc6XG4gICAgICAgIG1hcC5EID0gaW5kZXggLy8gYnVtcGluZyB0byBEXG4gICAgICAgIHJldHVybiAnKFxcXFxkezJ9KSdcbiAgICAgIGNhc2UgJ0gnOlxuICAgICAgICBtYXAuSCA9IGluZGV4XG4gICAgICAgIHJldHVybiAnKFxcXFxkezEsMn0pJ1xuICAgICAgY2FzZSAnSEgnOlxuICAgICAgICBtYXAuSCA9IGluZGV4IC8vIGJ1bXBpbmcgdG8gSFxuICAgICAgICByZXR1cm4gJyhcXFxcZHsyfSknXG4gICAgICBjYXNlICdoJzpcbiAgICAgICAgbWFwLmggPSBpbmRleFxuICAgICAgICByZXR1cm4gJyhcXFxcZHsxLDJ9KSdcbiAgICAgIGNhc2UgJ2hoJzpcbiAgICAgICAgbWFwLmggPSBpbmRleCAvLyBidW1waW5nIHRvIGhcbiAgICAgICAgcmV0dXJuICcoXFxcXGR7Mn0pJ1xuICAgICAgY2FzZSAnbSc6XG4gICAgICAgIG1hcC5tID0gaW5kZXhcbiAgICAgICAgcmV0dXJuICcoXFxcXGR7MSwyfSknXG4gICAgICBjYXNlICdtbSc6XG4gICAgICAgIG1hcC5tID0gaW5kZXggLy8gYnVtcGluZyB0byBtXG4gICAgICAgIHJldHVybiAnKFxcXFxkezJ9KSdcbiAgICAgIGNhc2UgJ3MnOlxuICAgICAgICBtYXAucyA9IGluZGV4XG4gICAgICAgIHJldHVybiAnKFxcXFxkezEsMn0pJ1xuICAgICAgY2FzZSAnc3MnOlxuICAgICAgICBtYXAucyA9IGluZGV4IC8vIGJ1bXBpbmcgdG8gc1xuICAgICAgICByZXR1cm4gJyhcXFxcZHsyfSknXG4gICAgICBjYXNlICdTJzpcbiAgICAgICAgbWFwLlMgPSBpbmRleFxuICAgICAgICByZXR1cm4gJyhcXFxcZHsxfSknXG4gICAgICBjYXNlICdTUyc6XG4gICAgICAgIG1hcC5TID0gaW5kZXggLy8gYnVtcCB0byBTXG4gICAgICAgIHJldHVybiAnKFxcXFxkezJ9KSdcbiAgICAgIGNhc2UgJ1NTUyc6XG4gICAgICAgIG1hcC5TID0gaW5kZXggLy8gYnVtcCB0byBTXG4gICAgICAgIHJldHVybiAnKFxcXFxkezN9KSdcbiAgICAgIGNhc2UgJ0EnOlxuICAgICAgICBtYXAuQSA9IGluZGV4XG4gICAgICAgIHJldHVybiAnKEFNfFBNKSdcbiAgICAgIGNhc2UgJ2EnOlxuICAgICAgICBtYXAuYSA9IGluZGV4XG4gICAgICAgIHJldHVybiAnKGFtfHBtKSdcbiAgICAgIGNhc2UgJ2FhJzpcbiAgICAgICAgbWFwLmFhID0gaW5kZXhcbiAgICAgICAgcmV0dXJuICcoYVxcXFwubVxcXFwufHBcXFxcLm1cXFxcLiknXG5cbiAgICAgIGNhc2UgJ2RkZCc6XG4gICAgICAgIHJldHVybiBkYXlzU2hvcnRcbiAgICAgIGNhc2UgJ2RkZGQnOlxuICAgICAgICByZXR1cm4gZGF5c1xuICAgICAgY2FzZSAnUSc6XG4gICAgICBjYXNlICdkJzpcbiAgICAgIGNhc2UgJ0UnOlxuICAgICAgICByZXR1cm4gJyhcXFxcZHsxfSknXG4gICAgICBjYXNlICdRbyc6XG4gICAgICAgIHJldHVybiAnKDFzdHwybmR8M3JkfDR0aCknXG4gICAgICBjYXNlICdEREQnOlxuICAgICAgY2FzZSAnRERERCc6XG4gICAgICAgIHJldHVybiAnKFxcXFxkezEsM30pJ1xuICAgICAgY2FzZSAndyc6XG4gICAgICAgIHJldHVybiAnKFxcXFxkezEsMn0pJ1xuICAgICAgY2FzZSAnd3cnOlxuICAgICAgICByZXR1cm4gJyhcXFxcZHsyfSknXG5cbiAgICAgIGNhc2UgJ1onOiAvLyB0byBzcGxpdDogKD86KFopKCkoKXwoWystXSk/KFxcXFxkezJ9KTo/KFxcXFxkezJ9KSlcbiAgICAgICAgbWFwLlogPSBpbmRleFxuICAgICAgICByZXR1cm4gJyhafFsrLV1cXFxcZHsyfTpcXFxcZHsyfSknXG4gICAgICBjYXNlICdaWic6XG4gICAgICAgIG1hcC5aWiA9IGluZGV4XG4gICAgICAgIHJldHVybiAnKFp8WystXVxcXFxkezJ9XFxcXGR7Mn0pJ1xuXG4gICAgICBjYXNlICdYJzpcbiAgICAgICAgbWFwLlggPSBpbmRleFxuICAgICAgICByZXR1cm4gJygtP1xcXFxkKyknXG4gICAgICBjYXNlICd4JzpcbiAgICAgICAgbWFwLnggPSBpbmRleFxuICAgICAgICByZXR1cm4gJygtP1xcXFxkezQsfSknXG5cbiAgICAgIGRlZmF1bHQ6XG4gICAgICAgIGluZGV4LS1cbiAgICAgICAgaWYgKG1hdGNoWyAwIF0gPT09ICdbJykge1xuICAgICAgICAgIG1hdGNoID0gbWF0Y2guc3Vic3RyaW5nKDEsIG1hdGNoLmxlbmd0aCAtIDEpXG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIG1hdGNoLnJlcGxhY2UoL1suKis/XiR7fSgpfFtcXF1cXFxcXS9nLCAnXFxcXCQmJylcbiAgICB9XG4gIH0pXG5cbiAgY29uc3QgcmVzID0geyBtYXAsIHJlZ2V4OiBuZXcgUmVnRXhwKCdeJyArIHJlZ2V4VGV4dCkgfVxuICByZWdleFN0b3JlWyBrZXkgXSA9IHJlc1xuXG4gIHJldHVybiByZXNcbn1cblxuZnVuY3Rpb24gZ2V0RGF0ZUxvY2FsZSAocGFyYW1EYXRlTG9jYWxlLCBsYW5nUHJvcHMpIHtcbiAgcmV0dXJuIHBhcmFtRGF0ZUxvY2FsZSAhPT0gdm9pZCAwXG4gICAgPyBwYXJhbURhdGVMb2NhbGVcbiAgICA6IChcbiAgICAgICAgbGFuZ1Byb3BzICE9PSB2b2lkIDBcbiAgICAgICAgICA/IGxhbmdQcm9wcy5kYXRlXG4gICAgICAgICAgOiBkZWZhdWx0TGFuZy5kYXRlXG4gICAgICApXG59XG5cbmZ1bmN0aW9uIGZvcm1hdFRpbWV6b25lIChvZmZzZXQsIGRlbGltZXRlciA9ICcnKSB7XG4gIGNvbnN0XG4gICAgc2lnbiA9IG9mZnNldCA+IDAgPyAnLScgOiAnKycsXG4gICAgYWJzT2Zmc2V0ID0gTWF0aC5hYnMob2Zmc2V0KSxcbiAgICBob3VycyA9IE1hdGguZmxvb3IoYWJzT2Zmc2V0IC8gNjApLFxuICAgIG1pbnV0ZXMgPSBhYnNPZmZzZXQgJSA2MFxuXG4gIHJldHVybiBzaWduICsgcGFkKGhvdXJzKSArIGRlbGltZXRlciArIHBhZChtaW51dGVzKVxufVxuXG5mdW5jdGlvbiBhcHBseVllYXJNb250aERheUNoYW5nZSAoZGF0ZSwgbW9kLCBzaWduKSB7XG4gIGxldFxuICAgIHllYXIgPSBkYXRlLmdldEZ1bGxZZWFyKCksXG4gICAgbW9udGggPSBkYXRlLmdldE1vbnRoKClcblxuICBjb25zdCBkYXkgPSBkYXRlLmdldERhdGUoKVxuXG4gIGlmIChtb2QueWVhciAhPT0gdm9pZCAwKSB7XG4gICAgeWVhciArPSBzaWduICogbW9kLnllYXJcbiAgICBkZWxldGUgbW9kLnllYXJcbiAgfVxuXG4gIGlmIChtb2QubW9udGggIT09IHZvaWQgMCkge1xuICAgIG1vbnRoICs9IHNpZ24gKiBtb2QubW9udGhcbiAgICBkZWxldGUgbW9kLm1vbnRoXG4gIH1cblxuICBkYXRlLnNldERhdGUoMSlcbiAgZGF0ZS5zZXRNb250aCgyKVxuXG4gIGRhdGUuc2V0RnVsbFllYXIoeWVhcilcbiAgZGF0ZS5zZXRNb250aChtb250aClcbiAgZGF0ZS5zZXREYXRlKE1hdGgubWluKGRheSwgZGF5c0luTW9udGgoZGF0ZSkpKVxuXG4gIGlmIChtb2QuZGF0ZSAhPT0gdm9pZCAwKSB7XG4gICAgZGF0ZS5zZXREYXRlKGRhdGUuZ2V0RGF0ZSgpICsgc2lnbiAqIG1vZC5kYXRlKVxuICAgIGRlbGV0ZSBtb2QuZGF0ZVxuICB9XG5cbiAgcmV0dXJuIGRhdGVcbn1cblxuZnVuY3Rpb24gYXBwbHlZZWFyTW9udGhEYXkgKGRhdGUsIG1vZCwgbWlkZGxlKSB7XG4gIGNvbnN0XG4gICAgeWVhciA9IG1vZC55ZWFyICE9PSB2b2lkIDAgPyBtb2QueWVhciA6IGRhdGVbIGBnZXQkeyBtaWRkbGUgfUZ1bGxZZWFyYCBdKCksXG4gICAgbW9udGggPSBtb2QubW9udGggIT09IHZvaWQgMCA/IG1vZC5tb250aCAtIDEgOiBkYXRlWyBgZ2V0JHsgbWlkZGxlIH1Nb250aGAgXSgpLFxuICAgIG1heERheSA9IChuZXcgRGF0ZSh5ZWFyLCBtb250aCArIDEsIDApKS5nZXREYXRlKCksXG4gICAgZGF5ID0gTWF0aC5taW4obWF4RGF5LCBtb2QuZGF0ZSAhPT0gdm9pZCAwID8gbW9kLmRhdGUgOiBkYXRlWyBgZ2V0JHsgbWlkZGxlIH1EYXRlYCBdKCkpXG5cbiAgZGF0ZVsgYHNldCR7IG1pZGRsZSB9RGF0ZWAgXSgxKVxuICBkYXRlWyBgc2V0JHsgbWlkZGxlIH1Nb250aGAgXSgyKVxuXG4gIGRhdGVbIGBzZXQkeyBtaWRkbGUgfUZ1bGxZZWFyYCBdKHllYXIpXG4gIGRhdGVbIGBzZXQkeyBtaWRkbGUgfU1vbnRoYCBdKG1vbnRoKVxuICBkYXRlWyBgc2V0JHsgbWlkZGxlIH1EYXRlYCBdKGRheSlcblxuICBkZWxldGUgbW9kLnllYXJcbiAgZGVsZXRlIG1vZC5tb250aFxuICBkZWxldGUgbW9kLmRhdGVcblxuICByZXR1cm4gZGF0ZVxufVxuXG5mdW5jdGlvbiBnZXRDaGFuZ2UgKGRhdGUsIHJhd01vZCwgc2lnbikge1xuICBjb25zdFxuICAgIG1vZCA9IG5vcm1hbGl6ZU1vZChyYXdNb2QpLFxuICAgIGQgPSBuZXcgRGF0ZShkYXRlKSxcbiAgICB0ID0gbW9kLnllYXIgIT09IHZvaWQgMCB8fCBtb2QubW9udGggIT09IHZvaWQgMCB8fCBtb2QuZGF0ZSAhPT0gdm9pZCAwXG4gICAgICA/IGFwcGx5WWVhck1vbnRoRGF5Q2hhbmdlKGQsIG1vZCwgc2lnbikgLy8gcmVtb3ZlcyB5ZWFyL21vbnRoL2RheVxuICAgICAgOiBkXG5cbiAgZm9yIChjb25zdCBrZXkgaW4gbW9kKSB7XG4gICAgY29uc3Qgb3AgPSBjYXBpdGFsaXplKGtleSlcbiAgICB0WyBgc2V0JHsgb3AgfWAgXSh0WyBgZ2V0JHsgb3AgfWAgXSgpICsgc2lnbiAqIG1vZFsga2V5IF0pXG4gIH1cblxuICByZXR1cm4gdFxufVxuXG5mdW5jdGlvbiBub3JtYWxpemVNb2QgKG1vZCkge1xuICBjb25zdCBhY2MgPSB7IC4uLm1vZCB9XG5cbiAgaWYgKG1vZC55ZWFycyAhPT0gdm9pZCAwKSB7XG4gICAgYWNjLnllYXIgPSBtb2QueWVhcnNcbiAgICBkZWxldGUgYWNjLnllYXJzXG4gIH1cblxuICBpZiAobW9kLm1vbnRocyAhPT0gdm9pZCAwKSB7XG4gICAgYWNjLm1vbnRoID0gbW9kLm1vbnRoc1xuICAgIGRlbGV0ZSBhY2MubW9udGhzXG4gIH1cblxuICBpZiAobW9kLmRheXMgIT09IHZvaWQgMCkge1xuICAgIGFjYy5kYXRlID0gbW9kLmRheXNcbiAgICBkZWxldGUgYWNjLmRheXNcbiAgfVxuICBpZiAobW9kLmRheSAhPT0gdm9pZCAwKSB7XG4gICAgYWNjLmRhdGUgPSBtb2QuZGF5XG4gICAgZGVsZXRlIGFjYy5kYXlcbiAgfVxuXG4gIGlmIChtb2QuaG91ciAhPT0gdm9pZCAwKSB7XG4gICAgYWNjLmhvdXJzID0gbW9kLmhvdXJcbiAgICBkZWxldGUgYWNjLmhvdXJcbiAgfVxuXG4gIGlmIChtb2QubWludXRlICE9PSB2b2lkIDApIHtcbiAgICBhY2MubWludXRlcyA9IG1vZC5taW51dGVcbiAgICBkZWxldGUgYWNjLm1pbnV0ZVxuICB9XG5cbiAgaWYgKG1vZC5zZWNvbmQgIT09IHZvaWQgMCkge1xuICAgIGFjYy5zZWNvbmRzID0gbW9kLnNlY29uZFxuICAgIGRlbGV0ZSBhY2Muc2Vjb25kXG4gIH1cblxuICBpZiAobW9kLm1pbGxpc2Vjb25kICE9PSB2b2lkIDApIHtcbiAgICBhY2MubWlsbGlzZWNvbmRzID0gbW9kLm1pbGxpc2Vjb25kXG4gICAgZGVsZXRlIGFjYy5taWxsaXNlY29uZFxuICB9XG5cbiAgcmV0dXJuIGFjY1xufVxuXG5leHBvcnQgZnVuY3Rpb24gYWRqdXN0RGF0ZSAoZGF0ZSwgcmF3TW9kLCB1dGMpIHtcbiAgY29uc3RcbiAgICBtb2QgPSBub3JtYWxpemVNb2QocmF3TW9kKSxcbiAgICBtaWRkbGUgPSB1dGMgPT09IHRydWUgPyAnVVRDJyA6ICcnLFxuICAgIGQgPSBuZXcgRGF0ZShkYXRlKSxcbiAgICB0ID0gbW9kLnllYXIgIT09IHZvaWQgMCB8fCBtb2QubW9udGggIT09IHZvaWQgMCB8fCBtb2QuZGF0ZSAhPT0gdm9pZCAwXG4gICAgICA/IGFwcGx5WWVhck1vbnRoRGF5KGQsIG1vZCwgbWlkZGxlKSAvLyByZW1vdmVzIHllYXIvbW9udGgvZGF5XG4gICAgICA6IGRcblxuICBmb3IgKGNvbnN0IGtleSBpbiBtb2QpIHtcbiAgICBjb25zdCBvcCA9IGtleS5jaGFyQXQoMCkudG9VcHBlckNhc2UoKSArIGtleS5zbGljZSgxKVxuICAgIHRbIGBzZXQkeyBtaWRkbGUgfSR7IG9wIH1gIF0obW9kWyBrZXkgXSlcbiAgfVxuXG4gIHJldHVybiB0XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBleHRyYWN0RGF0ZSAoc3RyLCBtYXNrLCBkYXRlTG9jYWxlKSB7XG4gIGNvbnN0IGQgPSBfX3NwbGl0RGF0ZShzdHIsIG1hc2ssIGRhdGVMb2NhbGUpXG5cbiAgY29uc3QgZGF0ZSA9IG5ldyBEYXRlKFxuICAgIGQueWVhcixcbiAgICBkLm1vbnRoID09PSBudWxsID8gbnVsbCA6IGQubW9udGggLSAxLFxuICAgIGQuZGF5ID09PSBudWxsID8gMSA6IGQuZGF5LFxuICAgIGQuaG91cixcbiAgICBkLm1pbnV0ZSxcbiAgICBkLnNlY29uZCxcbiAgICBkLm1pbGxpc2Vjb25kXG4gIClcblxuICBjb25zdCB0ek9mZnNldCA9IGRhdGUuZ2V0VGltZXpvbmVPZmZzZXQoKVxuXG4gIHJldHVybiBkLnRpbWV6b25lT2Zmc2V0ID09PSBudWxsIHx8IGQudGltZXpvbmVPZmZzZXQgPT09IHR6T2Zmc2V0XG4gICAgPyBkYXRlXG4gICAgOiBnZXRDaGFuZ2UoZGF0ZSwgeyBtaW51dGVzOiBkLnRpbWV6b25lT2Zmc2V0IC0gdHpPZmZzZXQgfSwgMSlcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIF9fc3BsaXREYXRlIChzdHIsIG1hc2ssIGRhdGVMb2NhbGUsIGNhbGVuZGFyLCBkZWZhdWx0TW9kZWwpIHtcbiAgY29uc3QgZGF0ZSA9IHtcbiAgICB5ZWFyOiBudWxsLFxuICAgIG1vbnRoOiBudWxsLFxuICAgIGRheTogbnVsbCxcbiAgICBob3VyOiBudWxsLFxuICAgIG1pbnV0ZTogbnVsbCxcbiAgICBzZWNvbmQ6IG51bGwsXG4gICAgbWlsbGlzZWNvbmQ6IG51bGwsXG4gICAgdGltZXpvbmVPZmZzZXQ6IG51bGwsXG4gICAgZGF0ZUhhc2g6IG51bGwsXG4gICAgdGltZUhhc2g6IG51bGxcbiAgfVxuXG4gIGRlZmF1bHRNb2RlbCAhPT0gdm9pZCAwICYmIE9iamVjdC5hc3NpZ24oZGF0ZSwgZGVmYXVsdE1vZGVsKVxuXG4gIGlmIChcbiAgICBzdHIgPT09IHZvaWQgMFxuICAgIHx8IHN0ciA9PT0gbnVsbFxuICAgIHx8IHN0ciA9PT0gJydcbiAgICB8fCB0eXBlb2Ygc3RyICE9PSAnc3RyaW5nJ1xuICApIHtcbiAgICByZXR1cm4gZGF0ZVxuICB9XG5cbiAgaWYgKG1hc2sgPT09IHZvaWQgMCkge1xuICAgIG1hc2sgPSBkZWZhdWx0TWFza1xuICB9XG5cbiAgY29uc3RcbiAgICBsYW5nT3B0cyA9IGdldERhdGVMb2NhbGUoZGF0ZUxvY2FsZSwgbGFuZy5wcm9wcyksXG4gICAgbW9udGhzID0gbGFuZ09wdHMubW9udGhzLFxuICAgIG1vbnRoc1Nob3J0ID0gbGFuZ09wdHMubW9udGhzU2hvcnRcblxuICBjb25zdCB7IHJlZ2V4LCBtYXAgfSA9IGdldFJlZ2V4RGF0YShtYXNrLCBsYW5nT3B0cylcblxuICBjb25zdCBtYXRjaCA9IHN0ci5tYXRjaChyZWdleClcblxuICBpZiAobWF0Y2ggPT09IG51bGwpIHtcbiAgICByZXR1cm4gZGF0ZVxuICB9XG5cbiAgbGV0IHR6U3RyaW5nID0gJydcblxuICBpZiAobWFwLlggIT09IHZvaWQgMCB8fCBtYXAueCAhPT0gdm9pZCAwKSB7XG4gICAgY29uc3Qgc3RhbXAgPSBwYXJzZUludChtYXRjaFsgbWFwLlggIT09IHZvaWQgMCA/IG1hcC5YIDogbWFwLnggXSwgMTApXG5cbiAgICBpZiAoaXNOYU4oc3RhbXApID09PSB0cnVlIHx8IHN0YW1wIDwgMCkge1xuICAgICAgcmV0dXJuIGRhdGVcbiAgICB9XG5cbiAgICBjb25zdCBkID0gbmV3IERhdGUoc3RhbXAgKiAobWFwLlggIT09IHZvaWQgMCA/IDEwMDAgOiAxKSlcblxuICAgIGRhdGUueWVhciA9IGQuZ2V0RnVsbFllYXIoKVxuICAgIGRhdGUubW9udGggPSBkLmdldE1vbnRoKCkgKyAxXG4gICAgZGF0ZS5kYXkgPSBkLmdldERhdGUoKVxuICAgIGRhdGUuaG91ciA9IGQuZ2V0SG91cnMoKVxuICAgIGRhdGUubWludXRlID0gZC5nZXRNaW51dGVzKClcbiAgICBkYXRlLnNlY29uZCA9IGQuZ2V0U2Vjb25kcygpXG4gICAgZGF0ZS5taWxsaXNlY29uZCA9IGQuZ2V0TWlsbGlzZWNvbmRzKClcbiAgfVxuICBlbHNlIHtcbiAgICBpZiAobWFwLllZWVkgIT09IHZvaWQgMCkge1xuICAgICAgZGF0ZS55ZWFyID0gcGFyc2VJbnQobWF0Y2hbIG1hcC5ZWVlZIF0sIDEwKVxuICAgIH1cbiAgICBlbHNlIGlmIChtYXAuWVkgIT09IHZvaWQgMCkge1xuICAgICAgY29uc3QgeSA9IHBhcnNlSW50KG1hdGNoWyBtYXAuWVkgXSwgMTApXG4gICAgICBkYXRlLnllYXIgPSB5IDwgMCA/IHkgOiAyMDAwICsgeVxuICAgIH1cblxuICAgIGlmIChtYXAuTSAhPT0gdm9pZCAwKSB7XG4gICAgICBkYXRlLm1vbnRoID0gcGFyc2VJbnQobWF0Y2hbIG1hcC5NIF0sIDEwKVxuICAgICAgaWYgKGRhdGUubW9udGggPCAxIHx8IGRhdGUubW9udGggPiAxMikge1xuICAgICAgICByZXR1cm4gZGF0ZVxuICAgICAgfVxuICAgIH1cbiAgICBlbHNlIGlmIChtYXAuTU1NICE9PSB2b2lkIDApIHtcbiAgICAgIGRhdGUubW9udGggPSBtb250aHNTaG9ydC5pbmRleE9mKG1hdGNoWyBtYXAuTU1NIF0pICsgMVxuICAgIH1cbiAgICBlbHNlIGlmIChtYXAuTU1NTSAhPT0gdm9pZCAwKSB7XG4gICAgICBkYXRlLm1vbnRoID0gbW9udGhzLmluZGV4T2YobWF0Y2hbIG1hcC5NTU1NIF0pICsgMVxuICAgIH1cblxuICAgIGlmIChtYXAuRCAhPT0gdm9pZCAwKSB7XG4gICAgICBkYXRlLmRheSA9IHBhcnNlSW50KG1hdGNoWyBtYXAuRCBdLCAxMClcblxuICAgICAgaWYgKGRhdGUueWVhciA9PT0gbnVsbCB8fCBkYXRlLm1vbnRoID09PSBudWxsIHx8IGRhdGUuZGF5IDwgMSkge1xuICAgICAgICByZXR1cm4gZGF0ZVxuICAgICAgfVxuXG4gICAgICBjb25zdCBtYXhEYXkgPSBjYWxlbmRhciAhPT0gJ3BlcnNpYW4nXG4gICAgICAgID8gKG5ldyBEYXRlKGRhdGUueWVhciwgZGF0ZS5tb250aCwgMCkpLmdldERhdGUoKVxuICAgICAgICA6IGphbGFhbGlNb250aExlbmd0aChkYXRlLnllYXIsIGRhdGUubW9udGgpXG5cbiAgICAgIGlmIChkYXRlLmRheSA+IG1heERheSkge1xuICAgICAgICByZXR1cm4gZGF0ZVxuICAgICAgfVxuICAgIH1cblxuICAgIGlmIChtYXAuSCAhPT0gdm9pZCAwKSB7XG4gICAgICBkYXRlLmhvdXIgPSBwYXJzZUludChtYXRjaFsgbWFwLkggXSwgMTApICUgMjRcbiAgICB9XG4gICAgZWxzZSBpZiAobWFwLmggIT09IHZvaWQgMCkge1xuICAgICAgZGF0ZS5ob3VyID0gcGFyc2VJbnQobWF0Y2hbIG1hcC5oIF0sIDEwKSAlIDEyXG4gICAgICBpZiAoXG4gICAgICAgIChtYXAuQSAmJiBtYXRjaFsgbWFwLkEgXSA9PT0gJ1BNJylcbiAgICAgICAgfHwgKG1hcC5hICYmIG1hdGNoWyBtYXAuYSBdID09PSAncG0nKVxuICAgICAgICB8fCAobWFwLmFhICYmIG1hdGNoWyBtYXAuYWEgXSA9PT0gJ3AubS4nKVxuICAgICAgKSB7XG4gICAgICAgIGRhdGUuaG91ciArPSAxMlxuICAgICAgfVxuICAgICAgZGF0ZS5ob3VyID0gZGF0ZS5ob3VyICUgMjRcbiAgICB9XG5cbiAgICBpZiAobWFwLm0gIT09IHZvaWQgMCkge1xuICAgICAgZGF0ZS5taW51dGUgPSBwYXJzZUludChtYXRjaFsgbWFwLm0gXSwgMTApICUgNjBcbiAgICB9XG5cbiAgICBpZiAobWFwLnMgIT09IHZvaWQgMCkge1xuICAgICAgZGF0ZS5zZWNvbmQgPSBwYXJzZUludChtYXRjaFsgbWFwLnMgXSwgMTApICUgNjBcbiAgICB9XG5cbiAgICBpZiAobWFwLlMgIT09IHZvaWQgMCkge1xuICAgICAgZGF0ZS5taWxsaXNlY29uZCA9IHBhcnNlSW50KG1hdGNoWyBtYXAuUyBdLCAxMCkgKiAxMCAqKiAoMyAtIG1hdGNoWyBtYXAuUyBdLmxlbmd0aClcbiAgICB9XG5cbiAgICBpZiAobWFwLlogIT09IHZvaWQgMCB8fCBtYXAuWlogIT09IHZvaWQgMCkge1xuICAgICAgdHpTdHJpbmcgPSAobWFwLlogIT09IHZvaWQgMCA/IG1hdGNoWyBtYXAuWiBdLnJlcGxhY2UoJzonLCAnJykgOiBtYXRjaFsgbWFwLlpaIF0pXG4gICAgICBkYXRlLnRpbWV6b25lT2Zmc2V0ID0gKHR6U3RyaW5nWyAwIF0gPT09ICcrJyA/IC0xIDogMSkgKiAoNjAgKiB0elN0cmluZy5zbGljZSgxLCAzKSArIDEgKiB0elN0cmluZy5zbGljZSgzLCA1KSlcbiAgICB9XG4gIH1cblxuICBkYXRlLmRhdGVIYXNoID0gcGFkKGRhdGUueWVhciwgNikgKyAnLycgKyBwYWQoZGF0ZS5tb250aCkgKyAnLycgKyBwYWQoZGF0ZS5kYXkpXG4gIGRhdGUudGltZUhhc2ggPSBwYWQoZGF0ZS5ob3VyKSArICc6JyArIHBhZChkYXRlLm1pbnV0ZSkgKyAnOicgKyBwYWQoZGF0ZS5zZWNvbmQpICsgdHpTdHJpbmdcblxuICByZXR1cm4gZGF0ZVxufVxuXG5leHBvcnQgZnVuY3Rpb24gaXNWYWxpZCAoZGF0ZSkge1xuICByZXR1cm4gdHlwZW9mIGRhdGUgPT09ICdudW1iZXInXG4gICAgPyB0cnVlXG4gICAgOiBpc05hTihEYXRlLnBhcnNlKGRhdGUpKSA9PT0gZmFsc2Vcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGJ1aWxkRGF0ZSAobW9kLCB1dGMpIHtcbiAgcmV0dXJuIGFkanVzdERhdGUobmV3IERhdGUoKSwgbW9kLCB1dGMpXG59XG5cbmV4cG9ydCBmdW5jdGlvbiBnZXREYXlPZldlZWsgKGRhdGUpIHtcbiAgY29uc3QgZG93ID0gbmV3IERhdGUoZGF0ZSkuZ2V0RGF5KClcbiAgcmV0dXJuIGRvdyA9PT0gMCA/IDcgOiBkb3dcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGdldFdlZWtPZlllYXIgKGRhdGUpIHtcbiAgLy8gUmVtb3ZlIHRpbWUgY29tcG9uZW50cyBvZiBkYXRlXG4gIGNvbnN0IHRodXJzZGF5ID0gbmV3IERhdGUoZGF0ZS5nZXRGdWxsWWVhcigpLCBkYXRlLmdldE1vbnRoKCksIGRhdGUuZ2V0RGF0ZSgpKVxuXG4gIC8vIENoYW5nZSBkYXRlIHRvIFRodXJzZGF5IHNhbWUgd2Vla1xuICB0aHVyc2RheS5zZXREYXRlKHRodXJzZGF5LmdldERhdGUoKSAtICgodGh1cnNkYXkuZ2V0RGF5KCkgKyA2KSAlIDcpICsgMylcblxuICAvLyBUYWtlIEphbnVhcnkgNHRoIGFzIGl0IGlzIGFsd2F5cyBpbiB3ZWVrIDEgKHNlZSBJU08gODYwMSlcbiAgY29uc3QgZmlyc3RUaHVyc2RheSA9IG5ldyBEYXRlKHRodXJzZGF5LmdldEZ1bGxZZWFyKCksIDAsIDQpXG5cbiAgLy8gQ2hhbmdlIGRhdGUgdG8gVGh1cnNkYXkgc2FtZSB3ZWVrXG4gIGZpcnN0VGh1cnNkYXkuc2V0RGF0ZShmaXJzdFRodXJzZGF5LmdldERhdGUoKSAtICgoZmlyc3RUaHVyc2RheS5nZXREYXkoKSArIDYpICUgNykgKyAzKVxuXG4gIC8vIENoZWNrIGlmIGRheWxpZ2h0LXNhdmluZy10aW1lLXN3aXRjaCBvY2N1cnJlZCBhbmQgY29ycmVjdCBmb3IgaXRcbiAgY29uc3QgZHMgPSB0aHVyc2RheS5nZXRUaW1lem9uZU9mZnNldCgpIC0gZmlyc3RUaHVyc2RheS5nZXRUaW1lem9uZU9mZnNldCgpXG4gIHRodXJzZGF5LnNldEhvdXJzKHRodXJzZGF5LmdldEhvdXJzKCkgLSBkcylcblxuICAvLyBOdW1iZXIgb2Ygd2Vla3MgYmV0d2VlbiB0YXJnZXQgVGh1cnNkYXkgYW5kIGZpcnN0IFRodXJzZGF5XG4gIGNvbnN0IHdlZWtEaWZmID0gKHRodXJzZGF5IC0gZmlyc3RUaHVyc2RheSkgLyAoTUlMTElTRUNPTkRTX0lOX0RBWSAqIDcpXG4gIHJldHVybiAxICsgTWF0aC5mbG9vcih3ZWVrRGlmZilcbn1cblxuZnVuY3Rpb24gZ2V0RGF5SWRlbnRpZmllciAoZGF0ZSkge1xuICByZXR1cm4gZGF0ZS5nZXRGdWxsWWVhcigpICogMTAwMDAgKyBkYXRlLmdldE1vbnRoKCkgKiAxMDAgKyBkYXRlLmdldERhdGUoKVxufVxuXG5mdW5jdGlvbiBnZXREYXRlSWRlbnRpZmllciAoZGF0ZSwgb25seURhdGUgLyogPSBmYWxzZSAqLykge1xuICBjb25zdCBkID0gbmV3IERhdGUoZGF0ZSlcbiAgcmV0dXJuIG9ubHlEYXRlID09PSB0cnVlID8gZ2V0RGF5SWRlbnRpZmllcihkKSA6IGQuZ2V0VGltZSgpXG59XG5cbmV4cG9ydCBmdW5jdGlvbiBpc0JldHdlZW5EYXRlcyAoZGF0ZSwgZnJvbSwgdG8sIG9wdHMgPSB7fSkge1xuICBjb25zdFxuICAgIGQxID0gZ2V0RGF0ZUlkZW50aWZpZXIoZnJvbSwgb3B0cy5vbmx5RGF0ZSksXG4gICAgZDIgPSBnZXREYXRlSWRlbnRpZmllcih0bywgb3B0cy5vbmx5RGF0ZSksXG4gICAgY3VyID0gZ2V0RGF0ZUlkZW50aWZpZXIoZGF0ZSwgb3B0cy5vbmx5RGF0ZSlcblxuICByZXR1cm4gKGN1ciA+IGQxIHx8IChvcHRzLmluY2x1c2l2ZUZyb20gPT09IHRydWUgJiYgY3VyID09PSBkMSkpXG4gICAgJiYgKGN1ciA8IGQyIHx8IChvcHRzLmluY2x1c2l2ZVRvID09PSB0cnVlICYmIGN1ciA9PT0gZDIpKVxufVxuXG5leHBvcnQgZnVuY3Rpb24gYWRkVG9EYXRlIChkYXRlLCBtb2QpIHtcbiAgcmV0dXJuIGdldENoYW5nZShkYXRlLCBtb2QsIDEpXG59XG5leHBvcnQgZnVuY3Rpb24gc3VidHJhY3RGcm9tRGF0ZSAoZGF0ZSwgbW9kKSB7XG4gIHJldHVybiBnZXRDaGFuZ2UoZGF0ZSwgbW9kLCAtMSlcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIHN0YXJ0T2ZEYXRlIChkYXRlLCB1bml0LCB1dGMpIHtcbiAgY29uc3RcbiAgICB0ID0gbmV3IERhdGUoZGF0ZSksXG4gICAgcHJlZml4ID0gYHNldCR7IHV0YyA9PT0gdHJ1ZSA/ICdVVEMnIDogJycgfWBcblxuICBzd2l0Y2ggKHVuaXQpIHtcbiAgICBjYXNlICd5ZWFyJzpcbiAgICBjYXNlICd5ZWFycyc6XG4gICAgICB0WyBgJHsgcHJlZml4IH1Nb250aGAgXSgwKVxuICAgIGNhc2UgJ21vbnRoJzpcbiAgICBjYXNlICdtb250aHMnOlxuICAgICAgdFsgYCR7IHByZWZpeCB9RGF0ZWAgXSgxKVxuICAgIGNhc2UgJ2RheSc6XG4gICAgY2FzZSAnZGF5cyc6XG4gICAgY2FzZSAnZGF0ZSc6XG4gICAgICB0WyBgJHsgcHJlZml4IH1Ib3Vyc2AgXSgwKVxuICAgIGNhc2UgJ2hvdXInOlxuICAgIGNhc2UgJ2hvdXJzJzpcbiAgICAgIHRbIGAkeyBwcmVmaXggfU1pbnV0ZXNgIF0oMClcbiAgICBjYXNlICdtaW51dGUnOlxuICAgIGNhc2UgJ21pbnV0ZXMnOlxuICAgICAgdFsgYCR7IHByZWZpeCB9U2Vjb25kc2AgXSgwKVxuICAgIGNhc2UgJ3NlY29uZCc6XG4gICAgY2FzZSAnc2Vjb25kcyc6XG4gICAgICB0WyBgJHsgcHJlZml4IH1NaWxsaXNlY29uZHNgIF0oMClcbiAgfVxuICByZXR1cm4gdFxufVxuXG5leHBvcnQgZnVuY3Rpb24gZW5kT2ZEYXRlIChkYXRlLCB1bml0LCB1dGMpIHtcbiAgY29uc3RcbiAgICB0ID0gbmV3IERhdGUoZGF0ZSksXG4gICAgcHJlZml4ID0gYHNldCR7IHV0YyA9PT0gdHJ1ZSA/ICdVVEMnIDogJycgfWBcblxuICBzd2l0Y2ggKHVuaXQpIHtcbiAgICBjYXNlICd5ZWFyJzpcbiAgICBjYXNlICd5ZWFycyc6XG4gICAgICB0WyBgJHsgcHJlZml4IH1Nb250aGAgXSgxMSlcbiAgICBjYXNlICdtb250aCc6XG4gICAgY2FzZSAnbW9udGhzJzpcbiAgICAgIHRbIGAkeyBwcmVmaXggfURhdGVgIF0oZGF5c0luTW9udGgodCkpXG4gICAgY2FzZSAnZGF5JzpcbiAgICBjYXNlICdkYXlzJzpcbiAgICBjYXNlICdkYXRlJzpcbiAgICAgIHRbIGAkeyBwcmVmaXggfUhvdXJzYCBdKDIzKVxuICAgIGNhc2UgJ2hvdXInOlxuICAgIGNhc2UgJ2hvdXJzJzpcbiAgICAgIHRbIGAkeyBwcmVmaXggfU1pbnV0ZXNgIF0oNTkpXG4gICAgY2FzZSAnbWludXRlJzpcbiAgICBjYXNlICdtaW51dGVzJzpcbiAgICAgIHRbIGAkeyBwcmVmaXggfVNlY29uZHNgIF0oNTkpXG4gICAgY2FzZSAnc2Vjb25kJzpcbiAgICBjYXNlICdzZWNvbmRzJzpcbiAgICAgIHRbIGAkeyBwcmVmaXggfU1pbGxpc2Vjb25kc2AgXSg5OTkpXG4gIH1cbiAgcmV0dXJuIHRcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGdldE1heERhdGUgKGRhdGUgLyogLCAuLi5hcmdzICovKSB7XG4gIGxldCB0ID0gbmV3IERhdGUoZGF0ZSlcbiAgQXJyYXkucHJvdG90eXBlLnNsaWNlLmNhbGwoYXJndW1lbnRzLCAxKS5mb3JFYWNoKGQgPT4ge1xuICAgIHQgPSBNYXRoLm1heCh0LCBuZXcgRGF0ZShkKSlcbiAgfSlcbiAgcmV0dXJuIHRcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGdldE1pbkRhdGUgKGRhdGUgLyosIC4uLmFyZ3MgKi8pIHtcbiAgbGV0IHQgPSBuZXcgRGF0ZShkYXRlKVxuICBBcnJheS5wcm90b3R5cGUuc2xpY2UuY2FsbChhcmd1bWVudHMsIDEpLmZvckVhY2goZCA9PiB7XG4gICAgdCA9IE1hdGgubWluKHQsIG5ldyBEYXRlKGQpKVxuICB9KVxuICByZXR1cm4gdFxufVxuXG5mdW5jdGlvbiBnZXREaWZmICh0LCBzdWIsIGludGVydmFsKSB7XG4gIHJldHVybiAoXG4gICAgKHQuZ2V0VGltZSgpIC0gdC5nZXRUaW1lem9uZU9mZnNldCgpICogTUlMTElTRUNPTkRTX0lOX01JTlVURSlcbiAgICAtIChzdWIuZ2V0VGltZSgpIC0gc3ViLmdldFRpbWV6b25lT2Zmc2V0KCkgKiBNSUxMSVNFQ09ORFNfSU5fTUlOVVRFKVxuICApIC8gaW50ZXJ2YWxcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGdldERhdGVEaWZmIChkYXRlLCBzdWJ0cmFjdCwgdW5pdCA9ICdkYXlzJykge1xuICBjb25zdFxuICAgIHQgPSBuZXcgRGF0ZShkYXRlKSxcbiAgICBzdWIgPSBuZXcgRGF0ZShzdWJ0cmFjdClcblxuICBzd2l0Y2ggKHVuaXQpIHtcbiAgICBjYXNlICd5ZWFycyc6XG4gICAgY2FzZSAneWVhcic6XG4gICAgICByZXR1cm4gKHQuZ2V0RnVsbFllYXIoKSAtIHN1Yi5nZXRGdWxsWWVhcigpKVxuXG4gICAgY2FzZSAnbW9udGhzJzpcbiAgICBjYXNlICdtb250aCc6XG4gICAgICByZXR1cm4gKHQuZ2V0RnVsbFllYXIoKSAtIHN1Yi5nZXRGdWxsWWVhcigpKSAqIDEyICsgdC5nZXRNb250aCgpIC0gc3ViLmdldE1vbnRoKClcblxuICAgIGNhc2UgJ2RheXMnOlxuICAgIGNhc2UgJ2RheSc6XG4gICAgY2FzZSAnZGF0ZSc6XG4gICAgICByZXR1cm4gZ2V0RGlmZihzdGFydE9mRGF0ZSh0LCAnZGF5JyksIHN0YXJ0T2ZEYXRlKHN1YiwgJ2RheScpLCBNSUxMSVNFQ09ORFNfSU5fREFZKVxuXG4gICAgY2FzZSAnaG91cnMnOlxuICAgIGNhc2UgJ2hvdXInOlxuICAgICAgcmV0dXJuIGdldERpZmYoc3RhcnRPZkRhdGUodCwgJ2hvdXInKSwgc3RhcnRPZkRhdGUoc3ViLCAnaG91cicpLCBNSUxMSVNFQ09ORFNfSU5fSE9VUilcblxuICAgIGNhc2UgJ21pbnV0ZXMnOlxuICAgIGNhc2UgJ21pbnV0ZSc6XG4gICAgICByZXR1cm4gZ2V0RGlmZihzdGFydE9mRGF0ZSh0LCAnbWludXRlJyksIHN0YXJ0T2ZEYXRlKHN1YiwgJ21pbnV0ZScpLCBNSUxMSVNFQ09ORFNfSU5fTUlOVVRFKVxuXG4gICAgY2FzZSAnc2Vjb25kcyc6XG4gICAgY2FzZSAnc2Vjb25kJzpcbiAgICAgIHJldHVybiBnZXREaWZmKHN0YXJ0T2ZEYXRlKHQsICdzZWNvbmQnKSwgc3RhcnRPZkRhdGUoc3ViLCAnc2Vjb25kJyksIDEwMDApXG4gIH1cbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGdldERheU9mWWVhciAoZGF0ZSkge1xuICByZXR1cm4gZ2V0RGF0ZURpZmYoZGF0ZSwgc3RhcnRPZkRhdGUoZGF0ZSwgJ3llYXInKSwgJ2RheXMnKSArIDFcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGluZmVyRGF0ZUZvcm1hdCAoZGF0ZSkge1xuICByZXR1cm4gaXNEYXRlKGRhdGUpID09PSB0cnVlXG4gICAgPyAnZGF0ZSdcbiAgICA6ICh0eXBlb2YgZGF0ZSA9PT0gJ251bWJlcicgPyAnbnVtYmVyJyA6ICdzdHJpbmcnKVxufVxuXG5leHBvcnQgZnVuY3Rpb24gZ2V0RGF0ZUJldHdlZW4gKGRhdGUsIG1pbiwgbWF4KSB7XG4gIGNvbnN0IHQgPSBuZXcgRGF0ZShkYXRlKVxuXG4gIGlmIChtaW4pIHtcbiAgICBjb25zdCBsb3cgPSBuZXcgRGF0ZShtaW4pXG4gICAgaWYgKHQgPCBsb3cpIHtcbiAgICAgIHJldHVybiBsb3dcbiAgICB9XG4gIH1cblxuICBpZiAobWF4KSB7XG4gICAgY29uc3QgaGlnaCA9IG5ldyBEYXRlKG1heClcbiAgICBpZiAodCA+IGhpZ2gpIHtcbiAgICAgIHJldHVybiBoaWdoXG4gICAgfVxuICB9XG5cbiAgcmV0dXJuIHRcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGlzU2FtZURhdGUgKGRhdGUsIGRhdGUyLCB1bml0KSB7XG4gIGNvbnN0XG4gICAgdCA9IG5ldyBEYXRlKGRhdGUpLFxuICAgIGQgPSBuZXcgRGF0ZShkYXRlMilcblxuICBpZiAodW5pdCA9PT0gdm9pZCAwKSB7XG4gICAgcmV0dXJuIHQuZ2V0VGltZSgpID09PSBkLmdldFRpbWUoKVxuICB9XG5cbiAgc3dpdGNoICh1bml0KSB7XG4gICAgY2FzZSAnc2Vjb25kJzpcbiAgICBjYXNlICdzZWNvbmRzJzpcbiAgICAgIGlmICh0LmdldFNlY29uZHMoKSAhPT0gZC5nZXRTZWNvbmRzKCkpIHtcbiAgICAgICAgcmV0dXJuIGZhbHNlXG4gICAgICB9XG4gICAgY2FzZSAnbWludXRlJzogLy8gaW50ZW50aW9uYWwgZmFsbC10aHJvdWdoXG4gICAgY2FzZSAnbWludXRlcyc6XG4gICAgICBpZiAodC5nZXRNaW51dGVzKCkgIT09IGQuZ2V0TWludXRlcygpKSB7XG4gICAgICAgIHJldHVybiBmYWxzZVxuICAgICAgfVxuICAgIGNhc2UgJ2hvdXInOiAvLyBpbnRlbnRpb25hbCBmYWxsLXRocm91Z2hcbiAgICBjYXNlICdob3Vycyc6XG4gICAgICBpZiAodC5nZXRIb3VycygpICE9PSBkLmdldEhvdXJzKCkpIHtcbiAgICAgICAgcmV0dXJuIGZhbHNlXG4gICAgICB9XG4gICAgY2FzZSAnZGF5JzogLy8gaW50ZW50aW9uYWwgZmFsbC10aHJvdWdoXG4gICAgY2FzZSAnZGF5cyc6XG4gICAgY2FzZSAnZGF0ZSc6XG4gICAgICBpZiAodC5nZXREYXRlKCkgIT09IGQuZ2V0RGF0ZSgpKSB7XG4gICAgICAgIHJldHVybiBmYWxzZVxuICAgICAgfVxuICAgIGNhc2UgJ21vbnRoJzogLy8gaW50ZW50aW9uYWwgZmFsbC10aHJvdWdoXG4gICAgY2FzZSAnbW9udGhzJzpcbiAgICAgIGlmICh0LmdldE1vbnRoKCkgIT09IGQuZ2V0TW9udGgoKSkge1xuICAgICAgICByZXR1cm4gZmFsc2VcbiAgICAgIH1cbiAgICBjYXNlICd5ZWFyJzogLy8gaW50ZW50aW9uYWwgZmFsbC10aHJvdWdoXG4gICAgY2FzZSAneWVhcnMnOlxuICAgICAgaWYgKHQuZ2V0RnVsbFllYXIoKSAhPT0gZC5nZXRGdWxsWWVhcigpKSB7XG4gICAgICAgIHJldHVybiBmYWxzZVxuICAgICAgfVxuICAgICAgYnJlYWtcbiAgICBkZWZhdWx0OlxuICAgICAgdGhyb3cgbmV3IEVycm9yKGBkYXRlIGlzU2FtZURhdGUgdW5rbm93biB1bml0ICR7IHVuaXQgfWApXG4gIH1cblxuICByZXR1cm4gdHJ1ZVxufVxuXG5leHBvcnQgZnVuY3Rpb24gZGF5c0luTW9udGggKGRhdGUpIHtcbiAgcmV0dXJuIChuZXcgRGF0ZShkYXRlLmdldEZ1bGxZZWFyKCksIGRhdGUuZ2V0TW9udGgoKSArIDEsIDApKS5nZXREYXRlKClcbn1cblxuZnVuY3Rpb24gZ2V0T3JkaW5hbCAobikge1xuICBpZiAobiA+PSAxMSAmJiBuIDw9IDEzKSB7XG4gICAgcmV0dXJuIGAkeyBuIH10aGBcbiAgfVxuICBzd2l0Y2ggKG4gJSAxMCkge1xuICAgIGNhc2UgMTogcmV0dXJuIGAkeyBuIH1zdGBcbiAgICBjYXNlIDI6IHJldHVybiBgJHsgbiB9bmRgXG4gICAgY2FzZSAzOiByZXR1cm4gYCR7IG4gfXJkYFxuICB9XG4gIHJldHVybiBgJHsgbiB9dGhgXG59XG5cbmNvbnN0IGZvcm1hdHRlciA9IHtcbiAgLy8gWWVhcjogMDAsIDAxLCAuLi4sIDk5XG4gIFlZIChkYXRlLCBkYXRlTG9jYWxlLCBmb3JjZWRZZWFyKSB7XG4gICAgLy8gd29ya2Fyb3VuZCBmb3IgPCAxOTAwIHdpdGggbmV3IERhdGUoKVxuICAgIGNvbnN0IHkgPSB0aGlzLllZWVkoZGF0ZSwgZGF0ZUxvY2FsZSwgZm9yY2VkWWVhcikgJSAxMDBcbiAgICByZXR1cm4geSA+PSAwXG4gICAgICA/IHBhZCh5KVxuICAgICAgOiAnLScgKyBwYWQoTWF0aC5hYnMoeSkpXG4gIH0sXG5cbiAgLy8gWWVhcjogMTkwMCwgMTkwMSwgLi4uLCAyMDk5XG4gIFlZWVkgKGRhdGUsIF9kYXRlTG9jYWxlLCBmb3JjZWRZZWFyKSB7XG4gICAgLy8gd29ya2Fyb3VuZCBmb3IgPCAxOTAwIHdpdGggbmV3IERhdGUoKVxuICAgIHJldHVybiBmb3JjZWRZZWFyICE9PSB2b2lkIDAgJiYgZm9yY2VkWWVhciAhPT0gbnVsbFxuICAgICAgPyBmb3JjZWRZZWFyXG4gICAgICA6IGRhdGUuZ2V0RnVsbFllYXIoKVxuICB9LFxuXG4gIC8vIE1vbnRoOiAxLCAyLCAuLi4sIDEyXG4gIE0gKGRhdGUpIHtcbiAgICByZXR1cm4gZGF0ZS5nZXRNb250aCgpICsgMVxuICB9LFxuXG4gIC8vIE1vbnRoOiAwMSwgMDIsIC4uLiwgMTJcbiAgTU0gKGRhdGUpIHtcbiAgICByZXR1cm4gcGFkKGRhdGUuZ2V0TW9udGgoKSArIDEpXG4gIH0sXG5cbiAgLy8gTW9udGggU2hvcnQgTmFtZTogSmFuLCBGZWIsIC4uLlxuICBNTU0gKGRhdGUsIGRhdGVMb2NhbGUpIHtcbiAgICByZXR1cm4gZGF0ZUxvY2FsZS5tb250aHNTaG9ydFsgZGF0ZS5nZXRNb250aCgpIF1cbiAgfSxcblxuICAvLyBNb250aCBOYW1lOiBKYW51YXJ5LCBGZWJydWFyeSwgLi4uXG4gIE1NTU0gKGRhdGUsIGRhdGVMb2NhbGUpIHtcbiAgICByZXR1cm4gZGF0ZUxvY2FsZS5tb250aHNbIGRhdGUuZ2V0TW9udGgoKSBdXG4gIH0sXG5cbiAgLy8gUXVhcnRlcjogMSwgMiwgMywgNFxuICBRIChkYXRlKSB7XG4gICAgcmV0dXJuIE1hdGguY2VpbCgoZGF0ZS5nZXRNb250aCgpICsgMSkgLyAzKVxuICB9LFxuXG4gIC8vIFF1YXJ0ZXI6IDFzdCwgMm5kLCAzcmQsIDR0aFxuICBRbyAoZGF0ZSkge1xuICAgIHJldHVybiBnZXRPcmRpbmFsKHRoaXMuUShkYXRlKSlcbiAgfSxcblxuICAvLyBEYXkgb2YgbW9udGg6IDEsIDIsIC4uLiwgMzFcbiAgRCAoZGF0ZSkge1xuICAgIHJldHVybiBkYXRlLmdldERhdGUoKVxuICB9LFxuXG4gIC8vIERheSBvZiBtb250aDogMXN0LCAybmQsIC4uLiwgMzFzdFxuICBEbyAoZGF0ZSkge1xuICAgIHJldHVybiBnZXRPcmRpbmFsKGRhdGUuZ2V0RGF0ZSgpKVxuICB9LFxuXG4gIC8vIERheSBvZiBtb250aDogMDEsIDAyLCAuLi4sIDMxXG4gIEREIChkYXRlKSB7XG4gICAgcmV0dXJuIHBhZChkYXRlLmdldERhdGUoKSlcbiAgfSxcblxuICAvLyBEYXkgb2YgeWVhcjogMSwgMiwgLi4uLCAzNjZcbiAgREREIChkYXRlKSB7XG4gICAgcmV0dXJuIGdldERheU9mWWVhcihkYXRlKVxuICB9LFxuXG4gIC8vIERheSBvZiB5ZWFyOiAwMDEsIDAwMiwgLi4uLCAzNjZcbiAgRERERCAoZGF0ZSkge1xuICAgIHJldHVybiBwYWQoZ2V0RGF5T2ZZZWFyKGRhdGUpLCAzKVxuICB9LFxuXG4gIC8vIERheSBvZiB3ZWVrOiAwLCAxLCAuLi4sIDZcbiAgZCAoZGF0ZSkge1xuICAgIHJldHVybiBkYXRlLmdldERheSgpXG4gIH0sXG5cbiAgLy8gRGF5IG9mIHdlZWs6IFN1LCBNbywgLi4uXG4gIGRkIChkYXRlLCBkYXRlTG9jYWxlKSB7XG4gICAgcmV0dXJuIHRoaXMuZGRkZChkYXRlLCBkYXRlTG9jYWxlKS5zbGljZSgwLCAyKVxuICB9LFxuXG4gIC8vIERheSBvZiB3ZWVrOiBTdW4sIE1vbiwgLi4uXG4gIGRkZCAoZGF0ZSwgZGF0ZUxvY2FsZSkge1xuICAgIHJldHVybiBkYXRlTG9jYWxlLmRheXNTaG9ydFsgZGF0ZS5nZXREYXkoKSBdXG4gIH0sXG5cbiAgLy8gRGF5IG9mIHdlZWs6IFN1bmRheSwgTW9uZGF5LCAuLi5cbiAgZGRkZCAoZGF0ZSwgZGF0ZUxvY2FsZSkge1xuICAgIHJldHVybiBkYXRlTG9jYWxlLmRheXNbIGRhdGUuZ2V0RGF5KCkgXVxuICB9LFxuXG4gIC8vIERheSBvZiBJU08gd2VlazogMSwgMiwgLi4uLCA3XG4gIEUgKGRhdGUpIHtcbiAgICByZXR1cm4gZGF0ZS5nZXREYXkoKSB8fCA3XG4gIH0sXG5cbiAgLy8gV2VlayBvZiBZZWFyOiAxIDIgLi4uIDUyIDUzXG4gIHcgKGRhdGUpIHtcbiAgICByZXR1cm4gZ2V0V2Vla09mWWVhcihkYXRlKVxuICB9LFxuXG4gIC8vIFdlZWsgb2YgWWVhcjogMDEgMDIgLi4uIDUyIDUzXG4gIHd3IChkYXRlKSB7XG4gICAgcmV0dXJuIHBhZChnZXRXZWVrT2ZZZWFyKGRhdGUpKVxuICB9LFxuXG4gIC8vIEhvdXI6IDAsIDEsIC4uLiAyM1xuICBIIChkYXRlKSB7XG4gICAgcmV0dXJuIGRhdGUuZ2V0SG91cnMoKVxuICB9LFxuXG4gIC8vIEhvdXI6IDAwLCAwMSwgLi4uLCAyM1xuICBISCAoZGF0ZSkge1xuICAgIHJldHVybiBwYWQoZGF0ZS5nZXRIb3VycygpKVxuICB9LFxuXG4gIC8vIEhvdXI6IDEsIDIsIC4uLiwgMTJcbiAgaCAoZGF0ZSkge1xuICAgIGNvbnN0IGhvdXJzID0gZGF0ZS5nZXRIb3VycygpXG4gICAgcmV0dXJuIGhvdXJzID09PSAwXG4gICAgICA/IDEyXG4gICAgICA6IChob3VycyA+IDEyID8gaG91cnMgJSAxMiA6IGhvdXJzKVxuICB9LFxuXG4gIC8vIEhvdXI6IDAxLCAwMiwgLi4uLCAxMlxuICBoaCAoZGF0ZSkge1xuICAgIHJldHVybiBwYWQodGhpcy5oKGRhdGUpKVxuICB9LFxuXG4gIC8vIE1pbnV0ZTogMCwgMSwgLi4uLCA1OVxuICBtIChkYXRlKSB7XG4gICAgcmV0dXJuIGRhdGUuZ2V0TWludXRlcygpXG4gIH0sXG5cbiAgLy8gTWludXRlOiAwMCwgMDEsIC4uLiwgNTlcbiAgbW0gKGRhdGUpIHtcbiAgICByZXR1cm4gcGFkKGRhdGUuZ2V0TWludXRlcygpKVxuICB9LFxuXG4gIC8vIFNlY29uZDogMCwgMSwgLi4uLCA1OVxuICBzIChkYXRlKSB7XG4gICAgcmV0dXJuIGRhdGUuZ2V0U2Vjb25kcygpXG4gIH0sXG5cbiAgLy8gU2Vjb25kOiAwMCwgMDEsIC4uLiwgNTlcbiAgc3MgKGRhdGUpIHtcbiAgICByZXR1cm4gcGFkKGRhdGUuZ2V0U2Vjb25kcygpKVxuICB9LFxuXG4gIC8vIDEvMTAgb2Ygc2Vjb25kOiAwLCAxLCAuLi4sIDlcbiAgUyAoZGF0ZSkge1xuICAgIHJldHVybiBNYXRoLmZsb29yKGRhdGUuZ2V0TWlsbGlzZWNvbmRzKCkgLyAxMDApXG4gIH0sXG5cbiAgLy8gMS8xMDAgb2Ygc2Vjb25kOiAwMCwgMDEsIC4uLiwgOTlcbiAgU1MgKGRhdGUpIHtcbiAgICByZXR1cm4gcGFkKE1hdGguZmxvb3IoZGF0ZS5nZXRNaWxsaXNlY29uZHMoKSAvIDEwKSlcbiAgfSxcblxuICAvLyBNaWxsaXNlY29uZDogMDAwLCAwMDEsIC4uLiwgOTk5XG4gIFNTUyAoZGF0ZSkge1xuICAgIHJldHVybiBwYWQoZGF0ZS5nZXRNaWxsaXNlY29uZHMoKSwgMylcbiAgfSxcblxuICAvLyBNZXJpZGllbTogQU0sIFBNXG4gIEEgKGRhdGUpIHtcbiAgICByZXR1cm4gdGhpcy5IKGRhdGUpIDwgMTIgPyAnQU0nIDogJ1BNJ1xuICB9LFxuXG4gIC8vIE1lcmlkaWVtOiBhbSwgcG1cbiAgYSAoZGF0ZSkge1xuICAgIHJldHVybiB0aGlzLkgoZGF0ZSkgPCAxMiA/ICdhbScgOiAncG0nXG4gIH0sXG5cbiAgLy8gTWVyaWRpZW06IGEubS4sIHAubS5cbiAgYWEgKGRhdGUpIHtcbiAgICByZXR1cm4gdGhpcy5IKGRhdGUpIDwgMTIgPyAnYS5tLicgOiAncC5tLidcbiAgfSxcblxuICAvLyBUaW1lem9uZTogLTAxOjAwLCArMDA6MDAsIC4uLiArMTI6MDBcbiAgWiAoZGF0ZSwgX2RhdGVMb2NhbGUsIF9mb3JjZWRZZWFyLCBmb3JjZWRUaW1lem9uZU9mZnNldCkge1xuICAgIGNvbnN0IHR6T2Zmc2V0ID0gZm9yY2VkVGltZXpvbmVPZmZzZXQgPT09IHZvaWQgMCB8fCBmb3JjZWRUaW1lem9uZU9mZnNldCA9PT0gbnVsbFxuICAgICAgPyBkYXRlLmdldFRpbWV6b25lT2Zmc2V0KClcbiAgICAgIDogZm9yY2VkVGltZXpvbmVPZmZzZXRcblxuICAgIHJldHVybiBmb3JtYXRUaW1lem9uZSh0ek9mZnNldCwgJzonKVxuICB9LFxuXG4gIC8vIFRpbWV6b25lOiAtMDEwMCwgKzAwMDAsIC4uLiArMTIwMFxuICBaWiAoZGF0ZSwgX2RhdGVMb2NhbGUsIF9mb3JjZWRZZWFyLCBmb3JjZWRUaW1lem9uZU9mZnNldCkge1xuICAgIGNvbnN0IHR6T2Zmc2V0ID0gZm9yY2VkVGltZXpvbmVPZmZzZXQgPT09IHZvaWQgMCB8fCBmb3JjZWRUaW1lem9uZU9mZnNldCA9PT0gbnVsbFxuICAgICAgPyBkYXRlLmdldFRpbWV6b25lT2Zmc2V0KClcbiAgICAgIDogZm9yY2VkVGltZXpvbmVPZmZzZXRcblxuICAgIHJldHVybiBmb3JtYXRUaW1lem9uZSh0ek9mZnNldClcbiAgfSxcblxuICAvLyBTZWNvbmRzIHRpbWVzdGFtcDogNTEyOTY5NTIwXG4gIFggKGRhdGUpIHtcbiAgICByZXR1cm4gTWF0aC5mbG9vcihkYXRlLmdldFRpbWUoKSAvIDEwMDApXG4gIH0sXG5cbiAgLy8gTWlsbGlzZWNvbmRzIHRpbWVzdGFtcDogNTEyOTY5NTIwOTAwXG4gIHggKGRhdGUpIHtcbiAgICByZXR1cm4gZGF0ZS5nZXRUaW1lKClcbiAgfVxufVxuXG5leHBvcnQgZnVuY3Rpb24gZm9ybWF0RGF0ZSAodmFsLCBtYXNrLCBkYXRlTG9jYWxlLCBfX2ZvcmNlZFllYXIsIF9fZm9yY2VkVGltZXpvbmVPZmZzZXQpIHtcbiAgaWYgKFxuICAgICh2YWwgIT09IDAgJiYgIXZhbClcbiAgICB8fCB2YWwgPT09IEluZmluaXR5XG4gICAgfHwgdmFsID09PSAtSW5maW5pdHlcbiAgKSB7XG4gICAgcmV0dXJuXG4gIH1cblxuICBjb25zdCBkYXRlID0gbmV3IERhdGUodmFsKVxuXG4gIGlmIChpc05hTihkYXRlKSkge1xuICAgIHJldHVyblxuICB9XG5cbiAgaWYgKG1hc2sgPT09IHZvaWQgMCkge1xuICAgIG1hc2sgPSBkZWZhdWx0TWFza1xuICB9XG5cbiAgY29uc3QgbG9jYWxlID0gZ2V0RGF0ZUxvY2FsZShkYXRlTG9jYWxlLCBsYW5nLnByb3BzKVxuXG4gIHJldHVybiBtYXNrLnJlcGxhY2UoXG4gICAgdG9rZW4sXG4gICAgKG1hdGNoLCB0ZXh0KSA9PiAoXG4gICAgICBtYXRjaCBpbiBmb3JtYXR0ZXJcbiAgICAgICAgPyBmb3JtYXR0ZXJbIG1hdGNoIF0oZGF0ZSwgbG9jYWxlLCBfX2ZvcmNlZFllYXIsIF9fZm9yY2VkVGltZXpvbmVPZmZzZXQpXG4gICAgICAgIDogKHRleHQgPT09IHZvaWQgMCA/IG1hdGNoIDogdGV4dC5zcGxpdCgnXFxcXF0nKS5qb2luKCddJykpXG4gICAgKVxuICApXG59XG5cbmV4cG9ydCBmdW5jdGlvbiBjbG9uZSAoZGF0ZSkge1xuICByZXR1cm4gaXNEYXRlKGRhdGUpID09PSB0cnVlXG4gICAgPyBuZXcgRGF0ZShkYXRlLmdldFRpbWUoKSlcbiAgICA6IGRhdGVcbn1cblxuZXhwb3J0IGRlZmF1bHQge1xuICBpc1ZhbGlkLFxuICBleHRyYWN0RGF0ZSxcbiAgYnVpbGREYXRlLFxuICBnZXREYXlPZldlZWssXG4gIGdldFdlZWtPZlllYXIsXG4gIGlzQmV0d2VlbkRhdGVzLFxuICBhZGRUb0RhdGUsXG4gIHN1YnRyYWN0RnJvbURhdGUsXG4gIGFkanVzdERhdGUsXG4gIHN0YXJ0T2ZEYXRlLFxuICBlbmRPZkRhdGUsXG4gIGdldE1heERhdGUsXG4gIGdldE1pbkRhdGUsXG4gIGdldERhdGVEaWZmLFxuICBnZXREYXlPZlllYXIsXG4gIGluZmVyRGF0ZUZvcm1hdCxcbiAgZ2V0RGF0ZUJldHdlZW4sXG4gIGlzU2FtZURhdGUsXG4gIGRheXNJbk1vbnRoLFxuICBmb3JtYXREYXRlLFxuICBjbG9uZVxufVxuIiwiZnVuY3Rpb24gY2xlYW4gKGxpbmspIHtcbiAgLy8gYWxsb3cgdGltZSBmb3IgaU9TXG4gIHNldFRpbWVvdXQoKCkgPT4ge1xuICAgIHdpbmRvdy5VUkwucmV2b2tlT2JqZWN0VVJMKGxpbmsuaHJlZilcbiAgfSwgMTAwMDApXG5cbiAgbGluay5yZW1vdmUoKVxufVxuXG4vKipcbiAqIEZvcmNlcyBicm93c2VyIHRvIGRvd25sb2FkIGZpbGUgd2l0aCBzcGVjaWZpZWQgY29udGVudFxuICpcbiAqIEBwYXJhbSB7Kn0gZmlsZU5hbWUgLSBTdHJpbmdcbiAqIEBwYXJhbSB7Kn0gcmF3RGF0YSAtIFN0cmluZyB8IEFycmF5QnVmZmVyIHwgQXJyYXlCdWZmZXJWaWV3IHwgQmxvYlxuICogQHBhcmFtIHsqfSBvcHRzIC0gU3RyaW5nIChtaW1lVHlwZSkgb3IgT2JqZWN0XG4gKiAgICAgICAgICAgICAgICAgICBPYmplY3QgZm9ybTogeyBtaW1lVHlwZT86IFN0cmluZywgYnl0ZU9yZGVyTWFyaz86IFN0cmluZyB8IFVpbnQ4QXJyYXksIGVuY29kaW5nPzogU3RyaW5nIH1cbiAqIEByZXR1cm5zIEJvb2xlYW4gfCBFcnJvclxuICpcbiAqIG1pbWVUeXBlICAgICAgIC0gRXhhbXBsZXM6ICdhcHBsaWNhdGlvbi9vY3RlY3Qtc3RyZWFtJyAoZGVmYXVsdCksICd0ZXh0L3BsYWluJywgJ2FwcGxpY2F0aW9uL2pzb24nLFxuICogICAgICAgICAgICAgICAgICAndGV4dC9wbGFpbjtjaGFyc2V0PVVURi04JywgJ3ZpZGVvL21wNCcsICdpbWFnZS9wbmcnLCAnYXBwbGljYXRpb24vcGRmJ1xuICogICAgICAgICAgICAgICAgICBodHRwczovL2RldmVsb3Blci5tb3ppbGxhLm9yZy9lbi1VUy9kb2NzL1dlYi9IVFRQL0Jhc2ljc19vZl9IVFRQL01JTUVfdHlwZXNcbiAqXG4gKiBieXRlT3JkZXJNYXJrICAtIChCT00pIEV4YW1wbGU6ICdcXHVGRUZGJ1xuICogICAgICAgICAgICAgICAgICBodHRwczovL2VuLndpa2lwZWRpYS5vcmcvd2lraS9CeXRlX29yZGVyX21hcmtcbiAqXG4gKiBlbmNvZGluZyAgICAgICAtIFBlcmZvcm1zIGEgVGV4dEVuY29kZXIuZW5jb2RlKCkgb3ZlciB0aGUgcmF3RGF0YTtcbiAqICAgICAgICAgICAgICAgICAgRXhhbXBsZTogJ3dpbmRvd3MtMTI1MicgKEFOU0ksIGEgc3Vic2V0IG9mIElTTy04ODU5LTEpXG4gKiAgICAgICAgICAgICAgICAgIGh0dHBzOi8vZGV2ZWxvcGVyLm1vemlsbGEub3JnL2VuLVVTL2RvY3MvV2ViL0FQSS9UZXh0RW5jb2RlclxuICovXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiAoZmlsZU5hbWUsIHJhd0RhdGEsIG9wdHMgPSB7fSkge1xuICBjb25zdCB7IG1pbWVUeXBlLCBieXRlT3JkZXJNYXJrLCBlbmNvZGluZyB9ID0gdHlwZW9mIG9wdHMgPT09ICdzdHJpbmcnXG4gICAgPyB7IG1pbWVUeXBlOiBvcHRzIH1cbiAgICA6IG9wdHNcblxuICBjb25zdCBkYXRhID0gZW5jb2RpbmcgIT09IHZvaWQgMFxuICAgID8gKG5ldyBUZXh0RW5jb2RlcihlbmNvZGluZykpLmVuY29kZShbIHJhd0RhdGEgXSlcbiAgICA6IHJhd0RhdGFcblxuICBjb25zdCBibG9iRGF0YSA9IGJ5dGVPcmRlck1hcmsgIT09IHZvaWQgMCA/IFsgYnl0ZU9yZGVyTWFyaywgZGF0YSBdIDogWyBkYXRhIF1cbiAgY29uc3QgYmxvYiA9IG5ldyBCbG9iKGJsb2JEYXRhLCB7IHR5cGU6IG1pbWVUeXBlIHx8ICdhcHBsaWNhdGlvbi9vY3RldC1zdHJlYW0nIH0pXG4gIGNvbnN0IGxpbmsgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdhJylcblxuICBsaW5rLmhyZWYgPSB3aW5kb3cuVVJMLmNyZWF0ZU9iamVjdFVSTChibG9iKVxuICBsaW5rLnNldEF0dHJpYnV0ZSgnZG93bmxvYWQnLCBmaWxlTmFtZSlcblxuICAvLyBDaGVjayBmb3IgXCJkb3dubG9hZFwiIGF0dHJpYnV0ZSBzdXBwb3J0O1xuICAvLyBJZiBub3Qgc3VwcG9ydGVkLCBvcGVuIHRoaXMgaW4gbmV3IHdpbmRvd1xuICBpZiAodHlwZW9mIGxpbmsuZG93bmxvYWQgPT09ICd1bmRlZmluZWQnKSB7XG4gICAgbGluay5zZXRBdHRyaWJ1dGUoJ3RhcmdldCcsICdfYmxhbmsnKVxuICB9XG5cbiAgbGluay5jbGFzc0xpc3QuYWRkKCdoaWRkZW4nKVxuICBsaW5rLnN0eWxlLnBvc2l0aW9uID0gJ2ZpeGVkJyAvLyBhdm9pZCBzY3JvbGxpbmcgdG8gYm90dG9tXG4gIGRvY3VtZW50LmJvZHkuYXBwZW5kQ2hpbGQobGluaylcblxuICB0cnkge1xuICAgIGxpbmsuY2xpY2soKVxuICAgIGNsZWFuKGxpbmspXG4gICAgcmV0dXJuIHRydWVcbiAgfVxuICBjYXRjaCAoZXJyKSB7XG4gICAgY2xlYW4obGluaylcbiAgICByZXR1cm4gZXJyXG4gIH1cbn1cbiIsImltcG9ydCBQbGF0Zm9ybSBmcm9tICcuLi9wbHVnaW5zL1BsYXRmb3JtLmpzJ1xuXG5pbXBvcnQgeyBub29wIH0gZnJvbSAnLi4vdXRpbHMvZXZlbnQuanMnXG5cbmZ1bmN0aW9uIHBhcnNlRmVhdHVyZXMgKHdpbkZlYXR1cmVzKSB7XG4gIGNvbnN0IGNmZyA9IE9iamVjdC5hc3NpZ24oeyBub29wZW5lcjogdHJ1ZSB9LCB3aW5GZWF0dXJlcylcbiAgY29uc3QgZmVhdCA9IFtdXG4gIGZvciAoY29uc3Qga2V5IGluIGNmZykge1xuICAgIGlmIChjZmdbIGtleSBdID09PSB0cnVlKSB7XG4gICAgICBmZWF0LnB1c2goa2V5KVxuICAgIH1cbiAgfVxuICByZXR1cm4gZmVhdC5qb2luKCcsJylcbn1cblxuZnVuY3Rpb24gb3BlbldpbmRvdyAodXJsLCByZWplY3QsIHdpbmRvd0ZlYXR1cmVzKSB7XG4gIGxldCBvcGVuID0gd2luZG93Lm9wZW5cblxuICBpZiAoUGxhdGZvcm0uaXMuY29yZG92YSA9PT0gdHJ1ZSkge1xuICAgIGlmIChjb3Jkb3ZhICE9PSB2b2lkIDAgJiYgY29yZG92YS5JbkFwcEJyb3dzZXIgIT09IHZvaWQgMCAmJiBjb3Jkb3ZhLkluQXBwQnJvd3Nlci5vcGVuICE9PSB2b2lkIDApIHtcbiAgICAgIG9wZW4gPSBjb3Jkb3ZhLkluQXBwQnJvd3Nlci5vcGVuXG4gICAgfVxuICAgIGVsc2UgaWYgKG5hdmlnYXRvciAhPT0gdm9pZCAwICYmIG5hdmlnYXRvci5hcHAgIT09IHZvaWQgMCkge1xuICAgICAgcmV0dXJuIG5hdmlnYXRvci5hcHAubG9hZFVybCh1cmwsIHtcbiAgICAgICAgb3BlbkV4dGVybmFsOiB0cnVlXG4gICAgICB9KVxuICAgIH1cbiAgfVxuXG4gIGNvbnN0IHdpbiA9IG9wZW4odXJsLCAnX2JsYW5rJywgcGFyc2VGZWF0dXJlcyh3aW5kb3dGZWF0dXJlcykpXG5cbiAgaWYgKHdpbikge1xuICAgIFBsYXRmb3JtLmlzLmRlc2t0b3AgJiYgd2luLmZvY3VzKClcbiAgICByZXR1cm4gd2luXG4gIH1cbiAgZWxzZSB7XG4gICAgcmVqZWN0ICYmIHJlamVjdCgpXG4gIH1cbn1cblxuZXhwb3J0IGRlZmF1bHQgKHVybCwgcmVqZWN0LCB3aW5kb3dGZWF0dXJlcykgPT4ge1xuICBpZiAoXG4gICAgUGxhdGZvcm0uaXMuaW9zID09PSB0cnVlXG4gICAgJiYgd2luZG93LlNhZmFyaVZpZXdDb250cm9sbGVyICE9PSB2b2lkIDBcbiAgKSB7XG4gICAgd2luZG93LlNhZmFyaVZpZXdDb250cm9sbGVyLmlzQXZhaWxhYmxlKGF2YWlsYWJsZSA9PiB7XG4gICAgICBpZiAoYXZhaWxhYmxlKSB7XG4gICAgICAgIHdpbmRvdy5TYWZhcmlWaWV3Q29udHJvbGxlci5zaG93KFxuICAgICAgICAgIHsgdXJsIH0sXG4gICAgICAgICAgbm9vcCxcbiAgICAgICAgICByZWplY3RcbiAgICAgICAgKVxuICAgICAgfVxuICAgICAgZWxzZSB7XG4gICAgICAgIG9wZW5XaW5kb3codXJsLCByZWplY3QsIHdpbmRvd0ZlYXR1cmVzKVxuICAgICAgfVxuICAgIH0pXG4gICAgcmV0dXJuXG4gIH1cblxuICByZXR1cm4gb3BlbldpbmRvdyh1cmwsIHJlamVjdCwgd2luZG93RmVhdHVyZXMpXG59XG4iLCIvKipcbiAqIFZ1ZSBOdW1iZXIgSW5wdXQgMS4wLjBcbiAqIChjKSAyMDIxLTIwMjIgRGlwYWsgU2Fya2FyIDxoZWxsb0BkaXBha3Nhcmthci5pbj4gKGh0dHBzOi8vZGlwYWtzYXJrYXIuaW4vKVxuICogQGxpY2Vuc2UgTUlUXG4gKi9cbmltcG9ydCB7IHJlc29sdmVEaXJlY3RpdmUsIHdpdGhEaXJlY3RpdmVzLCBvcGVuQmxvY2ssIGNyZWF0ZUVsZW1lbnRCbG9jayB9IGZyb20gJ3Z1ZSc7XG5cbnZhciBvcHRpb25zID0ge1xuICBwcmVmaXg6ICcnLFxuICBzdWZmaXg6ICcnLFxuICBzZXBhcmF0b3I6ICcsJyxcbiAgZGVjaW1hbDogJy4nLFxuICBwcmVjaXNpb246IDIsXG4gIG1pbmltdW1GcmFjdGlvbkRpZ2l0czogZmFsc2UsXG4gIHByZWZpbGw6IHRydWUsXG4gIHJldmVyc2VGaWxsOiBmYWxzZSxcbiAgbWluOiBmYWxzZSxcbiAgbWF4OiBmYWxzZSxcbiAgbnVsbFZhbHVlOiAnJ1xufTtcblxuLyoqXG4gKiBOdW1iZXIgZm9ybWF0IGZ1bmN0aW9uXG4gKiBAcGFyYW0ge09iamVjdH0gb3B0aW9uc1xuICovXG5mdW5jdGlvbiBOdW1iZXJGb3JtYXQoY29uZmlnID0gb3B0aW9ucykge1xuICB0aGlzLm9wdGlvbnMgPSBPYmplY3QuYXNzaWduKG9wdGlvbnMsIGNvbmZpZyk7XG4gIHRoaXMuaW5wdXQgPSBcIlwiO1xuICB0aGlzLm51bWJlciA9IFwiXCI7XG4gIHRoaXMuaXNDbGVhbiA9IGZhbHNlO1xuXG4gIHRoaXMuaXNOdWxsID0gKGlucHV0ID0gdGhpcy5pbnB1dCkgPT5cbiAgICAhdGhpcy5udW1iZXJPbmx5KGlucHV0LCBuZXcgUmVnRXhwKFwiW14wLTldK1wiLCBcImdpXCIpKTtcblxuICB0aGlzLmNsZWFuID0gKGNsZWFuID0gZmFsc2UpID0+IHtcbiAgICB0aGlzLmlzQ2xlYW4gPSBjbGVhbjtcbiAgICByZXR1cm4gdGhpcztcbiAgfTtcblxuICB0aGlzLnNpZ24gPSAoKSA9PiB7XG4gICAgY29uc3Qgc2lnbiA9XG4gICAgICB0aGlzLmlucHV0LnRvU3RyaW5nKCkuaW5kZXhPZihcIi1cIikgPj0gMCAmJiB0aGlzLnJlYWxOdW1iZXIoKSA+IDBcbiAgICAgICAgPyBcIi1cIlxuICAgICAgICA6IFwiXCI7XG4gICAgcmV0dXJuIHNpZ247XG4gIH07XG5cbiAgZnVuY3Rpb24gYmV0d2VlbihtaW4sIG4sIG1heCkge1xuICAgIHJldHVybiBNYXRoLm1heChtaW4sIE1hdGgubWluKG4sIG1heCkpO1xuICB9XG5cbiAgLy8gVW5jYXVnaHQgUmFuZ2VFcnJvcjogdG9GaXhlZCgpIGRpZ2l0cyBhcmd1bWVudCBtdXN0IGJlIGJldHdlZW4gMCBhbmQgMjAgYXQgTnVtYmVyLnRvRml4ZWRcbiAgZnVuY3Rpb24gZml4ZWQocHJlY2lzaW9uKSB7XG4gICAgcmV0dXJuIGJldHdlZW4oMCwgcHJlY2lzaW9uLCAyMCk7XG4gIH1cblxuICBmdW5jdGlvbiB0b0ZpeGVkKG51bWJlcnMsIHByZWNpc2lvbikge1xuICAgIC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBuby1yZXN0cmljdGVkLXByb3BlcnRpZXNcbiAgICB2YXIgZXhwID0gTWF0aC5wb3coMTAsIHByZWNpc2lvbik7XG4gICAgdmFyIGZsb2F0ID0gcGFyc2VGbG9hdChudW1iZXJzKSAvIGV4cCB8fCAwO1xuICAgIHJldHVybiBmbG9hdC50b0ZpeGVkKGZpeGVkKHByZWNpc2lvbikpO1xuICB9XG5cbiAgdGhpcy50b051bWJlciA9IChzdHJpbmcpID0+IE51bWJlcihzdHJpbmcpO1xuXG4gIHRoaXMubnVtYmVyT25seSA9IChzdHJpbmcsIHJlZ0V4cCkgPT4gc3RyaW5nLnRvU3RyaW5nKCkucmVwbGFjZShyZWdFeHAsIFwiXCIpO1xuXG4gIHRoaXMuaXNOZWdhdGl2ZSA9IHRoaXMuc2lnbigpID09PSBcIi1cIjtcblxuICB0aGlzLm51bWJlcnMgPSAoKSA9PiB7XG4gICAgaWYgKHRoaXMub3B0aW9ucy5yZXZlcnNlRmlsbCkge1xuICAgICAgdGhpcy5udW1iZXIgPSB0b0ZpeGVkKFxuICAgICAgICB0aGlzLm51bWJlck9ubHkodGhpcy5pbnB1dCwgL1xcRCsvZyksXG4gICAgICAgIHRoaXMub3B0aW9ucy5wcmVjaXNpb25cbiAgICAgICkucmVwbGFjZShcIi5cIiwgdGhpcy5vcHRpb25zLmRlY2ltYWwpO1xuICAgIH0gZWxzZSBpZiAodHlwZW9mIHRoaXMuaW5wdXQgPT09IFwibnVtYmVyXCIpIHtcbiAgICAgIHRoaXMubnVtYmVyID0gdGhpcy5wYXJ0cyhcbiAgICAgICAgdGhpcy5pbnB1dC50b1N0cmluZygpLnJlcGxhY2UoXCItXCIsIFwiXCIpLFxuICAgICAgICBcIi5cIlxuICAgICAgKS5qb2luKHRoaXMub3B0aW9ucy5kZWNpbWFsKTtcbiAgICB9IGVsc2Uge1xuICAgICAgdGhpcy5udW1iZXIgPSB0aGlzLm51bWJlck9ubHkoXG4gICAgICAgIHRoaXMuaW5wdXQsXG4gICAgICAgIG5ldyBSZWdFeHAoYFteMC05XFxcXCR7dGhpcy5vcHRpb25zLmRlY2ltYWx9XStgLCBcImdpXCIpXG4gICAgICApO1xuICAgICAgdGhpcy5udW1iZXIgPSB0aGlzLnBhcnRzKHRoaXMubnVtYmVyKS5qb2luKHRoaXMub3B0aW9ucy5kZWNpbWFsKTtcbiAgICB9XG4gICAgcmV0dXJuIHRoaXMubnVtYmVyO1xuICB9O1xuXG4gIHRoaXMucmVhbE51bWJlciA9ICgpID0+IHtcbiAgICByZXR1cm4gdGhpcy5udW1iZXJzKCkudG9TdHJpbmcoKS5yZXBsYWNlKHRoaXMub3B0aW9ucy5kZWNpbWFsLCBcIi5cIik7XG4gIH07XG5cbiAgdGhpcy5wYXJ0cyA9IChudW1iZXIgPSBcIlwiLCBkZWNpbWFsID0gdGhpcy5vcHRpb25zLmRlY2ltYWwpID0+IHtcbiAgICB2YXIgcGFydHMgPSBudW1iZXIudG9TdHJpbmcoKS5zcGxpdChkZWNpbWFsKTtcbiAgICBwYXJ0c1swXSA9IHRoaXMudG9OdW1iZXIocGFydHNbMF0pIHx8IDA7XG5cbiAgICBpZiAocGFydHMubGVuZ3RoID4gMSkge1xuICAgICAgcGFydHNbMV0gPSBwYXJ0cy5zbGljZSgxLCBwYXJ0cy5sZW5ndGgpLmpvaW4oXCJcIik7XG4gICAgICBwYXJ0cyA9IHBhcnRzLnNsaWNlKDAsIDIpO1xuICAgIH1cblxuICAgIGlmICh0aGlzLmlzQ2xlYW4pIHtcbiAgICAgIGNvbnN0IG5ld051bWJlciA9IHRoaXMudG9OdW1iZXIocGFydHMuam9pbihcIi5cIikpLnRvRml4ZWQoXG4gICAgICAgIHRoaXMub3B0aW9ucy5wcmVjaXNpb25cbiAgICAgICk7XG4gICAgICBjb25zdCBjbGVhbk51bWJlciA9IHRoaXMudG9OdW1iZXIobmV3TnVtYmVyKTtcbiAgICAgIGNvbnN0IG1pbmltdW1EaWdpdHMgPSBjbGVhbk51bWJlci50b0ZpeGVkKFxuICAgICAgICB0aGlzLm9wdGlvbnMubWluaW11bUZyYWN0aW9uRGlnaXRzXG4gICAgICApO1xuXG4gICAgICBpZiAoXG4gICAgICAgIHRoaXMub3B0aW9ucy5taW5pbXVtRnJhY3Rpb25EaWdpdHMgJiZcbiAgICAgICAgdGhpcy5vcHRpb25zLm1pbmltdW1GcmFjdGlvbkRpZ2l0cyA+PSAwICYmXG4gICAgICAgIGNsZWFuTnVtYmVyLnRvU3RyaW5nKCkubGVuZ3RoIDwgbWluaW11bURpZ2l0cy5sZW5ndGhcbiAgICAgICkge1xuICAgICAgICBwYXJ0cyA9IG1pbmltdW1EaWdpdHMudG9TdHJpbmcoKS5zcGxpdChcIi5cIik7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBwYXJ0cyA9IGNsZWFuTnVtYmVyLnRvU3RyaW5nKCkuc3BsaXQoXCIuXCIpO1xuICAgICAgfVxuICAgIH1cblxuICAgIHJldHVybiBwYXJ0cy5zbGljZSgwLCAyKTtcbiAgfTtcblxuICB0aGlzLmFkZFNlcGFyYXRvciA9ICgpID0+IHtcbiAgICB2YXIgcGFydHMgPSB0aGlzLm51bWJlcnMoKS5zcGxpdCh0aGlzLm9wdGlvbnMuZGVjaW1hbCk7XG4gICAgcGFydHNbMF0gPSBwYXJ0c1swXVxuICAgICAgLnRvU3RyaW5nKClcbiAgICAgIC5yZXBsYWNlKC8oXFxkKSg/PSg/OlxcZHszfSkrXFxiKS9nbSwgYCQxJHt0aGlzLm9wdGlvbnMuc2VwYXJhdG9yfWApO1xuICAgIHJldHVybiBwYXJ0cy5qb2luKHRoaXMub3B0aW9ucy5kZWNpbWFsKTtcbiAgfTtcblxuICAvKipcbiAgICogRm9ybWF0IHRoZSBpbnB1dCB3aXRoIGRlZmF1bHQgY29uZmlnIGlmIHRoZXJlIGlzIG5vIGNvbnN0cnVjdG9yIGNvbmZpZ1xuICAgKiBAcGFyYW0ge051bWJlciwgU3RyaW5nfSBpbnB1dFxuICAgKiBAcmV0dXJuIHtTdHJpbmd9XG4gICAqL1xuICB0aGlzLmZvcm1hdCA9IChpbnB1dCkgPT4ge1xuICAgIGlmIChpbnB1dCA9PT0gXCJcIikgcmV0dXJuIHRoaXMub3B0aW9ucy5udWxsVmFsdWU7XG4gICAgdGhpcy5pbnB1dCA9IGlucHV0IHx8IHRoaXMub3B0aW9ucy5udWxsVmFsdWU7XG4gICAgaWYgKHRoaXMuaXNOdWxsKCkgJiYgIXRoaXMub3B0aW9ucy5yZXZlcnNlRmlsbClcbiAgICAgIHJldHVybiB0aGlzLm9wdGlvbnMubnVsbFZhbHVlO1xuICAgIHJldHVybiAoXG4gICAgICB0aGlzLnNpZ24oKSArXG4gICAgICB0aGlzLm9wdGlvbnMucHJlZml4ICtcbiAgICAgIHRoaXMuYWRkU2VwYXJhdG9yKCkgK1xuICAgICAgdGhpcy5vcHRpb25zLnN1ZmZpeFxuICAgICk7XG4gIH07XG5cbiAgLyoqXG4gICAqIFVuZm9ybWF0IHRoZSBpbnB1dCB3aXRoIGRlZmF1bHQgY29uZmlnIGlmIHRoZXJlIGlzIG5vIGNvbnN0cnVjdG9yIGNvbmZpZ1xuICAgKiBAcGFyYW0ge051bWJlciwgU3RyaW5nfSBpbnB1dFxuICAgKiBAcmV0dXJuIHtTdHJpbmd9XG4gICAqL1xuICB0aGlzLnVuZm9ybWF0ID0gKGlucHV0KSA9PiB7XG4gICAgaWYgKGlucHV0ID09PSBcIlwiKSByZXR1cm4gdGhpcy5vcHRpb25zLm51bGxWYWx1ZTtcbiAgICB0aGlzLmlucHV0ID0gaW5wdXQgfHwgdGhpcy5vcHRpb25zLm51bGxWYWx1ZTtcbiAgICBpZiAodGhpcy5pc051bGwoKSAmJiAhdGhpcy5vcHRpb25zLnJldmVyc2VGaWxsKVxuICAgICAgcmV0dXJuIHRoaXMub3B0aW9ucy5udWxsVmFsdWU7XG4gICAgcmV0dXJuIHRoaXMuc2lnbigpICsgdGhpcy5yZWFsTnVtYmVyKCk7XG4gIH07XG59XG5cbmNvbnN0IENPTkZJR19LRVkkMSA9ICdfX2lucHV0LWZhY2FkZV9fJztcblxuLyoqXG4gKiBDcmVhdGVzIGEgQ3VzdG9tRXZlbnQoJ2lucHV0Jykgd2l0aCBkZXRhaWwgPSB7IGZhY2FkZTogdHJ1ZSB9XG4gKiB1c2VkIGFzIGEgd2F5IHRvIGlkZW50aWZ5IG91ciBvd24gaW5wdXQgZXZlbnRcbiAqL1xuZnVuY3Rpb24gRmFjYWRlSW5wdXRFdmVudCgpIHtcbiAgcmV0dXJuIG5ldyBDdXN0b21FdmVudCgnaW5wdXQnLCB7XG4gICAgYnViYmxlczogdHJ1ZSxcbiAgICBjYW5jZWxhYmxlOiB0cnVlLFxuICAgIGRldGFpbDogeyBmYWNhZGU6IHRydWUgfSxcbiAgfSlcbn1cblxuLyoqXG4gKiBDcmVhdGVzIGEgQ3VzdG9tRXZlbnQoJ2NoYW5nZScpIHdpdGggZGV0YWlsID0geyBmYWNhZGU6IHRydWUgfVxuICogdXNlZCBhcyBhIHdheSB0byBpZGVudGlmeSBvdXIgb3duIGNoYW5nZSBldmVudFxuICovXG5mdW5jdGlvbiBGYWNhZGVDaGFuZ2VFdmVudCgpIHtcbiAgcmV0dXJuIG5ldyBDdXN0b21FdmVudCgnY2hhbmdlJywge1xuICAgIGJ1YmJsZXM6IHRydWUsXG4gICAgY2FuY2VsYWJsZTogdHJ1ZSxcbiAgICBkZXRhaWw6IHsgZmFjYWRlOiB0cnVlIH0sXG4gIH0pXG59XG5cbi8qKlxuICogZW5zdXJlIHRoYXQgdGhlIGVsZW1lbnQgd2UncmUgYXR0YWNoaW5nIHRvIGlzIGFuIGlucHV0IGVsZW1lbnRcbiAqIGlmIG5vdCB0cnkgdG8gZmluZCBhbiBpbnB1dCBlbGVtZW50IGluIHRoaXMgZWxlbWVudHMgY2hpbGRyZW5zXG4gKlxuICogQHBhcmFtIHtIVE1MSW5wdXRFbGVtZW50fSBlbFxuICovXG5mdW5jdGlvbiBnZXRJbnB1dEVsZW1lbnQoZWwpIHtcbiAgY29uc3QgaW5wdXRFbGVtZW50ID1cbiAgICBlbCBpbnN0YW5jZW9mIEhUTUxJbnB1dEVsZW1lbnQgPyBlbCA6IGVsLnF1ZXJ5U2VsZWN0b3IoJ2lucHV0Jyk7XG5cbiAgLyogaXN0YW5idWwgaWdub3JlIG5leHQgKi9cbiAgaWYgKCFpbnB1dEVsZW1lbnQpIHtcbiAgICB0aHJvdyBuZXcgRXJyb3IoJ2ZhY2FkZSBkaXJlY3RpdmUgcmVxdWlyZXMgYW4gaW5wdXQgZWxlbWVudCcpXG4gIH1cblxuICByZXR1cm4gaW5wdXRFbGVtZW50XG59XG5cbi8qKlxuICogVXBkYXRlcyB0aGUgY3Vyc29yIHBvc2l0aW9uIHRvIHRoZSByaWdodCBwbGFjZSBhZnRlciB0aGUgbWFza2luZyBydWxlIHdhcyBhcHBsaWVkXG4gKiBAcGFyYW0ge0hUTUxFbGVtZW50fSBlbFxuICogQHBhcmFtIHtOdW1iZXJ9IHBvc2l0aW9uXG4gKi9cbmZ1bmN0aW9uIHVwZGF0ZUN1cnNvcihlbCwgcG9zaXRpb24pIHtcbiAgY29uc3Qgc2V0U2VsZWN0aW9uUmFuZ2UgPSAoKSA9PiB7XG4gICAgZWwuc2V0U2VsZWN0aW9uUmFuZ2UocG9zaXRpb24sIHBvc2l0aW9uKTtcbiAgfTtcbiAgc2V0U2VsZWN0aW9uUmFuZ2UoKTtcbiAgLy8gQW5kcm9pZCBGaXhcbiAgc2V0VGltZW91dChzZXRTZWxlY3Rpb25SYW5nZSgpLCAxKTtcbn1cblxuLyoqXG4gKiBVcGRhdGVzIHRoZSBlbGVtZW50J3MgdmFsdWUgYW5kIHVubWFza2VkIHZhbHVlIGJhc2VkIG9uIHRoZSBtYXNraW5nIGNvbmZpZyBydWxlc1xuICpcbiAqIEBwYXJhbSB7SFRNTElucHV0RWxlbWVudH0gZWwgVGhlIGlucHV0IGVsZW1lbnQgdG8gdXBkYXRlXG4gKiBAcGFyYW0ge29iamVjdH0gW29wdGlvbnNdXG4gKiBAcGFyYW0ge0Jvb2xlYW59IG9wdGlvbnMuZW1pdCBXZXRoZXIgdG8gZGlzcGF0Y2ggYSBuZXcgSW5wdXRFdmVudCBvciBub3RcbiAqIEBwYXJhbSB7Qm9vbGVhbn0gb3B0aW9ucy5mb3JjZSBGb3JjZXMgdGhlIHVwZGF0ZSBldmVuIGlmIHRoZSBvbGQgdmFsdWUgYW5kIHRoZSBuZXcgdmFsdWUgYXJlIHRoZSBzYW1lXG4gKi9cbmZ1bmN0aW9uIHVwZGF0ZVZhbHVlKFxuICBlbCxcbiAgdm5vZGUsXG4gIHsgZW1pdCA9IHRydWUsIGZvcmNlID0gZmFsc2UsIGNsZWFuID0gZmFsc2UgfSA9IHt9XG4pIHtcbiAgY29uc3QgeyBjb25maWcgfSA9IGVsW0NPTkZJR19LRVkkMV07XG4gIGxldCB7IG9sZFZhbHVlIH0gPSBlbFtDT05GSUdfS0VZJDFdO1xuICBsZXQgY3VycmVudFZhbHVlID0gdm5vZGUgJiYgdm5vZGUucHJvcHMgPyB2bm9kZS5wcm9wcy52YWx1ZSA6IGVsLnZhbHVlO1xuXG4gIG9sZFZhbHVlID0gb2xkVmFsdWUgfHwgJyc7XG4gIGN1cnJlbnRWYWx1ZSA9IGN1cnJlbnRWYWx1ZSB8fCAnJztcblxuICBpZiAoZm9yY2UgfHwgb2xkVmFsdWUgIT09IGN1cnJlbnRWYWx1ZSkge1xuICAgIGNvbnN0IG51bWJlciA9IG5ldyBOdW1iZXJGb3JtYXQoY29uZmlnKS5jbGVhbihjbGVhbiAmJiAhY29uZmlnLnJldmVyc2VGaWxsKTtcbiAgICBsZXQgbWFza2VkID0gbnVtYmVyLmZvcm1hdChjdXJyZW50VmFsdWUpO1xuICAgIGxldCB1bm1hc2tlZCA9IG51bWJlci5jbGVhbighY29uZmlnLnJldmVyc2VGaWxsKS51bmZvcm1hdChjdXJyZW50VmFsdWUpO1xuXG4gICAgLy8gY2hlY2sgdmFsdWUgd2l0aCBpbiByYW5nZSBtYXggYW5kIG1pbiB2YWx1ZVxuICAgIGlmIChjbGVhbikge1xuICAgICAgaWYgKE51bWJlcihjb25maWcubWF4KSAmJiB1bm1hc2tlZCA+IE51bWJlcihjb25maWcubWF4KSkge1xuICAgICAgICBtYXNrZWQgPSBudW1iZXIuZm9ybWF0KGNvbmZpZy5tYXgpO1xuICAgICAgICB1bm1hc2tlZCA9IG51bWJlci51bmZvcm1hdChjb25maWcubWF4KTtcbiAgICAgIH0gZWxzZSBpZiAoTnVtYmVyKGNvbmZpZy5taW4pICYmIHVubWFza2VkIDwgTnVtYmVyKGNvbmZpZy5taW4pKSB7XG4gICAgICAgIG1hc2tlZCA9IG51bWJlci5mb3JtYXQoY29uZmlnLm1pbik7XG4gICAgICAgIHVubWFza2VkID0gbnVtYmVyLnVuZm9ybWF0KGNvbmZpZy5taW4pO1xuICAgICAgfVxuICAgIH1cblxuICAgIGVsW0NPTkZJR19LRVkkMV0ub2xkVmFsdWUgPSBtYXNrZWQ7XG4gICAgZWwudW5tYXNrZWRWYWx1ZSA9IHVubWFza2VkO1xuXG4gICAgLy8gc2FmYXJpIG1ha2VzIHRoZSBjdXJzb3IganVtcCB0byB0aGUgZW5kIGlmIGVsLnZhbHVlIGdldHMgYXNzaWduIGV2ZW4gaWYgdG8gdGhlIHNhbWUgdmFsdWVcbiAgICBpZiAoZWwudmFsdWUgIT09IG1hc2tlZCkge1xuICAgICAgZWwudmFsdWUgPSBtYXNrZWQ7XG4gICAgfVxuXG4gICAgLy8gdGhpcyBwYXJ0IG5lZWRzIHRvIGJlIG91dHNpZGUgdGhlIGFib3ZlIElGIHN0YXRlbWVudCBmb3IgdnVldGlmeSBpbiBmaXJlZm94XG4gICAgLy8gZHJhd2JhY2sgaXMgdGhhdCB3ZSBlbmR1cCB3aXRoIHR3bydzIGlucHV0IGV2ZW50cyBpbiBmaXJlZm94XG4gICAgcmV0dXJuIGVtaXQgJiYgZWwuZGlzcGF0Y2hFdmVudChGYWNhZGVJbnB1dEV2ZW50KCkpXG4gIH1cbn1cblxuLyoqXG4gKiBJbnB1dCBldmVudCBoYW5kbGVyXG4gKlxuICogQHBhcmFtIHtFdmVudH0gZXZlbnQgVGhlIGV2ZW50IG9iamVjdFxuICovXG5mdW5jdGlvbiBpbnB1dEhhbmRsZXIoZXZlbnQpIHtcbiAgY29uc3QgeyB0YXJnZXQsIGRldGFpbCB9ID0gZXZlbnQ7XG5cbiAgLy8gV2UgZG9udCBuZWVkIHRvIHJ1biB0aGlzIG1ldGhvZCBvbiB0aGUgZXZlbnQgd2UgZW1pdCAocHJldmVudCBldmVudCBsb29wKVxuICBpZiAoZGV0YWlsPy5mYWNhZGUpIHtcbiAgICByZXR1cm4gZmFsc2VcbiAgfVxuXG4gIC8vIHNpbmNlIHdlIHdpbGwgYmUgZW1pdHRpbmcgb3VyIG93biBjdXN0b20gaW5wdXQgZXZlbnRcbiAgLy8gd2UgY2FuIHN0b3AgcHJvcGFnYXRpb24gb2YgdGhpcyBuYXRpdmUgZXZlbnRcbiAgZXZlbnQuc3RvcFByb3BhZ2F0aW9uKCk7XG5cbiAgbGV0IHBvc2l0aW9uRnJvbUVuZCA9IHRhcmdldC52YWx1ZS5sZW5ndGggLSB0YXJnZXQuc2VsZWN0aW9uRW5kO1xuICBjb25zdCB7IG9sZFZhbHVlLCBjb25maWcgfSA9IHRhcmdldFtDT05GSUdfS0VZJDFdO1xuXG4gIHVwZGF0ZVZhbHVlKHRhcmdldCwgbnVsbCwgeyBlbWl0OiBmYWxzZSB9KTtcblxuICAvLyB1cGRhdGVkIGN1cnNvciBwb3NpdGlvblxuICBwb3NpdGlvbkZyb21FbmQgPSBNYXRoLm1heChwb3NpdGlvbkZyb21FbmQsIGNvbmZpZy5zdWZmaXgubGVuZ3RoKTtcbiAgcG9zaXRpb25Gcm9tRW5kID0gdGFyZ2V0LnZhbHVlLmxlbmd0aCAtIHBvc2l0aW9uRnJvbUVuZDtcbiAgcG9zaXRpb25Gcm9tRW5kID0gTWF0aC5tYXgocG9zaXRpb25Gcm9tRW5kLCBjb25maWcucHJlZml4Lmxlbmd0aCk7XG4gIHVwZGF0ZUN1cnNvcih0YXJnZXQsIHBvc2l0aW9uRnJvbUVuZCk7XG5cbiAgaWYgKG9sZFZhbHVlICE9PSB0YXJnZXQudmFsdWUpIHtcbiAgICB0YXJnZXQuZGlzcGF0Y2hFdmVudChGYWNhZGVJbnB1dEV2ZW50KCkpO1xuICB9XG59XG5cbi8qKlxuICogQmx1ciBldmVudCBoYW5kbGVyXG4gKlxuICogQHBhcmFtIHtFdmVudH0gZXZlbnQgVGhlIGV2ZW50IG9iamVjdFxuICovXG5mdW5jdGlvbiBibHVySGFuZGxlcihldmVudCkge1xuICBjb25zdCB7IHRhcmdldCwgZGV0YWlsIH0gPSBldmVudDtcblxuICAvLyBXZSBkb250IG5lZWQgdG8gcnVuIHRoaXMgbWV0aG9kIG9uIHRoZSBldmVudCB3ZSBlbWl0IChwcmV2ZW50IGV2ZW50IGxvb3ApXG4gIGlmIChkZXRhaWw/LmZhY2FkZSkge1xuICAgIHJldHVybiBmYWxzZVxuICB9XG5cbiAgY29uc3QgeyBvbGRWYWx1ZSB9ID0gdGFyZ2V0W0NPTkZJR19LRVkkMV07XG5cbiAgdXBkYXRlVmFsdWUodGFyZ2V0LCBudWxsLCB7IGZvcmNlOiB0cnVlLCBlbWl0OiBmYWxzZSwgY2xlYW46IHRydWUgfSk7XG5cbiAgaWYgKG9sZFZhbHVlICE9PSB0YXJnZXQudmFsdWUpIHtcbiAgICB0YXJnZXQuZGlzcGF0Y2hFdmVudChGYWNhZGVDaGFuZ2VFdmVudCgpKTtcbiAgfVxufVxuXG4vKiBlc2xpbnQtZGlzYWJsZSBwcmVmZXItb2JqZWN0LXNwcmVhZCAqL1xuXG5jb25zdCBDT05GSUdfS0VZID0gQ09ORklHX0tFWSQxO1xuXG52YXIgdk51bWJlciA9IHtcbiAgYmVmb3JlTW91bnQ6IChlbCwgeyB2YWx1ZSwgbW9kaWZpZXJzIH0sIHZub2RlKSA9PiB7XG4gICAgZWwgPSBnZXRJbnB1dEVsZW1lbnQoZWwpO1xuICAgIGNvbnN0IGNvbmZpZyA9IE9iamVjdC5hc3NpZ24oe30sIG9wdGlvbnMsIHZhbHVlLCBtb2RpZmllcnMpO1xuICAgIGVsW0NPTkZJR19LRVldID0geyBjb25maWcgfTtcbiAgICAvLyBzZXQgaW5pdGlhbCB2YWx1ZVxuICAgIHVwZGF0ZVZhbHVlKGVsLCB2bm9kZSwgeyBmb3JjZTogY29uZmlnLnByZWZpbGwsIGNsZWFuOiB0cnVlIH0pO1xuICB9LFxuXG4gIG1vdW50ZWQ6IChlbCkgPT4ge1xuICAgIGVsID0gZ2V0SW5wdXRFbGVtZW50KGVsKTtcbiAgICBjb25zdCBvcHRpb24gPSBlbFtDT05GSUdfS0VZXTtcbiAgICBjb25zdCB7IGNvbmZpZyB9ID0gb3B0aW9uO1xuICAgIC8vIHByZWZlciBhZGRpbmcgZXZlbnQgbGlzdGVuZXIgdG8gcGFyZW50IGVsZW1lbnQgdG8gYXZvaWQgRmlyZWZveCBidWcgd2hpY2ggZG9lcyBub3RcbiAgICAvLyBleGVjdXRlIGB1c2VDYXB0dXJlOiB0cnVlYCBldmVudCBoYW5kbGVycyBiZWZvcmUgbm9uLWNhcHR1cmluZyBldmVudCBoYW5kbGVyc1xuICAgIGNvbnN0IGhhbmRsZXJPd25lciA9IGVsLnBhcmVudEVsZW1lbnQgfHwgZWw7XG5cbiAgICAvLyB1c2UgYW5vbnltb3VzIGV2ZW50IGhhbmRsZXIgdG8gYXZvaWQgaW5hZHZlcnRlbnRseSByZW1vdmluZyBtYXNraW5nIGZvciBhbGwgaW5wdXRzIHdpdGhpbiBhIGNvbnRhaW5lclxuICAgIGNvbnN0IG9uaW5wdXQgPSAoZSkgPT4ge1xuICAgICAgaWYgKGUudGFyZ2V0ICE9PSBlbCkge1xuICAgICAgICByZXR1cm5cbiAgICAgIH1cbiAgICAgIGlucHV0SGFuZGxlcihlKTtcbiAgICB9O1xuXG4gICAgaGFuZGxlck93bmVyLmFkZEV2ZW50TGlzdGVuZXIoJ2lucHV0Jywgb25pbnB1dCwgdHJ1ZSk7XG5cbiAgICBlbC5vbmJsdXIgPSAoZSkgPT4gYmx1ckhhbmRsZXIoZSk7XG5cbiAgICAvLyBjaGVjayBkZWNpbWFsIGtleSBhbmQgaW5zZXJ0IHRvIGN1cnJlbnQgZWxlbWVudFxuICAgIC8vIHVwZGF0ZWQgY3Vyc29yIHBvc2l0aW9uIGFmdGVyIGZvcm1hdCB0aGUgdmFsdWVcbiAgICBlbC5vbmtleWRvd24gPSAoZSkgPT4ge1xuICAgICAgaWYgKFxuICAgICAgICAoWzExMCwgMTkwXS5pbmNsdWRlcyhlLmtleUNvZGUpIHx8IGUua2V5ID09PSBjb25maWcuZGVjaW1hbCkgJiZcbiAgICAgICAgIWVsLnZhbHVlLmluY2x1ZGVzKGNvbmZpZy5kZWNpbWFsKVxuICAgICAgKSB7XG4gICAgICAgIGUucHJldmVudERlZmF1bHQoKTtcbiAgICAgICAgZWwuc2V0UmFuZ2VUZXh0KGNvbmZpZy5kZWNpbWFsKTtcbiAgICAgICAgZWwuZGlzcGF0Y2hFdmVudChuZXcgRXZlbnQoJ2lucHV0JykpO1xuICAgICAgICB1cGRhdGVDdXJzb3IoZWwsIGVsLnZhbHVlLmluZGV4T2YoY29uZmlnLmRlY2ltYWwpICsgMSk7XG4gICAgICB9IGVsc2UgaWYgKFxuICAgICAgICAoWzExMCwgMTkwXS5pbmNsdWRlcyhlLmtleUNvZGUpIHx8IGUua2V5ID09PSBjb25maWcuZGVjaW1hbCkgJiZcbiAgICAgICAgZWwudmFsdWUuaW5jbHVkZXMoY29uZmlnLmRlY2ltYWwpXG4gICAgICApIHtcbiAgICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgfSBlbHNlIGlmIChbOF0uaW5jbHVkZXMoZS5rZXlDb2RlKSkge1xuICAgICAgICAvLyBjaGVjayBjdXJyZW50IGN1cnNvciBwb3NpdGlvbiBpcyBhZnRlciBzZXBhcmF0b3Igd2hlbiBiYWNrc3BhY2Uga2V5IGRvd25cbiAgICAgICAgY29uc3QgY2hhcmFjdGVyID0gZWwudmFsdWUuc2xpY2UoZWwuc2VsZWN0aW9uRW5kIC0gMSwgZWwuc2VsZWN0aW9uRW5kKTtcbiAgICAgICAgY29uc3QgcmVwbGFjZSA9IGVsLnZhbHVlLnNsaWNlKGVsLnNlbGVjdGlvbkVuZCAtIDIsIGVsLnNlbGVjdGlvbkVuZCk7XG4gICAgICAgIGlmIChjaGFyYWN0ZXIgPT09IGNvbmZpZy5zZXBhcmF0b3IpIHtcbiAgICAgICAgICBlLnByZXZlbnREZWZhdWx0KCk7XG5cbiAgICAgICAgICBsZXQgcG9zaXRpb25Gcm9tRW5kID0gZWwudmFsdWUubGVuZ3RoIC0gZWwuc2VsZWN0aW9uRW5kO1xuICAgICAgICAgIC8vIHJlbW92ZSBzZXBhcmF0b3IgYW5kIGJlZm9yZSBjaGFyYWN0ZXJcbiAgICAgICAgICBlbC52YWx1ZSA9IGVsLnZhbHVlLnJlcGxhY2UocmVwbGFjZSwgJycpO1xuICAgICAgICAgIC8vIHVwZGF0ZWQgY3Vyc29yIHBvc2l0aW9uXG4gICAgICAgICAgcG9zaXRpb25Gcm9tRW5kID0gTWF0aC5tYXgocG9zaXRpb25Gcm9tRW5kLCBjb25maWcuc3VmZml4Lmxlbmd0aCk7XG4gICAgICAgICAgcG9zaXRpb25Gcm9tRW5kID0gZWwudmFsdWUubGVuZ3RoIC0gcG9zaXRpb25Gcm9tRW5kO1xuICAgICAgICAgIHBvc2l0aW9uRnJvbUVuZCA9IE1hdGgubWF4KHBvc2l0aW9uRnJvbUVuZCwgY29uZmlnLnByZWZpeC5sZW5ndGgpO1xuICAgICAgICAgIHVwZGF0ZUN1cnNvcihlbCwgcG9zaXRpb25Gcm9tRW5kKTtcbiAgICAgICAgICAvLyB0cmlnZ2VyIGlucHV0IGV2ZW50XG4gICAgICAgICAgZWwuZGlzcGF0Y2hFdmVudChuZXcgRXZlbnQoJ2lucHV0JykpO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfTtcblxuICAgIG9wdGlvbi5jbGVhbnVwID0gKCkgPT5cbiAgICAgIGhhbmRsZXJPd25lci5yZW1vdmVFdmVudExpc3RlbmVyKCdpbnB1dCcsIG9uaW5wdXQsIHRydWUpO1xuICB9LFxuXG4gIHVwZGF0ZWQ6IChlbCwgeyB2YWx1ZSwgb2xkVmFsdWUsIG1vZGlmaWVycyB9LCB2bm9kZSkgPT4ge1xuICAgIGVsID0gZ2V0SW5wdXRFbGVtZW50KGVsKTtcbiAgICBpZiAodmFsdWUgIT09IG9sZFZhbHVlKSB7XG4gICAgICBjb25zdCB7IGNvbmZpZyB9ID0gZWxbQ09ORklHX0tFWV07XG4gICAgICBlbFtDT05GSUdfS0VZXS5jb25maWcgPSBPYmplY3QuYXNzaWduKHt9LCBjb25maWcsIHZhbHVlLCBtb2RpZmllcnMpO1xuICAgICAgdXBkYXRlVmFsdWUoZWwsIHZub2RlLCB7IGZvcmNlOiB0cnVlLCBjbGVhbjogdHJ1ZSB9KTtcbiAgICB9IGVsc2Uge1xuICAgICAgdXBkYXRlVmFsdWUoZWwsIHZub2RlKTtcbiAgICB9XG4gIH0sXG5cbiAgdW5tb3VudGVkOiAoZWwpID0+IHtcbiAgICBnZXRJbnB1dEVsZW1lbnQoZWwpW0NPTkZJR19LRVldLmNsZWFudXAoKTtcbiAgfSxcbn07XG5cbnZhciBzY3JpcHQgPSB7XG4gIG5hbWU6ICdOdW1iZXInLFxuICBwcm9wczoge1xuICAgIG1vZGVsVmFsdWU6IHtcbiAgICAgIHJlcXVpcmVkOiB0cnVlLFxuICAgIH0sXG4gICAgbnVsbFZhbHVlOiB7XG4gICAgICB0eXBlOiBbTnVtYmVyLCBTdHJpbmddLFxuICAgICAgZGVmYXVsdDogKCkgPT4gb3B0aW9ucy5udWxsVmFsdWUsXG4gICAgfSxcbiAgICBtYXNrZWQ6IHtcbiAgICAgIHR5cGU6IEJvb2xlYW4sXG4gICAgICBkZWZhdWx0OiBmYWxzZSxcbiAgICB9LFxuICAgIHJldmVyc2VGaWxsOiB7XG4gICAgICB0eXBlOiBCb29sZWFuLFxuICAgICAgZGVmYXVsdDogb3B0aW9ucy5yZXZlcnNlRmlsbCxcbiAgICB9LFxuICAgIHByZWZpbGw6IHtcbiAgICAgIHR5cGU6IEJvb2xlYW4sXG4gICAgICBkZWZhdWx0OiBvcHRpb25zLnByZWZpbGwsXG4gICAgfSxcbiAgICBwcmVjaXNpb246IHtcbiAgICAgIHR5cGU6IE51bWJlcixcbiAgICAgIGRlZmF1bHQ6ICgpID0+IG9wdGlvbnMucHJlY2lzaW9uLFxuICAgIH0sXG4gICAgbWluaW11bUZyYWN0aW9uRGlnaXRzOiB7XG4gICAgICB0eXBlOiBbTnVtYmVyLCBCb29sZWFuXSxcbiAgICAgIGRlZmF1bHQ6ICgpID0+IG9wdGlvbnMubWluaW11bUZyYWN0aW9uRGlnaXRzLFxuICAgIH0sXG4gICAgZGVjaW1hbDoge1xuICAgICAgdHlwZTogU3RyaW5nLFxuICAgICAgZGVmYXVsdDogKCkgPT4gb3B0aW9ucy5kZWNpbWFsLFxuICAgIH0sXG4gICAgbWluOiB7XG4gICAgICB0eXBlOiBbTnVtYmVyLCBCb29sZWFuXSxcbiAgICAgIGRlZmF1bHQ6ICgpID0+IG9wdGlvbnMubWluLFxuICAgIH0sXG4gICAgbWF4OiB7XG4gICAgICB0eXBlOiBbTnVtYmVyLCBCb29sZWFuXSxcbiAgICAgIGRlZmF1bHQ6ICgpID0+IG9wdGlvbnMubWF4LFxuICAgIH0sXG4gICAgc2VwYXJhdG9yOiB7XG4gICAgICB0eXBlOiBTdHJpbmcsXG4gICAgICBkZWZhdWx0OiAoKSA9PiBvcHRpb25zLnNlcGFyYXRvcixcbiAgICB9LFxuICAgIHByZWZpeDoge1xuICAgICAgdHlwZTogU3RyaW5nLFxuICAgICAgZGVmYXVsdDogKCkgPT4gb3B0aW9ucy5wcmVmaXgsXG4gICAgfSxcbiAgICBzdWZmaXg6IHtcbiAgICAgIHR5cGU6IFN0cmluZyxcbiAgICAgIGRlZmF1bHQ6ICgpID0+IG9wdGlvbnMuc3VmZml4LFxuICAgIH0sXG4gIH0sXG4gIGRpcmVjdGl2ZXM6IHtcbiAgICBudW1iZXI6IHZOdW1iZXIsXG4gIH0sXG4gIGVtaXRzOiBbJ3VwZGF0ZTptb2RlbC12YWx1ZScsICdpbnB1dDptb2RlbC12YWx1ZSddLFxuICBkYXRhKCkge1xuICAgIHJldHVybiB7XG4gICAgICBtYXNrZWRWYWx1ZTogdGhpcy5tb2RlbFZhbHVlLFxuICAgICAgdW5tYXNrZWRWYWx1ZTogbnVsbCxcbiAgICB9XG4gIH0sXG4gIG1ldGhvZHM6IHtcbiAgICBpbnB1dCh7IHRhcmdldCB9KSB7XG4gICAgICB0aGlzLm1hc2tlZFZhbHVlID0gdGFyZ2V0LnZhbHVlO1xuICAgICAgdGhpcy51bm1hc2tlZFZhbHVlID0gdGFyZ2V0LnVubWFza2VkVmFsdWU7XG4gICAgICB0aGlzLiRlbWl0KCdpbnB1dDptb2RlbC12YWx1ZScsIHRoaXMuZW1pdHRlZFZhbHVlKTtcbiAgICB9LFxuICAgIGNoYW5nZSgpIHtcbiAgICAgIHRoaXMuJGVtaXQoJ3VwZGF0ZTptb2RlbC12YWx1ZScsIHRoaXMuZW1pdHRlZFZhbHVlKTtcbiAgICB9LFxuICB9LFxuICBjb21wdXRlZDoge1xuICAgIGVtaXR0ZWRWYWx1ZSgpIHtcbiAgICAgIHJldHVybiB0aGlzLm1hc2tlZCA/IHRoaXMubWFza2VkVmFsdWUgOiB0aGlzLnVubWFza2VkVmFsdWVcbiAgICB9LFxuICAgIGNvbmZpZygpIHtcbiAgICAgIGNvbnN0IGNvbmZpZyA9IHt9O1xuICAgICAgT2JqZWN0LmtleXModGhpcy4kcHJvcHMpXG4gICAgICAgIC5maWx0ZXIoKGl0ZW0pID0+IGl0ZW0gIT09ICdtb2RlbFZhbHVlJylcbiAgICAgICAgLmZvckVhY2goKGl0ZW0pID0+IHtcbiAgICAgICAgICBjb25maWdbaXRlbV0gPSB0aGlzLiRwcm9wc1tpdGVtXTtcbiAgICAgICAgfSk7XG4gICAgICByZXR1cm4gY29uZmlnXG4gICAgfSxcbiAgfSxcbiAgd2F0Y2g6IHtcbiAgICBtb2RlbFZhbHVlKHZhbCkge1xuICAgICAgaWYgKHRoaXMudW5tYXNrZWRWYWx1ZSAhPT0gdmFsKSB7XG4gICAgICAgIHRoaXMubWFza2VkVmFsdWUgPSB2YWw7XG4gICAgICB9XG4gICAgfSxcbiAgfSxcbn07XG5cbmNvbnN0IF9ob2lzdGVkXzEgPSBbXCJ2YWx1ZVwiXTtcblxuZnVuY3Rpb24gcmVuZGVyKF9jdHgsIF9jYWNoZSwgJHByb3BzLCAkc2V0dXAsICRkYXRhLCAkb3B0aW9ucykge1xuICBjb25zdCBfZGlyZWN0aXZlX251bWJlciA9IHJlc29sdmVEaXJlY3RpdmUoXCJudW1iZXJcIik7XG5cbiAgcmV0dXJuIHdpdGhEaXJlY3RpdmVzKChvcGVuQmxvY2soKSwgY3JlYXRlRWxlbWVudEJsb2NrKFwiaW5wdXRcIiwge1xuICAgIHR5cGU6IFwidGV4dFwiLFxuICAgIGF1dG9jb21wbGV0ZTogXCJvZmZcIixcbiAgICB2YWx1ZTogJGRhdGEubWFza2VkVmFsdWUsXG4gICAgb25DaGFuZ2U6IF9jYWNoZVswXSB8fCAoX2NhY2hlWzBdID0gKC4uLmFyZ3MpID0+ICgkb3B0aW9ucy5jaGFuZ2UgJiYgJG9wdGlvbnMuY2hhbmdlKC4uLmFyZ3MpKSksXG4gICAgb25JbnB1dDogX2NhY2hlWzFdIHx8IChfY2FjaGVbMV0gPSAoLi4uYXJncykgPT4gKCRvcHRpb25zLmlucHV0ICYmICRvcHRpb25zLmlucHV0KC4uLmFyZ3MpKSksXG4gICAgY2xhc3M6IFwidi1udW1iZXJcIlxuICB9LCBudWxsLCA0MCAvKiBQUk9QUywgSFlEUkFURV9FVkVOVFMgKi8sIF9ob2lzdGVkXzEpKSwgW1xuICAgIFtfZGlyZWN0aXZlX251bWJlciwgJG9wdGlvbnMuY29uZmlnXVxuICBdKVxufVxuXG5zY3JpcHQucmVuZGVyID0gcmVuZGVyO1xuc2NyaXB0Ll9fZmlsZSA9IFwic3JjL2NvbXBvbmVudC52dWVcIjtcblxudmFyIGluZGV4ID0ge1xuICBpbnN0YWxsKGFwcCwgY29uZmlnID0ge30pIHtcbiAgICBpZiAoY29uZmlnKSB7XG4gICAgICBPYmplY3QuYXNzaWduKG9wdGlvbnMsIGNvbmZpZyk7XG4gICAgfVxuICAgIGFwcC5kaXJlY3RpdmUoJ251bWJlcicsIHZOdW1iZXIpO1xuICAgIGFwcC5jb21wb25lbnQoJ251bWJlcicsIHNjcmlwdCk7XG4gIH0sXG59O1xuXG5leHBvcnQgeyBOdW1iZXJGb3JtYXQsIGluZGV4IGFzIGRlZmF1bHQsIHNjcmlwdCBhcyBudW1iZXIsIG9wdGlvbnMsIHZOdW1iZXIgfTtcbiIsImltcG9ydCB7XG4gIExvY2FsU3RvcmFnZSxcbiAgRGlhbG9nLFxuICB1aWQsXG4gIENvb2tpZXMsXG4gIG9wZW5VUkwsXG4gIE5vdGlmeSxcbiAgZXhwb3J0RmlsZSxcbiAgZGF0ZSxcbiAgZm9ybWF0LFxuICBjb3B5VG9DbGlwYm9hcmQsXG59IGZyb20gXCJxdWFzYXJcIjtcblxuaW1wb3J0IHsgTnVtYmVyRm9ybWF0IH0gZnJvbSBcIkBjb2RlcnMtdG0vdnVlLW51bWJlci1mb3JtYXRcIjtcbmltcG9ydCBCYXNlQWxlcnQgZnJvbSBcIi4uL2NvbXBvbmVudHMvYmFzZS9CYXNlQWxlcnQudnVlXCI7XG5cbmNvbnN0IHsgY2FwaXRhbGl6ZSwgaHVtYW5TdG9yYWdlU2l6ZSB9ID0gZm9ybWF0O1xuXG5sZXQgZW1pdFRpbWVyO1xuXG5leHBvcnQgZGVmYXVsdCB7XG4gIG1vZHVsZXM6IHt9LFxuICBhc3luYyBpbml0KCkge1xuICAgIGNvbnNvbGUuZnVuYyhcInNlcnZpY2VzL2NvcmU6aW5pdCgpXCIsIGFyZ3VtZW50cyk7XG4gICAgaWYgKENvb2tpZXMuaGFzKFwicWFyYXZlbC1nZHByLWFjY2VwdFwiKSAhPT0gdHJ1ZSkge1xuICAgICAgTm90aWZ5LmNyZWF0ZSh7XG4gICAgICAgIG1lc3NhZ2U6XG4gICAgICAgICAgXCJXZSB1c2UgY29va2llcyB0byBpbXByb3ZlIHVzZXIgZXhwZXJpZW5jZSwgbWFuYWdlIHVzZXIgc2Vzc2lvbnMgYW5kIGFuYWx5emUgd2Vic2l0ZSB0cmFmZmljLiBCeSBjbGlja2luZyDigJxBY2NlcHTigJ0geW91IGNvbnNlbnQgdG8gc3RvcmUgb24geW91ciBkZXZpY2UgYWxsIHRoZSB0ZWNobm9sb2dpZXMgZGVzY3JpYmVkIGluIG91ciBDb29raWUgUG9saWN5LiBQbGVhc2UgcmVhZCBvdXIgVGVybXMgYW5kIENvbmRpdGlvbnMgYW5kIFByaXZhY3kgUG9saWN5IGZvciBmdWxsIGRldGFpbHMgYnkgY2xpY2tpbmcgdGhlIExlYXJuIE1vcmUgYnV0dG9uLlwiLFxuICAgICAgICBtdWx0aWxpbmU6IHRydWUsXG4gICAgICAgIGNsYXNzZXM6IFwiYmctZ3JleS0xMFwiLFxuICAgICAgICB0aW1lb3V0OiAwLFxuICAgICAgICBwb3NpdGlvbjogXCJib3R0b20tcmlnaHRcIixcbiAgICAgICAgYWN0aW9uczogW1xuICAgICAgICAgIHtcbiAgICAgICAgICAgIGxhYmVsOiBcIkFjY2VwdFwiLFxuICAgICAgICAgICAgY29sb3I6IFwieWVsbG93XCIsXG4gICAgICAgICAgICBoYW5kbGVyKCkge1xuICAgICAgICAgICAgICBDb29raWVzLnNldChcInFhcmF2ZWwtZ2Rwci1hY2NlcHRcIiwgdHJ1ZSwge1xuICAgICAgICAgICAgICAgIGV4cGlyZXM6IDUgKiAzNjUsXG4gICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgfSxcbiAgICAgICAgICB9LFxuICAgICAgICAgIHtcbiAgICAgICAgICAgIGxhYmVsOiBcIkxlYXJuIG1vcmVcIixcbiAgICAgICAgICAgIGNvbG9yOiBcImdyZXlcIixcbiAgICAgICAgICAgIG5vRGlzbWlzczogdHJ1ZSxcbiAgICAgICAgICAgIGhhbmRsZXIoKSB7XG4gICAgICAgICAgICAgIG9wZW5VUkwocHJvY2Vzcy5lbnYuQ09PS0lFX1VSTCk7XG4gICAgICAgICAgICB9LFxuICAgICAgICAgIH0sXG4gICAgICAgIF0sXG4gICAgICB9KTtcbiAgICB9XG4gIH0sXG4gIGFwcDoge30sXG4gIGNsb3NlRGF0ZShyZWZzKSB7XG4gICAgT2JqZWN0LmtleXMocmVmcykuZm9yRWFjaCgocmVmKSA9PiB7XG4gICAgICBpZiAocmVmLmluZGV4T2YoXCJkc19cIikgIT09IC0xKSB7XG4gICAgICAgIHJlZnNbcmVmXS5oaWRlKCk7XG4gICAgICB9XG4gICAgfSk7XG4gIH0sXG4gIGNvbmZpcm0obXNnLCBvKSB7XG4gICAgY29uc29sZS5mdW5jKFwic2VydmljZXMvY29yZTpjb25maXJtKClcIiwgYXJndW1lbnRzKTtcbiAgICByZXR1cm4gbmV3IFByb21pc2UoKHJlc29sdmUsIHJlamVjdCkgPT4ge1xuICAgICAgdmFyIHN0ck1zZyA9IFtdO1xuICAgICAgaWYgKHR5cGVvZiBtc2cgPT09IFwib2JqZWN0XCIpIHtcbiAgICAgICAgc3RyTXNnLnB1c2gobXNnLm1lc3NhZ2UpO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgc3RyTXNnLnB1c2gobXNnKTtcbiAgICAgIH1cblxuICAgICAgRGlhbG9nLmNyZWF0ZSh7XG4gICAgICAgIGNvbXBvbmVudDogQmFzZUFsZXJ0LFxuICAgICAgICBjb21wb25lbnRQcm9wczoge1xuICAgICAgICAgIG1zZzogc3RyTXNnLFxuICAgICAgICAgIGljb246IFwid2FybmluZ1wiLFxuICAgICAgICAgIHRpdGxlOiBvICYmIG8udGl0bGUgPyBvLnRpdGxlIDogXCJQbGVhc2UgQ29uZmlybVwiLFxuICAgICAgICAgIHN1YlRpdGxlOiBvICYmIG8uc3ViVGl0bGUgPyBvLnN1YlRpdGxlIDogZmFsc2UsXG4gICAgICAgICAgb2s6IHtcbiAgICAgICAgICAgIGxhYmVsOiBvICYmIG8ub2sgPyBvLm9rIDogXCJDb25maXJtXCIsXG4gICAgICAgICAgICBjb2xvcjogbyAmJiBvLm9rQ29sb3IgPyBvLm9rQ29sb3IgOiBcInBvc2l0aXZlXCIsXG4gICAgICAgICAgfSxcbiAgICAgICAgICBjYW5jZWw6IHtcbiAgICAgICAgICAgIGxhYmVsOiBvICYmIG8uY2FuY2VsID8gby5jYW5jZWwgOiBcIkNhbmNlbFwiLFxuICAgICAgICAgICAgY29sb3I6IG8gJiYgby5jYW5jZWxDb2xvciA/IG8uY2FuY2VsQ29sb3IgOiBcImdyZXlcIixcbiAgICAgICAgICB9LFxuICAgICAgICB9LFxuICAgICAgfSlcbiAgICAgICAgLm9uT2soKCkgPT4ge1xuICAgICAgICAgIHJlc29sdmUoXCJva1wiKTtcbiAgICAgICAgfSlcbiAgICAgICAgLm9uQ2FuY2VsKCgpID0+IHtcbiAgICAgICAgICByZWplY3QoXCJjYW5jZWxcIik7XG4gICAgICAgIH0pO1xuICAgIH0pO1xuICB9LFxuICBlcnJvcihtc2csIG8pIHtcbiAgICBjb25zb2xlLmZ1bmMoXCJzZXJ2aWNlcy9jb3JlOmVycm9yKClcIiwgYXJndW1lbnRzKTtcbiAgICB2YXIgc3RyTXNnID0gW107XG4gICAgaWYgKHR5cGVvZiBtc2cgPT09IFwib2JqZWN0XCIpIHtcbiAgICAgIGlmIChtc2cuZXJyb3JzKSB7XG4gICAgICAgIE9iamVjdC5rZXlzKG1zZy5lcnJvcnMpLmZvckVhY2goZnVuY3Rpb24gKGtleSkge1xuICAgICAgICAgIGlmICh0eXBlb2YgbXNnLmVycm9yc1trZXldID09PSBcInN0cmluZ1wiKSB7XG4gICAgICAgICAgICBzdHJNc2cucHVzaCh7XG4gICAgICAgICAgICAgIGljb246IFwiZXhjbGFtYXRpb24tY2lyY2xlXCIsXG4gICAgICAgICAgICAgIHRleHQ6IG1zZy5lcnJvcnNba2V5XSxcbiAgICAgICAgICAgIH0pO1xuICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBtc2cuZXJyb3JzW2tleV0uZm9yRWFjaCgodmFsKSA9PiB7XG4gICAgICAgICAgICAgIHN0ck1zZy5wdXNoKHtcbiAgICAgICAgICAgICAgICBjb2xvcjogXCJuZWdhdGl2ZVwiLFxuICAgICAgICAgICAgICAgIGljb246IFwiZXhjbGFtYXRpb24tY2lyY2xlXCIsXG4gICAgICAgICAgICAgICAgdGV4dDogdmFsLFxuICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICAgIH1cbiAgICAgICAgfSk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBzdHJNc2cucHVzaChtc2cubWVzc2FnZSk7XG4gICAgICB9XG4gICAgfSBlbHNlIHtcbiAgICAgIHN0ck1zZy5wdXNoKG1zZyk7XG4gICAgfVxuXG4gICAgRGlhbG9nLmNyZWF0ZSh7XG4gICAgICBjb21wb25lbnQ6IEJhc2VBbGVydCxcbiAgICAgIGNvbXBvbmVudFByb3BzOiB7XG4gICAgICAgIG1zZzogc3RyTXNnLFxuICAgICAgICBpY29uOiBcImVycm9yXCIsXG4gICAgICAgIHRpdGxlOiBvICYmIG8udGl0bGUgPyBvLnRpdGxlIDogXCJFcnJvclwiLFxuICAgICAgfSxcbiAgICB9KS5vbk9rKCgpID0+IHtcbiAgICAgIGNvbnNvbGUubG9nKFwiT0tcIik7XG4gICAgfSk7XG4gIH0sXG4gIHN1Y2Nlc3MobXNnLCBvKSB7XG4gICAgY29uc29sZS5mdW5jKFwic2VydmljZXMvY29yZTpzdWNjZXNzKClcIiwgYXJndW1lbnRzKTtcbiAgICBEaWFsb2cuY3JlYXRlKHtcbiAgICAgIGNvbXBvbmVudDogQmFzZUFsZXJ0LFxuICAgICAgY29tcG9uZW50UHJvcHM6IHtcbiAgICAgICAgbXNnOiBtc2csXG4gICAgICAgIGljb246IG8gJiYgby5pY29uID8gby5pY29uIDogXCJzdWNjZXNzXCIsXG4gICAgICAgIHRpdGxlOiBvICYmIG8udGl0bGUgPyBvLnRpdGxlIDogXCJTdWNjZXNzXCIsXG4gICAgICB9LFxuICAgIH0pLm9uT2soKCkgPT4ge1xuICAgICAgY29uc29sZS5sb2coXCJPS1wiKTtcbiAgICB9KTtcbiAgfSxcbiAgcmFuZG9tKG1pbiwgbWF4KSB7XG4gICAgcmV0dXJuIE1hdGguZmxvb3IoTWF0aC5yYW5kb20oKSAqIChtYXggLSBtaW4gKyAxKSArIG1pbik7XG4gIH0sXG4gIGRhdGEobWluLCBtYXgsIGxpbWl0KSB7XG4gICAgY29uc3QgZGF0YSA9IFtdO1xuICAgIGZvciAobGV0IGkgPSAwOyBpIDw9IGxpbWl0OyBpKyspIHtcbiAgICAgIGRhdGEucHVzaCh0aGlzLnJhbmRvbShtaW4sIG1heCkpO1xuICAgIH1cbiAgICByZXR1cm4gZGF0YTtcbiAgfSxcbiAgc2x1ZyhvYmopIHtcbiAgICByZXR1cm4gb2JqXG4gICAgICAudG9TdHJpbmcoKVxuICAgICAgLnRyaW0oKVxuICAgICAgLnRvTG93ZXJDYXNlKClcbiAgICAgIC5yZXBsYWNlKC8gL2csIFwiLVwiKVxuICAgICAgLnJlcGxhY2UoL1teXFx3LV0rL2csIFwiXCIpO1xuICB9LFxuICBjYXRlZ29yeShsaXN0LCBrZXkpIHtcbiAgICByZXR1cm4gbGlzdC5tYXAoKGVsZW1lbnQpID0+IGVsZW1lbnRba2V5XSkuam9pbihcIiwgXCIpO1xuICB9LFxuICBhc3luYyBpbXBvcnRTY3JpcHQoc3JjKSB7XG4gICAgcmV0dXJuIG5ldyBQcm9taXNlKChyZXNvbHZlLCByZWplY3QpID0+IHtcbiAgICAgIGNvbnN0IHNjcmlwdCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJzY3JpcHRcIik7XG4gICAgICBzY3JpcHQuYXN5bmMgPSB0cnVlO1xuICAgICAgc2NyaXB0LnNyYyA9IHNyYztcbiAgICAgIHNjcmlwdC5hZGRFdmVudExpc3RlbmVyKFwibG9hZFwiLCAoZXZlbnQpID0+IHtcbiAgICAgICAgcmVzb2x2ZSgpO1xuICAgICAgfSk7XG4gICAgICBzY3JpcHQuYWRkRXZlbnRMaXN0ZW5lcihcImVycm9yXCIsICgpID0+XG4gICAgICAgIHJlamVjdCgnRXJyb3IgbG9hZGluZyBzY3JpcHQgXCInICsgc3JjICsgJ1wiJylcbiAgICAgICk7XG4gICAgICBzY3JpcHQuYWRkRXZlbnRMaXN0ZW5lcihcImFib3J0XCIsICgpID0+XG4gICAgICAgIHJlamVjdCgnU2NyaXB0IGxvYWRpbmcgYWJvcnRlZCBmb3IgXCInICsgc3JjICsgJ1wiJylcbiAgICAgICk7XG4gICAgICBkb2N1bWVudC5oZWFkLmFwcGVuZENoaWxkKHNjcmlwdCk7XG4gICAgfSk7XG4gIH0sXG4gIHdyYXBDc3ZWYWx1ZSh2YWwsIGZvcm1hdEZuKSB7XG4gICAgbGV0IGZvcm1hdHRlZCA9IGZvcm1hdEZuICE9PSB1bmRlZmluZWQgPyBmb3JtYXRGbih2YWwpIDogdmFsO1xuXG4gICAgZm9ybWF0dGVkID1cbiAgICAgIGZvcm1hdHRlZCA9PT0gdW5kZWZpbmVkIHx8IGZvcm1hdHRlZCA9PT0gbnVsbCA/IFwiXCIgOiBTdHJpbmcoZm9ybWF0dGVkKTtcblxuICAgIGZvcm1hdHRlZCA9IGZvcm1hdHRlZC5zcGxpdCgnXCInKS5qb2luKCdcIlwiJyk7XG4gICAgLyoqXG4gICAgICogRXhjZWwgYWNjZXB0cyBcXG4gYW5kIFxcciBpbiBzdHJpbmdzLCBidXQgc29tZSBvdGhlciBDU1YgcGFyc2VycyBkbyBub3RcbiAgICAgKiBVbmNvbW1lbnQgdGhlIG5leHQgdHdvIGxpbmVzIHRvIGVzY2FwZSBuZXcgbGluZXNcbiAgICAgKi9cbiAgICAvLyAuc3BsaXQoJ1xcbicpLmpvaW4oJ1xcXFxuJylcbiAgICAvLyAuc3BsaXQoJ1xccicpLmpvaW4oJ1xcXFxyJylcblxuICAgIHJldHVybiBgXCIke2Zvcm1hdHRlZH1cImA7XG4gIH0sXG4gIGV4cG9ydCh0YWJsZSwgbmFtZSwgdHlwZSA9IFwidGV4dC9jc3ZcIikge1xuICAgIGNvbnN0IGNvbnRlbnQgPSBbdGFibGUuY29sdW1ucy5tYXAoKGNvbCkgPT4gdGhpcy53cmFwQ3N2VmFsdWUoY29sLmxhYmVsKSldXG4gICAgICAuY29uY2F0KFxuICAgICAgICB0YWJsZS5kYXRhLm1hcCgocm93KSA9PlxuICAgICAgICAgIHRhYmxlLmNvbHVtbnNcbiAgICAgICAgICAgIC5tYXAoKGNvbCkgPT5cbiAgICAgICAgICAgICAgdGhpcy53cmFwQ3N2VmFsdWUoXG4gICAgICAgICAgICAgICAgdHlwZW9mIGNvbC5maWVsZCA9PT0gXCJmdW5jdGlvblwiXG4gICAgICAgICAgICAgICAgICA/IGNvbC5maWVsZChyb3cpXG4gICAgICAgICAgICAgICAgICA6IHJvd1tjb2wuZmllbGQgPT09IHVuZGVmaW5lZCA/IGNvbC5uYW1lIDogY29sLmZpZWxkXSxcbiAgICAgICAgICAgICAgICBjb2wuZm9ybWF0XG4gICAgICAgICAgICAgIClcbiAgICAgICAgICAgIClcbiAgICAgICAgICAgIC5qb2luKFwiLFwiKVxuICAgICAgICApXG4gICAgICApXG4gICAgICAuam9pbihcIlxcclxcblwiKTtcblxuICAgIGNvbnN0IHN0YXR1cyA9IGV4cG9ydEZpbGUobmFtZSArIFwiX1wiICsgRGF0ZS5ub3coKSArIFwiLmNzdlwiLCBjb250ZW50LCB0eXBlKTtcblxuICAgIGlmIChzdGF0dXMgIT09IHRydWUpIHtcbiAgICAgIE5vdGlmeS5jcmVhdGUoe1xuICAgICAgICBtZXNzYWdlOiBcIkJyb3dzZXIgZGVuaWVkIGZpbGUgZG93bmxvYWQuLi5cIixcbiAgICAgICAgY29sb3I6IFwibmVnYXRpdmVcIixcbiAgICAgICAgaWNvbjogXCJ3YXJuaW5nXCIsXG4gICAgICB9KTtcbiAgICB9XG4gIH0sXG4gIGI2NHRvQmxvYihiNjREYXRhLCBjb250ZW50VHlwZSA9IFwiXCIsIHNsaWNlU2l6ZSA9IDUxMikge1xuICAgIGNvbnN0IGJ5dGVDaGFyYWN0ZXJzID0gYXRvYihiNjREYXRhKTtcbiAgICBjb25zdCBieXRlQXJyYXlzID0gW107XG5cbiAgICBmb3IgKGxldCBvZmZzZXQgPSAwOyBvZmZzZXQgPCBieXRlQ2hhcmFjdGVycy5sZW5ndGg7IG9mZnNldCArPSBzbGljZVNpemUpIHtcbiAgICAgIGNvbnN0IHNsaWNlID0gYnl0ZUNoYXJhY3RlcnMuc2xpY2Uob2Zmc2V0LCBvZmZzZXQgKyBzbGljZVNpemUpO1xuXG4gICAgICBjb25zdCBieXRlTnVtYmVycyA9IG5ldyBBcnJheShzbGljZS5sZW5ndGgpO1xuICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBzbGljZS5sZW5ndGg7IGkrKykge1xuICAgICAgICBieXRlTnVtYmVyc1tpXSA9IHNsaWNlLmNoYXJDb2RlQXQoaSk7XG4gICAgICB9XG5cbiAgICAgIGNvbnN0IGJ5dGVBcnJheSA9IG5ldyBVaW50OEFycmF5KGJ5dGVOdW1iZXJzKTtcbiAgICAgIGJ5dGVBcnJheXMucHVzaChieXRlQXJyYXkpO1xuICAgIH1cblxuICAgIGNvbnN0IGJsb2IgPSBuZXcgQmxvYihieXRlQXJyYXlzLCB7XG4gICAgICB0eXBlOiBjb250ZW50VHlwZSxcbiAgICB9KTtcbiAgICByZXR1cm4gYmxvYjtcbiAgfSxcbiAgZ2V0QmxvYlVSTChkYXRhKSB7XG4gICAgY29uc3QgYmxvYiA9IHRoaXMuYjY0dG9CbG9iKGRhdGEsIFwidGV4dC9wbGFpblwiKTtcbiAgICBjb25zdCB1cmwgPSBVUkwuY3JlYXRlT2JqZWN0VVJMKGJsb2IpO1xuICAgIHNldFRpbWVvdXQoKCkgPT4ge1xuICAgICAgVVJMLnJldm9rZU9iamVjdFVSTCh1cmwpO1xuICAgIH0sIDEwMDAwKTtcbiAgICByZXR1cm4gdXJsO1xuICB9LFxuICBnZXREYXRlKGQpIHtcbiAgICBpZiAoZCAmJiB0eXBlb2YgZCA9PT0gXCJzdHJpbmdcIikge1xuICAgICAgaWYgKGQuaW5kZXhPZihcIi1cIikgIT09IC0xKSB7XG4gICAgICAgIGQgPSBkYXRlLmV4dHJhY3REYXRlKGQsIFwiWVlZWS1NTS1ERFwiKTtcbiAgICAgIH0gZWxzZSBpZiAoZC5pbmRleE9mKFwiL1wiKSAhPT0gLTEpIHtcbiAgICAgICAgZCA9IGRhdGUuZXh0cmFjdERhdGUoZCwgXCJERC9NTS9ZWVlZXCIpO1xuICAgICAgfVxuICAgIH0gZWxzZSBpZiAoIWQgfHwgdHlwZW9mIGQgPT09IFwic3RyaW5nXCIpIHtcbiAgICAgIGQgPSBuZXcgRGF0ZSgpO1xuICAgIH1cblxuICAgIHJldHVybiBkO1xuICB9LFxuICBsZW5ndGgob2JqLCBvKSB7XG4gICAgdmFyIGxlbiA9IDA7XG4gICAgaWYgKG9iaiAmJiB0eXBlb2Ygb2JqLmxlbmd0aCA9PT0gXCJ1bmRlZmluZWRcIikge1xuICAgICAgT2JqZWN0LmtleXMob2JqKS5mb3JFYWNoKGZ1bmN0aW9uIChrZXkpIHtcbiAgICAgICAgbGVuKys7XG4gICAgICB9KTtcbiAgICB9IGVsc2UgaWYgKG9iaikge1xuICAgICAgbGVuID0gb2JqLmxlbmd0aDtcbiAgICB9XG4gICAgcmV0dXJuIGxlbjtcbiAgfSxcbiAgc29ydChhcnIsIGZpZWxkLCBkaXIpIHtcbiAgICBjb25zb2xlLmxvZyhcImNvcmUuc29ydCgpXCIsIGFyZ3VtZW50cyk7XG4gICAgaWYgKGRpcikge1xuICAgICAgcmV0dXJuIGFyci5zb3J0KChhLCBiKSA9PlxuICAgICAgICBhW2ZpZWxkXSA+IGJbZmllbGRdID8gMSA6IGJbZmllbGRdID4gYVtmaWVsZF0gPyAtMSA6IDBcbiAgICAgICk7XG4gICAgfSBlbHNlIHtcbiAgICAgIHJldHVybiBhcnIuc29ydCgoYSwgYikgPT5cbiAgICAgICAgYVtmaWVsZF0gPiBiW2ZpZWxkXSA/IC0xIDogYltmaWVsZF0gPiBhW2ZpZWxkXSA/IDEgOiAwXG4gICAgICApO1xuICAgIH1cbiAgfSxcbiAgaHVtYW5TaXplKG51bWJlcikge1xuICAgIHJldHVybiBodW1hblN0b3JhZ2VTaXplKG51bWJlcik7XG4gIH0sXG4gIGNhcGl0YWxpemUodGV4dCkge1xuICAgIGlmICh0ZXh0KSB7XG4gICAgICByZXR1cm4gY2FwaXRhbGl6ZSh0ZXh0KTtcbiAgICB9IGVsc2Uge1xuICAgICAgcmV0dXJuIHRleHQ7XG4gICAgfVxuICB9LFxuICB2YWxpZDoge1xuICAgIGVtYWlsOiBmdW5jdGlvbiAoZW1haWwpIHtcbiAgICAgIHZhciByZSA9XG4gICAgICAgIC9eKChbXjw+KClbXFxdXFxcXC4sOzpcXHNAJ10rKFxcLltePD4oKVtcXF1cXFxcLiw7Olxcc0AnXSspKil8KFwiLitcIikpQCgoXFxbWzAtOV17MSwzfVxcLlswLTldezEsM31cXC5bMC05XXsxLDN9XFwuWzAtOV17MSwzfVxcXSl8KChbYS16QS1aXFwtMC05XStcXC4pK1thLXpBLVpdezIsfSkpJC87XG4gICAgICByZXR1cm4gcmUudGVzdChlbWFpbCk7XG4gICAgfSxcbiAgfSxcbiAgZm9ybWF0RGF0ZShkLCB0eXBlKSB7XG4gICAgdmFyIGZvcm1hdCA9IFwiREQvTU0vWVlZWVwiO1xuXG4gICAgc3dpdGNoICh0eXBlKSB7XG4gICAgICBjYXNlIFwic3FsXCI6XG4gICAgICAgIGZvcm1hdCA9IFwiWVlZWS1NTS1ERFwiO1xuICAgICAgICBicmVhaztcbiAgICB9XG4gICAgaWYgKGQgJiYgdHlwZW9mIGQgPT09IFwic3RyaW5nXCIpIHtcbiAgICAgIGQgPSB0aGlzLmdldERhdGUoZCk7XG4gICAgfVxuICAgIGlmICh0eXBlb2YgZC5nZXRNb250aCA9PT0gXCJmdW5jdGlvblwiKSB7XG4gICAgICBkID0gZGF0ZS5mb3JtYXREYXRlKGQsIGZvcm1hdCk7XG4gICAgfVxuXG4gICAgcmV0dXJuIGQ7XG4gIH0sXG4gIG9wZW5VUkwodXJsKSB7XG4gICAgY29uc29sZS5mdW5jKFwic2VydmljZXMvY29yZTpvcGVuVVJMKClcIiwgYXJndW1lbnRzKTtcbiAgICBvcGVuVVJMKHVybCk7XG4gIH0sXG4gIHVpZCgpIHtcbiAgICBjb25zb2xlLmZ1bmMoXCJzZXJ2aWNlcy9jb3JlOnVpZCgpXCIsIGFyZ3VtZW50cyk7XG4gICAgcmV0dXJuIHVpZCgpO1xuICB9LFxuICBkYXRhVVJMdG9GaWxlKGRhdGF1cmwsIGZpbGVuYW1lKSB7XG4gICAgY29uc29sZS5mdW5jKFwic2VydmljZXMvY29yZTpkYXRhVVJMdG9GaWxlKClcIiwgYXJndW1lbnRzKTtcbiAgICB2YXIgYXJyID0gZGF0YXVybC5zcGxpdChcIixcIiksXG4gICAgICBtaW1lID0gYXJyWzBdLm1hdGNoKC86KC4qPyk7LylbMV0sXG4gICAgICBic3RyID0gYXRvYihhcnJbMV0pLFxuICAgICAgbiA9IGJzdHIubGVuZ3RoLFxuICAgICAgdThhcnIgPSBuZXcgVWludDhBcnJheShuKTtcblxuICAgIHdoaWxlIChuLS0pIHtcbiAgICAgIHU4YXJyW25dID0gYnN0ci5jaGFyQ29kZUF0KG4pO1xuICAgIH1cblxuICAgIHJldHVybiBuZXcgRmlsZShbdThhcnJdLCBmaWxlbmFtZSwgeyB0eXBlOiBtaW1lIH0pO1xuICB9LFxuICBjb21iaW5hdGlvbnMoLi4uYXJncykge1xuICAgIHZhciByID0gW10sXG4gICAgICBtYXggPSBhcmdzLmxlbmd0aCAtIDE7XG4gICAgZnVuY3Rpb24gaGVscGVyKGFyciwgaSkge1xuICAgICAgZm9yICh2YXIgaiA9IDAsIGwgPSBhcmdzW2ldLmxlbmd0aDsgaiA8IGw7IGorKykge1xuICAgICAgICB2YXIgYSA9IGFyci5zbGljZSgwKTtcbiAgICAgICAgYS5wdXNoKGFyZ3NbaV1bal0pO1xuICAgICAgICBpZiAoaSA9PT0gbWF4KSB7XG4gICAgICAgICAgci5wdXNoKGEpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIGhlbHBlcihhLCBpICsgMSk7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9XG4gICAgaGVscGVyKFtdLCAwKTtcbiAgICByZXR1cm4gcjtcbiAgfSxcbiAgbW9uZXkodmFsdWUsIGNvbmZpZyA9IHt9KSB7XG4gICAgcmV0dXJuIHRoaXMuZm9ybWF0TnVtYmVyKHZhbHVlLCBjb25maWcpO1xuICB9LFxuICBmb3JtYXROdW1iZXIodmFsdWUsIGNvbmZpZyA9IHt9KSB7XG4gICAgLy8gUGFja2FnZTogVnVlIE51bWJlciBGb3JtYXRcbiAgICAvLyBEb2NzOiBodHRwczovL3Z1ZS1udW1iZXItZm9ybWF0Lm5ldGxpZnkuYXBwL2d1aWRlL2NvbmZpZy5odG1sXG4gICAgY29uc3Qgb3B0aW9ucyA9IE9iamVjdC5hc3NpZ24oXG4gICAgICB7XG4gICAgICAgIHByZWZpeDogXCLCo1wiLFxuICAgICAgICByZXZlcnNlRmlsbDogdHJ1ZSxcbiAgICAgICAgcHJlY2lzaW9uOiAyLFxuICAgICAgfSxcbiAgICAgIGNvbmZpZ1xuICAgICk7XG4gICAgY29uc3QgaW50ZWdlciA9IHBhcnNlSW50KFxuICAgICAgKE51bWJlcih2YWx1ZSkudG9GaXhlZChvcHRpb25zLnByZWNpc2lvbikgKlxuICAgICAgICBOdW1iZXIoYDFlJHtvcHRpb25zLnByZWNpc2lvbiArIDF9YCkpIC9cbiAgICAgICAgMTBcbiAgICApO1xuICAgIHJldHVybiBuZXcgTnVtYmVyRm9ybWF0KG9wdGlvbnMpLmZvcm1hdChpbnRlZ2VyKTtcbiAgfSxcbiAgZGVib3VuY2UoZnVuYywgd2FpdCwgaW1tZWRpYXRlKSB7XG4gICAgY29uc29sZS5mdW5jKFwic2VydmljZXMvY29yZTpkZWJvdW5jZSgpXCIsIGFyZ3VtZW50cyk7XG4gICAgaWYgKGltbWVkaWF0ZSkge1xuICAgICAgcmV0dXJuIGZ1bmMuY2FsbCgpO1xuICAgIH1cbiAgICBjbGVhclRpbWVvdXQoZW1pdFRpbWVyKTtcbiAgICBlbWl0VGltZXIgPSBzZXRUaW1lb3V0KCgpID0+IHtcbiAgICAgIHJldHVybiBmdW5jLmNhbGwoKTtcbiAgICB9LCB3YWl0KTtcbiAgfSxcbiAgY29weVRvQ2xpcGJvYXJkKHRleHQsIG1lc3NhZ2UpIHtcbiAgICBjb25zb2xlLmZ1bmMoXCJzZXJ2aWNlcy9jb3JlOmNvcHlUb0NsaXBib2FyZCgpXCIsIGFyZ3VtZW50cyk7XG4gICAgY29weVRvQ2xpcGJvYXJkKHRleHQpLnRoZW4oKCkgPT4ge1xuICAgICAgTm90aWZ5LmNyZWF0ZSh7XG4gICAgICAgIG1lc3NhZ2U6IG1lc3NhZ2UgfHwgXCJTdWNjZXNzZnVsbHkgY29wcGllZCB0byBjbGlwYm9hcmQuXCIsXG4gICAgICB9KTtcbiAgICB9KTtcbiAgfSxcbiAgZXJyb3JNZXNzYWdlKGtleSwgZXJyb3JzKSB7XG4gICAgcmV0dXJuIHRoaXMuaGFzRXJyb3Ioa2V5LCBlcnJvcnMpID8gZXJyb3JzW2tleV0uam9pbihcIiwgXCIpIDogXCJcIjtcbiAgfSxcbiAgaGFzRXJyb3Ioa2V5LCBlcnJvcnMpIHtcbiAgICByZXR1cm4ga2V5IGluIGVycm9ycztcbiAgfSxcbiAgZ2V0TG9jYXRpb24oKSB7XG4gICAgcmV0dXJuIG5ldyBQcm9taXNlKGZ1bmN0aW9uIChyZXNvbHZlLCByZWplY3QpIHtcbiAgICAgIG5hdmlnYXRvci5nZW9sb2NhdGlvbi5nZXRDdXJyZW50UG9zaXRpb24oXG4gICAgICAgIChwb3NpdGlvbikgPT4gcmVzb2x2ZShwb3NpdGlvbiksXG4gICAgICAgIChlcnJvcikgPT4gcmVqZWN0KGVycm9yKVxuICAgICAgKTtcbiAgICB9KTtcbiAgfSxcbn07XG4iLCJpbXBvcnQgeyBoLCByZWYsIGNvbXB1dGVkLCBvbk1vdW50ZWQsIG9uQmVmb3JlVW5tb3VudCwgZ2V0Q3VycmVudEluc3RhbmNlIH0gZnJvbSAndnVlJ1xuXG5pbXBvcnQgeyBjcmVhdGVDb21wb25lbnQgfSBmcm9tICcuLi8uLi91dGlscy9wcml2YXRlL2NyZWF0ZS5qcydcbmltcG9ydCB7IGJldHdlZW4gfSBmcm9tICcuLi8uLi91dGlscy9mb3JtYXQuanMnXG5cbmNvbnN0XG4gIHhociA9IF9fUVVBU0FSX1NTUl9TRVJWRVJfXyA/IG51bGwgOiBYTUxIdHRwUmVxdWVzdCxcbiAgb3BlbiA9IF9fUVVBU0FSX1NTUl9TRVJWRVJfXyA/IG51bGwgOiB4aHIucHJvdG90eXBlLm9wZW4sXG4gIHBvc2l0aW9uVmFsdWVzID0gWyAndG9wJywgJ3JpZ2h0JywgJ2JvdHRvbScsICdsZWZ0JyBdXG5cbmxldCBzdGFjayA9IFtdXG5sZXQgaGlnaGphY2tDb3VudCA9IDBcblxuZnVuY3Rpb24gdHJhbnNsYXRlICh7IHAsIHBvcywgYWN0aXZlLCBob3JpeiwgcmV2ZXJzZSwgZGlyIH0pIHtcbiAgbGV0IHggPSAxLCB5ID0gMVxuXG4gIGlmIChob3JpeiA9PT0gdHJ1ZSkge1xuICAgIGlmIChyZXZlcnNlID09PSB0cnVlKSB7IHggPSAtMSB9XG4gICAgaWYgKHBvcyA9PT0gJ2JvdHRvbScpIHsgeSA9IC0xIH1cbiAgICByZXR1cm4geyB0cmFuc2Zvcm06IGB0cmFuc2xhdGUzZCgkeyB4ICogKHAgLSAxMDApIH0lLCR7IGFjdGl2ZSA/IDAgOiB5ICogLTIwMCB9JSwwKWAgfVxuICB9XG5cbiAgaWYgKHJldmVyc2UgPT09IHRydWUpIHsgeSA9IC0xIH1cbiAgaWYgKHBvcyA9PT0gJ3JpZ2h0JykgeyB4ID0gLTEgfVxuICByZXR1cm4geyB0cmFuc2Zvcm06IGB0cmFuc2xhdGUzZCgkeyBhY3RpdmUgPyAwIDogZGlyICogeCAqIC0yMDAgfSUsJHsgeSAqIChwIC0gMTAwKSB9JSwwKWAgfVxufVxuXG5mdW5jdGlvbiBpbmMgKHAsIGFtb3VudCkge1xuICBpZiAodHlwZW9mIGFtb3VudCAhPT0gJ251bWJlcicpIHtcbiAgICBpZiAocCA8IDI1KSB7XG4gICAgICBhbW91bnQgPSBNYXRoLnJhbmRvbSgpICogMyArIDNcbiAgICB9XG4gICAgZWxzZSBpZiAocCA8IDY1KSB7XG4gICAgICBhbW91bnQgPSBNYXRoLnJhbmRvbSgpICogM1xuICAgIH1cbiAgICBlbHNlIGlmIChwIDwgODUpIHtcbiAgICAgIGFtb3VudCA9IE1hdGgucmFuZG9tKCkgKiAyXG4gICAgfVxuICAgIGVsc2UgaWYgKHAgPCA5OSkge1xuICAgICAgYW1vdW50ID0gMC42XG4gICAgfVxuICAgIGVsc2Uge1xuICAgICAgYW1vdW50ID0gMFxuICAgIH1cbiAgfVxuICByZXR1cm4gYmV0d2VlbihwICsgYW1vdW50LCAwLCAxMDApXG59XG5cbmZ1bmN0aW9uIGhpZ2hqYWNrQWpheCAoc3RhY2tFbnRyeSkge1xuICBoaWdoamFja0NvdW50KytcblxuICBzdGFjay5wdXNoKHN0YWNrRW50cnkpXG5cbiAgaWYgKGhpZ2hqYWNrQ291bnQgPiAxKSB7IHJldHVybiB9XG5cbiAgeGhyLnByb3RvdHlwZS5vcGVuID0gZnVuY3Rpb24gKF8sIHVybCkge1xuICAgIGNvbnN0IHN0b3BTdGFjayA9IFtdXG5cbiAgICBjb25zdCBsb2FkU3RhcnQgPSAoKSA9PiB7XG4gICAgICBzdGFjay5mb3JFYWNoKGVudHJ5ID0+IHtcbiAgICAgICAgaWYgKFxuICAgICAgICAgIGVudHJ5LmhpamFja0ZpbHRlci52YWx1ZSA9PT0gbnVsbFxuICAgICAgICAgIHx8IChlbnRyeS5oaWphY2tGaWx0ZXIudmFsdWUodXJsKSA9PT0gdHJ1ZSlcbiAgICAgICAgKSB7XG4gICAgICAgICAgZW50cnkuc3RhcnQoKVxuICAgICAgICAgIHN0b3BTdGFjay5wdXNoKGVudHJ5LnN0b3ApXG4gICAgICAgIH1cbiAgICAgIH0pXG4gICAgfVxuXG4gICAgY29uc3QgbG9hZEVuZCA9ICgpID0+IHtcbiAgICAgIHN0b3BTdGFjay5mb3JFYWNoKHN0b3AgPT4geyBzdG9wKCkgfSlcbiAgICB9XG5cbiAgICB0aGlzLmFkZEV2ZW50TGlzdGVuZXIoJ2xvYWRzdGFydCcsIGxvYWRTdGFydCwgeyBvbmNlOiB0cnVlIH0pXG4gICAgdGhpcy5hZGRFdmVudExpc3RlbmVyKCdsb2FkZW5kJywgbG9hZEVuZCwgeyBvbmNlOiB0cnVlIH0pXG5cbiAgICBvcGVuLmFwcGx5KHRoaXMsIGFyZ3VtZW50cylcbiAgfVxufVxuXG5mdW5jdGlvbiByZXN0b3JlQWpheCAoc3RhcnQpIHtcbiAgc3RhY2sgPSBzdGFjay5maWx0ZXIoZW50cnkgPT4gZW50cnkuc3RhcnQgIT09IHN0YXJ0KVxuXG4gIGhpZ2hqYWNrQ291bnQgPSBNYXRoLm1heCgwLCBoaWdoamFja0NvdW50IC0gMSlcbiAgaWYgKGhpZ2hqYWNrQ291bnQgPT09IDApIHtcbiAgICB4aHIucHJvdG90eXBlLm9wZW4gPSBvcGVuXG4gIH1cbn1cblxuZXhwb3J0IGRlZmF1bHQgY3JlYXRlQ29tcG9uZW50KHtcbiAgbmFtZTogJ1FBamF4QmFyJyxcblxuICBwcm9wczoge1xuICAgIHBvc2l0aW9uOiB7XG4gICAgICB0eXBlOiBTdHJpbmcsXG4gICAgICBkZWZhdWx0OiAndG9wJyxcbiAgICAgIHZhbGlkYXRvcjogdmFsID0+IHBvc2l0aW9uVmFsdWVzLmluY2x1ZGVzKHZhbClcbiAgICB9LFxuXG4gICAgc2l6ZToge1xuICAgICAgdHlwZTogU3RyaW5nLFxuICAgICAgZGVmYXVsdDogJzJweCdcbiAgICB9LFxuXG4gICAgY29sb3I6IFN0cmluZyxcbiAgICBza2lwSGlqYWNrOiBCb29sZWFuLFxuICAgIHJldmVyc2U6IEJvb2xlYW4sXG5cbiAgICBoaWphY2tGaWx0ZXI6IEZ1bmN0aW9uXG4gIH0sXG5cbiAgZW1pdHM6IFsgJ3N0YXJ0JywgJ3N0b3AnIF0sXG5cbiAgc2V0dXAgKHByb3BzLCB7IGVtaXQgfSkge1xuICAgIGNvbnN0IHsgcHJveHkgfSA9IGdldEN1cnJlbnRJbnN0YW5jZSgpXG5cbiAgICBjb25zdCBwcm9ncmVzcyA9IHJlZigwKVxuICAgIGNvbnN0IG9uU2NyZWVuID0gcmVmKGZhbHNlKVxuICAgIGNvbnN0IGFuaW1hdGUgPSByZWYodHJ1ZSlcblxuICAgIGxldCBzZXNzaW9ucyA9IDAsIHRpbWVyLCBzcGVlZFxuXG4gICAgY29uc3QgY2xhc3NlcyA9IGNvbXB1dGVkKCgpID0+XG4gICAgICBgcS1sb2FkaW5nLWJhciBxLWxvYWRpbmctYmFyLS0keyBwcm9wcy5wb3NpdGlvbiB9YFxuICAgICAgKyAocHJvcHMuY29sb3IgIT09IHZvaWQgMCA/IGAgYmctJHsgcHJvcHMuY29sb3IgfWAgOiAnJylcbiAgICAgICsgKGFuaW1hdGUudmFsdWUgPT09IHRydWUgPyAnJyA6ICcgbm8tdHJhbnNpdGlvbicpXG4gICAgKVxuXG4gICAgY29uc3QgaG9yaXpvbnRhbCA9IGNvbXB1dGVkKCgpID0+IHByb3BzLnBvc2l0aW9uID09PSAndG9wJyB8fCBwcm9wcy5wb3NpdGlvbiA9PT0gJ2JvdHRvbScpXG4gICAgY29uc3Qgc2l6ZVByb3AgPSBjb21wdXRlZCgoKSA9PiAoaG9yaXpvbnRhbC52YWx1ZSA9PT0gdHJ1ZSA/ICdoZWlnaHQnIDogJ3dpZHRoJykpXG5cbiAgICBjb25zdCBzdHlsZSA9IGNvbXB1dGVkKCgpID0+IHtcbiAgICAgIGNvbnN0IGFjdGl2ZSA9IG9uU2NyZWVuLnZhbHVlXG5cbiAgICAgIGNvbnN0IG9iaiA9IHRyYW5zbGF0ZSh7XG4gICAgICAgIHA6IHByb2dyZXNzLnZhbHVlLFxuICAgICAgICBwb3M6IHByb3BzLnBvc2l0aW9uLFxuICAgICAgICBhY3RpdmUsXG4gICAgICAgIGhvcml6OiBob3Jpem9udGFsLnZhbHVlLFxuICAgICAgICByZXZlcnNlOiBwcm94eS4kcS5sYW5nLnJ0bCA9PT0gdHJ1ZSAmJiBbICd0b3AnLCAnYm90dG9tJyBdLmluY2x1ZGVzKHByb3BzLnBvc2l0aW9uKVxuICAgICAgICAgID8gcHJvcHMucmV2ZXJzZSA9PT0gZmFsc2VcbiAgICAgICAgICA6IHByb3BzLnJldmVyc2UsXG4gICAgICAgIGRpcjogcHJveHkuJHEubGFuZy5ydGwgPT09IHRydWUgPyAtMSA6IDFcbiAgICAgIH0pXG5cbiAgICAgIG9ialsgc2l6ZVByb3AudmFsdWUgXSA9IHByb3BzLnNpemVcbiAgICAgIG9iai5vcGFjaXR5ID0gYWN0aXZlID8gMSA6IDBcblxuICAgICAgcmV0dXJuIG9ialxuICAgIH0pXG5cbiAgICBjb25zdCBhdHRyaWJ1dGVzID0gY29tcHV0ZWQoKCkgPT4gKFxuICAgICAgb25TY3JlZW4udmFsdWUgPT09IHRydWVcbiAgICAgICAgPyB7XG4gICAgICAgICAgICByb2xlOiAncHJvZ3Jlc3NiYXInLFxuICAgICAgICAgICAgJ2FyaWEtdmFsdWVtaW4nOiAwLFxuICAgICAgICAgICAgJ2FyaWEtdmFsdWVtYXgnOiAxMDAsXG4gICAgICAgICAgICAnYXJpYS12YWx1ZW5vdyc6IHByb2dyZXNzLnZhbHVlXG4gICAgICAgICAgfVxuICAgICAgICA6IHsgJ2FyaWEtaGlkZGVuJzogJ3RydWUnIH1cbiAgICApKVxuXG4gICAgZnVuY3Rpb24gc3RhcnQgKG5ld1NwZWVkID0gMzAwKSB7XG4gICAgICBjb25zdCBvbGRTcGVlZCA9IHNwZWVkXG4gICAgICBzcGVlZCA9IE1hdGgubWF4KDAsIG5ld1NwZWVkKSB8fCAwXG5cbiAgICAgIHNlc3Npb25zKytcblxuICAgICAgaWYgKHNlc3Npb25zID4gMSkge1xuICAgICAgICBpZiAob2xkU3BlZWQgPT09IDAgJiYgbmV3U3BlZWQgPiAwKSB7XG4gICAgICAgICAgcGxhbk5leHRTdGVwKClcbiAgICAgICAgfVxuICAgICAgICBlbHNlIGlmIChvbGRTcGVlZCA+IDAgJiYgbmV3U3BlZWQgPD0gMCkge1xuICAgICAgICAgIGNsZWFyVGltZW91dCh0aW1lcilcbiAgICAgICAgfVxuXG4gICAgICAgIHJldHVybiBzZXNzaW9uc1xuICAgICAgfVxuXG4gICAgICBjbGVhclRpbWVvdXQodGltZXIpXG4gICAgICBlbWl0KCdzdGFydCcpXG5cbiAgICAgIHByb2dyZXNzLnZhbHVlID0gMFxuXG4gICAgICB0aW1lciA9IHNldFRpbWVvdXQoKCkgPT4ge1xuICAgICAgICBhbmltYXRlLnZhbHVlID0gdHJ1ZVxuICAgICAgICBuZXdTcGVlZCA+IDAgJiYgcGxhbk5leHRTdGVwKClcbiAgICAgIH0sIG9uU2NyZWVuLnZhbHVlID09PSB0cnVlID8gNTAwIDogMSlcblxuICAgICAgaWYgKG9uU2NyZWVuLnZhbHVlICE9PSB0cnVlKSB7XG4gICAgICAgIG9uU2NyZWVuLnZhbHVlID0gdHJ1ZVxuICAgICAgICBhbmltYXRlLnZhbHVlID0gZmFsc2VcbiAgICAgIH1cblxuICAgICAgcmV0dXJuIHNlc3Npb25zXG4gICAgfVxuXG4gICAgZnVuY3Rpb24gaW5jcmVtZW50IChhbW91bnQpIHtcbiAgICAgIGlmIChzZXNzaW9ucyA+IDApIHtcbiAgICAgICAgcHJvZ3Jlc3MudmFsdWUgPSBpbmMocHJvZ3Jlc3MudmFsdWUsIGFtb3VudClcbiAgICAgIH1cblxuICAgICAgcmV0dXJuIHNlc3Npb25zXG4gICAgfVxuXG4gICAgZnVuY3Rpb24gc3RvcCAoKSB7XG4gICAgICBzZXNzaW9ucyA9IE1hdGgubWF4KDAsIHNlc3Npb25zIC0gMSlcbiAgICAgIGlmIChzZXNzaW9ucyA+IDApIHtcbiAgICAgICAgcmV0dXJuIHNlc3Npb25zXG4gICAgICB9XG5cbiAgICAgIGNsZWFyVGltZW91dCh0aW1lcilcbiAgICAgIGVtaXQoJ3N0b3AnKVxuXG4gICAgICBjb25zdCBlbmQgPSAoKSA9PiB7XG4gICAgICAgIGFuaW1hdGUudmFsdWUgPSB0cnVlXG4gICAgICAgIHByb2dyZXNzLnZhbHVlID0gMTAwXG4gICAgICAgIHRpbWVyID0gc2V0VGltZW91dCgoKSA9PiB7XG4gICAgICAgICAgb25TY3JlZW4udmFsdWUgPSBmYWxzZVxuICAgICAgICB9LCAxMDAwKVxuICAgICAgfVxuXG4gICAgICBpZiAocHJvZ3Jlc3MudmFsdWUgPT09IDApIHtcbiAgICAgICAgdGltZXIgPSBzZXRUaW1lb3V0KGVuZCwgMSlcbiAgICAgIH1cbiAgICAgIGVsc2Uge1xuICAgICAgICBlbmQoKVxuICAgICAgfVxuXG4gICAgICByZXR1cm4gc2Vzc2lvbnNcbiAgICB9XG5cbiAgICBmdW5jdGlvbiBwbGFuTmV4dFN0ZXAgKCkge1xuICAgICAgaWYgKHByb2dyZXNzLnZhbHVlIDwgMTAwKSB7XG4gICAgICAgIHRpbWVyID0gc2V0VGltZW91dCgoKSA9PiB7XG4gICAgICAgICAgaW5jcmVtZW50KClcbiAgICAgICAgICBwbGFuTmV4dFN0ZXAoKVxuICAgICAgICB9LCBzcGVlZClcbiAgICAgIH1cbiAgICB9XG5cbiAgICBsZXQgaGlqYWNrZWRcblxuICAgIG9uTW91bnRlZCgoKSA9PiB7XG4gICAgICBpZiAocHJvcHMuc2tpcEhpamFjayAhPT0gdHJ1ZSkge1xuICAgICAgICBoaWphY2tlZCA9IHRydWVcbiAgICAgICAgaGlnaGphY2tBamF4KHtcbiAgICAgICAgICBzdGFydCxcbiAgICAgICAgICBzdG9wLFxuICAgICAgICAgIGhpamFja0ZpbHRlcjogY29tcHV0ZWQoKCkgPT4gcHJvcHMuaGlqYWNrRmlsdGVyIHx8IG51bGwpXG4gICAgICAgIH0pXG4gICAgICB9XG4gICAgfSlcblxuICAgIG9uQmVmb3JlVW5tb3VudCgoKSA9PiB7XG4gICAgICBjbGVhclRpbWVvdXQodGltZXIpXG4gICAgICBoaWphY2tlZCA9PT0gdHJ1ZSAmJiByZXN0b3JlQWpheChzdGFydClcbiAgICB9KVxuXG4gICAgLy8gZXhwb3NlIHB1YmxpYyBtZXRob2RzXG4gICAgT2JqZWN0LmFzc2lnbihwcm94eSwgeyBzdGFydCwgc3RvcCwgaW5jcmVtZW50IH0pXG5cbiAgICByZXR1cm4gKCkgPT4gaCgnZGl2Jywge1xuICAgICAgY2xhc3M6IGNsYXNzZXMudmFsdWUsXG4gICAgICBzdHlsZTogc3R5bGUudmFsdWUsXG4gICAgICAuLi5hdHRyaWJ1dGVzLnZhbHVlXG4gICAgfSlcbiAgfVxufSlcbiIsImltcG9ydCB7IGgsIHJlZiB9IGZyb20gJ3Z1ZSdcblxuaW1wb3J0IGRlZmluZVJlYWN0aXZlUGx1Z2luIGZyb20gJy4uL3V0aWxzL3ByaXZhdGUvZGVmaW5lLXJlYWN0aXZlLXBsdWdpbi5qcydcbmltcG9ydCB7IG5vb3AgfSBmcm9tICcuLi91dGlscy9ldmVudC5qcydcbmltcG9ydCB7IGNyZWF0ZUdsb2JhbE5vZGUgfSBmcm9tICcuLi91dGlscy9wcml2YXRlL2dsb2JhbC1ub2Rlcy5qcydcbmltcG9ydCB7IGNyZWF0ZUNoaWxkQXBwIH0gZnJvbSAnLi4vaW5zdGFsbC1xdWFzYXIuanMnXG5cbmltcG9ydCBRQWpheEJhciBmcm9tICcuLi9jb21wb25lbnRzL2FqYXgtYmFyL1FBamF4QmFyLmpzJ1xuaW1wb3J0IHsgaXNPYmplY3QgfSBmcm9tICcuLi91dGlscy9wcml2YXRlL2lzLmpzJ1xuXG5jb25zdCBiYXJSZWYgPSByZWYobnVsbClcblxuY29uc3QgUGx1Z2luID0gZGVmaW5lUmVhY3RpdmVQbHVnaW4oe1xuICBpc0FjdGl2ZTogZmFsc2Vcbn0sIHtcbiAgc3RhcnQ6IG5vb3AsXG4gIHN0b3A6IG5vb3AsXG4gIGluY3JlbWVudDogbm9vcCxcbiAgc2V0RGVmYXVsdHM6IG5vb3AsXG5cbiAgaW5zdGFsbCAoeyAkcSwgcGFyZW50QXBwIH0pIHtcbiAgICAkcS5sb2FkaW5nQmFyID0gdGhpc1xuXG4gICAgaWYgKF9fUVVBU0FSX1NTUl9TRVJWRVJfXykgeyByZXR1cm4gfVxuXG4gICAgaWYgKHRoaXMuX19pbnN0YWxsZWQgPT09IHRydWUpIHtcbiAgICAgIGlmICgkcS5jb25maWcubG9hZGluZ0JhciAhPT0gdm9pZCAwKSB7XG4gICAgICAgIHRoaXMuc2V0RGVmYXVsdHMoJHEuY29uZmlnLmxvYWRpbmdCYXIpXG4gICAgICB9XG4gICAgICByZXR1cm5cbiAgICB9XG5cbiAgICBjb25zdCBwcm9wcyA9IHJlZihcbiAgICAgICRxLmNvbmZpZy5sb2FkaW5nQmFyICE9PSB2b2lkIDBcbiAgICAgICAgPyB7IC4uLiRxLmNvbmZpZy5sb2FkaW5nQmFyIH1cbiAgICAgICAgOiB7fVxuICAgIClcblxuICAgIGZ1bmN0aW9uIG9uU3RhcnQgKCkge1xuICAgICAgUGx1Z2luLmlzQWN0aXZlID0gdHJ1ZVxuICAgIH1cblxuICAgIGZ1bmN0aW9uIG9uU3RvcCAoKSB7XG4gICAgICBQbHVnaW4uaXNBY3RpdmUgPSBmYWxzZVxuICAgIH1cblxuICAgIGNvbnN0IGVsID0gY3JlYXRlR2xvYmFsTm9kZSgncS1sb2FkaW5nLWJhcicpXG5cbiAgICBjcmVhdGVDaGlsZEFwcCh7XG4gICAgICBuYW1lOiAnTG9hZGluZ0JhcicsXG5cbiAgICAgIC8vIGhpZGUgQXBwIGZyb20gVnVlIGRldnRvb2xzXG4gICAgICBkZXZ0b29sczogeyBoaWRlOiB0cnVlIH0sXG5cbiAgICAgIHNldHVwOiAoKSA9PiAoKSA9PiBoKFFBamF4QmFyLCB7IC4uLnByb3BzLnZhbHVlLCBvblN0YXJ0LCBvblN0b3AsIHJlZjogYmFyUmVmIH0pXG4gICAgfSwgcGFyZW50QXBwKS5tb3VudChlbClcblxuICAgIE9iamVjdC5hc3NpZ24odGhpcywge1xuICAgICAgc3RhcnQgKHNwZWVkKSB7XG4gICAgICAgIGJhclJlZi52YWx1ZS5zdGFydChzcGVlZClcbiAgICAgIH0sXG4gICAgICBzdG9wICgpIHtcbiAgICAgICAgYmFyUmVmLnZhbHVlLnN0b3AoKVxuICAgICAgfSxcbiAgICAgIGluY3JlbWVudCAoKSB7XG4gICAgICAgIGJhclJlZi52YWx1ZS5pbmNyZW1lbnQuYXBwbHkobnVsbCwgYXJndW1lbnRzKVxuICAgICAgfSxcbiAgICAgIHNldERlZmF1bHRzIChvcHRzKSB7XG4gICAgICAgIGlmIChpc09iamVjdChvcHRzKSA9PT0gdHJ1ZSkge1xuICAgICAgICAgIE9iamVjdC5hc3NpZ24ocHJvcHMudmFsdWUsIG9wdHMpXG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9KVxuICB9XG59KVxuXG5leHBvcnQgZGVmYXVsdCBQbHVnaW5cbiIsImltcG9ydCBjb3JlIGZyb20gXCIuL2NvcmVcIjtcbmltcG9ydCB7IHJvdXRlciB9IGZyb20gXCIuLi9yb3V0ZXJcIjtcbmltcG9ydCB7IExvYWRpbmdCYXIgfSBmcm9tIFwicXVhc2FyXCI7XG5cbmV4cG9ydCBkZWZhdWx0IHtcbiAgY2FjaGU6IHt9LFxuICBpbml0KCkge1xuICAgIGNvbnNvbGUubG9nKFwiYXBpLmluaXQoKVwiLCBhcmd1bWVudHMpO1xuICB9LFxuICBhc3luYyBjYWxsKG1ldGhvZCwgZW5kcG9pbnQsIGRhdGEsIG8pIHtcbiAgICBjb25zb2xlLmZ1bmMoXCJzZXJ2aWNlcy9hcGk6cmVxdWVzdC5jYWxsKClcIiwgYXJndW1lbnRzKTtcbiAgICBMb2FkaW5nQmFyLnN0YXJ0KCk7XG4gICAgcmV0dXJuIG5ldyBQcm9taXNlKChyZXNvbHZlLCByZWplY3QpID0+IHtcbiAgICAgIHZhciBwbGF5bG9hZCA9IHtcbiAgICAgICAgdXJsOiBlbmRwb2ludCxcbiAgICAgICAgbWV0aG9kOiBtZXRob2QsXG4gICAgICAgIG9uVXBsb2FkUHJvZ3Jlc3M6IChldmVudCkgPT4ge1xuICAgICAgICAgIGNvbnN0IHByb2dyZXNzID0gcGFyc2VJbnQoXG4gICAgICAgICAgICBNYXRoLnJvdW5kKChldmVudC5sb2FkZWQgKiAxMDApIC8gZXZlbnQudG90YWwpXG4gICAgICAgICAgKTtcbiAgICAgICAgICAvLyBVcGRhdGUgc3RhdGUgaGVyZVxuICAgICAgICAgIExvYWRpbmdCYXIuaW5jcmVtZW50KHByb2dyZXNzKTtcbiAgICAgICAgfSxcbiAgICAgICAgb25Eb3dubG9hZFByb2dyZXNzOiAoZXZlbnQpID0+IHtcbiAgICAgICAgICBjb25zdCBwcm9ncmVzcyA9IHBhcnNlSW50KFxuICAgICAgICAgICAgTWF0aC5yb3VuZCgoZXZlbnQubG9hZGVkICogMTAwKSAvIGV2ZW50LnRvdGFsKVxuICAgICAgICAgICk7XG4gICAgICAgICAgLy8gVXBkYXRlIHN0YXRlIGhlcmVcbiAgICAgICAgICBMb2FkaW5nQmFyLmluY3JlbWVudChwcm9ncmVzcyk7XG4gICAgICAgIH0sXG4gICAgICB9O1xuXG4gICAgICBpZiAobWV0aG9kID09PSBcImdldFwiKSB7XG4gICAgICAgIHBsYXlsb2FkLnBhcmFtcyA9IGRhdGE7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBwbGF5bG9hZC5kYXRhID0gZGF0YTtcbiAgICAgIH1cblxuICAgICAgaWYgKG8gJiYgby5yZXNwb25zZVR5cGUpIHtcbiAgICAgICAgcGxheWxvYWQucmVzcG9uc2VUeXBlID0gby5yZXNwb25zZVR5cGU7XG4gICAgICB9XG5cbiAgICAgIGNvcmVcbiAgICAgICAgLiRheGlvcyhwbGF5bG9hZClcbiAgICAgICAgLnRoZW4oKHJlc3BvbnNlKSA9PiB7XG4gICAgICAgICAgcmVzb2x2ZShyZXNwb25zZS5kYXRhKTtcbiAgICAgICAgICBMb2FkaW5nQmFyLnN0b3AoKTtcbiAgICAgICAgfSlcbiAgICAgICAgLmNhdGNoKChlcnJvcikgPT4ge1xuICAgICAgICAgIExvYWRpbmdCYXIuc3RvcCgpO1xuICAgICAgICAgIGlmIChlcnJvci5yZXNwb25zZSkge1xuICAgICAgICAgICAgLy8gVGhlIHJlcXVlc3Qgd2FzIG1hZGUgYW5kIHRoZSBzZXJ2ZXIgcmVzcG9uZGVkIHdpdGggYSBzdGF0dXMgY29kZVxuICAgICAgICAgICAgLy8gdGhhdCBmYWxscyBvdXQgb2YgdGhlIHJhbmdlIG9mIDJ4eFxuXG4gICAgICAgICAgICBpZiAoW1wiNDE5XCIsIFwiNDAxXCJdLmluY2x1ZGVzKGVycm9yLnJlc3BvbnNlLnN0YXR1cykpIHtcbiAgICAgICAgICAgICAgcm91dGVyLnB1c2goe1xuICAgICAgICAgICAgICAgIG5hbWU6IFwiTG9naW5cIixcbiAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICB9IGVsc2UgaWYgKGVycm9yLnJlc3BvbnNlLnN0YXR1cyA9PT0gNDA0KSB7XG4gICAgICAgICAgICAgIHJvdXRlci5wdXNoKHtcbiAgICAgICAgICAgICAgICBuYW1lOiBcIkVycm9yIDQwNFwiLFxuICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgaWYgKGVycm9yLnJlc3BvbnNlLmRhdGEpIHtcbiAgICAgICAgICAgICAgcmVqZWN0KFxuICAgICAgICAgICAgICAgIGVycm9yLnJlc3BvbnNlLmRhdGEuZGF0YVxuICAgICAgICAgICAgICAgICAgPyBlcnJvci5yZXNwb25zZS5kYXRhLmRhdGFcbiAgICAgICAgICAgICAgICAgIDogZXJyb3IucmVzcG9uc2UuZGF0YVxuICAgICAgICAgICAgICApO1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgcmVqZWN0KGVycm9yKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICB9XG4gICAgICAgICAgcmVqZWN0KGVycm9yKTtcbiAgICAgICAgfSk7XG4gICAgfSk7XG4gIH0sXG4gIGdldChlbmRwb2ludCwgZGF0YSwgbykge1xuICAgIGNvbnNvbGUuZnVuYyhcInNlcnZpY2VzL2NvcmU6cmVxdWVzdC5nZXQoKVwiLCBhcmd1bWVudHMpO1xuICAgIHJldHVybiBuZXcgUHJvbWlzZSgocmVzb2x2ZSwgcmVqZWN0KSA9PiB7XG4gICAgICB0aGlzLmNhbGwoXCJnZXRcIiwgZW5kcG9pbnQsIGRhdGEsIG8pXG4gICAgICAgIC50aGVuKChyZXNwb25zZSkgPT4ge1xuICAgICAgICAgIHJlc29sdmUocmVzcG9uc2UpO1xuICAgICAgICB9KVxuICAgICAgICAuY2F0Y2goKGVycm9yKSA9PiB7XG4gICAgICAgICAgcmVqZWN0KGVycm9yKTtcbiAgICAgICAgfSk7XG4gICAgfSk7XG4gIH0sXG4gIHBvc3QoZW5kcG9pbnQsIGRhdGEsIG8pIHtcbiAgICBjb25zb2xlLmZ1bmMoXCJzZXJ2aWNlcy9jb3JlOnJlcXVlc3QucG9zdCgpXCIsIGFyZ3VtZW50cyk7XG4gICAgcmV0dXJuIG5ldyBQcm9taXNlKChyZXNvbHZlLCByZWplY3QpID0+IHtcbiAgICAgIHRoaXMuY2FsbChcInBvc3RcIiwgZW5kcG9pbnQsIGRhdGEsIG8pXG4gICAgICAgIC50aGVuKChyZXNwb25zZSkgPT4ge1xuICAgICAgICAgIHJlc29sdmUocmVzcG9uc2UpO1xuICAgICAgICB9KVxuICAgICAgICAuY2F0Y2goKGVycm9yKSA9PiB7XG4gICAgICAgICAgcmVqZWN0KGVycm9yKTtcbiAgICAgICAgfSk7XG4gICAgfSk7XG4gIH0sXG4gIHB1dChlbmRwb2ludCwgZGF0YSwgbykge1xuICAgIGNvbnNvbGUuZnVuYyhcInNlcnZpY2VzL2NvcmU6cmVxdWVzdC5wdXQoKVwiLCBhcmd1bWVudHMpO1xuICAgIHJldHVybiBuZXcgUHJvbWlzZSgocmVzb2x2ZSwgcmVqZWN0KSA9PiB7XG4gICAgICB0aGlzLmNhbGwoXCJwdXRcIiwgZW5kcG9pbnQsIGRhdGEsIG8pXG4gICAgICAgIC50aGVuKChyZXNwb25zZSkgPT4ge1xuICAgICAgICAgIHJlc29sdmUocmVzcG9uc2UpO1xuICAgICAgICB9KVxuICAgICAgICAuY2F0Y2goKGVycm9yKSA9PiB7XG4gICAgICAgICAgcmVqZWN0KGVycm9yKTtcbiAgICAgICAgfSk7XG4gICAgfSk7XG4gIH0sXG4gIGRlbGV0ZShlbmRwb2ludCwgZGF0YSwgbykge1xuICAgIGNvbnNvbGUuZnVuYyhcInNlcnZpY2VzL2NvcmU6cmVxdWVzdC5kZWxldGUoKVwiLCBhcmd1bWVudHMpO1xuICAgIHJldHVybiBuZXcgUHJvbWlzZSgocmVzb2x2ZSwgcmVqZWN0KSA9PiB7XG4gICAgICB0aGlzLmNhbGwoXCJkZWxldGVcIiwgZW5kcG9pbnQsIGRhdGEsIG8pXG4gICAgICAgIC50aGVuKChyZXNwb25zZSkgPT4ge1xuICAgICAgICAgIHJlc29sdmUocmVzcG9uc2UpO1xuICAgICAgICB9KVxuICAgICAgICAuY2F0Y2goKGVycm9yKSA9PiB7XG4gICAgICAgICAgcmVqZWN0KGVycm9yKTtcbiAgICAgICAgfSk7XG4gICAgfSk7XG4gIH0sXG4gIGRvd25sb2FkKGVuZHBvaW50LCBkYXRhLCBvID0ge30pIHtcbiAgICBjb25zb2xlLmZ1bmMoXCJzZXJ2aWNlcy9jb3JlOnJlcXVlc3QuZG93bmxvYWQoKVwiLCBhcmd1bWVudHMpO1xuICAgIE9iamVjdC5hc3NpZ24obywge1xuICAgICAgcmVzcG9uc2VUeXBlOiBcImJsb2JcIixcbiAgICB9KTtcbiAgICByZXR1cm4gbmV3IFByb21pc2UoKHJlc29sdmUsIHJlamVjdCkgPT4ge1xuICAgICAgdGhpcy5jYWxsKFwiZ2V0XCIsIGVuZHBvaW50LCBkYXRhLCBvKVxuICAgICAgICAudGhlbigocmVzcG9uc2UpID0+IHtcbiAgICAgICAgICByZXNvbHZlKHJlc3BvbnNlKTtcbiAgICAgICAgfSlcbiAgICAgICAgLmNhdGNoKChlcnJvcikgPT4ge1xuICAgICAgICAgIHJlamVjdChlcnJvcik7XG4gICAgICAgIH0pO1xuICAgIH0pO1xuICB9LFxufTtcbiJdLCJuYW1lcyI6WyJkYXRlIiwibW9kIiwiY2FwaXRhbGl6ZSIsImxhbmciLCJkYXRlMiIsIm9wZW4iLCJjbGVhbiIsImJldHdlZW4iLCJDb29raWVzIiwicmVmIiwiZm9ybWF0Iiwib3B0aW9ucyIsIkxvYWRpbmdCYXIiXSwibWFwcGluZ3MiOiI7O0FBQUEsU0FBUyxTQUFVLE1BQU07QUFDdkIsUUFBTSxPQUFPLFNBQVMsY0FBYyxVQUFVO0FBQzlDLE9BQUssUUFBUTtBQUNiLE9BQUssa0JBQWtCO0FBQ3ZCLE9BQUssTUFBTSxXQUFXO0FBRXRCLFdBQVMsS0FBSyxZQUFZLElBQUk7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WUFBSSxLQUFLO0FBQ1QsZUFBTztBQUFBLFdBQ0o7QUFDSCxZQUFJLE9BQU87QUFDWCxlQUFPO0FBQUEsV0FDSjtBQUNILFlBQUksSUFBSTtBQUNSLGVBQU87QUFBQSxXQUNKO0FBQ0gsWUFBSSxJQUFJO0FBQ1IsZUFBTztBQUFBLFdBQ0o7QUFDSCxZQUFJLE1BQU07QUFDVixlQUFPO0FBQUEsV0FDSjtBQUNILFlBQUksT0FBTztBQUNYLGVBQU87QUFBQSxXQUNKO0FBQ0gsWUFBSSxJQUFJO0FBQ1IsZUFBTztBQUFBLFdBQ0o7QUFDSCxZQUFJLElBQUk7QUFDUixlQUFPO0FBQUEsV0FDSjtBQUNILFlBQUksSUFBSTtBQUNSLGVBQU87QUFBQSxXQUNKO0FBQ0gsWUFBSSxJQUFJO0FBQ1IsZUFBTztBQUFBLFdBQ0o7QUFDSCxZQUFJLElBQUk7QUFDUixlQUFPO0FBQUEsV0FDSjtBQUNILFlBQUksSUFBSTtBQUNSLGVBQU87QUFBQSxXQUNKO0FBQ0gsWUFBSSxJQUFJO0FBQ1IsZUFBTztBQUFBLFdBQ0o7QUFDSCxZQUFJLElBQUk7QUFDUixlQUFPO0FBQUEsV0FDSjtBQUNILFlBQUksSUFBSTtBQUNSLGVBQU87QUFBQSxXQUNKO0FBQ0gsWUFBSSxJQUFJO0FBQ1IsZUFBTztBQUFBLFdBQ0o7QUFDSCxZQUFJLElBQUk7QUFDUixlQUFPO0FBQUEsV0FDSjtBQUNILFlBQUksSUFBSTtBQUNSLGVBQU87QUFBQSxXQUNKO0FBQ0gsWUFBSSxJQUFJO0FBQ1IsZUFBTztBQUFBLFdBQ0o7QUFDSCxZQUFJLElBQUk7QUFDUixlQUFPO0FBQUEsV0FDSjtBQUNILFlBQUksSUFBSTtBQUNSLGVBQU87QUFBQSxXQUNKO0FBQ0gsWUFBSSxJQUFJO0FBQ1IsZUFBTztBQUFBLFdBQ0o7QUFDSCxZQUFJLEtBQUs7QUFDVCxlQUFPO0FBQUEsV0FFSjtBQUNILGVBQU87QUFBQSxXQUNKO0FBQ0gsZUFBTztBQUFBLFdBQ0o7QUFBQSxXQUNBO0FBQUEsV0FDQTtBQUNILGVBQU87QUFBQSxXQUNKO0FBQ0gsZUFBTztBQUFBLFdBQ0o7QUFBQSxXQUNBO0FBQ0gsZUFBTztBQUFBLFdBQ0o7QUFDSCxlQUFPO0FBQUEsV0FDSjtBQUNILGVBQU87QUFBQSxXQUVKO0FBQ0gsWUFBSSxJQUFJO0FBQ1IsZUFBTztBQUFBLFdBQ0o7QUFDSCxZQUFJLEtBQUs7QUFDVCxlQUFPO0FBQUEsV0FFSjtBQUNILFlBQUksSUFBSTtBQUNSLGVBQU87QUFBQSxXQUNKO0FBQ0gsWUFBSSxJQUFJO0FBQ1IsZUFBTztBQUFBO0FBR1A7QUFDQSxZQUFJLE1BQU8sT0FBUSxLQUFLO0FBQ3RCLGtCQUFRLE1BQU0sVUFBVSxHQUFHLE1BQU0sU0FBUyxDQUFDO0FBQUEsUUFDNUM7QUFDRCxlQUFPLE1BQU0sUUFBUSx1QkFBdUIsTUFBTTtBQUFBO0FBQUEsRUFFMUQsQ0FBRztBQUVELFFBQU0sTUFBTSxFQUFFLEtBQUssT0FBTyxJQUFJLE9BQU8sTUFBTSxTQUFTLEVBQUc7QUFDdkQsYUFBWSxPQUFRO0FBRXBCLFNBQU87QUFDVDtBQUVBLFNBQVMsY0FBZSxpQkFBaUIsV0FBVztBQUNsRCxTQUFPLG9CQUFvQixTQUN2QixrQkFFRSxjQUFjLFNBQ1YsVUFBVSxPQUNWLFlBQVk7QUFFeEI7QUFFQSxTQUFTLGVBQWdCLFFBQVEsWUFBWSxJQUFJO0FBQy9DLFFBQ0UsT0FBTyxTQUFTLElBQUksTUFBTSxLQUMxQixZQUFZLEtBQUssSUFBSSxNQUFNLEdBQzNCLFFBQVEsS0FBSyxNQUFNLFlBQVksRUFBRSxHQUNqQyxVQUFVLFlBQVk7QUFFeEIsU0FBTyxPQUFPLElBQUksS0FBSyxJQUFJLFlBQVksSUFBSSxPQUFPO0FBQ3BEO0FBRUEsU0FBUyx3QkFBeUJBLE9BQU1DLE1BQUssTUFBTTtBQUNqRCxNQUNFLE9BQU9ELE1BQUssWUFBYSxHQUN6QixRQUFRQSxNQUFLLFNBQVU7QUFFekIsUUFBTSxNQUFNQSxNQUFLLFFBQVM7QUFFMUIsTUFBSUMsS0FBSSxTQUFTLFFBQVE7QUFDdkIsWUFBUSxPQUFPQSxLQUFJO0FBQ25CLFdBQU9BLEtBQUk7QUFBQSxFQUNaO0FBRUQsTUFBSUEsS0FBSSxVQUFVLFFBQVE7QUFDeEIsYUFBUyxPQUFPQSxLQUFJO0FBQ3BCLFdBQU9BLEtBQUk7QUFBQSxFQUNaO0FBRUQsRUFBQUQsTUFBSyxRQUFRLENBQUM7QUFDZCxFQUFBQSxNQUFLLFNBQVMsQ0FBQztBQUVmLEVBQUFBLE1BQUssWUFBWSxJQUFJO0FBQ3JCLEVBQUFBLE1BQUssU0FBUyxLQUFLO0FBQ25CLEVBQUFBLE1BQUssUUFBUSxLQUFLLElBQUksS0FBSyxZQUFZQSxLQUFJLENBQUMsQ0FBQztBQUU3QyxNQUFJQyxLQUFJLFNBQVMsUUFBUTtBQUN2QixJQUFBRCxNQUFLLFFBQVFBLE1BQUssUUFBUyxJQUFHLE9BQU9DLEtBQUksSUFBSTtBQUM3QyxXQUFPQSxLQUFJO0FBQUEsRUFDWjtBQUVELFNBQU9EO0FBQ1Q7QUFFQSxTQUFTLGtCQUFtQkEsT0FBTUMsTUFBSyxRQUFRO0FBQzdDLFFBQ0UsT0FBT0EsS0FBSSxTQUFTLFNBQVNBLEtBQUksT0FBT0QsTUFBTSxNQUFPLGtCQUFxQixHQUMxRSxRQUFRQyxLQUFJLFVBQVUsU0FBU0EsS0FBSSxRQUFRLElBQUlELE1BQU0sTUFBTyxlQUFrQixHQUM5RSxTQUFVLElBQUksS0FBSyxNQUFNLFFBQVEsR0FBRyxDQUFDLEVBQUcsUUFBUyxHQUNqRCxNQUFNLEtBQUssSUFBSSxRQUFRQyxLQUFJLFNBQVMsU0FBU0EsS0FBSSxPQUFPRCxNQUFNLE1BQU8sZUFBaUI7QUFFeEYsRUFBQUEsTUFBTSxNQUFPLGNBQWdCLENBQUM7QUFDOUIsRUFBQUEsTUFBTSxNQUFPLGVBQWlCLENBQUM7QUFFL0IsRUFBQUEsTUFBTSxNQUFPLGtCQUFvQixJQUFJO0FBQ3JDLEVBQUFBLE1BQU0sTUFBTyxlQUFpQixLQUFLO0FBQ25DLEVBQUFBLE1BQU0sTUFBTyxjQUFnQixHQUFHO0FBRWhDLFNBQU9DLEtBQUk7QUFDWCxTQUFPQSxLQUFJO0FBQ1gsU0FBT0EsS0FBSTtBQUVYLFNBQU9EO0FBQ1Q7QUFFQSxTQUFTLFVBQVdBLE9BQU0sUUFBUSxNQUFNO0FBQ3RDLFFBQ0VDLE9BQU0sYUFBYSxNQUFNLEdBQ3pCLElBQUksSUFBSSxLQUFLRCxLQUFJLEdBQ2pCLElBQUlDLEtBQUksU0FBUyxVQUFVQSxLQUFJLFVBQVUsVUFBVUEsS0FBSSxTQUFTLFNBQzVELHdCQUF3QixHQUFHQSxNQUFLLElBQUksSUFDcEM7QUFFTixhQUFXLE9BQU9BLE1BQUs7QUFDckIsVUFBTSxLQUFLQyxhQUFXLEdBQUc7QUFDekIsTUFBRyxNQUFPLE1BQVEsRUFBRyxNQUFPLE1BQVMsSUFBRyxPQUFPRCxLQUFLLElBQUs7QUFBQSxFQUMxRDtBQUVELFNBQU87QUFDVDtBQUVBLFNBQVMsYUFBY0EsTUFBSztBQUMxQixRQUFNLE1BQU0sRUFBRSxHQUFHQSxLQUFLO0FBRXRCLE1BQUlBLEtBQUksVUFBVSxRQUFRO0FBQ3hCLFFBQUksT0FBT0EsS0FBSTtBQUNmLFdBQU8sSUFBSTtBQUFBLEVBQ1o7QUFFRCxNQUFJQSxLQUFJLFdBQVcsUUFBUTtBQUN6QixRQUFJLFFBQVFBLEtBQUk7QUFDaEIsV0FBTyxJQUFJO0FBQUEsRUFDWjtBQUVELE1BQUlBLEtBQUksU0FBUyxRQUFRO0FBQ3ZCLFFBQUksT0FBT0EsS0FBSTtBQUNmLFdBQU8sSUFBSTtBQUFBLEVBQ1o7QUFDRCxNQUFJQSxLQUFJLFFBQVEsUUFBUTtBQUN0QixRQUFJLE9BQU9BLEtBQUk7QUFDZixXQUFPLElBQUk7QUFBQSxFQUNaO0FBRUQsTUFBSUEsS0FBSSxTQUFTLFFBQVE7QUFDdkIsUUFBSSxRQUFRQSxLQUFJO0FBQ2hCLFdBQU8sSUFBSTtBQUFBLEVBQ1o7QUFFRCxNQUFJQSxLQUFJLFdBQVcsUUFBUTtBQUN6QixRQUFJLFVBQVVBLEtBQUk7QUFDbEIsV0FBTyxJQUFJO0FBQUEsRUFDWjtBQUVELE1BQUlBLEtBQUksV0FBVyxRQUFRO0FBQ3pCLFFBQUksVUFBVUEsS0FBSTtBQUNsQixXQUFPLElBQUk7QUFBQSxFQUNaO0FBRUQsTUFBSUEsS0FBSSxnQkFBZ0IsUUFBUTtBQUM5QixRQUFJLGVBQWVBLEtBQUk7QUFDdkIsV0FBTyxJQUFJO0FBQUEsRUFDWjtBQUVELFNBQU87QUFDVDtBQUVPLFNBQVMsV0FBWUQsT0FBTSxRQUFRLEtBQUs7QUFDN0MsUUFDRUMsT0FBTSxhQUFhLE1BQU0sR0FDekIsU0FBUyxRQUFRLE9BQU8sUUFBUSxJQUNoQyxJQUFJLElBQUksS0FBS0QsS0FBSSxHQUNqQixJQUFJQyxLQUFJLFNBQVMsVUFBVUEsS0FBSSxVQUFVLFVBQVVBLEtBQUksU0FBUyxTQUM1RCxrQkFBa0IsR0FBR0EsTUFBSyxNQUFNLElBQ2hDO0FBRU4sYUFBVyxPQUFPQSxNQUFLO0FBQ3JCLFVBQU0sS0FBSyxJQUFJLE9BQU8sQ0FBQyxFQUFFLGdCQUFnQixJQUFJLE1BQU0sQ0FBQztBQUNwRCxNQUFHLE1BQU8sU0FBVyxNQUFRQSxLQUFLLElBQUs7QUFBQSxFQUN4QztBQUVELFNBQU87QUFDVDtBQUVPLFNBQVMsWUFBYSxLQUFLLE1BQU0sWUFBWTtBQUNsRCxRQUFNLElBQUksWUFBWSxLQUFLLE1BQU0sVUFBVTtBQUUzQyxRQUFNRCxRQUFPLElBQUk7QUFBQSxJQUNmLEVBQUU7QUFBQSxJQUNGLEVBQUUsVUFBVSxPQUFPLE9BQU8sRUFBRSxRQUFRO0FBQUEsSUFDcEMsRUFBRSxRQUFRLE9BQU8sSUFBSSxFQUFFO0FBQUEsSUFDdkIsRUFBRTtBQUFBLElBQ0YsRUFBRTtBQUFBLElBQ0YsRUFBRTtBQUFBLElBQ0YsRUFBRTtBQUFBLEVBQ0g7QUFFRCxRQUFNLFdBQVdBLE1BQUssa0JBQW1CO0FBRXpDLFNBQU8sRUFBRSxtQkFBbUIsUUFBUSxFQUFFLG1CQUFtQixXQUNyREEsUUFDQSxVQUFVQSxPQUFNLEVBQUUsU0FBUyxFQUFFLGlCQUFpQixTQUFVLEdBQUUsQ0FBQztBQUNqRTtBQUVPLFNBQVMsWUFBYSxLQUFLLE1BQU0sWUFBWSxVQUFVLGNBQWM7QUFDMUUsUUFBTUEsUUFBTztBQUFBLElBQ1gsTUFBTTtBQUFBLElBQ04sT0FBTztBQUFBLElBQ1AsS0FBSztBQUFBLElBQ0wsTUFBTTtBQUFBLElBQ04sUUFBUTtBQUFBLElBQ1IsUUFBUTtBQUFBLElBQ1IsYUFBYTtBQUFBLElBQ2IsZ0JBQWdCO0FBQUEsSUFDaEIsVUFBVTtBQUFBLElBQ1YsVUFBVTtBQUFBLEVBQ1g7QUFFRCxtQkFBaUIsVUFBVSxPQUFPLE9BQU9BLE9BQU0sWUFBWTtBQUUzRCxNQUNFLFFBQVEsVUFDTCxRQUFRLFFBQ1IsUUFBUSxNQUNSLE9BQU8sUUFBUSxVQUNsQjtBQUNBLFdBQU9BO0FBQUEsRUFDUjtBQUVELE1BQUksU0FBUyxRQUFRO0FBQ25CLFdBQU87QUFBQSxFQUNSO0FBRUQsUUFDRSxXQUFXLGNBQWMsWUFBWUcsU0FBSyxLQUFLLEdBQy9DLFNBQVMsU0FBUyxRQUNsQixjQUFjLFNBQVM7QUFFekIsUUFBTSxFQUFFLE9BQU8sSUFBRyxJQUFLLGFBQWEsTUFBTSxRQUFRO0FBRWxELFFBQU0sUUFBUSxJQUFJLE1BQU0sS0FBSztBQUU3QixNQUFJLFVBQVUsTUFBTTtBQUNsQixXQUFPSDtBQUFBLEVBQ1I7QUFFRCxNQUFJLFdBQVc7QUFFZixNQUFJLElBQUksTUFBTSxVQUFVLElBQUksTUFBTSxRQUFRO0FBQ3hDLFVBQU0sUUFBUSxTQUFTLE1BQU8sSUFBSSxNQUFNLFNBQVMsSUFBSSxJQUFJLElBQUksSUFBSyxFQUFFO0FBRXBFLFFBQUksTUFBTSxLQUFLLE1BQU0sUUFBUSxRQUFRLEdBQUc7QUFDdEMsYUFBT0E7QUFBQSxJQUNSO0FBRUQsVUFBTSxJQUFJLElBQUksS0FBSyxTQUFTLElBQUksTUFBTSxTQUFTLE1BQU8sRUFBRTtBQUV4RCxJQUFBQSxNQUFLLE9BQU8sRUFBRSxZQUFhO0FBQzNCLElBQUFBLE1BQUssUUFBUSxFQUFFLFNBQVUsSUFBRztBQUM1QixJQUFBQSxNQUFLLE1BQU0sRUFBRSxRQUFTO0FBQ3RCLElBQUFBLE1BQUssT0FBTyxFQUFFLFNBQVU7QUFDeEIsSUFBQUEsTUFBSyxTQUFTLEVBQUUsV0FBWTtBQUM1QixJQUFBQSxNQUFLLFNBQVMsRUFBRSxXQUFZO0FBQzVCLElBQUFBLE1BQUssY0FBYyxFQUFFLGdCQUFpQjtBQUFBLEVBQ3ZDLE9BQ0k7QUFDSCxRQUFJLElBQUksU0FBUyxRQUFRO0FBQ3ZCLE1BQUFBLE1BQUssT0FBTyxTQUFTLE1BQU8sSUFBSSxPQUFRLEVBQUU7QUFBQSxJQUMzQyxXQUNRLElBQUksT0FBTyxRQUFRO0FBQzFCLFlBQU0sSUFBSSxTQUFTLE1BQU8sSUFBSSxLQUFNLEVBQUU7QUFDdEMsTUFBQUEsTUFBSyxPQUFPLElBQUksSUFBSSxJQUFJLE1BQU87QUFBQSxJQUNoQztBQUVELFFBQUksSUFBSSxNQUFNLFFBQVE7QUFDcEIsTUFBQUEsTUFBSyxRQUFRLFNBQVMsTUFBTyxJQUFJLElBQUssRUFBRTtBQUN4QyxVQUFJQSxNQUFLLFFBQVEsS0FBS0EsTUFBSyxRQUFRLElBQUk7QUFDckMsZUFBT0E7QUFBQSxNQUNSO0FBQUEsSUFDRixXQUNRLElBQUksUUFBUSxRQUFRO0FBQzNCLE1BQUFBLE1BQUssUUFBUSxZQUFZLFFBQVEsTUFBTyxJQUFJLElBQUssSUFBSTtBQUFBLElBQ3RELFdBQ1EsSUFBSSxTQUFTLFFBQVE7QUFDNUIsTUFBQUEsTUFBSyxRQUFRLE9BQU8sUUFBUSxNQUFPLElBQUksS0FBTSxJQUFJO0FBQUEsSUFDbEQ7QUFFRCxRQUFJLElBQUksTUFBTSxRQUFRO0FBQ3BCLE1BQUFBLE1BQUssTUFBTSxTQUFTLE1BQU8sSUFBSSxJQUFLLEVBQUU7QUFFdEMsVUFBSUEsTUFBSyxTQUFTLFFBQVFBLE1BQUssVUFBVSxRQUFRQSxNQUFLLE1BQU0sR0FBRztBQUM3RCxlQUFPQTtBQUFBLE1BQ1I7QUFFRCxZQUFNLFNBQVMsYUFBYSxZQUN2QixJQUFJLEtBQUtBLE1BQUssTUFBTUEsTUFBSyxPQUFPLENBQUMsRUFBRyxRQUFTLElBQzlDLG1CQUFtQkEsTUFBSyxNQUFNQSxNQUFLLEtBQUs7QUFFNUMsVUFBSUEsTUFBSyxNQUFNLFFBQVE7QUFDckIsZUFBT0E7QUFBQSxNQUNSO0FBQUEsSUFDRjtBQUVELFFBQUksSUFBSSxNQUFNLFFBQVE7QUFDcEIsTUFBQUEsTUFBSyxPQUFPLFNBQVMsTUFBTyxJQUFJLElBQUssRUFBRSxJQUFJO0FBQUEsSUFDNUMsV0FDUSxJQUFJLE1BQU0sUUFBUTtBQUN6QixNQUFBQSxNQUFLLE9BQU8sU0FBUyxNQUFPLElBQUksSUFBSyxFQUFFLElBQUk7QUFDM0MsVUFDRyxJQUFJLEtBQUssTUFBTyxJQUFJLE9BQVEsUUFDekIsSUFBSSxLQUFLLE1BQU8sSUFBSSxPQUFRLFFBQzVCLElBQUksTUFBTSxNQUFPLElBQUksUUFBUyxRQUNsQztBQUNBLFFBQUFBLE1BQUssUUFBUTtBQUFBLE1BQ2Q7QUFDRCxNQUFBQSxNQUFLLE9BQU9BLE1BQUssT0FBTztBQUFBLElBQ3pCO0FBRUQsUUFBSSxJQUFJLE1BQU0sUUFBUTtBQUNwQixNQUFBQSxNQUFLLFNBQVMsU0FBUyxNQUFPLElBQUksSUFBSyxFQUFFLElBQUk7QUFBQSxJQUM5QztBQUVELFFBQUksSUFBSSxNQUFNLFFBQVE7QUFDcEIsTUFBQUEsTUFBSyxTQUFTLFNBQVMsTUFBTyxJQUFJLElBQUssRUFBRSxJQUFJO0FBQUEsSUFDOUM7QUFFRCxRQUFJLElBQUksTUFBTSxRQUFRO0FBQ3BCLE1BQUFBLE1BQUssY0FBYyxTQUFTLE1BQU8sSUFBSSxJQUFLLEVBQUUsSUFBSSxPQUFPLElBQUksTUFBTyxJQUFJLEdBQUk7QUFBQSxJQUM3RTtBQUVELFFBQUksSUFBSSxNQUFNLFVBQVUsSUFBSSxPQUFPLFFBQVE7QUFDekMsaUJBQVksSUFBSSxNQUFNLFNBQVMsTUFBTyxJQUFJLEdBQUksUUFBUSxLQUFLLEVBQUUsSUFBSSxNQUFPLElBQUk7QUFDNUUsTUFBQUEsTUFBSyxrQkFBa0IsU0FBVSxPQUFRLE1BQU0sS0FBSyxNQUFNLEtBQUssU0FBUyxNQUFNLEdBQUcsQ0FBQyxJQUFJLElBQUksU0FBUyxNQUFNLEdBQUcsQ0FBQztBQUFBLElBQzlHO0FBQUEsRUFDRjtBQUVELEVBQUFBLE1BQUssV0FBVyxJQUFJQSxNQUFLLE1BQU0sQ0FBQyxJQUFJLE1BQU0sSUFBSUEsTUFBSyxLQUFLLElBQUksTUFBTSxJQUFJQSxNQUFLLEdBQUc7QUFDOUUsRUFBQUEsTUFBSyxXQUFXLElBQUlBLE1BQUssSUFBSSxJQUFJLE1BQU0sSUFBSUEsTUFBSyxNQUFNLElBQUksTUFBTSxJQUFJQSxNQUFLLE1BQU0sSUFBSTtBQUVuRixTQUFPQTtBQUNUO0FBRU8sU0FBUyxRQUFTQSxPQUFNO0FBQzdCLFNBQU8sT0FBT0EsVUFBUyxXQUNuQixPQUNBLE1BQU0sS0FBSyxNQUFNQSxLQUFJLENBQUMsTUFBTTtBQUNsQztBQUVPLFNBQVMsVUFBV0MsTUFBSyxLQUFLO0FBQ25DLFNBQU8sV0FBVyxJQUFJLFFBQVFBLE1BQUssR0FBRztBQUN4QztBQUVPLFNBQVMsYUFBY0QsT0FBTTtBQUNsQyxRQUFNLE1BQU0sSUFBSSxLQUFLQSxLQUFJLEVBQUUsT0FBUTtBQUNuQyxTQUFPLFFBQVEsSUFBSSxJQUFJO0FBQ3pCO0FBRU8sU0FBUyxjQUFlQSxPQUFNO0FBRW5DLFFBQU0sV0FBVyxJQUFJLEtBQUtBLE1BQUssWUFBVyxHQUFJQSxNQUFLLFNBQVUsR0FBRUEsTUFBSyxTQUFTO0FBRzdFLFdBQVMsUUFBUSxTQUFTLGFBQWMsU0FBUyxXQUFXLEtBQUssSUFBSyxDQUFDO0FBR3ZFLFFBQU0sZ0JBQWdCLElBQUksS0FBSyxTQUFTLFlBQWEsR0FBRSxHQUFHLENBQUM7QUFHM0QsZ0JBQWMsUUFBUSxjQUFjLGFBQWMsY0FBYyxXQUFXLEtBQUssSUFBSyxDQUFDO0FBR3RGLFFBQU0sS0FBSyxTQUFTLGtCQUFpQixJQUFLLGNBQWMsa0JBQW1CO0FBQzNFLFdBQVMsU0FBUyxTQUFTLFNBQVEsSUFBSyxFQUFFO0FBRzFDLFFBQU0sWUFBWSxXQUFXLGtCQUFrQixzQkFBc0I7QUFDckUsU0FBTyxJQUFJLEtBQUssTUFBTSxRQUFRO0FBQ2hDO0FBRUEsU0FBUyxpQkFBa0JBLE9BQU07QUFDL0IsU0FBT0EsTUFBSyxZQUFhLElBQUcsTUFBUUEsTUFBSyxhQUFhLE1BQU1BLE1BQUssUUFBUztBQUM1RTtBQUVBLFNBQVMsa0JBQW1CQSxPQUFNLFVBQXdCO0FBQ3hELFFBQU0sSUFBSSxJQUFJLEtBQUtBLEtBQUk7QUFDdkIsU0FBTyxhQUFhLE9BQU8saUJBQWlCLENBQUMsSUFBSSxFQUFFLFFBQVM7QUFDOUQ7QUFFTyxTQUFTLGVBQWdCQSxPQUFNLE1BQU0sSUFBSSxPQUFPLENBQUEsR0FBSTtBQUN6RCxRQUNFLEtBQUssa0JBQWtCLE1BQU0sS0FBSyxRQUFRLEdBQzFDLEtBQUssa0JBQWtCLElBQUksS0FBSyxRQUFRLEdBQ3hDLE1BQU0sa0JBQWtCQSxPQUFNLEtBQUssUUFBUTtBQUU3QyxVQUFRLE1BQU0sTUFBTyxLQUFLLGtCQUFrQixRQUFRLFFBQVEsUUFDdEQsTUFBTSxNQUFPLEtBQUssZ0JBQWdCLFFBQVEsUUFBUTtBQUMxRDtBQUVPLFNBQVMsVUFBV0EsT0FBTUMsTUFBSztBQUNwQyxTQUFPLFVBQVVELE9BQU1DLE1BQUssQ0FBQztBQUMvQjtBQUNPLFNBQVMsaUJBQWtCRCxPQUFNQyxNQUFLO0FBQzNDLFNBQU8sVUFBVUQsT0FBTUMsTUFBSyxFQUFFO0FBQ2hDO0FBRU8sU0FBUyxZQUFhRCxPQUFNLE1BQU0sS0FBSztBQUM1QyxRQUNFLElBQUksSUFBSSxLQUFLQSxLQUFJLEdBQ2pCLFNBQVMsTUFBTyxRQUFRLE9BQU8sUUFBUTtBQUV6QyxVQUFRO0FBQUEsU0FDRDtBQUFBLFNBQ0E7QUFDSCxRQUFHLEdBQUksZUFBaUIsQ0FBQztBQUFBLFNBQ3RCO0FBQUEsU0FDQTtBQUNILFFBQUcsR0FBSSxjQUFnQixDQUFDO0FBQUEsU0FDckI7QUFBQSxTQUNBO0FBQUEsU0FDQTtBQUNILFFBQUcsR0FBSSxlQUFpQixDQUFDO0FBQUEsU0FDdEI7QUFBQSxTQUNBO0FBQ0gsUUFBRyxHQUFJLGlCQUFtQixDQUFDO0FBQUEsU0FDeEI7QUFBQSxTQUNBO0FBQ0gsUUFBRyxHQUFJLGlCQUFtQixDQUFDO0FBQUEsU0FDeEI7QUFBQSxTQUNBO0FBQ0gsUUFBRyxHQUFJLHNCQUF3QixDQUFDO0FBQUE7QUFFcEMsU0FBTztBQUNUO0FBRU8sU0FBUyxVQUFXQSxPQUFNLE1BQU0sS0FBSztBQUMxQyxRQUNFLElBQUksSUFBSSxLQUFLQSxLQUFJLEdBQ2pCLFNBQVMsTUFBTyxRQUFRLE9BQU8sUUFBUTtBQUV6QyxVQUFRO0FBQUEsU0FDRDtBQUFBLFNBQ0E7QUFDSCxRQUFHLEdBQUksZUFBaUIsRUFBRTtBQUFBLFNBQ3ZCO0FBQUEsU0FDQTtBQUNILFFBQUcsR0FBSSxjQUFnQixZQUFZLENBQUMsQ0FBQztBQUFBLFNBQ2xDO0FBQUEsU0FDQTtBQUFBLFNBQ0E7QUFDSCxRQUFHLEdBQUksZUFBaUIsRUFBRTtBQUFBLFNBQ3ZCO0FBQUEsU0FDQTtBQUNILFFBQUcsR0FBSSxpQkFBbUIsRUFBRTtBQUFBLFNBQ3pCO0FBQUEsU0FDQTtBQUNILFFBQUcsR0FBSSxpQkFBbUIsRUFBRTtBQUFBLFNBQ3pCO0FBQUEsU0FDQTtBQUNILFFBQUcsR0FBSSxzQkFBd0IsR0FBRztBQUFBO0FBRXRDLFNBQU87QUFDVDtBQUVPLFNBQVMsV0FBWUEsT0FBc0I7QUFDaEQsTUFBSSxJQUFJLElBQUksS0FBS0EsS0FBSTtBQUNyQixRQUFNLFVBQVUsTUFBTSxLQUFLLFdBQVcsQ0FBQyxFQUFFLFFBQVEsT0FBSztBQUNwRCxRQUFJLEtBQUssSUFBSSxHQUFHLElBQUksS0FBSyxDQUFDLENBQUM7QUFBQSxFQUMvQixDQUFHO0FBQ0QsU0FBTztBQUNUO0FBRU8sU0FBUyxXQUFZQSxPQUFxQjtBQUMvQyxNQUFJLElBQUksSUFBSSxLQUFLQSxLQUFJO0FBQ3JCLFFBQU0sVUFBVSxNQUFNLEtBQUssV0FBVyxDQUFDLEVBQUUsUUFBUSxPQUFLO0FBQ3BELFFBQUksS0FBSyxJQUFJLEdBQUcsSUFBSSxLQUFLLENBQUMsQ0FBQztBQUFBLEVBQy9CLENBQUc7QUFDRCxTQUFPO0FBQ1Q7QUFFQSxTQUFTLFFBQVMsR0FBRyxLQUFLLFVBQVU7QUFDbEMsVUFDRyxFQUFFLFFBQU8sSUFBSyxFQUFFLGtCQUFtQixJQUFHLDBCQUNwQyxJQUFJLFFBQVMsSUFBRyxJQUFJLGtCQUFpQixJQUFLLDJCQUMzQztBQUNOO0FBRU8sU0FBUyxZQUFhQSxPQUFNLFVBQVUsT0FBTyxRQUFRO0FBQzFELFFBQ0UsSUFBSSxJQUFJLEtBQUtBLEtBQUksR0FDakIsTUFBTSxJQUFJLEtBQUssUUFBUTtBQUV6QixVQUFRO0FBQUEsU0FDRDtBQUFBLFNBQ0E7QUFDSCxhQUFRLEVBQUUsWUFBVyxJQUFLLElBQUksWUFBVztBQUFBLFNBRXRDO0FBQUEsU0FDQTtBQUNILGNBQVEsRUFBRSxZQUFhLElBQUcsSUFBSSxZQUFXLEtBQU0sS0FBSyxFQUFFLGFBQWEsSUFBSSxTQUFVO0FBQUEsU0FFOUU7QUFBQSxTQUNBO0FBQUEsU0FDQTtBQUNILGFBQU8sUUFBUSxZQUFZLEdBQUcsS0FBSyxHQUFHLFlBQVksS0FBSyxLQUFLLEdBQUcsbUJBQW1CO0FBQUEsU0FFL0U7QUFBQSxTQUNBO0FBQ0gsYUFBTyxRQUFRLFlBQVksR0FBRyxNQUFNLEdBQUcsWUFBWSxLQUFLLE1BQU0sR0FBRyxvQkFBb0I7QUFBQSxTQUVsRjtBQUFBLFNBQ0E7QUFDSCxhQUFPLFFBQVEsWUFBWSxHQUFHLFFBQVEsR0FBRyxZQUFZLEtBQUssUUFBUSxHQUFHLHNCQUFzQjtBQUFBLFNBRXhGO0FBQUEsU0FDQTtBQUNILGFBQU8sUUFBUSxZQUFZLEdBQUcsUUFBUSxHQUFHLFlBQVksS0FBSyxRQUFRLEdBQUcsR0FBSTtBQUFBO0FBRS9FO0FBRU8sU0FBUyxhQUFjQSxPQUFNO0FBQ2xDLFNBQU8sWUFBWUEsT0FBTSxZQUFZQSxPQUFNLE1BQU0sR0FBRyxNQUFNLElBQUk7QUFDaEU7QUFFTyxTQUFTLGdCQUFpQkEsT0FBTTtBQUNyQyxTQUFPLE9BQU9BLEtBQUksTUFBTSxPQUNwQixTQUNDLE9BQU9BLFVBQVMsV0FBVyxXQUFXO0FBQzdDO0FBRU8sU0FBUyxlQUFnQkEsT0FBTSxLQUFLLEtBQUs7QUFDOUMsUUFBTSxJQUFJLElBQUksS0FBS0EsS0FBSTtBQUV2QixNQUFJLEtBQUs7QUFDUCxVQUFNLE1BQU0sSUFBSSxLQUFLLEdBQUc7QUFDeEIsUUFBSSxJQUFJLEtBQUs7QUFDWCxhQUFPO0FBQUEsSUFDUjtBQUFBLEVBQ0Y7QUFFRCxNQUFJLEtBQUs7QUFDUCxVQUFNLE9BQU8sSUFBSSxLQUFLLEdBQUc7QUFDekIsUUFBSSxJQUFJLE1BQU07QUFDWixhQUFPO0FBQUEsSUFDUjtBQUFBLEVBQ0Y7QUFFRCxTQUFPO0FBQ1Q7QUFFTyxTQUFTLFdBQVlBLE9BQU1JLFFBQU8sTUFBTTtBQUM3QyxRQUNFLElBQUksSUFBSSxLQUFLSixLQUFJLEdBQ2pCLElBQUksSUFBSSxLQUFLSSxNQUFLO0FBRXBCLE1BQUksU0FBUyxRQUFRO0FBQ25CLFdBQU8sRUFBRSxjQUFjLEVBQUUsUUFBUztBQUFBLEVBQ25DO0FBRUQsVUFBUTtBQUFBLFNBQ0Q7QUFBQSxTQUNBO0FBQ0gsVUFBSSxFQUFFLFdBQVUsTUFBTyxFQUFFLFdBQVUsR0FBSTtBQUNyQyxlQUFPO0FBQUEsTUFDUjtBQUFBLFNBQ0U7QUFBQSxTQUNBO0FBQ0gsVUFBSSxFQUFFLFdBQVUsTUFBTyxFQUFFLFdBQVUsR0FBSTtBQUNyQyxlQUFPO0FBQUEsTUFDUjtBQUFBLFNBQ0U7QUFBQSxTQUNBO0FBQ0gsVUFBSSxFQUFFLFNBQVEsTUFBTyxFQUFFLFNBQVEsR0FBSTtBQUNqQyxlQUFPO0FBQUEsTUFDUjtBQUFBLFNBQ0U7QUFBQSxTQUNBO0FBQUEsU0FDQTtBQUNILFVBQUksRUFBRSxRQUFPLE1BQU8sRUFBRSxRQUFPLEdBQUk7QUFDL0IsZUFBTztBQUFBLE1BQ1I7QUFBQSxTQUNFO0FBQUEsU0FDQTtBQUNILFVBQUksRUFBRSxTQUFRLE1BQU8sRUFBRSxTQUFRLEdBQUk7QUFDakMsZUFBTztBQUFBLE1BQ1I7QUFBQSxTQUNFO0FBQUEsU0FDQTtBQUNILFVBQUksRUFBRSxZQUFXLE1BQU8sRUFBRSxZQUFXLEdBQUk7QUFDdkMsZUFBTztBQUFBLE1BQ1I7QUFDRDtBQUFBO0FBRUEsWUFBTSxJQUFJLE1BQU0sZ0NBQWlDLE1BQU87QUFBQTtBQUc1RCxTQUFPO0FBQ1Q7QUFFTyxTQUFTLFlBQWFKLE9BQU07QUFDakMsU0FBUSxJQUFJLEtBQUtBLE1BQUssWUFBYSxHQUFFQSxNQUFLLGFBQWEsR0FBRyxDQUFDLEVBQUcsUUFBUztBQUN6RTtBQUVBLFNBQVMsV0FBWSxHQUFHO0FBQ3RCLE1BQUksS0FBSyxNQUFNLEtBQUssSUFBSTtBQUN0QixXQUFPLEdBQUk7QUFBQSxFQUNaO0FBQ0QsVUFBUSxJQUFJO0FBQUEsU0FDTDtBQUFHLGFBQU8sR0FBSTtBQUFBLFNBQ2Q7QUFBRyxhQUFPLEdBQUk7QUFBQSxTQUNkO0FBQUcsYUFBTyxHQUFJO0FBQUE7QUFFckIsU0FBTyxHQUFJO0FBQ2I7QUFFQSxNQUFNLFlBQVk7QUFBQSxFQUVoQixHQUFJQSxPQUFNLFlBQVksWUFBWTtBQUVoQyxVQUFNLElBQUksS0FBSyxLQUFLQSxPQUFNLFlBQVksVUFBVSxJQUFJO0FBQ3BELFdBQU8sS0FBSyxJQUNSLElBQUksQ0FBQyxJQUNMLE1BQU0sSUFBSSxLQUFLLElBQUksQ0FBQyxDQUFDO0FBQUEsRUFDMUI7QUFBQSxFQUdELEtBQU1BLE9BQU0sYUFBYSxZQUFZO0FBRW5DLFdBQU8sZUFBZSxVQUFVLGVBQWUsT0FDM0MsYUFDQUEsTUFBSyxZQUFhO0FBQUEsRUFDdkI7QUFBQSxFQUdELEVBQUdBLE9BQU07QUFDUCxXQUFPQSxNQUFLLFNBQVEsSUFBSztBQUFBLEVBQzFCO0FBQUEsRUFHRCxHQUFJQSxPQUFNO0FBQ1IsV0FBTyxJQUFJQSxNQUFLLFNBQVEsSUFBSyxDQUFDO0FBQUEsRUFDL0I7QUFBQSxFQUdELElBQUtBLE9BQU0sWUFBWTtBQUNyQixXQUFPLFdBQVcsWUFBYUEsTUFBSyxTQUFRO0FBQUEsRUFDN0M7QUFBQSxFQUdELEtBQU1BLE9BQU0sWUFBWTtBQUN0QixXQUFPLFdBQVcsT0FBUUEsTUFBSyxTQUFRO0FBQUEsRUFDeEM7QUFBQSxFQUdELEVBQUdBLE9BQU07QUFDUCxXQUFPLEtBQUssTUFBTUEsTUFBSyxTQUFVLElBQUcsS0FBSyxDQUFDO0FBQUEsRUFDM0M7QUFBQSxFQUdELEdBQUlBLE9BQU07QUFDUixXQUFPLFdBQVcsS0FBSyxFQUFFQSxLQUFJLENBQUM7QUFBQSxFQUMvQjtBQUFBLEVBR0QsRUFBR0EsT0FBTTtBQUNQLFdBQU9BLE1BQUssUUFBUztBQUFBLEVBQ3RCO0FBQUEsRUFHRCxHQUFJQSxPQUFNO0FBQ1IsV0FBTyxXQUFXQSxNQUFLLFNBQVM7QUFBQSxFQUNqQztBQUFBLEVBR0QsR0FBSUEsT0FBTTtBQUNSLFdBQU8sSUFBSUEsTUFBSyxTQUFTO0FBQUEsRUFDMUI7QUFBQSxFQUdELElBQUtBLE9BQU07QUFDVCxXQUFPLGFBQWFBLEtBQUk7QUFBQSxFQUN6QjtBQUFBLEVBR0QsS0FBTUEsT0FBTTtBQUNWLFdBQU8sSUFBSSxhQUFhQSxLQUFJLEdBQUcsQ0FBQztBQUFBLEVBQ2pDO0FBQUEsRUFHRCxFQUFHQSxPQUFNO0FBQ1AsV0FBT0EsTUFBSyxPQUFRO0FBQUEsRUFDckI7QUFBQSxFQUdELEdBQUlBLE9BQU0sWUFBWTtBQUNwQixXQUFPLEtBQUssS0FBS0EsT0FBTSxVQUFVLEVBQUUsTUFBTSxHQUFHLENBQUM7QUFBQSxFQUM5QztBQUFBLEVBR0QsSUFBS0EsT0FBTSxZQUFZO0FBQ3JCLFdBQU8sV0FBVyxVQUFXQSxNQUFLLE9BQU07QUFBQSxFQUN6QztBQUFBLEVBR0QsS0FBTUEsT0FBTSxZQUFZO0FBQ3RCLFdBQU8sV0FBVyxLQUFNQSxNQUFLLE9BQU07QUFBQSxFQUNwQztBQUFBLEVBR0QsRUFBR0EsT0FBTTtBQUNQLFdBQU9BLE1BQUssT0FBTSxLQUFNO0FBQUEsRUFDekI7QUFBQSxFQUdELEVBQUdBLE9BQU07QUFDUCxXQUFPLGNBQWNBLEtBQUk7QUFBQSxFQUMxQjtBQUFBLEVBR0QsR0FBSUEsT0FBTTtBQUNSLFdBQU8sSUFBSSxjQUFjQSxLQUFJLENBQUM7QUFBQSxFQUMvQjtBQUFBLEVBR0QsRUFBR0EsT0FBTTtBQUNQLFdBQU9BLE1BQUssU0FBVTtBQUFBLEVBQ3ZCO0FBQUEsRUFHRCxHQUFJQSxPQUFNO0FBQ1IsV0FBTyxJQUFJQSxNQUFLLFVBQVU7QUFBQSxFQUMzQjtBQUFBLEVBR0QsRUFBR0EsT0FBTTtBQUNQLFVBQU0sUUFBUUEsTUFBSyxTQUFVO0FBQzdCLFdBQU8sVUFBVSxJQUNiLEtBQ0MsUUFBUSxLQUFLLFFBQVEsS0FBSztBQUFBLEVBQ2hDO0FBQUEsRUFHRCxHQUFJQSxPQUFNO0FBQ1IsV0FBTyxJQUFJLEtBQUssRUFBRUEsS0FBSSxDQUFDO0FBQUEsRUFDeEI7QUFBQSxFQUdELEVBQUdBLE9BQU07QUFDUCxXQUFPQSxNQUFLLFdBQVk7QUFBQSxFQUN6QjtBQUFBLEVBR0QsR0FBSUEsT0FBTTtBQUNSLFdBQU8sSUFBSUEsTUFBSyxZQUFZO0FBQUEsRUFDN0I7QUFBQSxFQUdELEVBQUdBLE9BQU07QUFDUCxXQUFPQSxNQUFLLFdBQVk7QUFBQSxFQUN6QjtBQUFBLEVBR0QsR0FBSUEsT0FBTTtBQUNSLFdBQU8sSUFBSUEsTUFBSyxZQUFZO0FBQUEsRUFDN0I7QUFBQSxFQUdELEVBQUdBLE9BQU07QUFDUCxXQUFPLEtBQUssTUFBTUEsTUFBSyxnQkFBZSxJQUFLLEdBQUc7QUFBQSxFQUMvQztBQUFBLEVBR0QsR0FBSUEsT0FBTTtBQUNSLFdBQU8sSUFBSSxLQUFLLE1BQU1BLE1BQUssZ0JBQWUsSUFBSyxFQUFFLENBQUM7QUFBQSxFQUNuRDtBQUFBLEVBR0QsSUFBS0EsT0FBTTtBQUNULFdBQU8sSUFBSUEsTUFBSyxnQkFBZSxHQUFJLENBQUM7QUFBQSxFQUNyQztBQUFBLEVBR0QsRUFBR0EsT0FBTTtBQUNQLFdBQU8sS0FBSyxFQUFFQSxLQUFJLElBQUksS0FBSyxPQUFPO0FBQUEsRUFDbkM7QUFBQSxFQUdELEVBQUdBLE9BQU07QUFDUCxXQUFPLEtBQUssRUFBRUEsS0FBSSxJQUFJLEtBQUssT0FBTztBQUFBLEVBQ25DO0FBQUEsRUFHRCxHQUFJQSxPQUFNO0FBQ1IsV0FBTyxLQUFLLEVBQUVBLEtBQUksSUFBSSxLQUFLLFNBQVM7QUFBQSxFQUNyQztBQUFBLEVBR0QsRUFBR0EsT0FBTSxhQUFhLGFBQWEsc0JBQXNCO0FBQ3ZELFVBQU0sV0FBVyx5QkFBeUIsVUFBVSx5QkFBeUIsT0FDekVBLE1BQUssa0JBQW1CLElBQ3hCO0FBRUosV0FBTyxlQUFlLFVBQVUsR0FBRztBQUFBLEVBQ3BDO0FBQUEsRUFHRCxHQUFJQSxPQUFNLGFBQWEsYUFBYSxzQkFBc0I7QUFDeEQsVUFBTSxXQUFXLHlCQUF5QixVQUFVLHlCQUF5QixPQUN6RUEsTUFBSyxrQkFBbUIsSUFDeEI7QUFFSixXQUFPLGVBQWUsUUFBUTtBQUFBLEVBQy9CO0FBQUEsRUFHRCxFQUFHQSxPQUFNO0FBQ1AsV0FBTyxLQUFLLE1BQU1BLE1BQUssUUFBTyxJQUFLLEdBQUk7QUFBQSxFQUN4QztBQUFBLEVBR0QsRUFBR0EsT0FBTTtBQUNQLFdBQU9BLE1BQUssUUFBUztBQUFBLEVBQ3RCO0FBQ0g7QUFFTyxTQUFTLFdBQVksS0FBSyxNQUFNLFlBQVksY0FBYyx3QkFBd0I7QUFDdkYsTUFDRyxRQUFRLEtBQUssQ0FBQyxPQUNaLFFBQVEsWUFDUixRQUFRLFdBQ1g7QUFDQTtBQUFBLEVBQ0Q7QUFFRCxRQUFNQSxRQUFPLElBQUksS0FBSyxHQUFHO0FBRXpCLE1BQUksTUFBTUEsS0FBSSxHQUFHO0FBQ2Y7QUFBQSxFQUNEO0FBRUQsTUFBSSxTQUFTLFFBQVE7QUFDbkIsV0FBTztBQUFBLEVBQ1I7QUFFRCxRQUFNLFNBQVMsY0FBYyxZQUFZRyxTQUFLLEtBQUs7QUFFbkQsU0FBTyxLQUFLO0FBQUEsSUFDVjtBQUFBLElBQ0EsQ0FBQyxPQUFPLFNBQ04sU0FBUyxZQUNMLFVBQVcsT0FBUUgsT0FBTSxRQUFRLGNBQWMsc0JBQXNCLElBQ3BFLFNBQVMsU0FBUyxRQUFRLEtBQUssTUFBTSxLQUFLLEVBQUUsS0FBSyxHQUFHO0FBQUEsRUFFNUQ7QUFDSDtBQUVPLFNBQVMsTUFBT0EsT0FBTTtBQUMzQixTQUFPLE9BQU9BLEtBQUksTUFBTSxPQUNwQixJQUFJLEtBQUtBLE1BQUssU0FBUyxJQUN2QkE7QUFDTjtBQUVBLElBQWUsT0FBQTtBQUFBLEVBQ2I7QUFBQSxFQUNBO0FBQUEsRUFDQTtBQUFBLEVBQ0E7QUFBQSxFQUNBO0FBQUEsRUFDQTtBQUFBLEVBQ0E7QUFBQSxFQUNBO0FBQUEsRUFDQTtBQUFBLEVBQ0E7QUFBQSxFQUNBO0FBQUEsRUFDQTtBQUFBLEVBQ0E7QUFBQSxFQUNBO0FBQUEsRUFDQTtBQUFBLEVBQ0E7QUFBQSxFQUNBO0FBQUEsRUFDQTtBQUFBLEVBQ0E7QUFBQSxFQUNBO0FBQUEsRUFDQTtBQUNGO0FDMytCQSxTQUFTLE1BQU8sTUFBTTtBQUVwQixhQUFXLE1BQU07QUFDZixXQUFPLElBQUksZ0JBQWdCLEtBQUssSUFBSTtBQUFBLEVBQ3JDLEdBQUUsR0FBSztBQUVSLE9BQUssT0FBUTtBQUNmO0FBc0JlLFNBQVEsV0FBRSxVQUFVLFNBQVMsT0FBTyxJQUFJO0FBQ3JELFFBQU0sRUFBRSxVQUFVLGVBQWUsU0FBUSxJQUFLLE9BQU8sU0FBUyxXQUMxRCxFQUFFLFVBQVUsS0FBTSxJQUNsQjtBQUVKLFFBQU0sT0FBTyxhQUFhLFNBQ3JCLElBQUksWUFBWSxRQUFRLEVBQUcsT0FBTyxDQUFFLE9BQU8sQ0FBRSxJQUM5QztBQUVKLFFBQU0sV0FBVyxrQkFBa0IsU0FBUyxDQUFFLGVBQWUsSUFBSSxJQUFLLENBQUUsSUFBTTtBQUM5RSxRQUFNLE9BQU8sSUFBSSxLQUFLLFVBQVUsRUFBRSxNQUFNLFlBQVksNEJBQTRCO0FBQ2hGLFFBQU0sT0FBTyxTQUFTLGNBQWMsR0FBRztBQUV2QyxPQUFLLE9BQU8sT0FBTyxJQUFJLGdCQUFnQixJQUFJO0FBQzNDLE9BQUssYUFBYSxZQUFZLFFBQVE7QUFJdEMsTUFBSSxPQUFPLEtBQUssYUFBYSxhQUFhO0FBQ3hDLFNBQUssYUFBYSxVQUFVLFFBQVE7QUFBQSxFQUNyQztBQUVELE9BQUssVUFBVSxJQUFJLFFBQVE7QUFDM0IsT0FBSyxNQUFNLFdBQVc7QUFDdEIsV0FBUyxLQUFLLFlBQVksSUFBSTtBQUU5QixNQUFJO0FBQ0YsU0FBSyxNQUFPO0FBQ1osVUFBTSxJQUFJO0FBQ1YsV0FBTztBQUFBLEVBQ1IsU0FDTSxLQUFQO0FBQ0UsVUFBTSxJQUFJO0FBQ1YsV0FBTztBQUFBLEVBQ1I7QUFDSDtBQzVEQSxTQUFTLGNBQWUsYUFBYTtBQUNuQyxRQUFNLE1BQU0sT0FBTyxPQUFPLEVBQUUsVUFBVSxLQUFNLEdBQUUsV0FBVztBQUN6RCxRQUFNLE9BQU8sQ0FBRTtBQUNmLGFBQVcsT0FBTyxLQUFLO0FBQ3JCLFFBQUksSUFBSyxTQUFVLE1BQU07QUFDdkIsV0FBSyxLQUFLLEdBQUc7QUFBQSxJQUNkO0FBQUEsRUFDRjtBQUNELFNBQU8sS0FBSyxLQUFLLEdBQUc7QUFDdEI7QUFFQSxTQUFTLFdBQVksS0FBSyxRQUFRLGdCQUFnQjtBQUNoRCxNQUFJSyxRQUFPLE9BQU87QUFFbEIsTUFBSSxTQUFTLEdBQUcsWUFBWSxNQUFNO0FBQ2hDLFFBQUksWUFBWSxVQUFVLFFBQVEsaUJBQWlCLFVBQVUsUUFBUSxhQUFhLFNBQVMsUUFBUTtBQUNqRyxNQUFBQSxRQUFPLFFBQVEsYUFBYTtBQUFBLElBQzdCLFdBQ1EsY0FBYyxVQUFVLFVBQVUsUUFBUSxRQUFRO0FBQ3pELGFBQU8sVUFBVSxJQUFJLFFBQVEsS0FBSztBQUFBLFFBQ2hDLGNBQWM7QUFBQSxNQUN0QixDQUFPO0FBQUEsSUFDRjtBQUFBLEVBQ0Y7QUFFRCxRQUFNLE1BQU1BLE1BQUssS0FBSyxVQUFVLGNBQWMsY0FBYyxDQUFDO0FBRTdELE1BQUksS0FBSztBQUNQLGFBQVMsR0FBRyxXQUFXLElBQUksTUFBTztBQUNsQyxXQUFPO0FBQUEsRUFDUixPQUNJO0FBQ0gsY0FBVSxPQUFRO0FBQUEsRUFDbkI7QUFDSDtBQUVBLElBQUEsVUFBZSxDQUFDLEtBQUssUUFBUSxtQkFBbUI7QUFDOUMsTUFDRSxTQUFTLEdBQUcsUUFBUSxRQUNqQixPQUFPLHlCQUF5QixRQUNuQztBQUNBLFdBQU8scUJBQXFCLFlBQVksZUFBYTtBQUNuRCxVQUFJLFdBQVc7QUFDYixlQUFPLHFCQUFxQjtBQUFBLFVBQzFCLEVBQUUsSUFBSztBQUFBLFVBQ1A7QUFBQSxVQUNBO0FBQUEsUUFDRDtBQUFBLE1BQ0YsT0FDSTtBQUNILG1CQUFXLEtBQUssUUFBUSxjQUFjO0FBQUEsTUFDdkM7QUFBQSxJQUNQLENBQUs7QUFDRDtBQUFBLEVBQ0Q7QUFFRCxTQUFPLFdBQVcsS0FBSyxRQUFRLGNBQWM7QUFDL0M7QUM3REE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQU9BLElBQUksVUFBVTtBQUFBLEVBQ1osUUFBUTtBQUFBLEVBQ1IsUUFBUTtBQUFBLEVBQ1IsV0FBVztBQUFBLEVBQ1gsU0FBUztBQUFBLEVBQ1QsV0FBVztBQUFBLEVBQ1gsdUJBQXVCO0FBQUEsRUFDdkIsU0FBUztBQUFBLEVBQ1QsYUFBYTtBQUFBLEVBQ2IsS0FBSztBQUFBLEVBQ0wsS0FBSztBQUFBLEVBQ0wsV0FBVztBQUNiO0FBTUEsU0FBUyxhQUFhLFNBQVMsU0FBUztBQUN0QyxPQUFLLFVBQVUsT0FBTyxPQUFPLFNBQVMsTUFBTTtBQUM1QyxPQUFLLFFBQVE7QUFDYixPQUFLLFNBQVM7QUFDZCxPQUFLLFVBQVU7QUFFZixPQUFLLFNBQVMsQ0FBQyxRQUFRLEtBQUssVUFDMUIsQ0FBQyxLQUFLLFdBQVcsT0FBTyxJQUFJLE9BQU8sV0FBVyxJQUFJLENBQUM7QUFFckQsT0FBSyxRQUFRLENBQUNDLFNBQVEsVUFBVTtBQUM5QixTQUFLLFVBQVVBO0FBQ2YsV0FBTztBQUFBLEVBQ1g7QUFFRSxPQUFLLE9BQU8sTUFBTTtBQUNoQixVQUFNLE9BQ0osS0FBSyxNQUFNLFNBQVEsRUFBRyxRQUFRLEdBQUcsS0FBSyxLQUFLLEtBQUssV0FBVSxJQUFLLElBQzNELE1BQ0E7QUFDTixXQUFPO0FBQUEsRUFDWDtBQUVFLFdBQVNDLFNBQVEsS0FBSyxHQUFHLEtBQUs7QUFDNUIsV0FBTyxLQUFLLElBQUksS0FBSyxLQUFLLElBQUksR0FBRyxHQUFHLENBQUM7QUFBQSxFQUN0QztBQUdELFdBQVMsTUFBTSxXQUFXO0FBQ3hCLFdBQU9BLFNBQVEsR0FBRyxXQUFXLEVBQUU7QUFBQSxFQUNoQztBQUVELFdBQVMsUUFBUSxTQUFTLFdBQVc7QUFFbkMsUUFBSSxNQUFNLEtBQUssSUFBSSxJQUFJLFNBQVM7QUFDaEMsUUFBSSxRQUFRLFdBQVcsT0FBTyxJQUFJLE9BQU87QUFDekMsV0FBTyxNQUFNLFFBQVEsTUFBTSxTQUFTLENBQUM7QUFBQSxFQUN0QztBQUVELE9BQUssV0FBVyxDQUFDLFdBQVcsT0FBTyxNQUFNO0FBRXpDLE9BQUssYUFBYSxDQUFDLFFBQVEsV0FBVyxPQUFPLFNBQVEsRUFBRyxRQUFRLFFBQVEsRUFBRTtBQUUxRSxPQUFLLGFBQWEsS0FBSyxLQUFJLE1BQU87QUFFbEMsT0FBSyxVQUFVLE1BQU07QUFDbkIsUUFBSSxLQUFLLFFBQVEsYUFBYTtBQUM1QixXQUFLLFNBQVM7QUFBQSxRQUNaLEtBQUssV0FBVyxLQUFLLE9BQU8sTUFBTTtBQUFBLFFBQ2xDLEtBQUssUUFBUTtBQUFBLE1BQ2QsRUFBQyxRQUFRLEtBQUssS0FBSyxRQUFRLE9BQU87QUFBQSxJQUNwQyxXQUFVLE9BQU8sS0FBSyxVQUFVLFVBQVU7QUFDekMsV0FBSyxTQUFTLEtBQUs7QUFBQSxRQUNqQixLQUFLLE1BQU0sU0FBUSxFQUFHLFFBQVEsS0FBSyxFQUFFO0FBQUEsUUFDckM7QUFBQSxNQUNELEVBQUMsS0FBSyxLQUFLLFFBQVEsT0FBTztBQUFBLElBQ2pDLE9BQVc7QUFDTCxXQUFLLFNBQVMsS0FBSztBQUFBLFFBQ2pCLEtBQUs7QUFBQSxRQUNMLElBQUksT0FBTyxVQUFVLEtBQUssUUFBUSxhQUFhLElBQUk7QUFBQSxNQUMzRDtBQUNNLFdBQUssU0FBUyxLQUFLLE1BQU0sS0FBSyxNQUFNLEVBQUUsS0FBSyxLQUFLLFFBQVEsT0FBTztBQUFBLElBQ2hFO0FBQ0QsV0FBTyxLQUFLO0FBQUEsRUFDaEI7QUFFRSxPQUFLLGFBQWEsTUFBTTtBQUN0QixXQUFPLEtBQUssUUFBUyxFQUFDLFNBQVUsRUFBQyxRQUFRLEtBQUssUUFBUSxTQUFTLEdBQUc7QUFBQSxFQUN0RTtBQUVFLE9BQUssUUFBUSxDQUFDLFNBQVMsSUFBSSxVQUFVLEtBQUssUUFBUSxZQUFZO0FBQzVELFFBQUksUUFBUSxPQUFPLFNBQVUsRUFBQyxNQUFNLE9BQU87QUFDM0MsVUFBTSxLQUFLLEtBQUssU0FBUyxNQUFNLEVBQUUsS0FBSztBQUV0QyxRQUFJLE1BQU0sU0FBUyxHQUFHO0FBQ3BCLFlBQU0sS0FBSyxNQUFNLE1BQU0sR0FBRyxNQUFNLE1BQU0sRUFBRSxLQUFLLEVBQUU7QUFDL0MsY0FBUSxNQUFNLE1BQU0sR0FBRyxDQUFDO0FBQUEsSUFDekI7QUFFRCxRQUFJLEtBQUssU0FBUztBQUNoQixZQUFNLFlBQVksS0FBSyxTQUFTLE1BQU0sS0FBSyxHQUFHLENBQUMsRUFBRTtBQUFBLFFBQy9DLEtBQUssUUFBUTtBQUFBLE1BQ3JCO0FBQ00sWUFBTSxjQUFjLEtBQUssU0FBUyxTQUFTO0FBQzNDLFlBQU0sZ0JBQWdCLFlBQVk7QUFBQSxRQUNoQyxLQUFLLFFBQVE7QUFBQSxNQUNyQjtBQUVNLFVBQ0UsS0FBSyxRQUFRLHlCQUNiLEtBQUssUUFBUSx5QkFBeUIsS0FDdEMsWUFBWSxTQUFRLEVBQUcsU0FBUyxjQUFjLFFBQzlDO0FBQ0EsZ0JBQVEsY0FBYyxTQUFVLEVBQUMsTUFBTSxHQUFHO0FBQUEsTUFDbEQsT0FBYTtBQUNMLGdCQUFRLFlBQVksU0FBVSxFQUFDLE1BQU0sR0FBRztBQUFBLE1BQ3pDO0FBQUEsSUFDRjtBQUVELFdBQU8sTUFBTSxNQUFNLEdBQUcsQ0FBQztBQUFBLEVBQzNCO0FBRUUsT0FBSyxlQUFlLE1BQU07QUFDeEIsUUFBSSxRQUFRLEtBQUssUUFBUyxFQUFDLE1BQU0sS0FBSyxRQUFRLE9BQU87QUFDckQsVUFBTSxLQUFLLE1BQU0sR0FDZCxTQUFVLEVBQ1YsUUFBUSwwQkFBMEIsS0FBSyxLQUFLLFFBQVEsV0FBVztBQUNsRSxXQUFPLE1BQU0sS0FBSyxLQUFLLFFBQVEsT0FBTztBQUFBLEVBQzFDO0FBT0UsT0FBSyxTQUFTLENBQUMsVUFBVTtBQUN2QixRQUFJLFVBQVU7QUFBSSxhQUFPLEtBQUssUUFBUTtBQUN0QyxTQUFLLFFBQVEsU0FBUyxLQUFLLFFBQVE7QUFDbkMsUUFBSSxLQUFLLE9BQU0sS0FBTSxDQUFDLEtBQUssUUFBUTtBQUNqQyxhQUFPLEtBQUssUUFBUTtBQUN0QixXQUNFLEtBQUssS0FBTSxJQUNYLEtBQUssUUFBUSxTQUNiLEtBQUssYUFBYyxJQUNuQixLQUFLLFFBQVE7QUFBQSxFQUVuQjtBQU9FLE9BQUssV0FBVyxDQUFDLFVBQVU7QUFDekIsUUFBSSxVQUFVO0FBQUksYUFBTyxLQUFLLFFBQVE7QUFDdEMsU0FBSyxRQUFRLFNBQVMsS0FBSyxRQUFRO0FBQ25DLFFBQUksS0FBSyxPQUFNLEtBQU0sQ0FBQyxLQUFLLFFBQVE7QUFDakMsYUFBTyxLQUFLLFFBQVE7QUFDdEIsV0FBTyxLQUFLLEtBQUksSUFBSyxLQUFLLFdBQVU7QUFBQSxFQUN4QztBQUNBO0FBRUEsTUFBTSxlQUFlO0FBTXJCLFNBQVMsbUJBQW1CO0FBQzFCLFNBQU8sSUFBSSxZQUFZLFNBQVM7QUFBQSxJQUM5QixTQUFTO0FBQUEsSUFDVCxZQUFZO0FBQUEsSUFDWixRQUFRLEVBQUUsUUFBUSxLQUFNO0FBQUEsRUFDNUIsQ0FBRztBQUNIO0FBTUEsU0FBUyxvQkFBb0I7QUFDM0IsU0FBTyxJQUFJLFlBQVksVUFBVTtBQUFBLElBQy9CLFNBQVM7QUFBQSxJQUNULFlBQVk7QUFBQSxJQUNaLFFBQVEsRUFBRSxRQUFRLEtBQU07QUFBQSxFQUM1QixDQUFHO0FBQ0g7QUFRQSxTQUFTLGdCQUFnQixJQUFJO0FBQzNCLFFBQU0sZUFDSixjQUFjLG1CQUFtQixLQUFLLEdBQUcsY0FBYyxPQUFPO0FBR2hFLE1BQUksQ0FBQyxjQUFjO0FBQ2pCLFVBQU0sSUFBSSxNQUFNLDRDQUE0QztBQUFBLEVBQzdEO0FBRUQsU0FBTztBQUNUO0FBT0EsU0FBUyxhQUFhLElBQUksVUFBVTtBQUNsQyxRQUFNLG9CQUFvQixNQUFNO0FBQzlCLE9BQUcsa0JBQWtCLFVBQVUsUUFBUTtBQUFBLEVBQzNDO0FBQ0U7QUFFQSxhQUFXLHFCQUFxQixDQUFDO0FBQ25DO0FBVUEsU0FBUyxZQUNQLElBQ0EsT0FDQSxFQUFFLE9BQU8sTUFBTSxRQUFRLE9BQU8sT0FBQUQsU0FBUSxNQUFLLElBQUssQ0FBRSxHQUNsRDtBQUNBLFFBQU0sRUFBRSxPQUFNLElBQUssR0FBRztBQUN0QixNQUFJLEVBQUUsU0FBUSxJQUFLLEdBQUc7QUFDdEIsTUFBSSxlQUFlLFNBQVMsTUFBTSxRQUFRLE1BQU0sTUFBTSxRQUFRLEdBQUc7QUFFakUsYUFBVyxZQUFZO0FBQ3ZCLGlCQUFlLGdCQUFnQjtBQUUvQixNQUFJLFNBQVMsYUFBYSxjQUFjO0FBQ3RDLFVBQU0sU0FBUyxJQUFJLGFBQWEsTUFBTSxFQUFFLE1BQU1BLFVBQVMsQ0FBQyxPQUFPLFdBQVc7QUFDMUUsUUFBSSxTQUFTLE9BQU8sT0FBTyxZQUFZO0FBQ3ZDLFFBQUksV0FBVyxPQUFPLE1BQU0sQ0FBQyxPQUFPLFdBQVcsRUFBRSxTQUFTLFlBQVk7QUFHdEUsUUFBSUEsUUFBTztBQUNULFVBQUksT0FBTyxPQUFPLEdBQUcsS0FBSyxXQUFXLE9BQU8sT0FBTyxHQUFHLEdBQUc7QUFDdkQsaUJBQVMsT0FBTyxPQUFPLE9BQU8sR0FBRztBQUNqQyxtQkFBVyxPQUFPLFNBQVMsT0FBTyxHQUFHO0FBQUEsTUFDN0MsV0FBaUIsT0FBTyxPQUFPLEdBQUcsS0FBSyxXQUFXLE9BQU8sT0FBTyxHQUFHLEdBQUc7QUFDOUQsaUJBQVMsT0FBTyxPQUFPLE9BQU8sR0FBRztBQUNqQyxtQkFBVyxPQUFPLFNBQVMsT0FBTyxHQUFHO0FBQUEsTUFDdEM7QUFBQSxJQUNGO0FBRUQsT0FBRyxjQUFjLFdBQVc7QUFDNUIsT0FBRyxnQkFBZ0I7QUFHbkIsUUFBSSxHQUFHLFVBQVUsUUFBUTtBQUN2QixTQUFHLFFBQVE7QUFBQSxJQUNaO0FBSUQsV0FBTyxRQUFRLEdBQUcsY0FBYyxpQkFBZ0IsQ0FBRTtBQUFBLEVBQ25EO0FBQ0g7QUFPQSxTQUFTLGFBQWEsT0FBTztBQUMzQixRQUFNLEVBQUUsUUFBUSxPQUFRLElBQUc7QUFHM0IsTUFBSSxpQ0FBUSxRQUFRO0FBQ2xCLFdBQU87QUFBQSxFQUNSO0FBSUQsUUFBTSxnQkFBZTtBQUVyQixNQUFJLGtCQUFrQixPQUFPLE1BQU0sU0FBUyxPQUFPO0FBQ25ELFFBQU0sRUFBRSxVQUFVLE9BQVEsSUFBRyxPQUFPO0FBRXBDLGNBQVksUUFBUSxNQUFNLEVBQUUsTUFBTSxNQUFPLENBQUE7QUFHekMsb0JBQWtCLEtBQUssSUFBSSxpQkFBaUIsT0FBTyxPQUFPLE1BQU07QUFDaEUsb0JBQWtCLE9BQU8sTUFBTSxTQUFTO0FBQ3hDLG9CQUFrQixLQUFLLElBQUksaUJBQWlCLE9BQU8sT0FBTyxNQUFNO0FBQ2hFLGVBQWEsUUFBUSxlQUFlO0FBRXBDLE1BQUksYUFBYSxPQUFPLE9BQU87QUFDN0IsV0FBTyxjQUFjLGlCQUFnQixDQUFFO0FBQUEsRUFDeEM7QUFDSDtBQU9BLFNBQVMsWUFBWSxPQUFPO0FBQzFCLFFBQU0sRUFBRSxRQUFRLE9BQVEsSUFBRztBQUczQixNQUFJLGlDQUFRLFFBQVE7QUFDbEIsV0FBTztBQUFBLEVBQ1I7QUFFRCxRQUFNLEVBQUUsU0FBUSxJQUFLLE9BQU87QUFFNUIsY0FBWSxRQUFRLE1BQU0sRUFBRSxPQUFPLE1BQU0sTUFBTSxPQUFPLE9BQU8sS0FBSSxDQUFFO0FBRW5FLE1BQUksYUFBYSxPQUFPLE9BQU87QUFDN0IsV0FBTyxjQUFjLGtCQUFpQixDQUFFO0FBQUEsRUFDekM7QUFDSDtBQUlBLE1BQU0sYUFBYTtBQUVuQixJQUFJLFVBQVU7QUFBQSxFQUNaLGFBQWEsQ0FBQyxJQUFJLEVBQUUsT0FBTyxVQUFTLEdBQUksVUFBVTtBQUNoRCxTQUFLLGdCQUFnQixFQUFFO0FBQ3ZCLFVBQU0sU0FBUyxPQUFPLE9BQU8sQ0FBRSxHQUFFLFNBQVMsT0FBTyxTQUFTO0FBQzFELE9BQUcsY0FBYyxFQUFFO0FBRW5CLGdCQUFZLElBQUksT0FBTyxFQUFFLE9BQU8sT0FBTyxTQUFTLE9BQU8sS0FBSSxDQUFFO0FBQUEsRUFDOUQ7QUFBQSxFQUVELFNBQVMsQ0FBQyxPQUFPO0FBQ2YsU0FBSyxnQkFBZ0IsRUFBRTtBQUN2QixVQUFNLFNBQVMsR0FBRztBQUNsQixVQUFNLEVBQUUsT0FBUSxJQUFHO0FBR25CLFVBQU0sZUFBZSxHQUFHLGlCQUFpQjtBQUd6QyxVQUFNLFVBQVUsQ0FBQyxNQUFNO0FBQ3JCLFVBQUksRUFBRSxXQUFXLElBQUk7QUFDbkI7QUFBQSxNQUNEO0FBQ0QsbUJBQWEsQ0FBQztBQUFBLElBQ3BCO0FBRUksaUJBQWEsaUJBQWlCLFNBQVMsU0FBUyxJQUFJO0FBRXBELE9BQUcsU0FBUyxDQUFDLE1BQU0sWUFBWSxDQUFDO0FBSWhDLE9BQUcsWUFBWSxDQUFDLE1BQU07QUFDcEIsV0FDRyxDQUFDLEtBQUssR0FBRyxFQUFFLFNBQVMsRUFBRSxPQUFPLEtBQUssRUFBRSxRQUFRLE9BQU8sWUFDcEQsQ0FBQyxHQUFHLE1BQU0sU0FBUyxPQUFPLE9BQU8sR0FDakM7QUFDQSxVQUFFLGVBQWM7QUFDaEIsV0FBRyxhQUFhLE9BQU8sT0FBTztBQUM5QixXQUFHLGNBQWMsSUFBSSxNQUFNLE9BQU8sQ0FBQztBQUNuQyxxQkFBYSxJQUFJLEdBQUcsTUFBTSxRQUFRLE9BQU8sT0FBTyxJQUFJLENBQUM7QUFBQSxNQUM3RCxZQUNTLENBQUMsS0FBSyxHQUFHLEVBQUUsU0FBUyxFQUFFLE9BQU8sS0FBSyxFQUFFLFFBQVEsT0FBTyxZQUNwRCxHQUFHLE1BQU0sU0FBUyxPQUFPLE9BQU8sR0FDaEM7QUFDQSxVQUFFLGVBQWM7QUFBQSxNQUN4QixXQUFpQixDQUFDLENBQUMsRUFBRSxTQUFTLEVBQUUsT0FBTyxHQUFHO0FBRWxDLGNBQU0sWUFBWSxHQUFHLE1BQU0sTUFBTSxHQUFHLGVBQWUsR0FBRyxHQUFHLFlBQVk7QUFDckUsY0FBTSxVQUFVLEdBQUcsTUFBTSxNQUFNLEdBQUcsZUFBZSxHQUFHLEdBQUcsWUFBWTtBQUNuRSxZQUFJLGNBQWMsT0FBTyxXQUFXO0FBQ2xDLFlBQUUsZUFBYztBQUVoQixjQUFJLGtCQUFrQixHQUFHLE1BQU0sU0FBUyxHQUFHO0FBRTNDLGFBQUcsUUFBUSxHQUFHLE1BQU0sUUFBUSxTQUFTLEVBQUU7QUFFdkMsNEJBQWtCLEtBQUssSUFBSSxpQkFBaUIsT0FBTyxPQUFPLE1BQU07QUFDaEUsNEJBQWtCLEdBQUcsTUFBTSxTQUFTO0FBQ3BDLDRCQUFrQixLQUFLLElBQUksaUJBQWlCLE9BQU8sT0FBTyxNQUFNO0FBQ2hFLHVCQUFhLElBQUksZUFBZTtBQUVoQyxhQUFHLGNBQWMsSUFBSSxNQUFNLE9BQU8sQ0FBQztBQUFBLFFBQ3BDO0FBQUEsTUFDRjtBQUFBLElBQ1A7QUFFSSxXQUFPLFVBQVUsTUFDZixhQUFhLG9CQUFvQixTQUFTLFNBQVMsSUFBSTtBQUFBLEVBQzFEO0FBQUEsRUFFRCxTQUFTLENBQUMsSUFBSSxFQUFFLE9BQU8sVUFBVSxVQUFXLEdBQUUsVUFBVTtBQUN0RCxTQUFLLGdCQUFnQixFQUFFO0FBQ3ZCLFFBQUksVUFBVSxVQUFVO0FBQ3RCLFlBQU0sRUFBRSxPQUFNLElBQUssR0FBRztBQUN0QixTQUFHLFlBQVksU0FBUyxPQUFPLE9BQU8sQ0FBQSxHQUFJLFFBQVEsT0FBTyxTQUFTO0FBQ2xFLGtCQUFZLElBQUksT0FBTyxFQUFFLE9BQU8sTUFBTSxPQUFPLEtBQUksQ0FBRTtBQUFBLElBQ3pELE9BQVc7QUFDTCxrQkFBWSxJQUFJLEtBQUs7QUFBQSxJQUN0QjtBQUFBLEVBQ0Y7QUFBQSxFQUVELFdBQVcsQ0FBQyxPQUFPO0FBQ2pCLG9CQUFnQixFQUFFLEVBQUUsWUFBWSxRQUFPO0FBQUEsRUFDeEM7QUFDSDtBQUFBLENBRWE7QUFBQSxFQUNYLE1BQU07QUFBQSxFQUNOLE9BQU87QUFBQSxJQUNMLFlBQVk7QUFBQSxNQUNWLFVBQVU7QUFBQSxJQUNYO0FBQUEsSUFDRCxXQUFXO0FBQUEsTUFDVCxNQUFNLENBQUMsUUFBUSxNQUFNO0FBQUEsTUFDckIsU0FBUyxNQUFNLFFBQVE7QUFBQSxJQUN4QjtBQUFBLElBQ0QsUUFBUTtBQUFBLE1BQ04sTUFBTTtBQUFBLE1BQ04sU0FBUztBQUFBLElBQ1Y7QUFBQSxJQUNELGFBQWE7QUFBQSxNQUNYLE1BQU07QUFBQSxNQUNOLFNBQVMsUUFBUTtBQUFBLElBQ2xCO0FBQUEsSUFDRCxTQUFTO0FBQUEsTUFDUCxNQUFNO0FBQUEsTUFDTixTQUFTLFFBQVE7QUFBQSxJQUNsQjtBQUFBLElBQ0QsV0FBVztBQUFBLE1BQ1QsTUFBTTtBQUFBLE1BQ04sU0FBUyxNQUFNLFFBQVE7QUFBQSxJQUN4QjtBQUFBLElBQ0QsdUJBQXVCO0FBQUEsTUFDckIsTUFBTSxDQUFDLFFBQVEsT0FBTztBQUFBLE1BQ3RCLFNBQVMsTUFBTSxRQUFRO0FBQUEsSUFDeEI7QUFBQSxJQUNELFNBQVM7QUFBQSxNQUNQLE1BQU07QUFBQSxNQUNOLFNBQVMsTUFBTSxRQUFRO0FBQUEsSUFDeEI7QUFBQSxJQUNELEtBQUs7QUFBQSxNQUNILE1BQU0sQ0FBQyxRQUFRLE9BQU87QUFBQSxNQUN0QixTQUFTLE1BQU0sUUFBUTtBQUFBLElBQ3hCO0FBQUEsSUFDRCxLQUFLO0FBQUEsTUFDSCxNQUFNLENBQUMsUUFBUSxPQUFPO0FBQUEsTUFDdEIsU0FBUyxNQUFNLFFBQVE7QUFBQSxJQUN4QjtBQUFBLElBQ0QsV0FBVztBQUFBLE1BQ1QsTUFBTTtBQUFBLE1BQ04sU0FBUyxNQUFNLFFBQVE7QUFBQSxJQUN4QjtBQUFBLElBQ0QsUUFBUTtBQUFBLE1BQ04sTUFBTTtBQUFBLE1BQ04sU0FBUyxNQUFNLFFBQVE7QUFBQSxJQUN4QjtBQUFBLElBQ0QsUUFBUTtBQUFBLE1BQ04sTUFBTTtBQUFBLE1BQ04sU0FBUyxNQUFNLFFBQVE7QUFBQSxJQUN4QjtBQUFBLEVBQ0Y7QUFBQSxFQUNELFlBQVk7QUFBQSxJQUNWLFFBQVE7QUFBQSxFQUNUO0FBQUEsRUFDRCxPQUFPLENBQUMsc0JBQXNCLG1CQUFtQjtBQUFBLEVBQ2pELE9BQU87QUFDTCxXQUFPO0FBQUEsTUFDTCxhQUFhLEtBQUs7QUFBQSxNQUNsQixlQUFlO0FBQUEsSUFDaEI7QUFBQSxFQUNGO0FBQUEsRUFDRCxTQUFTO0FBQUEsSUFDUCxNQUFNLEVBQUUsVUFBVTtBQUNoQixXQUFLLGNBQWMsT0FBTztBQUMxQixXQUFLLGdCQUFnQixPQUFPO0FBQzVCLFdBQUssTUFBTSxxQkFBcUIsS0FBSyxZQUFZO0FBQUEsSUFDbEQ7QUFBQSxJQUNELFNBQVM7QUFDUCxXQUFLLE1BQU0sc0JBQXNCLEtBQUssWUFBWTtBQUFBLElBQ25EO0FBQUEsRUFDRjtBQUFBLEVBQ0QsVUFBVTtBQUFBLElBQ1IsZUFBZTtBQUNiLGFBQU8sS0FBSyxTQUFTLEtBQUssY0FBYyxLQUFLO0FBQUEsSUFDOUM7QUFBQSxJQUNELFNBQVM7QUFDUCxZQUFNLFNBQVMsQ0FBQTtBQUNmLGFBQU8sS0FBSyxLQUFLLE1BQU0sRUFDcEIsT0FBTyxDQUFDLFNBQVMsU0FBUyxZQUFZLEVBQ3RDLFFBQVEsQ0FBQyxTQUFTO0FBQ2pCLGVBQU8sUUFBUSxLQUFLLE9BQU87QUFBQSxNQUNyQyxDQUFTO0FBQ0gsYUFBTztBQUFBLElBQ1I7QUFBQSxFQUNGO0FBQUEsRUFDRCxPQUFPO0FBQUEsSUFDTCxXQUFXLEtBQUs7QUFDZCxVQUFJLEtBQUssa0JBQWtCLEtBQUs7QUFDOUIsYUFBSyxjQUFjO0FBQUEsTUFDcEI7QUFBQSxJQUNGO0FBQUEsRUFDRjtBQUNIO0FDOWZBLE1BQU0sRUFBRSxZQUFZLGlCQUFrQixJQUFHO0FBRXpDLElBQUk7QUFFSixJQUFlLE9BQUE7QUFBQSxFQUNiLFNBQVMsQ0FBRTtBQUFBLEVBQ1gsTUFBTSxPQUFPO0FBQ1gsWUFBUSxLQUFLLHdCQUF3QixTQUFTO0FBQzlDLFFBQUlFLFNBQVEsSUFBSSxxQkFBcUIsTUFBTSxNQUFNO0FBQy9DLGFBQU8sT0FBTztBQUFBLFFBQ1osU0FDRTtBQUFBLFFBQ0YsV0FBVztBQUFBLFFBQ1gsU0FBUztBQUFBLFFBQ1QsU0FBUztBQUFBLFFBQ1QsVUFBVTtBQUFBLFFBQ1YsU0FBUztBQUFBLFVBQ1A7QUFBQSxZQUNFLE9BQU87QUFBQSxZQUNQLE9BQU87QUFBQSxZQUNQLFVBQVU7QUFDUkEsdUJBQVEsSUFBSSx1QkFBdUIsTUFBTTtBQUFBLGdCQUN2QyxTQUFTLElBQUk7QUFBQSxjQUM3QixDQUFlO0FBQUEsWUFDRjtBQUFBLFVBQ0Y7QUFBQSxVQUNEO0FBQUEsWUFDRSxPQUFPO0FBQUEsWUFDUCxPQUFPO0FBQUEsWUFDUCxXQUFXO0FBQUEsWUFDWCxVQUFVO0FBQ1Isc0JBQVEsRUFBc0I7QUFBQSxZQUMvQjtBQUFBLFVBQ0Y7QUFBQSxRQUNGO0FBQUEsTUFDVCxDQUFPO0FBQUEsSUFDRjtBQUFBLEVBQ0Y7QUFBQSxFQUNELEtBQUssQ0FBRTtBQUFBLEVBQ1AsVUFBVSxNQUFNO0FBQ2QsV0FBTyxLQUFLLElBQUksRUFBRSxRQUFRLENBQUNDLFNBQVE7QUFDakMsVUFBSUEsS0FBSSxRQUFRLEtBQUssTUFBTSxJQUFJO0FBQzdCLGFBQUtBLE1BQUs7TUFDWDtBQUFBLElBQ1AsQ0FBSztBQUFBLEVBQ0Y7QUFBQSxFQUNELFFBQVEsS0FBSyxHQUFHO0FBQ2QsWUFBUSxLQUFLLDJCQUEyQixTQUFTO0FBQ2pELFdBQU8sSUFBSSxRQUFRLENBQUMsU0FBUyxXQUFXO0FBQ3RDLFVBQUksU0FBUyxDQUFBO0FBQ2IsVUFBSSxPQUFPLFFBQVEsVUFBVTtBQUMzQixlQUFPLEtBQUssSUFBSSxPQUFPO0FBQUEsTUFDL0IsT0FBYTtBQUNMLGVBQU8sS0FBSyxHQUFHO0FBQUEsTUFDaEI7QUFFRCxhQUFPLE9BQU87QUFBQSxRQUNaLFdBQVc7QUFBQSxRQUNYLGdCQUFnQjtBQUFBLFVBQ2QsS0FBSztBQUFBLFVBQ0wsTUFBTTtBQUFBLFVBQ04sT0FBTyxLQUFLLEVBQUUsUUFBUSxFQUFFLFFBQVE7QUFBQSxVQUNoQyxVQUFVLEtBQUssRUFBRSxXQUFXLEVBQUUsV0FBVztBQUFBLFVBQ3pDLElBQUk7QUFBQSxZQUNGLE9BQU8sS0FBSyxFQUFFLEtBQUssRUFBRSxLQUFLO0FBQUEsWUFDMUIsT0FBTyxLQUFLLEVBQUUsVUFBVSxFQUFFLFVBQVU7QUFBQSxVQUNyQztBQUFBLFVBQ0QsUUFBUTtBQUFBLFlBQ04sT0FBTyxLQUFLLEVBQUUsU0FBUyxFQUFFLFNBQVM7QUFBQSxZQUNsQyxPQUFPLEtBQUssRUFBRSxjQUFjLEVBQUUsY0FBYztBQUFBLFVBQzdDO0FBQUEsUUFDRjtBQUFBLE1BQ1QsQ0FBTyxFQUNFLEtBQUssTUFBTTtBQUNWLGdCQUFRLElBQUk7QUFBQSxNQUN0QixDQUFTLEVBQ0EsU0FBUyxNQUFNO0FBQ2QsZUFBTyxRQUFRO0FBQUEsTUFDekIsQ0FBUztBQUFBLElBQ1QsQ0FBSztBQUFBLEVBQ0Y7QUFBQSxFQUNELE1BQU0sS0FBSyxHQUFHO0FBQ1osWUFBUSxLQUFLLHlCQUF5QixTQUFTO0FBQy9DLFFBQUksU0FBUyxDQUFBO0FBQ2IsUUFBSSxPQUFPLFFBQVEsVUFBVTtBQUMzQixVQUFJLElBQUksUUFBUTtBQUNkLGVBQU8sS0FBSyxJQUFJLE1BQU0sRUFBRSxRQUFRLFNBQVUsS0FBSztBQUM3QyxjQUFJLE9BQU8sSUFBSSxPQUFPLFNBQVMsVUFBVTtBQUN2QyxtQkFBTyxLQUFLO0FBQUEsY0FDVixNQUFNO0FBQUEsY0FDTixNQUFNLElBQUksT0FBTztBQUFBLFlBQy9CLENBQWE7QUFBQSxVQUNiLE9BQWlCO0FBQ0wsZ0JBQUksT0FBTyxLQUFLLFFBQVEsQ0FBQyxRQUFRO0FBQy9CLHFCQUFPLEtBQUs7QUFBQSxnQkFDVixPQUFPO0FBQUEsZ0JBQ1AsTUFBTTtBQUFBLGdCQUNOLE1BQU07QUFBQSxjQUN0QixDQUFlO0FBQUEsWUFDZixDQUFhO0FBQUEsVUFDRjtBQUFBLFFBQ1gsQ0FBUztBQUFBLE1BQ1QsT0FBYTtBQUNMLGVBQU8sS0FBSyxJQUFJLE9BQU87QUFBQSxNQUN4QjtBQUFBLElBQ1AsT0FBVztBQUNMLGFBQU8sS0FBSyxHQUFHO0FBQUEsSUFDaEI7QUFFRCxXQUFPLE9BQU87QUFBQSxNQUNaLFdBQVc7QUFBQSxNQUNYLGdCQUFnQjtBQUFBLFFBQ2QsS0FBSztBQUFBLFFBQ0wsTUFBTTtBQUFBLFFBQ04sT0FBTyxLQUFLLEVBQUUsUUFBUSxFQUFFLFFBQVE7QUFBQSxNQUNqQztBQUFBLElBQ1AsQ0FBSyxFQUFFLEtBQUssTUFBTTtBQUNaLGNBQVEsSUFBSSxJQUFJO0FBQUEsSUFDdEIsQ0FBSztBQUFBLEVBQ0Y7QUFBQSxFQUNELFFBQVEsS0FBSyxHQUFHO0FBQ2QsWUFBUSxLQUFLLDJCQUEyQixTQUFTO0FBQ2pELFdBQU8sT0FBTztBQUFBLE1BQ1osV0FBVztBQUFBLE1BQ1gsZ0JBQWdCO0FBQUEsUUFDZDtBQUFBLFFBQ0EsTUFBTSxLQUFLLEVBQUUsT0FBTyxFQUFFLE9BQU87QUFBQSxRQUM3QixPQUFPLEtBQUssRUFBRSxRQUFRLEVBQUUsUUFBUTtBQUFBLE1BQ2pDO0FBQUEsSUFDUCxDQUFLLEVBQUUsS0FBSyxNQUFNO0FBQ1osY0FBUSxJQUFJLElBQUk7QUFBQSxJQUN0QixDQUFLO0FBQUEsRUFDRjtBQUFBLEVBQ0QsT0FBTyxLQUFLLEtBQUs7QUFDZixXQUFPLEtBQUssTUFBTSxLQUFLLE9BQU0sS0FBTSxNQUFNLE1BQU0sS0FBSyxHQUFHO0FBQUEsRUFDeEQ7QUFBQSxFQUNELEtBQUssS0FBSyxLQUFLLE9BQU87QUFDcEIsVUFBTSxPQUFPLENBQUE7QUFDYixhQUFTLElBQUksR0FBRyxLQUFLLE9BQU8sS0FBSztBQUMvQixXQUFLLEtBQUssS0FBSyxPQUFPLEtBQUssR0FBRyxDQUFDO0FBQUEsSUFDaEM7QUFDRCxXQUFPO0FBQUEsRUFDUjtBQUFBLEVBQ0QsS0FBSyxLQUFLO0FBQ1IsV0FBTyxJQUNKLFNBQVUsRUFDVixLQUFNLEVBQ04sWUFBYSxFQUNiLFFBQVEsTUFBTSxHQUFHLEVBQ2pCLFFBQVEsWUFBWSxFQUFFO0FBQUEsRUFDMUI7QUFBQSxFQUNELFNBQVMsTUFBTSxLQUFLO0FBQ2xCLFdBQU8sS0FBSyxJQUFJLENBQUMsWUFBWSxRQUFRLElBQUksRUFBRSxLQUFLLElBQUk7QUFBQSxFQUNyRDtBQUFBLEVBQ0QsTUFBTSxhQUFhLEtBQUs7QUFDdEIsV0FBTyxJQUFJLFFBQVEsQ0FBQyxTQUFTLFdBQVc7QUFDdEMsWUFBTSxTQUFTLFNBQVMsY0FBYyxRQUFRO0FBQzlDLGFBQU8sUUFBUTtBQUNmLGFBQU8sTUFBTTtBQUNiLGFBQU8saUJBQWlCLFFBQVEsQ0FBQyxVQUFVO0FBQ3pDO01BQ1IsQ0FBTztBQUNELGFBQU87QUFBQSxRQUFpQjtBQUFBLFFBQVMsTUFDL0IsT0FBTywyQkFBMkIsTUFBTSxHQUFHO0FBQUEsTUFDbkQ7QUFDTSxhQUFPO0FBQUEsUUFBaUI7QUFBQSxRQUFTLE1BQy9CLE9BQU8saUNBQWlDLE1BQU0sR0FBRztBQUFBLE1BQ3pEO0FBQ00sZUFBUyxLQUFLLFlBQVksTUFBTTtBQUFBLElBQ3RDLENBQUs7QUFBQSxFQUNGO0FBQUEsRUFDRCxhQUFhLEtBQUssVUFBVTtBQUMxQixRQUFJLFlBQVksYUFBYSxTQUFZLFNBQVMsR0FBRyxJQUFJO0FBRXpELGdCQUNFLGNBQWMsVUFBYSxjQUFjLE9BQU8sS0FBSyxPQUFPLFNBQVM7QUFFdkUsZ0JBQVksVUFBVSxNQUFNLEdBQUcsRUFBRSxLQUFLLElBQUk7QUFRMUMsV0FBTyxJQUFJO0FBQUEsRUFDWjtBQUFBLEVBQ0QsT0FBTyxPQUFPLE1BQU0sT0FBTyxZQUFZO0FBQ3JDLFVBQU0sVUFBVSxDQUFDLE1BQU0sUUFBUSxJQUFJLENBQUMsUUFBUSxLQUFLLGFBQWEsSUFBSSxLQUFLLENBQUMsQ0FBQyxFQUN0RTtBQUFBLE1BQ0MsTUFBTSxLQUFLO0FBQUEsUUFBSSxDQUFDLFFBQ2QsTUFBTSxRQUNIO0FBQUEsVUFBSSxDQUFDLFFBQ0osS0FBSztBQUFBLFlBQ0gsT0FBTyxJQUFJLFVBQVUsYUFDakIsSUFBSSxNQUFNLEdBQUcsSUFDYixJQUFJLElBQUksVUFBVSxTQUFZLElBQUksT0FBTyxJQUFJO0FBQUEsWUFDakQsSUFBSTtBQUFBLFVBQ0w7QUFBQSxRQUNGLEVBQ0EsS0FBSyxHQUFHO0FBQUEsTUFDWjtBQUFBLElBQ0YsRUFDQSxLQUFLLE1BQU07QUFFZCxVQUFNLFNBQVMsV0FBVyxPQUFPLE1BQU0sS0FBSyxJQUFHLElBQUssUUFBUSxTQUFTLElBQUk7QUFFekUsUUFBSSxXQUFXLE1BQU07QUFDbkIsYUFBTyxPQUFPO0FBQUEsUUFDWixTQUFTO0FBQUEsUUFDVCxPQUFPO0FBQUEsUUFDUCxNQUFNO0FBQUEsTUFDZCxDQUFPO0FBQUEsSUFDRjtBQUFBLEVBQ0Y7QUFBQSxFQUNELFVBQVUsU0FBUyxjQUFjLElBQUksWUFBWSxLQUFLO0FBQ3BELFVBQU0saUJBQWlCLEtBQUssT0FBTztBQUNuQyxVQUFNLGFBQWEsQ0FBQTtBQUVuQixhQUFTLFNBQVMsR0FBRyxTQUFTLGVBQWUsUUFBUSxVQUFVLFdBQVc7QUFDeEUsWUFBTSxRQUFRLGVBQWUsTUFBTSxRQUFRLFNBQVMsU0FBUztBQUU3RCxZQUFNLGNBQWMsSUFBSSxNQUFNLE1BQU0sTUFBTTtBQUMxQyxlQUFTLElBQUksR0FBRyxJQUFJLE1BQU0sUUFBUSxLQUFLO0FBQ3JDLG9CQUFZLEtBQUssTUFBTSxXQUFXLENBQUM7QUFBQSxNQUNwQztBQUVELFlBQU0sWUFBWSxJQUFJLFdBQVcsV0FBVztBQUM1QyxpQkFBVyxLQUFLLFNBQVM7QUFBQSxJQUMxQjtBQUVELFVBQU0sT0FBTyxJQUFJLEtBQUssWUFBWTtBQUFBLE1BQ2hDLE1BQU07QUFBQSxJQUNaLENBQUs7QUFDRCxXQUFPO0FBQUEsRUFDUjtBQUFBLEVBQ0QsV0FBVyxNQUFNO0FBQ2YsVUFBTSxPQUFPLEtBQUssVUFBVSxNQUFNLFlBQVk7QUFDOUMsVUFBTSxNQUFNLElBQUksZ0JBQWdCLElBQUk7QUFDcEMsZUFBVyxNQUFNO0FBQ2YsVUFBSSxnQkFBZ0IsR0FBRztBQUFBLElBQ3hCLEdBQUUsR0FBSztBQUNSLFdBQU87QUFBQSxFQUNSO0FBQUEsRUFDRCxRQUFRLEdBQUc7QUFDVCxRQUFJLEtBQUssT0FBTyxNQUFNLFVBQVU7QUFDOUIsVUFBSSxFQUFFLFFBQVEsR0FBRyxNQUFNLElBQUk7QUFDekIsWUFBSSxLQUFLLFlBQVksR0FBRyxZQUFZO0FBQUEsTUFDckMsV0FBVSxFQUFFLFFBQVEsR0FBRyxNQUFNLElBQUk7QUFDaEMsWUFBSSxLQUFLLFlBQVksR0FBRyxZQUFZO0FBQUEsTUFDckM7QUFBQSxJQUNGLFdBQVUsQ0FBQyxLQUFLLE9BQU8sTUFBTSxVQUFVO0FBQ3RDLFVBQUksSUFBSTtJQUNUO0FBRUQsV0FBTztBQUFBLEVBQ1I7QUFBQSxFQUNELE9BQU8sS0FBSyxHQUFHO0FBQ2IsUUFBSSxNQUFNO0FBQ1YsUUFBSSxPQUFPLE9BQU8sSUFBSSxXQUFXLGFBQWE7QUFDNUMsYUFBTyxLQUFLLEdBQUcsRUFBRSxRQUFRLFNBQVUsS0FBSztBQUN0QztBQUFBLE1BQ1IsQ0FBTztBQUFBLElBQ0YsV0FBVSxLQUFLO0FBQ2QsWUFBTSxJQUFJO0FBQUEsSUFDWDtBQUNELFdBQU87QUFBQSxFQUNSO0FBQUEsRUFDRCxLQUFLLEtBQUssT0FBTyxLQUFLO0FBQ3BCLFlBQVEsSUFBSSxlQUFlLFNBQVM7QUFDcEMsUUFBSSxLQUFLO0FBQ1AsYUFBTyxJQUFJO0FBQUEsUUFBSyxDQUFDLEdBQUcsTUFDbEIsRUFBRSxTQUFTLEVBQUUsU0FBUyxJQUFJLEVBQUUsU0FBUyxFQUFFLFNBQVMsS0FBSztBQUFBLE1BQzdEO0FBQUEsSUFDQSxPQUFXO0FBQ0wsYUFBTyxJQUFJO0FBQUEsUUFBSyxDQUFDLEdBQUcsTUFDbEIsRUFBRSxTQUFTLEVBQUUsU0FBUyxLQUFLLEVBQUUsU0FBUyxFQUFFLFNBQVMsSUFBSTtBQUFBLE1BQzdEO0FBQUEsSUFDSztBQUFBLEVBQ0Y7QUFBQSxFQUNELFVBQVUsUUFBUTtBQUNoQixXQUFPLGlCQUFpQixNQUFNO0FBQUEsRUFDL0I7QUFBQSxFQUNELFdBQVcsTUFBTTtBQUNmLFFBQUksTUFBTTtBQUNSLGFBQU8sV0FBVyxJQUFJO0FBQUEsSUFDNUIsT0FBVztBQUNMLGFBQU87QUFBQSxJQUNSO0FBQUEsRUFDRjtBQUFBLEVBQ0QsT0FBTztBQUFBLElBQ0wsT0FBTyxTQUFVLE9BQU87QUFDdEIsVUFBSSxLQUNGO0FBQ0YsYUFBTyxHQUFHLEtBQUssS0FBSztBQUFBLElBQ3JCO0FBQUEsRUFDRjtBQUFBLEVBQ0QsV0FBVyxHQUFHLE1BQU07QUFDbEIsUUFBSUMsVUFBUztBQUViLFlBQVE7QUFBQSxXQUNEO0FBQ0gsUUFBQUEsVUFBUztBQUNUO0FBQUE7QUFFSixRQUFJLEtBQUssT0FBTyxNQUFNLFVBQVU7QUFDOUIsVUFBSSxLQUFLLFFBQVEsQ0FBQztBQUFBLElBQ25CO0FBQ0QsUUFBSSxPQUFPLEVBQUUsYUFBYSxZQUFZO0FBQ3BDLFVBQUksS0FBSyxXQUFXLEdBQUdBLE9BQU07QUFBQSxJQUM5QjtBQUVELFdBQU87QUFBQSxFQUNSO0FBQUEsRUFDRCxRQUFRLEtBQUs7QUFDWCxZQUFRLEtBQUssMkJBQTJCLFNBQVM7QUFDakQsWUFBUSxHQUFHO0FBQUEsRUFDWjtBQUFBLEVBQ0QsTUFBTTtBQUNKLFlBQVEsS0FBSyx1QkFBdUIsU0FBUztBQUM3QyxXQUFPLElBQUc7QUFBQSxFQUNYO0FBQUEsRUFDRCxjQUFjLFNBQVMsVUFBVTtBQUMvQixZQUFRLEtBQUssaUNBQWlDLFNBQVM7QUFDdkQsUUFBSSxNQUFNLFFBQVEsTUFBTSxHQUFHLEdBQ3pCLE9BQU8sSUFBSSxHQUFHLE1BQU0sU0FBUyxFQUFFLElBQy9CLE9BQU8sS0FBSyxJQUFJLEVBQUUsR0FDbEIsSUFBSSxLQUFLLFFBQ1QsUUFBUSxJQUFJLFdBQVcsQ0FBQztBQUUxQixXQUFPLEtBQUs7QUFDVixZQUFNLEtBQUssS0FBSyxXQUFXLENBQUM7QUFBQSxJQUM3QjtBQUVELFdBQU8sSUFBSSxLQUFLLENBQUMsS0FBSyxHQUFHLFVBQVUsRUFBRSxNQUFNLEtBQUksQ0FBRTtBQUFBLEVBQ2xEO0FBQUEsRUFDRCxnQkFBZ0IsTUFBTTtBQUNwQixRQUFJLElBQUksQ0FBRSxHQUNSLE1BQU0sS0FBSyxTQUFTO0FBQ3RCLGFBQVMsT0FBTyxLQUFLLEdBQUc7QUFDdEIsZUFBUyxJQUFJLEdBQUcsSUFBSSxLQUFLLEdBQUcsUUFBUSxJQUFJLEdBQUcsS0FBSztBQUM5QyxZQUFJLElBQUksSUFBSSxNQUFNLENBQUM7QUFDbkIsVUFBRSxLQUFLLEtBQUssR0FBRyxFQUFFO0FBQ2pCLFlBQUksTUFBTSxLQUFLO0FBQ2IsWUFBRSxLQUFLLENBQUM7QUFBQSxRQUNsQixPQUFlO0FBQ0wsaUJBQU8sR0FBRyxJQUFJLENBQUM7QUFBQSxRQUNoQjtBQUFBLE1BQ0Y7QUFBQSxJQUNGO0FBQ0QsV0FBTyxDQUFBLEdBQUksQ0FBQztBQUNaLFdBQU87QUFBQSxFQUNSO0FBQUEsRUFDRCxNQUFNLE9BQU8sU0FBUyxJQUFJO0FBQ3hCLFdBQU8sS0FBSyxhQUFhLE9BQU8sTUFBTTtBQUFBLEVBQ3ZDO0FBQUEsRUFDRCxhQUFhLE9BQU8sU0FBUyxJQUFJO0FBRy9CLFVBQU1DLFdBQVUsT0FBTztBQUFBLE1BQ3JCO0FBQUEsUUFDRSxRQUFRO0FBQUEsUUFDUixhQUFhO0FBQUEsUUFDYixXQUFXO0FBQUEsTUFDWjtBQUFBLE1BQ0Q7QUFBQSxJQUNOO0FBQ0ksVUFBTSxVQUFVO0FBQUEsTUFDYixPQUFPLEtBQUssRUFBRSxRQUFRQSxTQUFRLFNBQVMsSUFDdEMsT0FBTyxLQUFLQSxTQUFRLFlBQVksR0FBRyxJQUNuQztBQUFBLElBQ1I7QUFDSSxXQUFPLElBQUksYUFBYUEsUUFBTyxFQUFFLE9BQU8sT0FBTztBQUFBLEVBQ2hEO0FBQUEsRUFDRCxTQUFTLE1BQU0sTUFBTSxXQUFXO0FBQzlCLFlBQVEsS0FBSyw0QkFBNEIsU0FBUztBQUNsRCxRQUFJLFdBQVc7QUFDYixhQUFPLEtBQUs7SUFDYjtBQUNELGlCQUFhLFNBQVM7QUFDdEIsZ0JBQVksV0FBVyxNQUFNO0FBQzNCLGFBQU8sS0FBSztJQUNiLEdBQUUsSUFBSTtBQUFBLEVBQ1I7QUFBQSxFQUNELGdCQUFnQixNQUFNLFNBQVM7QUFDN0IsWUFBUSxLQUFLLG1DQUFtQyxTQUFTO0FBQ3pELG9CQUFnQixJQUFJLEVBQUUsS0FBSyxNQUFNO0FBQy9CLGFBQU8sT0FBTztBQUFBLFFBQ1osU0FBUyxXQUFXO0FBQUEsTUFDNUIsQ0FBTztBQUFBLElBQ1AsQ0FBSztBQUFBLEVBQ0Y7QUFBQSxFQUNELGFBQWEsS0FBSyxRQUFRO0FBQ3hCLFdBQU8sS0FBSyxTQUFTLEtBQUssTUFBTSxJQUFJLE9BQU8sS0FBSyxLQUFLLElBQUksSUFBSTtBQUFBLEVBQzlEO0FBQUEsRUFDRCxTQUFTLEtBQUssUUFBUTtBQUNwQixXQUFPLE9BQU87QUFBQSxFQUNmO0FBQUEsRUFDRCxjQUFjO0FBQ1osV0FBTyxJQUFJLFFBQVEsU0FBVSxTQUFTLFFBQVE7QUFDNUMsZ0JBQVUsWUFBWTtBQUFBLFFBQ3BCLENBQUMsYUFBYSxRQUFRLFFBQVE7QUFBQSxRQUM5QixDQUFDLFVBQVUsT0FBTyxLQUFLO0FBQUEsTUFDL0I7QUFBQSxJQUNBLENBQUs7QUFBQSxFQUNGO0FBQ0g7QUN0WkEsTUFDRSxNQUFxQyxnQkFDckMsT0FBc0MsSUFBSSxVQUFVLE1BQ3BELGlCQUFpQixDQUFFLE9BQU8sU0FBUyxVQUFVLE1BQVE7QUFFdkQsSUFBSSxRQUFRLENBQUU7QUFDZCxJQUFJLGdCQUFnQjtBQUVwQixTQUFTLFVBQVcsRUFBRSxHQUFHLEtBQUssUUFBUSxPQUFPLFNBQVMsT0FBTztBQUMzRCxNQUFJLElBQUksR0FBRyxJQUFJO0FBRWYsTUFBSSxVQUFVLE1BQU07QUFDbEIsUUFBSSxZQUFZLE1BQU07QUFBRSxVQUFJO0FBQUEsSUFBSTtBQUNoQyxRQUFJLFFBQVEsVUFBVTtBQUFFLFVBQUk7QUFBQSxJQUFJO0FBQ2hDLFdBQU8sRUFBRSxXQUFXLGVBQWdCLEtBQUssSUFBSSxTQUFXLFNBQVMsSUFBSSxJQUFJLFdBQWE7QUFBQSxFQUN2RjtBQUVELE1BQUksWUFBWSxNQUFNO0FBQUUsUUFBSTtBQUFBLEVBQUk7QUFDaEMsTUFBSSxRQUFRLFNBQVM7QUFBRSxRQUFJO0FBQUEsRUFBSTtBQUMvQixTQUFPLEVBQUUsV0FBVyxlQUFnQixTQUFTLElBQUksTUFBTSxJQUFJLFNBQVcsS0FBSyxJQUFJLFdBQWE7QUFDOUY7QUFFQSxTQUFTLElBQUssR0FBRyxRQUFRO0FBQ3ZCLE1BQUksT0FBTyxXQUFXLFVBQVU7QUFDOUIsUUFBSSxJQUFJLElBQUk7QUFDVixlQUFTLEtBQUssT0FBUSxJQUFHLElBQUk7QUFBQSxJQUM5QixXQUNRLElBQUksSUFBSTtBQUNmLGVBQVMsS0FBSyxPQUFNLElBQUs7QUFBQSxJQUMxQixXQUNRLElBQUksSUFBSTtBQUNmLGVBQVMsS0FBSyxPQUFNLElBQUs7QUFBQSxJQUMxQixXQUNRLElBQUksSUFBSTtBQUNmLGVBQVM7QUFBQSxJQUNWLE9BQ0k7QUFDSCxlQUFTO0FBQUEsSUFDVjtBQUFBLEVBQ0Y7QUFDRCxTQUFPLFFBQVEsSUFBSSxRQUFRLEdBQUcsR0FBRztBQUNuQztBQUVBLFNBQVMsYUFBYyxZQUFZO0FBQ2pDO0FBRUEsUUFBTSxLQUFLLFVBQVU7QUFFckIsTUFBSSxnQkFBZ0IsR0FBRztBQUFFO0FBQUEsRUFBUTtBQUVqQyxNQUFJLFVBQVUsT0FBTyxTQUFVLEdBQUcsS0FBSztBQUNyQyxVQUFNLFlBQVksQ0FBRTtBQUVwQixVQUFNLFlBQVksTUFBTTtBQUN0QixZQUFNLFFBQVEsV0FBUztBQUNyQixZQUNFLE1BQU0sYUFBYSxVQUFVLFFBQ3pCLE1BQU0sYUFBYSxNQUFNLEdBQUcsTUFBTSxNQUN0QztBQUNBLGdCQUFNLE1BQU87QUFDYixvQkFBVSxLQUFLLE1BQU0sSUFBSTtBQUFBLFFBQzFCO0FBQUEsTUFDVCxDQUFPO0FBQUEsSUFDRjtBQUVELFVBQU0sVUFBVSxNQUFNO0FBQ3BCLGdCQUFVLFFBQVEsVUFBUTtBQUFFLGFBQU07QUFBQSxNQUFBLENBQUU7QUFBQSxJQUNyQztBQUVELFNBQUssaUJBQWlCLGFBQWEsV0FBVyxFQUFFLE1BQU0sTUFBTTtBQUM1RCxTQUFLLGlCQUFpQixXQUFXLFNBQVMsRUFBRSxNQUFNLE1BQU07QUFFeEQsU0FBSyxNQUFNLE1BQU0sU0FBUztBQUFBLEVBQzNCO0FBQ0g7QUFFQSxTQUFTLFlBQWEsT0FBTztBQUMzQixVQUFRLE1BQU0sT0FBTyxXQUFTLE1BQU0sVUFBVSxLQUFLO0FBRW5ELGtCQUFnQixLQUFLLElBQUksR0FBRyxnQkFBZ0IsQ0FBQztBQUM3QyxNQUFJLGtCQUFrQixHQUFHO0FBQ3ZCLFFBQUksVUFBVSxPQUFPO0FBQUEsRUFDdEI7QUFDSDtBQUVBLElBQUEsV0FBZSxnQkFBZ0I7QUFBQSxFQUM3QixNQUFNO0FBQUEsRUFFTixPQUFPO0FBQUEsSUFDTCxVQUFVO0FBQUEsTUFDUixNQUFNO0FBQUEsTUFDTixTQUFTO0FBQUEsTUFDVCxXQUFXLFNBQU8sZUFBZSxTQUFTLEdBQUc7QUFBQSxJQUM5QztBQUFBLElBRUQsTUFBTTtBQUFBLE1BQ0osTUFBTTtBQUFBLE1BQ04sU0FBUztBQUFBLElBQ1Y7QUFBQSxJQUVELE9BQU87QUFBQSxJQUNQLFlBQVk7QUFBQSxJQUNaLFNBQVM7QUFBQSxJQUVULGNBQWM7QUFBQSxFQUNmO0FBQUEsRUFFRCxPQUFPLENBQUUsU0FBUyxNQUFRO0FBQUEsRUFFMUIsTUFBTyxPQUFPLEVBQUUsUUFBUTtBQUN0QixVQUFNLEVBQUUsTUFBTyxJQUFHLG1CQUFvQjtBQUV0QyxVQUFNLFdBQVcsSUFBSSxDQUFDO0FBQ3RCLFVBQU0sV0FBVyxJQUFJLEtBQUs7QUFDMUIsVUFBTSxVQUFVLElBQUksSUFBSTtBQUV4QixRQUFJLFdBQVcsR0FBRyxPQUFPO0FBRXpCLFVBQU0sVUFBVTtBQUFBLE1BQVMsTUFDdkIsZ0NBQWlDLE1BQU0sY0FDcEMsTUFBTSxVQUFVLFNBQVMsT0FBUSxNQUFNLFVBQVcsT0FDbEQsUUFBUSxVQUFVLE9BQU8sS0FBSztBQUFBLElBQ2xDO0FBRUQsVUFBTSxhQUFhLFNBQVMsTUFBTSxNQUFNLGFBQWEsU0FBUyxNQUFNLGFBQWEsUUFBUTtBQUN6RixVQUFNLFdBQVcsU0FBUyxNQUFPLFdBQVcsVUFBVSxPQUFPLFdBQVcsT0FBUTtBQUVoRixVQUFNLFFBQVEsU0FBUyxNQUFNO0FBQzNCLFlBQU0sU0FBUyxTQUFTO0FBRXhCLFlBQU0sTUFBTSxVQUFVO0FBQUEsUUFDcEIsR0FBRyxTQUFTO0FBQUEsUUFDWixLQUFLLE1BQU07QUFBQSxRQUNYO0FBQUEsUUFDQSxPQUFPLFdBQVc7QUFBQSxRQUNsQixTQUFTLE1BQU0sR0FBRyxLQUFLLFFBQVEsUUFBUSxDQUFFLE9BQU8sUUFBVSxFQUFDLFNBQVMsTUFBTSxRQUFRLElBQzlFLE1BQU0sWUFBWSxRQUNsQixNQUFNO0FBQUEsUUFDVixLQUFLLE1BQU0sR0FBRyxLQUFLLFFBQVEsT0FBTyxLQUFLO0FBQUEsTUFDL0MsQ0FBTztBQUVELFVBQUssU0FBUyxTQUFVLE1BQU07QUFDOUIsVUFBSSxVQUFVLFNBQVMsSUFBSTtBQUUzQixhQUFPO0FBQUEsSUFDYixDQUFLO0FBRUQsVUFBTSxhQUFhLFNBQVMsTUFDMUIsU0FBUyxVQUFVLE9BQ2Y7QUFBQSxNQUNFLE1BQU07QUFBQSxNQUNOLGlCQUFpQjtBQUFBLE1BQ2pCLGlCQUFpQjtBQUFBLE1BQ2pCLGlCQUFpQixTQUFTO0FBQUEsSUFDM0IsSUFDRCxFQUFFLGVBQWUsT0FBUSxDQUM5QjtBQUVELGFBQVMsTUFBTyxXQUFXLEtBQUs7QUFDOUIsWUFBTSxXQUFXO0FBQ2pCLGNBQVEsS0FBSyxJQUFJLEdBQUcsUUFBUSxLQUFLO0FBRWpDO0FBRUEsVUFBSSxXQUFXLEdBQUc7QUFDaEIsWUFBSSxhQUFhLEtBQUssV0FBVyxHQUFHO0FBQ2xDLHVCQUFjO0FBQUEsUUFDZixXQUNRLFdBQVcsS0FBSyxZQUFZLEdBQUc7QUFDdEMsdUJBQWEsS0FBSztBQUFBLFFBQ25CO0FBRUQsZUFBTztBQUFBLE1BQ1I7QUFFRCxtQkFBYSxLQUFLO0FBQ2xCLFdBQUssT0FBTztBQUVaLGVBQVMsUUFBUTtBQUVqQixjQUFRLFdBQVcsTUFBTTtBQUN2QixnQkFBUSxRQUFRO0FBQ2hCLG1CQUFXLEtBQUssYUFBYztBQUFBLE1BQy9CLEdBQUUsU0FBUyxVQUFVLE9BQU8sTUFBTSxDQUFDO0FBRXBDLFVBQUksU0FBUyxVQUFVLE1BQU07QUFDM0IsaUJBQVMsUUFBUTtBQUNqQixnQkFBUSxRQUFRO0FBQUEsTUFDakI7QUFFRCxhQUFPO0FBQUEsSUFDUjtBQUVELGFBQVMsVUFBVyxRQUFRO0FBQzFCLFVBQUksV0FBVyxHQUFHO0FBQ2hCLGlCQUFTLFFBQVEsSUFBSSxTQUFTLE9BQU8sTUFBTTtBQUFBLE1BQzVDO0FBRUQsYUFBTztBQUFBLElBQ1I7QUFFRCxhQUFTLE9BQVE7QUFDZixpQkFBVyxLQUFLLElBQUksR0FBRyxXQUFXLENBQUM7QUFDbkMsVUFBSSxXQUFXLEdBQUc7QUFDaEIsZUFBTztBQUFBLE1BQ1I7QUFFRCxtQkFBYSxLQUFLO0FBQ2xCLFdBQUssTUFBTTtBQUVYLFlBQU0sTUFBTSxNQUFNO0FBQ2hCLGdCQUFRLFFBQVE7QUFDaEIsaUJBQVMsUUFBUTtBQUNqQixnQkFBUSxXQUFXLE1BQU07QUFDdkIsbUJBQVMsUUFBUTtBQUFBLFFBQ2xCLEdBQUUsR0FBSTtBQUFBLE1BQ1I7QUFFRCxVQUFJLFNBQVMsVUFBVSxHQUFHO0FBQ3hCLGdCQUFRLFdBQVcsS0FBSyxDQUFDO0FBQUEsTUFDMUIsT0FDSTtBQUNILFlBQUs7QUFBQSxNQUNOO0FBRUQsYUFBTztBQUFBLElBQ1I7QUFFRCxhQUFTLGVBQWdCO0FBQ3ZCLFVBQUksU0FBUyxRQUFRLEtBQUs7QUFDeEIsZ0JBQVEsV0FBVyxNQUFNO0FBQ3ZCLG9CQUFXO0FBQ1gsdUJBQWM7QUFBQSxRQUNmLEdBQUUsS0FBSztBQUFBLE1BQ1Q7QUFBQSxJQUNGO0FBRUQsUUFBSTtBQUVKLGNBQVUsTUFBTTtBQUNkLFVBQUksTUFBTSxlQUFlLE1BQU07QUFDN0IsbUJBQVc7QUFDWCxxQkFBYTtBQUFBLFVBQ1g7QUFBQSxVQUNBO0FBQUEsVUFDQSxjQUFjLFNBQVMsTUFBTSxNQUFNLGdCQUFnQixJQUFJO0FBQUEsUUFDakUsQ0FBUztBQUFBLE1BQ0Y7QUFBQSxJQUNQLENBQUs7QUFFRCxvQkFBZ0IsTUFBTTtBQUNwQixtQkFBYSxLQUFLO0FBQ2xCLG1CQUFhLFFBQVEsWUFBWSxLQUFLO0FBQUEsSUFDNUMsQ0FBSztBQUdELFdBQU8sT0FBTyxPQUFPLEVBQUUsT0FBTyxNQUFNLFdBQVc7QUFFL0MsV0FBTyxNQUFNLEVBQUUsT0FBTztBQUFBLE1BQ3BCLE9BQU8sUUFBUTtBQUFBLE1BQ2YsT0FBTyxNQUFNO0FBQUEsTUFDYixHQUFHLFdBQVc7QUFBQSxJQUNwQixDQUFLO0FBQUEsRUFDRjtBQUNILENBQUM7QUNuUUQsTUFBTSxTQUFTLElBQUksSUFBSTtBQUV2QixNQUFNLFNBQVMscUJBQXFCO0FBQUEsRUFDbEMsVUFBVTtBQUNaLEdBQUc7QUFBQSxFQUNELE9BQU87QUFBQSxFQUNQLE1BQU07QUFBQSxFQUNOLFdBQVc7QUFBQSxFQUNYLGFBQWE7QUFBQSxFQUViLFFBQVMsRUFBRSxJQUFJLGFBQWE7QUFDMUIsT0FBRyxhQUFhO0FBSWhCLFFBQUksS0FBSyxnQkFBZ0IsTUFBTTtBQUM3QixVQUFJLEdBQUcsT0FBTyxlQUFlLFFBQVE7QUFDbkMsYUFBSyxZQUFZLEdBQUcsT0FBTyxVQUFVO0FBQUEsTUFDdEM7QUFDRDtBQUFBLElBQ0Q7QUFFRCxVQUFNLFFBQVE7QUFBQSxNQUNaLEdBQUcsT0FBTyxlQUFlLFNBQ3JCLEVBQUUsR0FBRyxHQUFHLE9BQU8sV0FBWSxJQUMzQixDQUFFO0FBQUEsSUFDUDtBQUVELGFBQVMsVUFBVztBQUNsQixhQUFPLFdBQVc7QUFBQSxJQUNuQjtBQUVELGFBQVMsU0FBVTtBQUNqQixhQUFPLFdBQVc7QUFBQSxJQUNuQjtBQUVELFVBQU0sS0FBSyxpQkFBaUIsZUFBZTtBQUUzQyxtQkFBZTtBQUFBLE1BQ2IsTUFBTTtBQUFBLE1BR04sVUFBVSxFQUFFLE1BQU0sS0FBTTtBQUFBLE1BRXhCLE9BQU8sTUFBTSxNQUFNLEVBQUUsVUFBVSxFQUFFLEdBQUcsTUFBTSxPQUFPLFNBQVMsUUFBUSxLQUFLLE9BQU0sQ0FBRTtBQUFBLElBQ3JGLEdBQU8sU0FBUyxFQUFFLE1BQU0sRUFBRTtBQUV0QixXQUFPLE9BQU8sTUFBTTtBQUFBLE1BQ2xCLE1BQU8sT0FBTztBQUNaLGVBQU8sTUFBTSxNQUFNLEtBQUs7QUFBQSxNQUN6QjtBQUFBLE1BQ0QsT0FBUTtBQUNOLGVBQU8sTUFBTSxLQUFNO0FBQUEsTUFDcEI7QUFBQSxNQUNELFlBQWE7QUFDWCxlQUFPLE1BQU0sVUFBVSxNQUFNLE1BQU0sU0FBUztBQUFBLE1BQzdDO0FBQUEsTUFDRCxZQUFhLE1BQU07QUFDakIsWUFBSSxTQUFTLElBQUksTUFBTSxNQUFNO0FBQzNCLGlCQUFPLE9BQU8sTUFBTSxPQUFPLElBQUk7QUFBQSxRQUNoQztBQUFBLE1BQ0Y7QUFBQSxJQUNQLENBQUs7QUFBQSxFQUNGO0FBQ0gsQ0FBQztBQ3RFRCxJQUFlLE1BQUE7QUFBQSxFQUNiLE9BQU8sQ0FBRTtBQUFBLEVBQ1QsT0FBTztBQUNMLFlBQVEsSUFBSSxjQUFjLFNBQVM7QUFBQSxFQUNwQztBQUFBLEVBQ0QsTUFBTSxLQUFLLFFBQVEsVUFBVSxNQUFNLEdBQUc7QUFDcEMsWUFBUSxLQUFLLCtCQUErQixTQUFTO0FBQ3JEQyxXQUFXLE1BQUs7QUFDaEIsV0FBTyxJQUFJLFFBQVEsQ0FBQyxTQUFTLFdBQVc7QUFDdEMsVUFBSSxXQUFXO0FBQUEsUUFDYixLQUFLO0FBQUEsUUFDTDtBQUFBLFFBQ0Esa0JBQWtCLENBQUMsVUFBVTtBQUMzQixnQkFBTSxXQUFXO0FBQUEsWUFDZixLQUFLLE1BQU8sTUFBTSxTQUFTLE1BQU8sTUFBTSxLQUFLO0FBQUEsVUFDekQ7QUFFVUEsaUJBQVcsVUFBVSxRQUFRO0FBQUEsUUFDOUI7QUFBQSxRQUNELG9CQUFvQixDQUFDLFVBQVU7QUFDN0IsZ0JBQU0sV0FBVztBQUFBLFlBQ2YsS0FBSyxNQUFPLE1BQU0sU0FBUyxNQUFPLE1BQU0sS0FBSztBQUFBLFVBQ3pEO0FBRVVBLGlCQUFXLFVBQVUsUUFBUTtBQUFBLFFBQzlCO0FBQUEsTUFDVDtBQUVNLFVBQUksV0FBVyxPQUFPO0FBQ3BCLGlCQUFTLFNBQVM7QUFBQSxNQUMxQixPQUFhO0FBQ0wsaUJBQVMsT0FBTztBQUFBLE1BQ2pCO0FBRUQsVUFBSSxLQUFLLEVBQUUsY0FBYztBQUN2QixpQkFBUyxlQUFlLEVBQUU7QUFBQSxNQUMzQjtBQUVELFdBQ0csT0FBTyxRQUFRLEVBQ2YsS0FBSyxDQUFDLGFBQWE7QUFDbEIsZ0JBQVEsU0FBUyxJQUFJO0FBQ3JCQSxlQUFXLEtBQUk7QUFBQSxNQUN6QixDQUFTLEVBQ0EsTUFBTSxDQUFDLFVBQVU7QUFDaEJBLGVBQVcsS0FBSTtBQUNmLFlBQUksTUFBTSxVQUFVO0FBSWxCLGNBQUksQ0FBQyxPQUFPLEtBQUssRUFBRSxTQUFTLE1BQU0sU0FBUyxNQUFNLEdBQUc7QUFDbEQsbUJBQU8sS0FBSztBQUFBLGNBQ1YsTUFBTTtBQUFBLFlBQ3RCLENBQWU7QUFBQSxVQUNGLFdBQVUsTUFBTSxTQUFTLFdBQVcsS0FBSztBQUN4QyxtQkFBTyxLQUFLO0FBQUEsY0FDVixNQUFNO0FBQUEsWUFDdEIsQ0FBZTtBQUFBLFVBQ0Y7QUFFRCxjQUFJLE1BQU0sU0FBUyxNQUFNO0FBQ3ZCO0FBQUEsY0FDRSxNQUFNLFNBQVMsS0FBSyxPQUNoQixNQUFNLFNBQVMsS0FBSyxPQUNwQixNQUFNLFNBQVM7QUFBQSxZQUNuQztBQUFBLFVBQ0EsT0FBbUI7QUFDTCxtQkFBTyxLQUFLO0FBQUEsVUFDYjtBQUNEO0FBQUEsUUFDRDtBQUNELGVBQU8sS0FBSztBQUFBLE1BQ3RCLENBQVM7QUFBQSxJQUNULENBQUs7QUFBQSxFQUNGO0FBQUEsRUFDRCxJQUFJLFVBQVUsTUFBTSxHQUFHO0FBQ3JCLFlBQVEsS0FBSywrQkFBK0IsU0FBUztBQUNyRCxXQUFPLElBQUksUUFBUSxDQUFDLFNBQVMsV0FBVztBQUN0QyxXQUFLLEtBQUssT0FBTyxVQUFVLE1BQU0sQ0FBQyxFQUMvQixLQUFLLENBQUMsYUFBYTtBQUNsQixnQkFBUSxRQUFRO0FBQUEsTUFDMUIsQ0FBUyxFQUNBLE1BQU0sQ0FBQyxVQUFVO0FBQ2hCLGVBQU8sS0FBSztBQUFBLE1BQ3RCLENBQVM7QUFBQSxJQUNULENBQUs7QUFBQSxFQUNGO0FBQUEsRUFDRCxLQUFLLFVBQVUsTUFBTSxHQUFHO0FBQ3RCLFlBQVEsS0FBSyxnQ0FBZ0MsU0FBUztBQUN0RCxXQUFPLElBQUksUUFBUSxDQUFDLFNBQVMsV0FBVztBQUN0QyxXQUFLLEtBQUssUUFBUSxVQUFVLE1BQU0sQ0FBQyxFQUNoQyxLQUFLLENBQUMsYUFBYTtBQUNsQixnQkFBUSxRQUFRO0FBQUEsTUFDMUIsQ0FBUyxFQUNBLE1BQU0sQ0FBQyxVQUFVO0FBQ2hCLGVBQU8sS0FBSztBQUFBLE1BQ3RCLENBQVM7QUFBQSxJQUNULENBQUs7QUFBQSxFQUNGO0FBQUEsRUFDRCxJQUFJLFVBQVUsTUFBTSxHQUFHO0FBQ3JCLFlBQVEsS0FBSywrQkFBK0IsU0FBUztBQUNyRCxXQUFPLElBQUksUUFBUSxDQUFDLFNBQVMsV0FBVztBQUN0QyxXQUFLLEtBQUssT0FBTyxVQUFVLE1BQU0sQ0FBQyxFQUMvQixLQUFLLENBQUMsYUFBYTtBQUNsQixnQkFBUSxRQUFRO0FBQUEsTUFDMUIsQ0FBUyxFQUNBLE1BQU0sQ0FBQyxVQUFVO0FBQ2hCLGVBQU8sS0FBSztBQUFBLE1BQ3RCLENBQVM7QUFBQSxJQUNULENBQUs7QUFBQSxFQUNGO0FBQUEsRUFDRCxPQUFPLFVBQVUsTUFBTSxHQUFHO0FBQ3hCLFlBQVEsS0FBSyxrQ0FBa0MsU0FBUztBQUN4RCxXQUFPLElBQUksUUFBUSxDQUFDLFNBQVMsV0FBVztBQUN0QyxXQUFLLEtBQUssVUFBVSxVQUFVLE1BQU0sQ0FBQyxFQUNsQyxLQUFLLENBQUMsYUFBYTtBQUNsQixnQkFBUSxRQUFRO0FBQUEsTUFDMUIsQ0FBUyxFQUNBLE1BQU0sQ0FBQyxVQUFVO0FBQ2hCLGVBQU8sS0FBSztBQUFBLE1BQ3RCLENBQVM7QUFBQSxJQUNULENBQUs7QUFBQSxFQUNGO0FBQUEsRUFDRCxTQUFTLFVBQVUsTUFBTSxJQUFJLENBQUEsR0FBSTtBQUMvQixZQUFRLEtBQUssb0NBQW9DLFNBQVM7QUFDMUQsV0FBTyxPQUFPLEdBQUc7QUFBQSxNQUNmLGNBQWM7QUFBQSxJQUNwQixDQUFLO0FBQ0QsV0FBTyxJQUFJLFFBQVEsQ0FBQyxTQUFTLFdBQVc7QUFDdEMsV0FBSyxLQUFLLE9BQU8sVUFBVSxNQUFNLENBQUMsRUFDL0IsS0FBSyxDQUFDLGFBQWE7QUFDbEIsZ0JBQVEsUUFBUTtBQUFBLE1BQzFCLENBQVMsRUFDQSxNQUFNLENBQUMsVUFBVTtBQUNoQixlQUFPLEtBQUs7QUFBQSxNQUN0QixDQUFTO0FBQUEsSUFDVCxDQUFLO0FBQUEsRUFDRjtBQUNIOzsifQ==
