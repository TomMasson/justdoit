import { ResourceService, useResource } from "../hooks/useResource";
import { cardFitsColumn } from "../utils/ColumnHelper";
import TaskCard from "./Card";
import { Columns } from "./Grid";

export interface SettedColumns extends Columns {
	ref: React.Ref<HTMLDivElement>;
}

interface UseCardProps {
	cols: SettedColumns[];
}

export type Card = {
	id: number;
	content: string;
	column: number;
};

export interface CardPosition {
	x: number;
	y: number;
}

interface UseCard {
	cards: Card[];
	service: ResourceService<Card>;
	generate: (cards: Card[]) => JSX.Element[];
}

export function useCards({ cols }: UseCardProps): UseCard {
	const [cards, setCards, service] = useResource<Card>("cards");

	const updateColumn = (event: MouseEvent, card: Card): void => {
		const newPos = { x: event.clientX, y: event.clientY };

		const fitColumn: number = cardFitsColumn({ newPos, cols });

		if (fitColumn) {
			console.log("fits a column :", fitColumn);
			if (fitColumn === card.column) {
				console.log("same column");
			} else {
				const updatedCard: Card = {
					...card,
					column: fitColumn,
				};

				const newCards: Card[] = cards.map((c) =>
					c.id === card.id ? updatedCard : c
				);

				setCards(newCards);
			}
		} else {
			console.log("no column targeted");
		}
	};

	const generate = (cards: Card[]): JSX.Element[] => {
		console.log("generating");
		return cards.map((card: Card) => (
			<TaskCard
				key={card.id}
				handleEndDrag={(event: MouseEvent) => updateColumn(event, card)}
			>
				{card.content}
			</TaskCard>
		));
	};

	return { cards, service, generate };
}
