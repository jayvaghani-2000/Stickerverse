export const createSlug = (
  title: string,
  existingSlug: { slug: string | null }[]
) => {
  const slugCount = existingSlug
    .map(i => {
      return Number(i.slug?.split("-").pop());
    })
    .filter(i => !isNaN(i))
    .sort();

  const lastSlug = slugCount.pop() ?? 0;

  return existingSlug.length > 0 ? `${title}-${lastSlug + 1}` : title;
};

export const convertToSlug = (title: string) => {
  return title
    .replace(/[^a-z0-9s_-]+/gi, "-")
    .replace(/-+/gi, "-")
    .replace(/-$/, "")
    .toLowerCase();
};
