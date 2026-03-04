# Sun Hours API

Returns annual sunshine hours for a German city using [Open-Meteo](https://open-meteo.com/).

## Setup

```bash
npm install
cp .env.example .env
npm run dev
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

- Data source: Open-Meteo historical archive + geocoding API (no API key needed)
- "Last year" resolves dynamically based on the current year
- German national average hardcoded at 1700 h/year (commonly cited figure)
- Production additions worth considering: structured logging (Winston + correlation IDs), per-endpoint rate limiting, input sanitization
