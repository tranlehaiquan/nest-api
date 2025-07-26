const stringToSlug = (content: string) => {
  return content
    .toLowerCase()
    .replace(/ /g, '-')
    .replace(/[^\w-]+/g, '');
};

export const stringToSlugWithRandomNumber = (content: string) => {
  return `${stringToSlug(content)}-${Math.floor(Math.random() * 100000)}`;
};

export default stringToSlug;
