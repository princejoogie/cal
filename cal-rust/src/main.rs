use chrono::prelude::{Datelike, Local};

fn get_no_of_days(year: i32, month: u32) -> i64 {
    if month == 2 {
        if (year % 400 == 0) || (year % 4 == 0 && year % 100 != 0) {
            return 29;
        } else {
            return 28;
        }
    } else if month == 1 || month == 3 || month == 5 || month == 7 ||
              month == 8 || month == 10 || month == 12 {
        return 31;
    } else {
        return 30;
    }
}

fn get_week_day(year: i32, m: u32, d: u32) -> i32 {
    let t: [i32; 12] = [0, 3, 2, 5, 0, 3, 5, 1, 4, 6, 2, 4];
    let mut y = year;
    y -= if m < 3 { 1 } else { 0 };
    let ret = (y + y / 4 - y / 100 + y / 400 + t[(m - 1) as usize] + d as i32) % 7;
    return ret;
}

fn show_calendar(year: i32, month: u32, day: u32) {
    let no_of_days = get_no_of_days(year, month);
    let months: [&str; 12] = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
    let days: [&str; 7] = ["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"];
    let mut current = get_week_day(year, month, 1);

    println!("      {} {}", months[(month - 1) as usize], year);
    for d in days {
        print!("{:^3}", d);
    }
    print!("\n{}", "   ".repeat(current as usize));

    for i in 0..no_of_days {
        if current % 7 == 0 {
            println!();
        }
        current += 1;

        if (i + 1) as u32 == day {
            print!("\x1b[47m\x1b[30m{:^3}\x1b[0m", i + 1);
        } else {
            print!("{:^3}", i + 1);
        }
    }
}

fn main() {
    let now = Local::now();
    show_calendar(now.year(), now.month(), now.day());
}
