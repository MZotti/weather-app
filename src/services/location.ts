import { API } from './api'

const LOCATION_ROUTE = 'https://geocoding-api.open-meteo.com/v1/';

export const GET_LOCATION = async (search: String) => {
	const { data } = await API.get(`${LOCATION_ROUTE}search?name=${search}`)
    
	return data.results
}