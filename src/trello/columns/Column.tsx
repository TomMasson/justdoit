import EditableLabel from "@/components/EditableLabel";
import { useColumnRefs } from "@/context/columnRefs";
import { useAppDispatch, useAppSelector } from "@/hooks/hooks";
import { useEditableText } from "@/hooks/useEditableText";
import { createCard } from "@/reducer/cardReducer";
import { Card, Column } from "@/utils/types";
import { useRef, useState } from "react";
import CardContainer from "./CardContainer";
import styles from "./Column.module.scss";

interface TaskColumnProps {
	column: Column;
}

function TaskColumn({ column }: TaskColumnProps) {
	const { cards } = useAppSelector((state) => state.cardState);
	const [isAddedCard, setIsAddedCard] = useState(false);
	const { inputValue, setInputValue, isActive, toggleInput, resetInput } =
		useEditableText("");

	const dispatch = useAppDispatch();
	const columnRefs = useColumnRefs();
	const cardContainerRef = useRef<HTMLDivElement>(null);

	const createNewCard = (event: React.FormEvent<HTMLFormElement>) => {
		event.preventDefault();

		const newCard: Omit<Card, "id"> = {
			content: inputValue,
			column: column.id,
		};

		dispatch(createCard({ card: newCard }));
		resetInput();
		setIsAddedCard(true);
	};

	const scrollToBottom = (
		scrollHeight?: number,
		behavior?: ScrollBehavior
	) => {
		if (cardContainerRef.current) {
			cardContainerRef.current.scrollTo({
				top: scrollHeight ?? cardContainerRef.current.scrollHeight,
				behavior: behavior,
			});
		}
	};

	return (
		<div
			id={column.id}
			className={styles.column}
			key={column.id}
			ref={columnRefs[column.id]}
		>
			<h2>{column.title}</h2>
			<CardContainer
				reactRef={cardContainerRef}
				column={column}
				scrollToBottom={(scrollHeight?: number) =>
					scrollToBottom(scrollHeight)
				}
				addedCardState={{ isAddedCard, setIsAddedCard }}
				cards={cards}
			/>
			<EditableLabel
				value={inputValue}
				inputType="inputColumn"
				placeholder="Titre carte"
				onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
					setInputValue(event.target.value)
				}
				onSubmit={(event: React.FormEvent<HTMLFormElement>) =>
					createNewCard(event)
				}
				onBlur={() => resetInput()}
				active={isActive}
			>
				<div
					className={styles.input}
					onClick={() => {
						toggleInput();
						scrollToBottom();
					}}
				>
					+ Ajouter une carte
				</div>
			</EditableLabel>
		</div>
	);
}

export default TaskColumn;
