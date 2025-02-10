import EditableLabel from "@/components/EditableLabel";
import { useAppDispatch, useAppSelector } from "@/hooks/hooks";
import { useEditableText } from "@/hooks/useEditableText";
import { deleteCard, updateCard } from "@/reducer/cardReducer";
import { closeCard } from "@/reducer/modalCardReducer";
import CloseIcon from "@mui/icons-material/Close";
import DeleteIcon from "@mui/icons-material/Delete";
import { useEffect, useState } from "react";
import styles from "./ModalCard.module.scss";

//@todo : use createPortal to fix the modal at the top of the document
function ModalCard() {
	const modalCard = useAppSelector((state) => state.modalCard);
	const dispatch = useAppDispatch();
	const selectedCard = modalCard.card;
	const [modalTitle, setModalTitle] = useState<string>("");

	const { inputValue, setInputValue, isActive, toggleInput, resetInput } =
		useEditableText(selectedCard?.content ?? "");

	useEffect(() => {
		if (selectedCard && selectedCard.content) {
			setInputValue(selectedCard.content);
			setModalTitle(selectedCard.content);
		}
	}, [selectedCard, setInputValue]); //@toUndestrand : VSCodes forces to add setValue as a dependecy

	const editCard = (event: React.FormEvent<HTMLFormElement>) => {
		event.preventDefault();
		if (selectedCard) {
			if (inputValue) {
				dispatch(
					updateCard({
						card: { ...selectedCard, content: inputValue },
					})
				);
				setModalTitle(inputValue);
			} else {
				setInputValue(selectedCard.content);
			}
		}
		toggleInput();
		closeModal();
	};

	const deleteCardAction = () => {
		if (selectedCard) dispatch(deleteCard({ cardId: selectedCard.id }));
		closeModal();
	};

	const closeModal = () => {
		dispatch(closeCard());
		resetInput();
	};

	if (selectedCard) {
		return (
			<div className={styles.container} onClick={() => closeModal()}>
				<div
					className={styles.modal}
					onClick={(event) => event.stopPropagation()}
				>
					<div className={styles.header}>
						<EditableLabel
							active={isActive}
							value={inputValue}
							inputType="titleModal"
							onChange={(
								event: React.ChangeEvent<HTMLInputElement>
							) => setInputValue(event.target.value)}
							onSubmit={(
								event: React.FormEvent<HTMLFormElement>
							) => {
								editCard(event);
							}}
						>
							<h2 onClick={() => toggleInput()}>{modalTitle}</h2>
						</EditableLabel>

						<CloseIcon
							className={styles.cross}
							onClick={() => closeModal()}
						/>
					</div>
					<div className={styles.footer}>
						<div
							className={styles.delete}
							onClick={() => deleteCardAction()}
						>
							<p className={styles.text}>Supprimer</p>
							<DeleteIcon />
						</div>
					</div>
				</div>
			</div>
		);
	}

	return <></>;
}

export default ModalCard;
