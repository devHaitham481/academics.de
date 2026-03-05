# Sun Hours API

Returns annual sunshine hours for a German city using [Open-Meteo](https://open-meteo.com/).

## Setup

```bash
npm install
cp .env.example .env
npm run dev
```

OR 

```
docker compose up 
```

## Usage

```
GET /sun-hours?city=Berlin
```

```json
{
  "city": "Berlin",
  "sunHoursLastYear": 1842,
  "sunComment": "Berlin liegt unter dem bundesweiten Durchschnitt (1700 h/Jahr)."
}
```

## Error responses

| Scenario | Status | Body |
|---|---|---|
| Missing `city` param | 400 | `{"error": "city query parameter is required"}` |
| City not found | 404 | `{"error": "City not found"}` |
| Open-Meteo unreachable | 502 | `{"error": "External service unavailable"}` |

## Notes

- Data source: Open-Meteo historical archive + geocoding API (no API key needed) "Last year" resolves dynamically based on the current year
- German national average hardcoded at 1700 h/year (commonly cited figure)

## If I had more time

- **Structured logging** — replace `console.log` with Winston + a correlation ID per request (makes debugging at 3 AM possible)
- **Caching** — geocoding results and yearly sun data are stable; a short-lived in-memory cache or Redis would cut Open-Meteo calls significantly
- **Rate limiting** — per-IP limiting on the endpoint to prevent abuse
- **Input sanitization** — dis-allow non-printable characters and enforce a max length on the `city` param
- **API versioning** — prefix routes with `/v1/` from the start to prevent breaking changes and allow for backward Compatibility
- **Tests** — unit tests for `sun.service.ts` (sum/conversion logic, comment generation) and integration tests with mocked HTTP clients
