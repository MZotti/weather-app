const ACTION_TYPES = {
	TODAY_WEATHER: 'TODAY_WEATHER',
}

const reducer = (state, action) => {
	switch (action.type) {
		case ACTION_TYPES.TODAY_WEATHER: {
			return {
				...state,
				weather: action.data
			}
		}
		default: {
			return state
		}
	}
}

export { ACTION_TYPES, reducer }