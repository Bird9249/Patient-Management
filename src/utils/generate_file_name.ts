export default (filename: string, path: string): string => {
  const lastDotIndex = filename.lastIndexOf(".");
  const name = filename.substring(0, lastDotIndex);
  const extension = filename.substring(lastDotIndex + 1);

  const baseWithoutSpaces = name.replace(/\s+/g, "-").toLowerCase();
  const randomString = Math.random().toString(36).substring(2, 15);
  return `${path}${baseWithoutSpaces}-${randomString}.${extension}`;
};
