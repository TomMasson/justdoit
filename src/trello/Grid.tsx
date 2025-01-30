import { LegacyRef, useRef } from "react";
import { Card, useCards } from "./useCards";
import styles from "./Grid.module.scss";

interface GridProps {
	cols: Columns[];
}

export interface Columns {
	id: number;
	title: string;
	ref?: LegacyRef<HTMLDivElement>;
}

const Grid = ({ cols }: GridProps) => {
	const col1 = useRef(null);
	const col2 = useRef(null);
	const col3 = useRef(null);

	// temporary static definition of the refs
	cols[0].ref = col1;
	cols[1].ref = col2;
	cols[2].ref = col3;

	const { generate, cards } = useCards({ cols });

	return (
		<div className={styles.grid}>
			{cols.map((column) => (
				<div className={styles.column} key={column.id} ref={column.ref}>
					<h2>{column.title}</h2>
					{generate(
						cards.filter((card: Card) => card.column === column.id)
					)}
				</div>
			))}
		</div>
	);
};

export default Grid;
