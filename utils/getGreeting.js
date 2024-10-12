/**
 * Returns a greeting message based on the current time of day.
 *
 * @returns {string} A greeting message: "Good morning!", "Good afternoon!", "Good evening!", or "Good night!".
 */
export function getGreeting() {
  const hours = new Date().getHours();
  let greeting;

  switch (true) {
    case (hours >= 5 && hours < 12):
      greeting = "Good morning!";
      break;
    case (hours >= 12 && hours < 17):
      greeting = "Good afternoon!";
      break;
    case (hours >= 17 && hours < 21):
      greeting = "Good evening!";
      break;
    default:
      greeting = "Good night!";
  }

  return greeting;
}
