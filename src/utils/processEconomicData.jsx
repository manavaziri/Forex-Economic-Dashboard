
import Papa from "papaparse";
import economicCsv from "../data/economicData.csv?raw";
//===============================
function parseEventDate(value) {
  if (!value) return new Date(NaN);

  const [year, month, day] = String(value)
    .split("-")
    .map(Number);

  return new Date(year, month - 1, day);
}

//============================
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
const importanceLabels = {
    1: "Low",
    "-1": "Low",
    2: "Medium",
    "-2": "Medium",
    3: "High",
    "-3": "High",
  };
export const economicData = Papa.parse(economicCsv, {
  header: true,
  dynamicTyping: true,
  skipEmptyLines: true,
}).data
  .filter((item) => Number(item.Sel) !== 0)
  .map((item) => {

    const { Week, daysSinceStart } =
      getWeekInfo(item.Daten, weekStartDay);

    return {
      ...item,
      Week,
      daysSinceStart,
      eventDayInWeek: parseEventDate(item.Daten).getDay(),

      Actual:
        Week === "T" && Number(item.Actual) !== 0
          ? item.Forcast
          : item.Actual,

      Title_Day:
        Week === "T"
          ? `${item.Title} (${String(item.Daten).slice(-2)})`
          : item.Title,

      ImpValue: item.Sel,
      Imp: importanceLabels[item.Sel] ?? item.Sel,
    };
  }); 

  export const economicCurrencies = [
  ...new Set(
    economicData.map((item) => item.Currency)
  ),
];

export const economicCases = [
  ...new Set(
    economicData.map((item) => item.Case)
  ),
];

export const economicImpValues = [
  ...new Set(
    economicData
      .map((item) => item.Imp)
      .filter((value) => value != null)
  ),
].sort((a, b) => {
  const order = {
    Low: 1,
    Medium: 2,
    High: 3,
  };

  return order[a] - order[b];
});
//==============================
const flag_check = true;

function checkEconomicData() {
  const currencySummary = Object.groupBy(
    economicData,
    (item) => item.Currency
  );

  console.table(
    Object.entries(currencySummary).map(([currency, items]) => ({
      Currency: currency,
      Records: items.length,
      Cases: [...new Set(items.map((item) => item.Case))].join(", "),
    }))
  );
}

if (flag_check) {
  checkEconomicData();
}