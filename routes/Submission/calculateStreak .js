const calculateStreak = (submissions) => {
  if (!submissions.length) return 0;

  const formatDate = (date) =>
    new Date(date).toLocaleDateString("en-CA");

  const dates = new Set(
    submissions.map(sub => formatDate(sub.createdAt))
  );

  let streak = 0;
  let currentDate = new Date();

  // If no submission today, start from yesterday
  if (!dates.has(formatDate(currentDate))) {
    currentDate.setDate(currentDate.getDate() - 1);
  }

  while (true) {
    const dateStr = formatDate(currentDate);

    if (dates.has(dateStr)) {
      streak++;
      currentDate.setDate(currentDate.getDate() - 1);
    } else {
      break;
    }
  }

  return streak;
};

module.exports = calculateStreak;