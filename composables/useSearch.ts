import { MeiliSearch } from "meilisearch";
import { Ref } from "vue";

interface searchHistory {
  searchTerm: string;
  searchResult: any;
}
export const useSearch = () => {
  const open = useState(() => false);
  const config = useRuntimeConfig();
  const client = new MeiliSearch({
    host: config.public.meilisearch.host,
    apiKey: config.public.meilisearch.apiKey,
  });
  let history: Ref<searchHistory[]> = ref([]);

  const search = async (term: string) => {
    if (inHistory(term)) {
      return getResultFromHistory(term);
    }
    const results = await client
      .index("products")
      .search(term, { limit: 8, filter: "status=published" });
    addToHistory(term, results.hits);

    return results.hits;
  };

  const inHistory = (term: string) => {
    const i = history.value.findIndex((e) => e.searchTerm == term);
    if (i > -1) {
      return true;
    }
    return false;
  };
  const addToHistory = (term: string, results: any) => {
    if (history.value.length >= 50) {
      history.value.splice(0, 1);
    }
    history.value.push({
      searchTerm: term,
      searchResult: results,
    });
  };
  const getResultFromHistory = (term: string) => {
    const i = history.value.findIndex((e) => e.searchTerm == term);
    if (i > -1) {
      return history.value[i].searchResult;
    }
  };

  return {
    search,
    open,
  };
};
