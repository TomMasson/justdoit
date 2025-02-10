import { useColumnRefs } from "@/context/columnRefs";
import { useAppDispatch } from "@/hooks/hooks";
import { updateCard } from "@/reducer/cardReducer";
import { openCard } from "@/reducer/modalCardReducer";
import { cardFitsColumn } from "@/utils/ColumnHelper";
import { Card, Column } from "@/utils/types";
import { useEffect } from "react";
import TaskCard from "../cards/Card";
import styles from "./CardContainer.module.scss";

interface CI {
	reactRef: React.RefObject<HTMLDivElement>;
	column: Column;
	scrollToBottom: (scrollHeight?: number) => void;
	addedCardState: {
		isAddedCard: boolean;
		setIsAddedCard: React.Dispatch<React.SetStateAction<boolean>>;
	};
	cards: Card[];
}

function CardContainer({
	reactRef,
	column,
	scrollToBottom,
	addedCardState,
	cards,
}: CI) {
	const dispatch = useAppDispatch();
	const columnRefs = useColumnRefs();

	useEffect(() => {
		// to avoid scrollToBottom to fire before card is added in the column, I add a setTimout
		setTimeout(() => {
			if (addedCardState.isAddedCard && reactRef.current) {
				scrollToBottom(reactRef.current.scrollHeight);
				addedCardState.setIsAddedCard(false);
			}
		}, 100);
	}, [reactRef, addedCardState, scrollToBottom]);

	const moveCard = (event: MouseEvent, card: Card) => {
		const position = { x: event.clientX, y: event.clientY };

		const fitColumn: string | null = cardFitsColumn({
			position,
			columnRefs,
		});

		if (fitColumn && fitColumn !== card.column) {
			dispatch(updateCard({ card: { ...card, column: fitColumn } }));
		}
	};

	return (
		<div className={styles.cardsContainer} ref={reactRef}>
			<div className={styles.cards}>
				{cards
					.filter((card: Card) => card.column === column.id)
					.map((card: Card) => (
						<TaskCard
							key={card.id}
							handleEndDrag={(event: MouseEvent) =>
								moveCard(event, card)
							}
							handleOpen={() => dispatch(openCard(card))}
						>
							{card.content}
						</TaskCard>
					))}
			</div>
		</div>
	);
}

export default CardContainer;
