import { Input } from "postcss";
import { Button } from "./ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "./ui/card";
import { useEffect, useState } from "react";
import { LineChart, Line, CartesianGrid,Area, XAxis, YAxis, Tooltip, AreaChart } from 'recharts';

import { useSpring, animated, config } from 'react-spring';


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
    const [location, setLocation] = useState({lat: null, lon: null})


    const svgs = ['/cloud.svg', '/sun.svg', '/cloud-rain.svg'];
    const [index, setIndex] = useState(0);
    const props = useSpring({
      from: { opacity: 0, transform: 'rotate(180deg)' },
      to: async (next) => {
        while (1) {
          await next({ opacity: 1, transform: 'rotate(0deg)', config: config.gentle });
          setIndex((index + 1) % svgs.length); // Change SVG mid-spin
          await next({ opacity: 1, transform: 'rotate(180deg)', config: config.wobbly }); // Icons are right way up during the pause
          await new Promise(r => setTimeout(r, 1000)); // Add delay between spins
        }
      },
      reset: true,
    });
  
    
    useEffect(()=>{
        
        const getWeather =async () => 
        {

            if ("geolocation" in navigator){
                navigator.geolocation.getCurrentPosition(async position => {
                    const lat = position.coords.latitude;
                    const lon = position.coords.longitude;
                    setLocation({lat, lon});
                    const res = await fetch(`https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&hourly=temperature_2m,relativehumidity_2m,apparent_temperature,precipitation_probability,precipitation&current_weather=true&timezone=America%2FLos_Angeles&forecast_days=3`)
                    const data = await res.json()
                    console.log(data)
                    setWeatherData(data)
                });
            }
            else{
                const res = await fetch("https://api.open-meteo.com/v1/forecast?latitude=49.3164&longitude=-123.0693&hourly=temperature_2m,relativehumidity_2m,apparent_temperature,precipitation_probability,precipitation&current_weather=true&timezone=America%2FLos_Angeles&forecast_days=3")
                const data = await res.json()
                console.log(data)
                setWeatherData(data)
            }
            
            
        }
        getWeather()
}, [])
useEffect(() => {
    const getCityName = async (lat, lon) => {
        const response = await fetch(`https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lon}`);
        const data = await response.json();
        return data.address.city;
    }

    if (location.lat && location.lon) {
        getCityName(location.lat, location.lon).then(city => setLocation({ ...location, city }));
    }
}, [location.lat, location.lon]);
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
                <>
               {location.city}
                <div  className="flex flex-wrap">
                   <Card className="m-2 text-center">
                    <CardHeader>
                        <CardTitle>
                          Temperature
                        </CardTitle>
                        
                    </CardHeader>
                        <CardContent>
                            <div className="text-5xl dark:text-accent"> {weatherData?.current_weather?.temperature}°</div>
                                {weatherData?.current_weather?.temperature !== getHourlyParameter(weatherData, 'apparent_temperature', currentHour) && 
                                <div className="text-l font-light text-gray-600 dark:text-accent">Feels like: {getHourlyParameter(weatherData, 'apparent_temperature', currentHour)}°</div>
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
                        <div className="text-5xl dark:text-accent">

                            {getHourlyParameter(weatherData, 'precipitation_probability', currentHour)}%
                            </div>
                            <div className="text-l font-light text-gray-600 dark:text-accent">Chance of precipitation</div>
                        </CardContent>
                    </Card>
                    <Card className="m-2 text-center">
                        <CardHeader>
                            <CardTitle>
                             Weather
                            </CardTitle>
                        </CardHeader>
                        <CardContent className="flex-stack justify-center">
                            
                            <img src="/sun.svg" alt="Weather icon" className="mx-auto" />
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
                        <Area type="monotone" dataKey={(data) => Number(data.temperature.slice(0, -1))} stroke="#808080" fill="#C0C0C0" />
                        <CartesianGrid stroke="#ccc" />
                        <XAxis dataKey="time" stroke="#808080" />
                        <YAxis/>
                       <Tooltip/>
                       </AreaChart>
                        </CardContent>

                    </Card>
                    
                </div>
                </>

            ) : (
            <div className=" flex justify-center items-center h-screen">
                <animated.div style={props} className="">
                <img src={svgs[index % svgs.length]} alt="loading" />
                
                </animated.div>
                <div className="text-xl m-5">
              Loading...</div>
              </div>
            )}
            </>
        )
             
    
}


