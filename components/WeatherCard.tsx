import { Input } from "postcss";
import { Button } from "./ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "./ui/card";
import { useEffect, useState } from "react";

function WeatherDisplay() {
    const [weatherData, setWeatherData] = useState(null)
    useEffect(()=>{
        const getWeather =async () => 
        {
            const res = await fetch("https://api.open-meteo.com/v1/forecast?latitude=49.3164&longitude=-123.0693&hourly=precipitation_probability&current_weather=true&timeformat=unixtime&timezone=America%2FLos_Angeles&forecast_days=1")
            const data = await res.json()
            console.log(data)
            setWeatherData(data)
        }
        getWeather()
}, [])
    
        return(
            <>
             {weatherData ? (
                <div className="flex flex-wrap ">
                    <div className="p-4 md:w-1/3 sm:w-full">
                        <Card>
                            <CardHeader>
                                <CardTitle>Temperature</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <CardDescription>
                                    {weatherData.current_weather.temperature}°
                                </CardDescription>
                            </CardContent>
                        </Card>
                    </div>
                    <div className="p-4 md:w-1/3 sm:w-full">
                        <Card>
                            <CardHeader>
                                <CardTitle>Precipitation Probability</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <CardDescription>
                                    {weatherData.hourly.precipitation_probability[weatherData.hourly.precipitation_probability.length - 1]} per-cent chance of precipitation
                                </CardDescription>
                            </CardContent>
                        </Card>
                    </div>
                </div>

            ) : (
                    <div>Loading...</div>
            )}
            </>
        )
             
    
}

export default function WeatherCard() {

    return (
        
            <WeatherDisplay/>
          

        
      )
}
