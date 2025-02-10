import { configureStore } from "@reduxjs/toolkit";
import cardReducer from "./cardReducer";
import columnReducer from "./columnReducer";
import modalCardReducer from "./modalCardReducer";

const store = configureStore({
	reducer: {
		cardState: cardReducer,
		columns: columnReducer,
		modalCard: modalCardReducer,
	},
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
