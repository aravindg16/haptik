import React, { useState, useEffect } from 'react';
import { PlusIcon, SearchIcon, CloseIcon } from '../../images';
import { FriendList, NewFriend, DeleteFriend, SortBySegment, Pagination, Modal } from '../../components';
import { mockList, countPerPage } from './constants';
import './style.css';

const Friends = () => {
	const [ searchValue, setSearchValue ] = useState('');
	const [ friendList, setFriendList ] = useState(mockList);
	const [ searchResult, setSearchResult ] = useState([]);
	const [ friendToRemove, setFriendToRemove ] = useState({});
	const [ showAddFriend, setShowAddFriend ] = useState(false);
	const [ showDeleteConfirmation, setShowDeleteConfirmation ] = useState(false);
	const [ sortBy, setSortBy ] = useState('new');
	const [ activePage, setActivePage ] = useState(1);
	const [ showSearchResult, setShowSearchResult ] = useState(false);

	useEffect(
		() => {
			setActivePage(1);
		},
		[ friendList.length, sortBy, showSearchResult ]
	);

	const clone = list => JSON.parse(JSON.stringify(list));

	const findIndexById = id => friendList.findIndex(list => list.id === id);

	const handleSearchTextChange = event => {
		const value = event.target.value;
		if (!value) {
			handleClearSearch();
		} else {
			setSearchValue(value);
		}
	};

	const handleSearchEnter = event => {
		if (event.charCode === 13) {
			handleSearch();
		}
	};

	const handleClearSearch = () => {
		setSearchValue('');
		setSearchResult({});
		setShowSearchResult(false);
	};

	const handleSearch = () => {
		let result = [];
		for (const list of friendList) {
			const name = list.name.toLowerCase();
			if (name.includes(searchValue.toLowerCase())) {
				result.push(list);
			}
		}
		setSearchResult(result);
		setShowSearchResult(true);
	};

	const handleFavorite = id => {
		const clonedList = clone(friendList);
		const indexToUpdate = findIndexById(id);
		if (indexToUpdate >= 0) {
			const { isFavorited, ...remainingList } = clonedList[indexToUpdate];
			clonedList[indexToUpdate] = {
				...remainingList,
				isFavorited: !isFavorited
			};
			setFriendList([ ...clonedList ]);
		}
	};

	const handleDelete = details => {
		setFriendToRemove(details);
		setShowDeleteConfirmation(true);
	};

	const handleDeleteCancel = () => {
		setFriendToRemove({});
		setShowDeleteConfirmation(false);
	};

	const deleteConfirm = () => {
		const { id } = friendToRemove;
		const clonedList = clone(friendList);
		const indexToUpdate = findIndexById(id);
		if (indexToUpdate >= 0) {
			clonedList.splice(indexToUpdate, 1);
			setFriendList([ ...clonedList ]);
			handleDeleteCancel();
		}
	};

	const handleAddNewFriend = value => {
		const clonedList = clone(friendList);
		const newFriendDetails = {
			name: value,
			isFavorited: false,
			id: 'id' + Math.random().toString(32).slice(2)
		};
		clonedList.push(newFriendDetails);
		setFriendList([ ...clonedList ]);
		setShowAddFriend(false);
	};

	const handlePagination = page => {
		setActivePage(page);
	};

	let modifiedList = showSearchResult ? (searchResult.length ? clone(searchResult) : []) : clone(friendList);
	if (sortBy === 'new') {
		modifiedList.reverse();
	} else {
		const favoriteList = [];
		const nonFavoriteList = [];
		modifiedList.forEach(list => {
			list.isFavorited ? favoriteList.push(list) : nonFavoriteList.push(list);
		});
		modifiedList = [ ...favoriteList, ...nonFavoriteList ];
	}

	const totalPages = Math.ceil(modifiedList.length / countPerPage);

	if (totalPages > 1) {
		modifiedList = modifiedList.splice((activePage - 1) * countPerPage, countPerPage);
	}

	return (
		<div className="bodyWrapper">
			<div>
				<header className="headerWrapper">
					<h3 className="header">Friend List</h3>
					<PlusIcon className="icon" onClick={() => setShowAddFriend(true)} />
				</header>
				<input
					className="input searchInput"
					value={searchValue}
					onChange={handleSearchTextChange}
					onKeyPress={handleSearchEnter}
					placeholder="Enter your friend's name"
				/>
				{searchValue ? <CloseIcon onClick={handleClearSearch} className="closeIcon" /> : null}
				<SearchIcon onClick={handleSearch} className="searchIcon" />
				<SortBySegment sortBy={sortBy} handleChangeSortBy={key => setSortBy(key)} />
				<FriendList friendList={modifiedList} handleFavorite={handleFavorite} handleDelete={handleDelete} />
			</div>
			<Pagination activePage={activePage} totalPages={totalPages} handlePagination={handlePagination} />
			<Modal open={showAddFriend} title="Add New Friend" onClose={() => setShowAddFriend(false)}>
				<NewFriend handleSave={handleAddNewFriend} />
			</Modal>
			<Modal open={showDeleteConfirmation} onClose={handleDeleteCancel}>
				<DeleteFriend onCancel={handleDeleteCancel} onConfirm={deleteConfirm} {...friendToRemove} />
			</Modal>
		</div>
	);
};

export default Friends;
