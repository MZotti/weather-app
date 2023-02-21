const dailyWeatherBuild = (data) => {
    const values = []
    data.time.map((el, x) => values[x] = {date: el})
    data.weathercode.map((el, x) => values[x].weather = el)
    data.temperature_2m_max.map((el, x) => values[x].maxTemp = el)
    data.temperature_2m_min.map((el, x) => values[x].minTemp = el)
    data.sunrise.map((el, x) => values[x].sunrise = el)
    data.sunset.map((el, x) => values[x].sunset = el)

    return values
}

export default dailyWeatherBuild