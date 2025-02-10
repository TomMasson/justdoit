import { Provider } from "react-redux";
import "./App.css";
import store from "./reducer/store";
import ModalCard from "./trello/cards/ModalCard";
import Grid from "./trello/Grid";

function App() {
	return (
		<Provider store={store}>
			<ModalCard />
			<Grid></Grid>
		</Provider>
	);
}

export default App;
