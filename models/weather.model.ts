export interface WeatherData {
  daily: {
    temperature_2m_max: number[];
    time: string[];
  };
}

export interface WeatherApiResponse {
  daily: {
    temperature_2m_max: number[];
    time: string[];
  };
  daily_units: {
    time: string;
    temperature_2m_max: string;
  };
  elevation: number;
  generationtime_ms: number;
  latitude: number;
  longitude: number;
  timezone: string;
  timezone_abbreviation: string;
  utc_offset_seconds: number;
}
