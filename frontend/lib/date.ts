const timeTaken = (time: number) => {
  const minutes = Math.floor(time / 60000);
  const seconds = Math.floor((time % 60000) / 1000);
  return `${minutes}m ${seconds}s`;
};

const dateAsPerTimeZone = (
  dateToChange: Date | string,
  timeZone: string
): Date => {
  if (typeof dateToChange === "string") {
    return new Date(
      new Date(dateToChange).toLocaleString("en-US", {
        timeZone,
      })
    );
  }

  return new Date(
    dateToChange.toLocaleString("en-US", {
      timeZone,
    })
  );
};

const formatDate = (
  date: Date,
  returnDay: boolean = false,
  timezone: string | null = null
): string | number | undefined => {
  if (!date) {
    return;
  }
  const months = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];
  const newDate = dateAsPerTimeZone(
    date,
    timezone ?? Intl.DateTimeFormat().resolvedOptions().timeZone
  );
  const day = newDate.getDate();
  const monthIdx = newDate.getMonth();
  const month = months[monthIdx];
  const year = newDate.getFullYear();

  const opDate = `${day} ${month} ${year}`;
  if (returnDay) {
    return day;
  }
  return opDate;
};

const formatTime = (
  date: Date,
  returnDecimal: boolean = false,
  timezone: string | null = null
): string | undefined => {
  if (!date) {
    return;
  }
  const newDate = dateAsPerTimeZone(
    date,
    timezone ?? Intl.DateTimeFormat().resolvedOptions().timeZone
  );
  let hours = newDate.getHours();
  let minutes: string | number = newDate.getMinutes();

  if (returnDecimal) {
    const decimalTime = +hours + +minutes / 60;
    return decimalTime.toFixed(2);
  }

  const ampm = hours >= 12 ? "pm" : "am";
  hours %= 12;
  hours = hours || 12;

  minutes = minutes < 10 ? `0${minutes}` : minutes;
  const time = `${hours}:${minutes} ${ampm}`;
  return time;
};

export { timeTaken, formatDate, formatTime };
