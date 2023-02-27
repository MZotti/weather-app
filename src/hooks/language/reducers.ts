const ACTION_TYPES = {
	CHANGE_LANGUAGE: 'CHANGE_LANGUAGE',
}

const reducer = (state, action) => {
	switch (action.type) {
		case ACTION_TYPES.CHANGE_LANGUAGE: {
			return {
				...state,
				language: action.data.language,
			}
		}
		default: {
			return state
		}
	}
}

export { ACTION_TYPES, reducer }