import { CardPosition, SettedColumns } from "../trello/useCards";

interface CardFitsColumnProps {
	newPos: CardPosition;
	cols: SettedColumns[];
}

export const cardFitsColumn = ({
	newPos,
	cols,
}: CardFitsColumnProps): number => {
	const xPos = newPos.x;
	if (
		xPos >= cols[0].ref.current.offsetLeft &&
		xPos <= cols[0].ref.current.offsetLeft + cols[0].ref.current.offsetWidth
	) {
		return 1;
	} else if (
		xPos >= cols[1].ref.current.offsetLeft &&
		xPos <= cols[1].ref.current.offsetLeft + cols[1].ref.current.offsetWidth
	) {
		return 2;
	} else if (
		xPos >= cols[2].ref.current.offsetLeft &&
		xPos <= cols[2].ref.current.offsetLeft + cols[2].ref.current.offsetWidth
	) {
		return 3;
	} else {
		return 0;
	}
};
