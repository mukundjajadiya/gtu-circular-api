const formateDate = async (circularDate) => {
  const todayDate = async () => {
    const date = new Date();

    // Set the time zone to India
    date.setTime(date.getTime() + 330 * 60 * 1000);

    // Format the date in the desired format
    const formattedDate = date.toLocaleDateString("en-IN", {
      day: "numeric",
      month: "short",
      year: "numeric",
    });

    return formattedDate;
  };

  // set today date if date note provided by user
  const date =
    (circularDate && new Date(circularDate)) || new Date(await todayDate());
  const day = date.getDate() < 10 ? `0${date.getDate()}` : date.getDate();
  const month = date.toLocaleString("default", { month: "short" });
  const year = date.getFullYear();
  return `${day}-${month}-${year}`;
};

module.exports = {
  formateDate,
};
