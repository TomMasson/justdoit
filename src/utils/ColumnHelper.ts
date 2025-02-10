import { ColumnRefs } from "@/context/columnRefs/columnRefsContext";
import { CardPosition } from "./types";

interface CardFitsColumnProps {
	position: CardPosition;
	columnRefs: ColumnRefs;
}

export const cardFitsColumn = ({
	position,
	columnRefs,
}: CardFitsColumnProps): string | null => {
	const targetColumn = Object.entries(columnRefs).find(([id, ref]) => {
		if (!ref.current) return false;
		const rect = ref.current.getBoundingClientRect();

		return (
			position.x >= rect.left && position.x <= rect.right
			// position.y >= rect.top &&    at the moment we only check for the X axis ; in a future evolution we will manage card vertical pos
			// position.y <= rect.bottom
		);
	});
	if (targetColumn) {
		const [columnId] = targetColumn;

		return columnId;
	}

	return null;
};
