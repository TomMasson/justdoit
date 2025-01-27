import { useCallback, useRef, useState } from "react";
import { motion } from "motion/react";

const Grid = () => {
	const col1 = useRef(null);
	const col2 = useRef(null);
	const col3 = useRef(null);
	//utiliser un useCallback sur la fonction updateColumns

	// const [cards, setCards] = useState([{
	//     content: "Oui",
	//     col: col1
	// }, {

	// }, {

	// }])
	const [cards, setCards] = useState([
		{ col: "col1", ref: col1, cards: [] },
		{
			col: "col2",
			ref: col2,
			cards: [{ id: 1, content: "oui", column: "col1" }],
		},
		{ col: "col3", ref: col3, cards: [] },
	]);

	const cardFitsColumn = (cardPosition) => {
		const xPos = cardPosition.x;
		if (
			xPos >= col1.current.offsetLeft &&
			xPos <= col1.current.offsetLeft + col1.current.offsetWidth
		) {
			return "col1";
		} else if (
			xPos >= col2.current.offsetLeft &&
			xPos <= col2.current.offsetLeft + col2.current.offsetWidth
		) {
			return "col2";
		} else if (
			xPos >= col3.current.offsetLeft &&
			xPos <= col3.current.offsetLeft + col3.current.offsetWidth
		) {
			return "col3";
		} else {
			return false;
		}
	};

	// utiliser un useCallback quand on utilise le state dans une grosse function
	const updateColumns = useCallback(
		(event, card, originColumn) => {
			const cardPosition = { x: event.clientX, y: event.clientY };

			const fitColumn = cardFitsColumn(cardPosition);

			if (fitColumn) {
				console.log("fit a column", fitColumn);
				if (fitColumn === originColumn.col) {
					console.log("same column");
				} else {
					const removedCardColumn = cards.find(
						(column) => column.col === originColumn.col
					);
					if (removedCardColumn) {
						removedCardColumn.cards =
							removedCardColumn?.cards.filter(
								(c) => c.id !== card.id
							);
					}

					const toAddColumn = cards.find(
						(column) => column.col === fitColumn
					);
					if (toAddColumn) {
						toAddColumn.cards = [...toAddColumn.cards, card];
					}
					const newCards = cards.map((column) => {
						switch (column.col) {
							case toAddColumn?.col:
								return toAddColumn;
							case removedCardColumn?.col:
								return removedCardColumn;
							default:
								return column;
						}
					});
					console.log("new:", newCards);
					setCards(newCards);
				}
			} else {
				console.log("no column targeted");
			}
		},
		[cards]
	);
	return (
		<div className="columns">
			{cards.map((column) => (
				<div
					id={column.col}
					className="container"
					key={column.col}
					ref={column.ref}
				>
					{column.cards.map((card) => (
						<motion.div
							key={card.id}
							className="card"
							drag
							dragMomentum={false}
							dragSnapToOrigin={true}
							onDragEnd={
								(event) => updateColumns(event, card, column) //send only Id of card & column
							}
						>
							{card.content}
						</motion.div>
					))}
				</div>
			))}
		</div>
	);
};

export default Grid;
