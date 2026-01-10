import "dotenv/config";

export const WEATHER_CONFIG = { 
    city: "Kathmandu",
    apiKey: process.env.API_KEY,
    forecastDays: 8
};
