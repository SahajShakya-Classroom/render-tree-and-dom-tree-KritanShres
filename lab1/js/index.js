import { getWeather } from "./api.js";
import { SevenDayForecast } from "./forecast.js";

async function showWeather() { 
    const data = await getWeather();
    const forecast = new SevenDayForecast(data);
    // console.log(data.forecast);
    console.log("-------------------------------------------------------------------------");
    console.log(`SHOWING FORECAST FOR ${data.location.name}`);
    console.log("-------------------------------------------------------------------------");
    console.log("TODAYS FORECAST");
    forecast.todayForecast();
    console.log("-------------------------------------------------------------------------");
    console.log("WEEKLY FORECAST");
    forecast.dailyForecast();
    console.log("-------------------------------------------------------------------------");
    console.log("HOTTEST AND COLDEST DAYS");
    forecast.hotAndColdDays();
    console.log("-------------------------------------------------------------------------");
    console.log("WEELY RAIN FORECAST");
    forecast.rainyDays();
    console.log("-------------------------------------------------------------------------");
    console.log("WEEKLY UV FORECAST");
    forecast.highUVDays();
    console.log("-------------------------------------------------------------------------");
}

showWeather();