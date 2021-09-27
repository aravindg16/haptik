import { useState } from 'react';
import './style.css';

const NewFriend = props => {
	const { handleSave } = props;
	const [ value, setValue ] = useState('');

	const handleChange = event => {
		const value = event.target.value;
		setValue(value);
	};

	const handleKeyPress = event => {
		if (event.charCode === 13) {
			handleSave(value);
		}
	};

	return (
		<input
			className="input addFriendInput"
			value={value}
			onKeyPress={handleKeyPress}
			onChange={handleChange}
			placeholder="Name"
		/>
	);
};

export default NewFriend;
