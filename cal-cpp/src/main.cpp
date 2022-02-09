#include <chrono>
#include <iostream>
#include <string>

using namespace std;
using namespace chrono;

int getNoOfDays(int year, int month) {
  if (month == 2) {
    if ((year % 400 == 0) || (year % 4 == 0 && year % 100 != 0))
      return 29;
    else
      return 28;
  } else if (month == 1 || month == 3 || month == 5 || month == 7 ||
             month == 8 || month == 10 || month == 12)
    return 31;
  else
    return 30;
}

int getWeekDay(int y, int m, int d) {
  static int t[] = {0, 3, 2, 5, 0, 3, 5, 1, 4, 6, 2, 4};
  y -= m < 3;
  return (y + y / 4 - y / 100 + y / 400 + t[m - 1] + d) % 7;
}

void showCalendar(int year, int month, int day) {
  int noOfDays = getNoOfDays(year, month);
  string months[] = {"Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"};
  string days[] = {"Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"};
  int current = getWeekDay(year, month, 1);

  cout << "      " << months[month - 1] << " " << year << endl;
  cout << "Su Mo Tu We Th Fr Sa" << endl;
  cout << std::string(current * 3, ' ');

  for (int i = 0; i < noOfDays; i++) {
    if (current++ % 7 == 0)
      cout << endl;

    string str = " " + to_string(i + 1) + " ";
    if (i >= 9)
      str = to_string(i + 1) + " ";
    if (i + 1 == day)
      str = "\033[47m\033[30m" + str + "\033[0m";

    cout << str;
  }
}

int main() {
  system_clock::time_point temp = system_clock::now();
  time_t tt = system_clock::to_time_t(temp);
  tm now = *localtime(&tt);
  showCalendar(now.tm_year + 1900, now.tm_mon + 1, now.tm_mday);
  return 0;
}