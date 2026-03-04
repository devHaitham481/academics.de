export interface GeocodingResult {
  name: string;
  latitude: number;
  longitude: number;
  country: string;
}

export interface SunHoursResult {
  city: string;
  sunHoursLastYear: number;
  sunComment: string;
}

export interface AppError extends Error {
  statusCode: number;
}
