import { RemoveFriendIcon } from '../../images';
import './style.css';

const DeleteFriend = props => {
	const { name, onCancel, onConfirm } = props;
	return (
		<div className="deletePopupWrapper">
			<RemoveFriendIcon />
			<h2 className="sureText">Are you sure?</h2>
			<div>
				<span>Do you want to remove</span>
				<span className="deleteName">{name}</span>
				<span>from your friend list?</span>
			</div>
			<div className="buttonWrapper">
				<button className="button cancelButton" onClick={onCancel}>
					Cancel
				</button>
				<button className="button deleteButton" onClick={onConfirm}>
					Remove
				</button>
			</div>
		</div>
	);
};

export default DeleteFriend;
