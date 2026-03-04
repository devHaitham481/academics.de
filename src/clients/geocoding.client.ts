import { GeocodingResult } from '@types';
import { createError } from '@middleware/error.middleware';

const BASE_URL = 'https://geocoding-api.open-meteo.com/v1/search';

export async function geocodeCity(city: string): Promise<GeocodingResult> {
  const url = `${BASE_URL}?name=${encodeURIComponent(city)}&count=1&language=de&format=json`;

  let response: Response;
  try {
    response = await fetch(url);
  } catch {
    throw createError('External service unavailable', 502);
  }

  if (!response.ok) {
    throw createError('External service unavailable', 502);
  }

  const data = (await response.json()) as { results?: GeocodingResult[] };

  if (!data.results || data.results.length === 0) {
    throw createError('City not found', 404);
  }

  return data.results[0];
}
