const formateDate = async (circularDate) => {
  // set today date if date note provided by user
  const date = (circularDate && new Date(circularDate)) || new Date(Date.now());
  const day = date.getDate() < 10 ? `0${date.getDate()}` : date.getDate();
  const month = date.toLocaleString("default", { month: "short" });
  const year = date.getFullYear();
  return `${day}-${month}-${year}`;
};

module.exports = { formateDate };
