const colors = require("colors");

const getNoOfDays = (date) => {
  const copy = new Date(date);
  copy.setMonth(copy.getMonth() + 1);
  copy.setDate(0);
  return copy.getDate();
};

const showCalendar = (noOfDays) => {
  const months = ["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec",];
  const days = ["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"];
  const now = new Date();
  let current = now.getDay() - 1;

  process.stdout.write(`      ${months[now.getMonth()]} ${now.getFullYear()}\n`);
  for (d in days) process.stdout.write(`${days[d]} `);
  process.stdout.write("\n" + "   ".repeat(current));

  for (let i = 0; i < noOfDays; i++) {
    if (current++ % 7 === 0) process.stdout.write("\n");

    let str = ` ${i + 1} `;
    if (i >= 9) str = `${i + 1} `;
    if (i + 1 === now.getDate()) str = colors.bgWhite.black(str);

    process.stdout.write(str);
  }
  process.stdout.write("\n");
};

const main = () => {
  const temp = new Date();
  const daysInMonth = getNoOfDays(temp);
  showCalendar(daysInMonth);
};

main();
