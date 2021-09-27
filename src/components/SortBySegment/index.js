import './style.css';

const SortBySegment = props => {
	const { sortBy, handleChangeSortBy } = props;
	const isFavoriteSelected = sortBy === 'favorite';
	return (
		<div className="sortByWrapper">
			<div className="sortByOptionWrapper">
				<div
					onClick={() => handleChangeSortBy('new')}
					className={`sortOption${!isFavoriteSelected ? ' selectedSortOption' : ''}`}
				>
					Newest First
				</div>
				<div
					onClick={() => handleChangeSortBy('favorite')}
					className={`sortOption lastOption${isFavoriteSelected ? ' selectedSortOption' : ''}`}
				>
					Favorites First
				</div>
			</div>
		</div>
	);
};

export default SortBySegment;
