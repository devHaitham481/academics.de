import { geocodeCity } from '../clients/geocoding.client';
import { fetchSunshineDuration } from '../clients/openmeteo.client';
import { SunHoursResult } from '../types';
import { config } from '../config';

function buildComment(city: string, sunHours: number): string {
  const avg = config.germanAverageSunHours;
  const comparison = sunHours >= avg ? 'über' : 'unter';
  return `${city} liegt ${comparison} dem bundesweiten Durchschnitt (${avg} h/Jahr).`;
}

export async function getSunHoursForCity(city: string): Promise<SunHoursResult> {
  const location = await geocodeCity(city);

  const sunshineDurations = await fetchSunshineDuration(
    location.latitude,
    location.longitude,
    config.lastYear
  );

  // sunshine_duration is in seconds per hour interval — sum and convert to hours
  const totalSeconds = sunshineDurations.reduce((sum, s) => sum + (s ?? 0), 0);
  const sunHoursLastYear = Math.round(totalSeconds / 3600);

  return {
    city: location.name,
    sunHoursLastYear,
    sunComment: buildComment(location.name, sunHoursLastYear),
  };
}
