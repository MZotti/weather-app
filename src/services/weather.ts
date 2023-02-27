import { API } from './api'

const WEATHER_ROUTE = 'https://api.open-meteo.com/v1/forecast';

const TODAY_QUERY = 'temperature_2m,rain,weathercode&timezone=America%2FSao_Paulo'
const WEEK_QUERY = 'weathercode,temperature_2m_max,temperature_2m_min,sunrise,sunset&timezone=America%2FSao_Paulo'

export const GET_TODAY_WEATHER = async (lat: number, lon: number, date: string) => {
	const { data } = await API.get(`${WEATHER_ROUTE}?latitude=${lat}&longitude=${lon}&hourly=${TODAY_QUERY}&start_date=${date}&end_date=${date}`)

	return data.hourly
}

export const GET_WEEK_WEATHER = async (lat: number, lon: number) => {
	const { data } = await API.get(`${WEATHER_ROUTE}?latitude=${lat}&longitude=${lon}&daily=${WEEK_QUERY}`)

	return data.daily
}