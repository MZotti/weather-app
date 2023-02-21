import { API } from './api'

const WEATHER_ROUTE = 'https://api.open-meteo.com/v1//forecast';

const QUERY = 'weathercode,temperature_2m_max,temperature_2m_min,sunrise,sunset&timezone=America%2FSao_Paulo'
export const GET_TODAY_WEATHER = async (lat: number = -30.03, lon: number = -51.23) => {
	const { data } = await API.get(`${WEATHER_ROUTE}?latitude=${lat}&longitude=${lon}&daily=${QUERY}`)

	return data.daily
}