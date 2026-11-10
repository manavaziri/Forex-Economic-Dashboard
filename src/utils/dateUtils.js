function formatDate(date) {
  const year = date.getFullYear();

  const month = String(date.getMonth() + 1).padStart(2, "0");

  const day = String(date.getDate()).padStart(2, "0");

  return `${year}-${month}-${day}`;
}


export function getDateRange(option) {

  const today = new Date();


  if (option === "all") {
    return {
      from: null,
      to: null,
    };
  }


  if (option === "today") {

    const value = formatDate(today);

    return {
      from: value,
      to: value,
    };
  }


  if (option === "yesterday") {

    const yesterday = new Date(today);

    yesterday.setDate(yesterday.getDate() - 1);

    const value = formatDate(yesterday);

    return {
      from: value,
      to: value,
    };
  }


  if (option === "thisWeek") {

    const day = today.getDay();

    const from = new Date(today);
    from.setDate(today.getDate() - day);

    const to = new Date(today);
    to.setDate(today.getDate() + (6 - day));

    return {
      from: formatDate(from),
      to: formatDate(to),
    };
  }


  if (option === "lastWeek") {

    const day = today.getDay();

    const from = new Date(today);
    from.setDate(today.getDate() - day - 7);

    const to = new Date(today);
    to.setDate(today.getDate() - day - 1);

    return {
      from: formatDate(from),
      to: formatDate(to),
    };
  }


  if (option === "thisMonth") {

    const from = new Date(
      today.getFullYear(),
      today.getMonth(),
      1
    );

    const to = new Date(
      today.getFullYear(),
      today.getMonth() + 1,
      0
    );

    return {
      from: formatDate(from),
      to: formatDate(to),
    };
  }


  if (option === "lastMonth") {

    const from = new Date(
      today.getFullYear(),
      today.getMonth() - 1,
      1
    );

    const to = new Date(
      today.getFullYear(),
      today.getMonth(),
      0
    );

    return {
      from: formatDate(from),
      to: formatDate(to),
    };
  }


  return {
    from: null,
    to: null,
  };
}