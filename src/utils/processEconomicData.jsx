
function getWeekInfo(date, weekStartDay = 0) {

  const currentWeekStart = new Date();
  currentWeekStart.setHours(0, 0, 0, 0);

  const daysSinceStart =
    (currentWeekStart.getDay() - weekStartDay + 7) % 7;

  currentWeekStart.setDate(
    currentWeekStart.getDate() - daysSinceStart
  );

  const nextWeekStart = new Date(currentWeekStart);
  nextWeekStart.setDate(nextWeekStart.getDate() + 7);

  const previousWeekStart = new Date(currentWeekStart);
  previousWeekStart.setDate(previousWeekStart.getDate() - 7);

  const eventDate = parseEventDate(date);

  let Week = "";

  if (
    eventDate >= currentWeekStart &&
    eventDate < nextWeekStart
  ) {
    Week = "T";
  } else if (
    eventDate >= previousWeekStart &&
    eventDate < currentWeekStart
  ) {
    Week = "L";
  }

  return {
    Week,
    daysSinceStart,
  };
}

const weekStartDay = 6;

const economicData = Papa.parse(economicCsv, {
  header: true,
  dynamicTyping: true,
  skipEmptyLines: true,
}).data.map((item) => {

  const { Week, daysSinceStart } =
    getWeekInfo(item.Daten, weekStartDay);

  return {
    ...item,
    Week,
    daysSinceStart,

    eventDayInWeek: parseEventDate(item.Daten).getDay(),

    // Other transformations...
  };
});
