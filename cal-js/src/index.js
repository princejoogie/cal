const colors = require("colors");

const getNoOfDays = (year, month) => {
  const copy = new Date(year, month);
  copy.setMonth(copy.getMonth() + 1);
  copy.setDate(0);
  return copy.getDate();
};

const getWeekDay = (year, month) => {
  const date = new Date(year, month, 1);
  return date.getDay();
};

const showCalendar = (year, month, day) => {
  const noOfDays = getNoOfDays(year, month);
  const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec",];
  const days = ["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"];
  let current = getWeekDay(year, month);

  process.stdout.write(`      ${months[month]} ${year}\n`);
  for (d in days) process.stdout.write(`${days[d]} `);
  process.stdout.write("\n" + "   ".repeat(current));

  for (let i = 0; i < noOfDays; i++) {
    if (current++ % 7 === 0) process.stdout.write("\n");

    let str = ` ${i + 1} `;
    if (i >= 9) str = `${i + 1} `;
    if (i + 1 === day) str = colors.bgWhite.black(str);

    process.stdout.write(str);
  }
  process.stdout.write("\n");
};

const main = () => {
  const now = new Date();
  showCalendar(now.getFullYear(), now.getMonth(), now.getDate());
};

main();
