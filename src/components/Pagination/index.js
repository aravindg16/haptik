import './style.css';

const Pagination = props => {
	const { activePage, totalPages, handlePagination } = props;
	const isPrevPageAvailable = activePage - 1 > 0;
	const isNextPageAvailable = activePage + 1 <= totalPages;
	let pagesToShow = [];

	if (totalPages === 1) {
		return null;
	} else if (totalPages > 3) {
		if (isPrevPageAvailable && isNextPageAvailable) {
			pagesToShow = [ activePage - 1, activePage, activePage + 1 ];
		} else if (!isPrevPageAvailable) {
			pagesToShow = [ activePage, activePage + 1, activePage + 2 ];
		} else if (!isNextPageAvailable) {
			pagesToShow = [ activePage - 2, activePage - 1, activePage ];
		}
	} else {
		let page = 1;
		do {
			pagesToShow.push(page);
			page++;
		} while (page <= totalPages);
	}

	return (
		<div className="paginationWrapper">
			<button
				className={`button actionButton${!isPrevPageAvailable ? ' disabled' : ''}`}
				onClick={isPrevPageAvailable ? () => handlePagination(activePage - 1) : () => {}}
			>
				Previous
			</button>
			{pagesToShow.map((page, index) => (
				<div
					key={index}
					className={`pageNumber${page === activePage ? ' selectedNumber' : ''}`}
					onClick={() => handlePagination(page)}
				>
					{page}
				</div>
			))}
			<button
				className={`button actionButton${!isNextPageAvailable ? ' disabled' : ''}`}
				onClick={isNextPageAvailable ? () => handlePagination(activePage + 1) : () => {}}
			>
				Next
			</button>
		</div>
	);
};

export default Pagination;
