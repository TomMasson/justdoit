import { motion } from "motion/react";
import styles from "./Card.module.scss";

interface TaskCardProps {
	handleEndDrag: (event: MouseEvent) => void;
	children: React.ReactNode;
}

const TaskCard = ({ handleEndDrag, children }: TaskCardProps) => {
	return (
		<motion.div
			className={styles.card}
			drag
			dragMomentum={false}
			dragSnapToOrigin={true}
			onDragEnd={handleEndDrag}
		>
			<p className={styles.text}>{children}</p>
		</motion.div>
	);
};

export default TaskCard;
