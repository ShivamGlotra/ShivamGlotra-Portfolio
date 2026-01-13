const BASE_URL = process.env.NEXT_PUBLIC_API_URL;

export const fetchAPI = async <T>(
  path: string,
  options: RequestInit = {}
): Promise<T> => {
  const response = await fetch(`${BASE_URL}${path}`, options);

  if (!response.ok) {
    throw new Error(`Error fetching ${path}: ${response.statusText}`);
  }
  return response.json() as Promise<T>;
};
