export function slug(name: string) {
  return name
    .trim()
    .toLowerCase()
    .replace(/[^a-z0-9\- ]+/g, "") // remove non-alphanumeric except space and hyphen
    .replace(/ +/g, "-"); // replace spaces with hyphens
}
