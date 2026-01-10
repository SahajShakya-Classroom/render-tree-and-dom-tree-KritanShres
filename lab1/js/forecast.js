import * as Utils from "./util.js";

export class SevenDayForecast { 
    constructor (data) {
        this.forecastDays = data.forecast.forecastday;
        this.data = data;  
    }

    todayForecast() { 
        const {localtime_epoch} = this.data.location;
        const { temp_c, uv } = this.data.current;
        console.log("Date:", Utils.convertDateEpoch(localtime_epoch));
        console.log(`Temperature: ${temp_c}°C`);
        console.log(`The UV index is ${uv} so ${Utils.uvAdvice(uv)}`);
        console.log();
    }

    dailyForecast() { 
        return this.forecastDays.slice(1).map(forecast => { 
            const {date, day, astro, hour } = forecast;

            const maxTemp = hour.reduce((max, current) => { 
                return current.temp_c > max.temp_c ? current : max;
            });
            const minTemp = hour.reduce((min, current) =>{ 
                return current.temp_c < min.temp_c ? current : min;
            });

            console.log("Date: ", date);
            console.log(`Temp range (min-max): ${day.mintemp_c}°C - ${day.maxtemp_c}°C`);
            console.log(`Average temp: ${day.avgtemp_c}°C`);
            console.log(Utils.rainAdvice(day.daily_will_it_rain, day.daily_chance_of_rain));
            console.log("The uv index is", day.uv, Utils.uvAdvice(day.uv));
            console.log("Sunrise:", astro.sunrise);
            console.log("Sunset:", astro.sunset);
            console.log(`Hottest time of the day: ${Utils.convertTimeEpoch(maxTemp.time_epoch, maxTemp.is_day)} with ${maxTemp.temp_c}°C`);
            console.log(`Coldest time of  the day: ${Utils.convertTimeEpoch(minTemp.time_epoch, minTemp.is_day)} with ${minTemp.temp_c}°C`);
            console.log();
        })
    }

    hotAndColdDays() {
        const hotDay = this.forecastDays.reduce((max, current) => {
            return current.day.maxtemp_c > max.day.maxtemp_c ? current : max;
        });
        const coldDay = this.forecastDays.reduce((min, current) => {
            return current.day.mintemp_c < min.day.mintemp_c ? current : min;
        });
        
        console.log(`The hottest day is ${Utils.convertDateEpoch(hotDay.date_epoch)} with temp of ${hotDay.day.maxtemp_c}°C`);
        console.log(`The coldest day is ${Utils.convertDateEpoch(coldDay.date_epoch)} with temp of ${coldDay.day.mintemp_c}°C`);
    }

    rainyDays() { 
        const rainyDay = this.forecastDays.filter(forecast =>{ 
            return forecast.day.daily_chance_of_rain > 50;
        })

        if(rainyDay.length == 0) {console.log("No rainy days this week!"); console.log()}
        
        console.log("There are chances of raining on:")
        rainyDay.forEach(day => {
            console.log(`${Utils.convertDateEpoch(day.date_epoch)}: ${Utils.rainAdvice(day.day.daily_will_it_rain, day.day.daily_chance_of_rain)}`);
        })
    }

    highUVDays()  { 
        const thresholdUV =  6;
        const dangerousUV = this.forecastDays.filter(forecast => { 
            return forecast.day.uv >= thresholdUV;
        })

        if(dangerousUV.length == 0) console.log(`No dangerously high UV days! Below the threshold ${thresholdUV}.`)  

        else { 
            console.log(`Dangerously high UV days! Above the threshold ${thresholdUV}.`);
            dangerousUV.forEach(day => { 
                console.log(`${Utils.convertDateEpoch(day.date_epoch)}: ${Utils.uvAdvice(day.day.uv)}`);
            });
        }
        const highUVDays = this.forecastDays.reduce((max, current) => { 
            return current.day.uv > max.day.uv ? current : max;
        })
        console.log(`The day with highest possible UV index ${Utils.convertDateEpoch(highUVDays.date_epoch)} with UV ${highUVDays.day.uv}`);
    }
}
