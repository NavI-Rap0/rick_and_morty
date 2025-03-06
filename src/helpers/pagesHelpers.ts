interface SearchParams {
    page?: string;
    status?: string;
    species?: string;
    gender?: string;
    name?: string;
  }
  
  interface Filters {
    status?: string;
    species?: string;
    gender?: string;
    name?: string;
    [key: string]: string | undefined;
  }
  
  // Формування об'єкта фільтрів із searchParams
  export const buildFilters = (params?: SearchParams): Filters =>
    Object.fromEntries(
      Object.entries(params ?? {}).filter(([, value]) => value).map(([key, value]) => [key, value!.toLowerCase()])
    );
  
// Формування URL для пагінації персонажів (не змінюємо!)
export const buildPageUrl = (filters: Filters, page: number): string => {
  const query = new URLSearchParams({ ...filters, page: String(page) });
  return `/characters?${query.toString()}`;
};

// Формування URL для пагінації епізодів
export const buildEpisodesPageUrl = (params: SearchParams, page: number): string => {
  const filteredParams = Object.fromEntries(
    Object.entries(params).filter(([, value]) => value !== undefined)
  );

  const query = new URLSearchParams({
    ...filteredParams,
    page: String(page), 
  });

  return `/episodes?${query.toString()}`;
};

interface SearchParams {
  page?: string;
  name?: string;
}

export const buildLocationsPageUrl = (params: SearchParams, page: number): string => {
  const filteredParams = Object.fromEntries(
    Object.entries(params).filter(([, value]) => value !== undefined)
  );

  const query = new URLSearchParams({
    ...filteredParams,
    page: String(page),
  });

  return `/locations?${query.toString()}`;
};






  


  