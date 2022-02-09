const getNoOfDays = (year, month) => {
  if (month == 2 ) {
    if ((year % 400 == 0) || (year % 4 == 0 && year % 100 != 0))
      return 29;
    else
      return 28;
  } else if (month == 1 || month == 3 || month == 5 || month == 7 ||
             month == 8 || month == 10 || month == 12)
    return 31;
  else
    return 30;
};

const getWeekDay = (y, m, d) => {
  const t = [0, 3, 2, 5, 0, 3, 5, 1, 4, 6, 2, 4];
  y -= m < 3 ? 1 : 0;
  return Math.ceil((y + y / 4 - y / 100 + y / 400 + t[m - 1] + d) % 7);
};

const showCalendar = (year, month, day) => {
  const noOfDays = getNoOfDays(year, month);
  const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
  const days = ["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"];
  let current = getWeekDay(year, month, day);

  process.stdout.write(`      ${months[month]} ${year}\n`);
  for (d in days) process.stdout.write(`${days[d]} `);
  process.stdout.write("\n" + "   ".repeat(current));

  for (let i = 0; i < noOfDays; i++) {
    if (current++ % 7 === 0) process.stdout.write("\n");

    let str = ` ${i + 1} `;
    if (i >= 9) str = `${i + 1} `;
    if (i + 1 === day) str = "\033[47m\033[30m" + str + "\033[0m";

    process.stdout.write(str);
  }
  process.stdout.write("\n");
};

const main = () => {
  const now = new Date();
  showCalendar(now.getFullYear(), now.getMonth(), now.getDate());
};

main();
