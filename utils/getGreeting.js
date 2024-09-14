/**
 * Returns a greeting based on the current time of day.
 * @returns {string} A greeting message.
 */
export function getGreeting() {
  const hours = new Date().getHours();

  if (hours >= 5 && hours < 12) {
    return "Good morning!";
  } else if (hours >= 12 && hours < 17) {
    return "Good afternoon!";
  } else if (hours >= 17 && hours < 21) {
    return "Good evening!";
  } else {
    return "Good night!";
  }
}
