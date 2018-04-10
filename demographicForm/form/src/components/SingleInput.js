import React from 'react';
import PropTypes from 'prop-types';

const SingleInput = (props) => (
	<div className="form-group">
		<label className="form-label">{props.title}</label>
		<input
			className="form-input"
			name={props.name}
			type={props.inputType}
			value={props.content}
			onChange={props.controlFunc}
			placeholder={props.placeholder} />
	</div>
);

SingleInput.propTypes = {
	inputType: PropTypes.oneOf(['text', 'number']).isRequired,
	name: PropTypes.string.isRequired,
	content: PropTypes.oneOfType([
		PropTypes.string,
		PropTypes.number,
	]).isRequired
};

export default SingleInput;