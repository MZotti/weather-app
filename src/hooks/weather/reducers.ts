const ACTION_TYPES = {
	CHANGE_LOCATION: 'CHANGE_LOCATION',
	TODAY_WEATHER: 'TODAY_WEATHER',
	WEEK_WEATHER: 'WEEK_WEATHER',
}

const reducer = (state, action) => {
	switch (action.type) {
		case ACTION_TYPES.CHANGE_LOCATION: {
			return {
				...state,
				location: action.data.location,
				lat: action.data.lat,
				lon: action.data.lon,
			}
		}
		case ACTION_TYPES.TODAY_WEATHER: {
			return {
				...state,
				todayWeather: action.data
			}
		}
		case ACTION_TYPES.WEEK_WEATHER: {
			return {
				...state,
				weekWeather: action.data
			}
		}
		default: {
			return state
		}
	}
}

export { ACTION_TYPES, reducer }