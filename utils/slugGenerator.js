import slugify from "slugify";

/**
 * Generates a slug from a title.
 *
 * @param {string} title - The title to generate a slug from.
 * @returns {string} The generated slug.
 */
export function generateSlug(title) {
  const shortenedTitle = title.split(" ").slice(0, 3).join(" ");
  return slugify(shortenedTitle, { lower: true });
}
