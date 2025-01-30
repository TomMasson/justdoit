import "./App.css";
import Grid from "./trello/Grid";

function App() {
	// while working on the code structure, the columns are momentarily set in static
	const columns = [
		{
			id: 1,
			title: "TODO",
		},
		{
			id: 2,
			title: "DOING",
		},
		{
			id: 3,
			title: "DONE",
		},
	];

	return (
		<>
			<h1>GRID</h1>
			<Grid cols={columns}></Grid>
		</>
	);
}

export default App;
