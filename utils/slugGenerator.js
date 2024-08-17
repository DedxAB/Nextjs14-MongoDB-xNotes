import slugify from "slugify";

/**
 * Generates a slug from a title.
 *
 * @param {string} title - The title to generate a slug from.
 * @returns {string} The generated slug.
 */
export function generateSlug(title) {
  if (!title) return "dedxnotes-hello";

  try {
    const shortenedTitle = title.split(" ").slice(0, 5).join(" ");
    const slug = slugify(shortenedTitle, {
      lower: true,
      strict: false,
      remove: /[*+~.()'"!:@,]/g,
      replacement: "-",
      locale: "any",
    });

    return slug || "dedxnotes-hello"; // Fallback if slugify returns an empty string
  } catch (error) {
    console.error("Slug generation failed: ", error);
    return "dedxnotes-hello"; // Fallback in case of an error
  }
}
