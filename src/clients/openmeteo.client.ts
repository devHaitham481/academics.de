import { createError } from '../middleware/error.middleware';

const BASE_URL = 'https://archive-api.open-meteo.com/v1/archive';

interface OpenMeteoResponse {
  hourly: {
    sunshine_duration: number[];
  };
}

export async function fetchSunshineDuration(
  latitude: number,
  longitude: number,
  year: number
): Promise<number[]> {
  const startDate = `${year}-01-01`;
  const endDate = `${year}-12-31`;

  const params = new URLSearchParams({
    latitude: String(latitude),
    longitude: String(longitude),
    start_date: startDate,
    end_date: endDate,
    hourly: 'sunshine_duration',
  });

  let response: Response;
  try {
    response = await fetch(`${BASE_URL}?${params}`);
  } catch {
    throw createError('External service unavailable', 502);
  }

  if (!response.ok) {
    throw createError('External service unavailable', 502);
  }

  const data = (await response.json()) as OpenMeteoResponse;
  return data.hourly.sunshine_duration;
}
