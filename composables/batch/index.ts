export function useGetNextDeliveryBatch(inputDate: Date) {
  const dayOfWeek = inputDate.getDay();
  const dayOfWeekName = inputDate.toLocaleDateString("en-US", {
    weekday: "long",
  });
  const date = inputDate.toLocaleDateString("en-US", {
    day: "numeric",
    month: "long",
  });
  const nonWorkingDays = [0, 1];

  if (!nonWorkingDays.includes(dayOfWeek)) {
    // if the time is before 8:30
    if (
      inputDate.getHours() < 8 ||
      (inputDate.getHours() === 8 && inputDate.getMinutes() < 30)
    ) {
      return `${dayOfWeekName}, ${date} by 9am`;
    }

    // if the time is before 12:30
    if (
      inputDate.getHours() < 12 ||
      (inputDate.getHours() === 12 && inputDate.getMinutes() < 30)
    ) {
      return `${dayOfWeekName}, ${date} by 1pm`;
    }

    // if the time is before 4:30
    if (
      inputDate.getHours() < 16 ||
      (inputDate.getHours() === 16 && inputDate.getMinutes() < 30)
    ) {
      return `${dayOfWeekName}, ${date} by 5pm`;
    }

    // return next day by 9am and if the next day is a non-working day, return the next working day
    const nextWorkingDay = new Date(inputDate);
    nextWorkingDay.setDate(nextWorkingDay.getDate() + 1);
    while (nonWorkingDays.includes(nextWorkingDay.getDay())) {
      nextWorkingDay.setDate(nextWorkingDay.getDate() + 1);
    }
    const nextWorkingDayName = nextWorkingDay.toLocaleDateString("en-US", {
      weekday: "long",
    });
    const nextWorkingDayDate = nextWorkingDay.toLocaleDateString("en-US", {
      day: "numeric",
      month: "long",
    });
    return `${nextWorkingDayName}, ${nextWorkingDayDate} by 9am`;
  }

  const nextWorkingDay = new Date(inputDate);
  nextWorkingDay.setDate(nextWorkingDay.getDate() + 1);
  while (nonWorkingDays.includes(nextWorkingDay.getDay())) {
    nextWorkingDay.setDate(nextWorkingDay.getDate() + 1);
  }
  const nextWorkingDayName = nextWorkingDay.toLocaleDateString("en-US", {
    weekday: "long",
  });
  const nextWorkingDayDate = nextWorkingDay.toLocaleDateString("en-US", {
    day: "numeric",
    month: "long",
  });
  return `${nextWorkingDayName}, ${nextWorkingDayDate} by 9am`;
}
