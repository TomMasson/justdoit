import { motion } from "motion/react";
import { useState } from "react";
import styles from "./Card.module.scss";

interface TaskCardProps {
	handleEndDrag: (event: MouseEvent) => void;
	handleOpen: () => void;
	children: React.ReactNode;
}

const TaskCard = ({ handleEndDrag, handleOpen, children }: TaskCardProps) => {
	const [isDragged, setIsDragged] = useState<boolean>(false);

	const onDragEnd = (event: MouseEvent) => {
		setIsDragged(false);
		handleEndDrag(event);
	};

	//@todo: Manage differently the cards when changing the column : posotion abolute is offset and translateX creates a weird animation
	return (
		<div className={styles.cardContainer}>
			<motion.div
				className={styles.card}
				drag
				dragMomentum={false}
				dragSnapToOrigin={true}
				whileDrag={{
					rotate: "5deg",
					borderColor: "rgba(0, 0, 0, 0)",
					position: "absolute",
					translateX: "-100px",
				}}
				onDrag={() => setIsDragged(true)}
				onDragEnd={onDragEnd}
				onClick={() => {
					if (!isDragged) {
						handleOpen();
					}
				}}
			>
				<p className={styles.text}>{children}</p>
			</motion.div>
		</div>
	);
};

export default TaskCard;
