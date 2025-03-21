// still in progress

const BASE_URL = "https://rickandmortyapi.com/api";

/**
 * Фетч персонажів (SSR)
 */
export async function fetchCharacters(
  page: number = 1,
  filters: Record<string, string | undefined>
) {
  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), 5000); // Таймаут 5 секунд

  const queryParams = new URLSearchParams(
    Object.fromEntries(Object.entries(filters).filter(([, value]) => value !== undefined)) as Record<string, string>
  );
  queryParams.set("page", page.toString());

  const url = `${BASE_URL}/character/?${queryParams.toString()}`;

  console.log("Fetching characters from (server):", url);

  try {
    const response = await fetch(url, {
      cache: "no-store",
      signal: controller.signal,
    });
    clearTimeout(timeoutId);

    if (!response.ok) {
      if (response.status === 404) {
        console.warn(`Персонажів не знайдено за запитом: ${queryParams.toString()}`);
        return { results: [], info: { pages: 1 } };
      }
      throw new Error(`Помилка завантаження: ${response.status}`);
    }
    return await response.json();
  } catch (error) {
    console.error("Помилка отримання даних персонажів:", error);
    return { results: [], info: { pages: 1 } };
  }
}


/**
 * Фетч персонажа за ID (SSR)
 */
export async function fetchCharacterById(id: string) {
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
}

/**
 * Фетч епізодів за ID (SSR)
 */
export async function fetchEpisodesByIds(episodeUrls: string[]) {
  if (episodeUrls.length === 0) return [];

  const episodeIds = episodeUrls.map((url) => url.split("/").pop()).join(",");
  try {
    const response = await fetch(`${BASE_URL}/episode/${episodeIds}`, { cache: "no-store" });
    if (!response.ok) {
      throw new Error(`Помилка завантаження епізодів: ${response.status}`);
    }
    const data = await response.json();
    return Array.isArray(data) ? data : [data];
  } catch (error) {
    console.error("Помилка отримання даних епізодів:", error);
    return [];
  }
}

/**
 * Фетч списку епізодів (SSR)
 */
export async function fetchEpisodes(page: number = 1, name?: string) {
  const queryParams = new URLSearchParams();
  queryParams.set("page", page.toString());
  if (name) {
    queryParams.set("name", name);
  }

  try {
    const response = await fetch(`${BASE_URL}/episode?${queryParams.toString()}`, { cache: "no-store" });

    if (!response.ok) {
      if (response.status === 404) {
        console.warn(`Епізодів не знайдено за запитом: ${queryParams.toString()}`);
        return { results: [], info: { pages: 1 } }; // Повертаємо порожній список
      }
      throw new Error(`Помилка завантаження епізодів: ${response.status}`);
    }

    return await response.json();
  } catch (error) {
    console.error("Помилка отримання даних епізодів:", error);
    return { results: [], info: { pages: 1 } }; // Запобігаємо падінню
  }
}


/**
 * Фетч локацій (SSR)
 */
export async function fetchLocations(page: number, name: string) {
  try {
    const query = new URLSearchParams();
    query.set("page", String(page));
    if (name) query.set("name", name);

    const url = `${BASE_URL}/location?${query.toString()}`;
    console.log("Fetching locations from:", url);

    const response = await fetch(url, { cache: "no-store" });

    if (!response.ok) {
      if (response.status === 404) {
        console.warn(`Локації не знайдено за запитом: ${query.toString()}`);
        return { results: [], info: { pages: 1 } };
      }
      throw new Error(`Помилка завантаження локацій: ${response.status}`);
    }

    return await response.json();
  } catch (error) {
    console.error("Помилка отримання даних локацій:", error);
    return null;
  }
}
