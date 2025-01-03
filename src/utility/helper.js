export const formateTime = (dateString) => {
  const parsedDate = new Date(dateString);
  let timeString = parsedDate.toLocaleTimeString("en-GB", {
    hour: "2-digit",
    minute: "2-digit",
    hour12: true,
  });
  timeString = timeString.toUpperCase();
  return timeString;
};

export const formatDate = (dateString) => {
  const parsedDate = new Date(dateString);

  return parsedDate.toLocaleDateString("en-US", {
    month: "short", // Short month name, e.g., "Dec"
    day: "numeric", // Numeric day, e.g., "11"
  });
};

export function formatBalance(amount) {
  if (amount === undefined || amount === null) return "";
  return new Intl.NumberFormat("en-IN", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(amount);
}
