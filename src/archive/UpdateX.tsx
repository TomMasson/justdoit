import { motion } from "motion/react";
import { useState } from "react";

const UpdateX = () => {
    const [x, setX] = useState(0);
	const [y, setY] = useState(0);
	const [rotate, setRotate] = useState(0);
	const [xContainer1, setXContainer1] = useState(0);
	const [yContainer, setYContainer] = useState(0);
	const [xContainer2, setXContainer2] = useState(250);

	return (
		<div className="example">
			<button onClick={(e) => setX(xContainer2)}>Switch</button>

			<div className="columns">
				<motion.div
					className="container"
					animate={{ x: xContainer2, y: yContainer }}
				></motion.div>
				<motion.div
					className="container"
					animate={{ x: xContainer1, y: yContainer }}
				>
					<motion.div
						className="card"
						animate={{ x, y, rotate }}
						transition={{ type: "spring" }}
						// drag
					/>
				</motion.div>
			</div>
		</div>
	);
}
}

export default UpdateX


/*
.example {
	display: flex;
	justify-content: center;
	align-items: center;
	flex-direction: column;
}
.columns {
	width: 50vw;
	display: flex;
	gap: 20px;
	position: relative;
}
.motion {
	height: 150px;
	width: 150px;
	border-radius: 15px;
	background-color: #d50ce4;
}

.container {
	position: absolute;
	background-color: #0d63f8;
	width: 200px;
	height: 200px;
}

.card {
	background-color: #ff0088;
	border-radius: 10px;
	width: 100px;
	height: 100px;
}
*/