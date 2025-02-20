const BASE_URL = "https://rickandmortyapi.com/api";

/**
 * Фетч персонажів із перевіркою середовища виконання.
 */
export async function fetchCharacters(
  page: number = 1,
  filters: Record<string, string | undefined>
) {
  if (typeof window === "undefined") {
    // Виконання на сервері (SSR)
    return fetchCharactersServer(page, filters);
  } else {
    // Виконання на клієнті (CSR)
    return fetchCharactersClient(page, filters);
  }
}

/**
 * Фетч персонажів у серверному середовищі (Next.js API, SSR)
 */
async function fetchCharactersServer(
  page: number,
  filters: Record<string, string | undefined>
) {
  const queryParams = new URLSearchParams(
    Object.fromEntries(Object.entries(filters).filter(([, value]) => value !== undefined)) as Record<string, string>
  );
  queryParams.set("page", page.toString());

  const url = `${BASE_URL}/character/?${queryParams.toString()}`;

  console.log("Fetching from (server):", url);

  try {
    const response = await fetch(url, { cache: "no-store" }); // Next.js серверний fetch
    if (!response.ok) {
      throw new Error(`Помилка завантаження: ${response.status}`);
    }
    return await response.json();
  } catch (error) {
    console.error("Помилка отримання даних персонажів (server):", error);
    return null;
  }
}

/**
 * Фетч персонажів у клієнтському середовищі (CSR)
 */
async function fetchCharactersClient(
  page: number,
  filters: Record<string, string | undefined>
) {
  const queryParams = new URLSearchParams(
    Object.fromEntries(Object.entries(filters).filter(([, value]) => value !== undefined)) as Record<string, string>
  );
  queryParams.set("page", page.toString());

  const url = `${BASE_URL}/character/?${queryParams.toString()}`;

  console.log("Fetching from (client):", url);

  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`Помилка завантаження: ${response.status}`);
    }
    return await response.json();
  } catch (error) {
    console.error("Помилка отримання даних персонажів (client):", error);
    return null;
  }
}

/**
 * Фетч персонажа за ID (підходить для SSR та CSR)
 */
export const fetchCharacterById = async (id: string) => {
  try {
    const response = await fetch(`${BASE_URL}/character/${id}`, { cache: "no-store" });
    if (!response.ok) {
      throw new Error(`Помилка завантаження персонажа: ${response.status}`);
    }
    return await response.json();
  } catch (error) {
    console.error("Помилка отримання даних персонажа:", error);
    return null;
  }
};

export const fetchEpisodesByIds = async (episodeUrls: string[]) => {
  if (episodeUrls.length === 0) return [];

  const episodeIds = episodeUrls.map((url) => url.split("/").pop()).join(",");
  try {
    const response = await fetch(`${BASE_URL}/episode/${episodeIds}`, { cache: "no-store" });
    if (!response.ok) {
      throw new Error(`Помилка завантаження епізодів: ${response.status}`);
    }
    const data = await response.json();
    return Array.isArray(data) ? data : [data]; // API повертає масив або один об'єкт
  } catch (error) {
    console.error("Помилка отримання даних епізодів:", error);
    return [];
  }
};
