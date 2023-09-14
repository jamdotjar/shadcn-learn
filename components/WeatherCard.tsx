import { Input } from "postcss";
import { Button } from "./ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "./ui/card";
import { useEffect, useState } from "react";

function WeatherDisplay() {
    const [weatherData, setWeatherData] = useState(null)
    useEffect(()=>{
        const getWeather =async () => 
        {
            const res = await fetch("https://api.open-meteo.com/v1/forecast?latitude=49.3164&longitude=-123.0693&hourly=temperature_2m,apparent_temperature,precipitation&current_weather=true&timezone=America%2FLos_Angeles")
            const data = await res.json()
            console.log(data)
            setWeatherData(data)
        }
        getWeather()
}, [])
    
    return(
        <div>
            {weatherData ? (
                <div className="text-lg font-semibold">
                    {weatherData.current_weather}
            ) : (
                <div>Loading...</div>
            )}
        </div>
    )
}

export default function WeatherCard() {

    return (
        <Card className="w-[350px]">
          <CardHeader>
            <CardTitle>heres the weather</CardTitle>
            <CardDescription>Deploy your new project in one-click.</CardDescription>
          </CardHeader>
          <CardContent>
            <WeatherDisplay/>
          </CardContent>

        </Card>
      )
}
