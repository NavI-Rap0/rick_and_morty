// still in progress

export interface FilterProps {
    currentFilters: {
      status?: string;
      species?: string;
      gender?: string;
      name?: string;
    };
  }
  

  export type PaginationProps = {
    currentPage: number;
    totalPages: number;
    onPageChange: (page: number) => string;
  };
  
  export type PageRange = (string | number)[];

// Тип для фільтрів запитів
export type Filters = Record<string, string | undefined>;

// Тип для відповіді API
export type ApiResponse<T> = {
  results: T[];
  info: {
    pages: number;
    count: number;
  };
};

// Тип для персонажа
export interface Character {
  id: number;
  name: string;
  species: string;
  status: string;
  gender: string;
  origin: { name: string };
  location: { name: string };
  image: string;
  episode: string[];
}

// Тип для епізоду
export interface Episode {
  id: number;
  name: string;
  air_date: string;
  episode: string;
  characters: string[];
  created: string;
}

// Тип для локації
export interface Location {
  id: number;
  name: string;
  type: string;
  dimension: string;
  residents: string[];
  created: string;
}
