use chrono::prelude::{DateTime, Datelike, Local, NaiveDate};

fn get_no_of_days(year: i32, month: u32) -> i64 {
    NaiveDate::from_ymd(
        match month {
            12 => year + 1,
            _ => year,
        },
        match month {
            12 => 1,
            _ => month + 1,
        },
        1,
    )
    .signed_duration_since(NaiveDate::from_ymd(year, month, 1))
    .num_days()
}

fn show_calendar(no_of_days: i64, today: DateTime<Local>) {
    let months: [&str; 12] = [
        "Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec",
    ];
    let days: [&str; 7] = ["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"];
    let mut current = today.weekday().num_days_from_monday() as i64;

    println!("      {} {}", months[today.month0() as usize], today.year());
    for d in days {
        print!("{:^3}", d);
    }
    print!("\n{}", "   ".repeat(current as usize));

    for i in 0..no_of_days {
        if current % 7 == 0 {
            println!();
        }
        current += 1;

        if i as u32 == today.day0() {
            print!("\x1b[47m\x1b[30m{:^3}\x1b[0m", i + 1);
        } else {
            print!("{:^3}", i + 1);
        }
    }
}

fn main() {
    let temp = Local::now();
    let year = temp.year();
    let month = temp.month();
    show_calendar(get_no_of_days(year, month), temp);
}
