import { CloseIcon } from '../../images';
import './style.css';

const Modal = props => {
	const { open, children, title = '', onClose } = props;
	if (!open) {
		return null;
	}
	return (
		<div className="modalContainer">
			<div className="overlay" onClick={onClose} />
			<div className="modal">
				{title && (
					<div className="titleWrapper">
						<div className="title">{title}</div>
						<CloseIcon className="icon" onClick={onClose} />
					</div>
				)}
				{children}
			</div>
		</div>
	);
};

export default Modal;
