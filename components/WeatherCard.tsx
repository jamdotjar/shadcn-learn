import { Input } from "postcss";
import { Button } from "./ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "./ui/card";
import { useEffect, useState } from "react";

function getHourlyParameter(weatherData, parameter, hour) {
    return weatherData.hourly[parameter][hour];
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

<div className="text-l font-light text-gray-600">Feels like: {getHourlyParameter(weatherData, 'apparent_temperature', currentHour)}°</div>
                        </CardContent>
                    </Card>
                    <Card className="m-2">
                    <CardHeader>
                        <CardTitle>
                          Temperature
                        </CardTitle>
                        
                    </CardHeader>
                        <CardContent>
                            enough to MELT your socks offx
                        </CardContent>
                    </Card>
                    <Card className="m-2">
                    <CardHeader>
                        <CardTitle>
                          Temperature
                        </CardTitle>
                        
                    </CardHeader>
                        <CardContent>
                            enough to MELT your socks offx
                        </CardContent>
                    </Card>
                </div>

            ) : (
                    <div>Loading...</div>
            )}
            </>
        )
             
    
}

