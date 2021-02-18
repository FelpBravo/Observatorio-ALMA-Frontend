import { types } from 'types/types';

const initialState = {
	reports: {
		data: []
	},
	missing: {
		data: []
	},
	missingName: '',
	date: {
		startDate: '',
		endDate: ''
	},

}

export const reportsReducer = (state = initialState, action) => {

	switch (action.type) {
		case types.reportsDataLoaded:
			return {
				...state,
				reports: action.payload.reports,
				date: action.payload.date
			}
		case types.missingDataLoaded:
			return {
				...state,
				missing: action.payload.missing,
				date: action.payload.date,
				missingName: action.payload.missingName
			}
		case types.reportsRemoveAll:
			return {
				reports: {},
				missing: {},
				missingName: '',
				date: {
					startDate: '',
					endDate: ''
				},

			}

		default:
			return state;
	}

};