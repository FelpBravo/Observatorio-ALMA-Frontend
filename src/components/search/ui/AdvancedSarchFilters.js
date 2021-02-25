import React from 'react'
import PropTypes from 'prop-types';
import { DATE, NUMERIC } from 'constants/constUtil';
import { TextField } from '@material-ui/core';
import { useDispatch } from 'react-redux';
import { searchSetValueFilter } from 'actions/search';
import { DateRangePicker } from 'rsuite';




export const AdvancedSarchFilters = ({ name, label, type, value }) => {

	const dispatch = useDispatch();

	const handleOnChange = ({ target }) => {
		const { name, value } = target;


		dispatch(searchSetValueFilter(name, value));

	}

	switch (type) {
		case DATE:
			return (
				<DateRangePicker
				/>
				
			);

		case NUMERIC:
			return (
				<TextField
					name={name}
					type="number"
					value={value ? value : ''}
					label={label}
					variant="outlined"
					fullWidth
					size="small"
					onChange={handleOnChange}
				/>
			);

		default:
			return (
				<TextField
					name={name}
					label={label}
					value={value ? value : ''}
					variant="outlined"
					fullWidth
					size="small"
					onChange={handleOnChange}
				/>
			);

	}
}

AdvancedSarchFilters.propTypes = {
	name: PropTypes.string.isRequired,
	label: PropTypes.string.isRequired,
	type: PropTypes.string.isRequired,
};
