import { motion } from "motion/react";
import { useRef, useState } from "react";

const DragWithRef = () => {
	const colmun1 = useRef(null);
	const colmun2 = useRef(null);
	const [left, setLeft] = useState(true);

	return (
		<>
			{/* <motion.div className="motion" drag dragMomentum={false}>
				BONJOUR
			</motion.div> */}
			<button onClick={() => setLeft(!left)}>Change parent</button>
			<div className="columns">
				<motion.div className="container" ref={colmun1}>
					<motion.div
						id="CARD1"
						className="card"
						dragElastic={1}
						drag
						dragConstraints={left ? colmun1 : colmun2}
						onPointerDown={(e) => console.log(e)}
						onPointerUp={(e) => console.log(e)}
					/>
				</motion.div>
				<motion.div
					id="CARD2"
					className="container"
					ref={colmun2}
					onPointerEnter={(e) => {
						console.log(colmun2);
					}}
					onDrop={(e) => console.log("e")}
					onMouseOver={(e) => console.log("e")}
					onMouseOverCapture={(e) => console.log("e")}
				>
					{/* <motion.div
						className="card"
						drag
						dragConstraints={constraintsRef}
					/> */}
				</motion.div>
			</div>
		</>
	);
};

export default DragWithRef;
