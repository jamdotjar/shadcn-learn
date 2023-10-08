import { Input } from "postcss";
import { Button } from "./ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "./ui/card";
import { useEffect, useState } from "react";
import { LineChart, Line, CartesianGrid,Area, XAxis, YAxis, Tooltip, AreaChart } from 'recharts';
function getHourlyParameter(weatherData, parameter, hour) {
    return weatherData.hourly[parameter][hour];
}

function CustomTooltip({ payload, label, active }) {
    if (active && payload && payload.length) {
        return (
            <div className="custom-tooltip">
                <p className="label">{`${label} : ${payload[0].value}°`}</p>
            </div>
        );
    }

    return null;
}

export function WeatherDisplay() {
    const [weatherData, setWeatherData] = useState(null)

    useEffect(()=>{
        
        const getWeather =async () => 
        {
            const res = await fetch("https://api.open-meteo.com/v1/forecast?latitude=49.3164&longitude=-123.0693&hourly=temperature_2m,relativehumidity_2m,apparent_temperature,precipitation_probability,precipitation&current_weather=true&timezone=America%2FLos_Angeles&forecast_days=3")
            const data = await res.json()
            console.log(data)
            setWeatherData(data)
            
        }
        getWeather()
}, [])
const currentHour = new Date().getHours();

// Prepare the data for the chart
const forecastData = [];
for (let i = 0; i < 12; i++) {
    const hour = (currentHour + i) % 24; // calculate the hour
    const time = hour < 10 ? `0${hour}:00` : `${hour}:00`; // format the hour as a string representing the time
    let temperature = '';
    if (weatherData) {
        temperature = `${getHourlyParameter(weatherData, 'temperature_2m', hour)}°`; // get the temperature at this hour and add the degree sign
    }
    forecastData.push({ time, temperature });
}

        return(
            
            <>
             {weatherData ? (
                
                <div  className="flex flex-wrap">
                   <Card className="m-2 text-center">
                    <CardHeader>
                        <CardTitle>
                          Temperature
                        </CardTitle>
                        
                    </CardHeader>
                        <CardContent>
                            <div className="text-5xl"> {weatherData?.current_weather?.temperature}°</div>
                                {weatherData?.current_weather?.temperature !== getHourlyParameter(weatherData, 'apparent_temperature', currentHour) && 
                                <div className="text-l font-light text-gray-600">Feels like: {getHourlyParameter(weatherData, 'apparent_temperature', currentHour)}°</div>
                            }
                            
                        </CardContent>
                    </Card>
                    <Card className="m-2 text-center">
                    <CardHeader>
                        <CardTitle>
                          Precipitation
                        </CardTitle>

                        
                    </CardHeader>
                        <CardContent>
                        <div className="text-5xl">
                            {getHourlyParameter(weatherData, 'precipitation_probability', currentHour)}%
                            </div>
                            <div className="text-l font-light text-gray-600">Chance of precipitation</div>
                        </CardContent>
                    </Card>
                    <Card className="m-2">
                    <CardHeader>
                        <CardTitle>
                          Temperature forecast 
                        </CardTitle>
                        
                    </CardHeader>
                        <CardContent>
                        <AreaChart width={500} height={300} data={forecastData}>
                        <Area type="monotone" dataKey={(data) => Number(data.temperature.slice(0, -1))} stroke="#0000FF" fill="#ADD8E6" />
    <CartesianGrid stroke="#ccc" />
    <XAxis dataKey="time" stroke="#0000FF" />
    <YAxis />
    <Tooltip />
</AreaChart>
                        </CardContent>
                    </Card>
                </div>

            ) : (~
                    <div>Loading...</div>
            )}
            </>
        )
             
    
}

