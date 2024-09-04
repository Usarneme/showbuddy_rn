import { IMovie } from '@/constants/Types';

export interface QueryResult {
  Search: IMovie[];
  totalResults: number | string;
  Response: "True" | "False";
}

export const apiService = (key: string | undefined) => {
  const getResults = async (searchText: string, page: number | string): Promise<QueryResult | Error> => {
    console.log("🚀 ~ getResults ~ searchText, page:", searchText, page)
    const url = `https://omdbapi.com/?apiKey=${key}&s=${searchText}&page=${page}`;

    try {
      const response = await fetch(url);
      const json = await response.json();

      if (json.Response === "True") {
        return json;
      } else {
        throw new Error("No json was returned for this query...Please try again.");
      }
    } catch (error) {
      return new Error(`Error fetching data: ${error}`);
    }
  };

  return { getResults };
};
