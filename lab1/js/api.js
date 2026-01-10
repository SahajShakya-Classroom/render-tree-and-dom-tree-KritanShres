import { WEATHER_CONFIG } from './config.js';

export async function getWeather(){ 
    const url = `http://api.weatherapi.com/v1/forecast.json?key=${WEATHER_CONFIG.apiKey}&q=${WEATHER_CONFIG.city}&days=${WEATHER_CONFIG.forecastDays}&aqi=yes`;
    try {
        let response = await fetch(url);
        if(!response.ok) throw new Error(response.status);
        const data = await response.json();
        return data;
    } catch (error) {
        console.log("Cannot parse data: ", error);
    }
}
