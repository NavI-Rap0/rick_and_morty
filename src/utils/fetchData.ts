// my-next-ric-and-morty-app\src\utils\fetchData.ts
const BASE_URL = "https://rickandmortyapi.com/api";

export async function fetchCharacters(page: number = 1, filters: Record<string, string | undefined>) {
  const queryParams = new URLSearchParams(
    Object.fromEntries(
      Object.entries(filters).filter(([, value]) => value !== undefined) // Видаляємо undefined
    ) as Record<string, string>
  );

  queryParams.set("page", page.toString());

  const url = `${BASE_URL}/character/?${queryParams.toString()}`;

  console.log("Fetching from:", url); // Дебаг-лог

  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`Помилка завантаження: ${response.status}`);
    }
    return await response.json();
  } catch (error) {
    console.error("Помилка отримання даних персонажів:", error);
    return null;
  }
}


export const fetchCharacterById = async (id: string) => {
  try {
    const response = await fetch(`${BASE_URL}/character/${id}`);
    if (!response.ok) {
      throw new Error(`Помилка завантаження персонажа: ${response.status}`);
    }
    return await response.json();
  } catch (error) {
    console.error("Помилка отримання даних персонажа:", error);
    return null;
  }
};

