export const useCategories = () => {
  return useLazyFetch("/api/categories", {
    key: "categories",
  });
};
