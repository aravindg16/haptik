import { Fragment } from 'react';
import { FavoriteIcon, DeleteIcon } from '../../images';
import './style.css';

const FriendList = props => {
	const { friendList, handleFavorite, handleDelete } = props;
	return (
		<Fragment>
			{friendList.length ? (
				friendList.map((listDetails, index) => {
					const { id, name, isFavorited } = listDetails;
					return (
						<div key={index} className="friendListWrapper">
							<div className="nameWrapper">
								<div className="friendName">{name}</div>
								<span className="label">is your friend</span>
							</div>
							<div className="iconContainer">
								<div className="iconWrapper" onClick={() => handleFavorite(id)}>
									<FavoriteIcon className={`${isFavorited ? 'selected' : 'notSelected'}`} />
								</div>
								<div className="iconWrapper deleteIcon" onClick={() => handleDelete(listDetails)}>
									<DeleteIcon />
								</div>
							</div>
						</div>
					);
				})
			) : (
				<div className="noFriends">No Friends Found</div>
			)}
		</Fragment>
	);
};

export default FriendList;
