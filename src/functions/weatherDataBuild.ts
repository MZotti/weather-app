interface todayWeather {
    time: string[],
    weathercode: Number[],
    temperature_2m: Number[],
    rain: Number[],
}

interface weekWeather {
    time: string[],
    weathercode: Number[],
    temperature_2m_max: Number[],
    temperature_2m_min: Number[],
    sunrise: string[],
    sunset: string[],
}

export const todayWeatherBuild = (data: todayWeather) => {
    const values: any[] = []
    
    data.time.map((el, x) => values[x] = {time: el})
    data.weathercode.map((el, x) => values[x].weather = el)
    data.temperature_2m.map((el, x) => values[x].temperature = el)
    data.rain.map((el, x) => values[x].rain = el)

    return values
}

export const weekWeatherBuild = (data: weekWeather) => {
    const values: any[] = []

    data.time.map((el, x) => values[x] = {date: el})
    data.weathercode.map((el, x) => values[x].weather = el)
    data.temperature_2m_max.map((el, x) => values[x].maxTemp = el)
    data.temperature_2m_min.map((el, x) => values[x].minTemp = el)
    data.sunrise.map((el, x) => values[x].sunrise = el)
    data.sunset.map((el, x) => values[x].sunset = el)

    return values
}
