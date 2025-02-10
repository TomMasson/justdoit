import { Card } from "@/utils/types";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface ModalCardState {
	isOpen: boolean;
	card: Card | null;
}

const initialState: ModalCardState = {
	isOpen: false,
	card: null,
};

const modalCardSlice = createSlice({
	name: "modalCard",
	initialState,
	reducers: {
		openCard: (state, action: PayloadAction<Card>) => {
			state.card = action.payload;
			state.isOpen = true;
		},

		closeCard: (state) => {
			state.card = null;
			state.isOpen = false;
		},
	},
});

export const { openCard, closeCard } = modalCardSlice.actions;

export default modalCardSlice.reducer;
