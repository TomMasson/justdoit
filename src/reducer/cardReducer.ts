import cardService from "@/services/cardService";
import { Card } from "@/utils/types";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

interface CardState {
	cards: Card[];
	loading: boolean;
	error: string | null;
}

const initialState: CardState = {
	cards: [],
	loading: false,
	error: null,
};

const cardSlice = createSlice({
	name: "cards",
	initialState,
	reducers: {},
	extraReducers: (builder) => {
		builder
			// fetch cards cases
			.addCase(fetchCards.pending, (state) => {
				state.loading = true;
				state.error = null;
			})
			.addCase(fetchCards.fulfilled, (state, action) => {
				state.loading = false;
				state.cards = action.payload;
			})
			.addCase(fetchCards.rejected, (state, action) => {
				state.loading = false;
				state.error = action.payload as string;
			})

			//create card cases
			.addCase(createCard.pending, (state) => {
				state.loading = true;
				state.error = null;
			})
			.addCase(createCard.fulfilled, (state, action) => {
				state.loading = false;
				state.cards.push(action.payload);
			})
			.addCase(createCard.rejected, (state, action) => {
				state.loading = false;
				state.error = action.payload as string;
			})

			// update card cases
			.addCase(updateCard.pending, (state) => {
				state.loading = true;
				state.error = null;
			})
			.addCase(updateCard.fulfilled, (state, action) => {
				state.loading = false;
				const updatedIndex = state.cards.findIndex(
					(card) => card.id === action.payload.id
				);
				if (updatedIndex !== -1) {
					state.cards[updatedIndex] = action.payload;
				}
			})
			.addCase(updateCard.rejected, (state, action) => {
				state.loading = false;
				state.error = action.payload as string;
			})

			// delete card cases
			.addCase(deleteCard.pending, (state) => {
				state.loading = true;
				state.error = null;
			})
			.addCase(deleteCard.fulfilled, (state, action) => {
				state.loading = false;
				state.cards = state.cards.filter(
					(card) => card.id !== action.payload.id
				);
			})
			.addCase(deleteCard.rejected, (state, action) => {
				state.loading = false;
				state.error = action.payload as string;
			});
	},
});

export const fetchCards = createAsyncThunk(
	"cards/fetchCards",
	async (_payload, { rejectWithValue }) => {
		try {
			const response = await cardService.getAll();

			if (response.status !== 200) {
				throw new Error("Failed to fetch card data");
			}

			return response.data;
		} catch (error) {
			return rejectWithValue((error as Error).message);
		}
	}
);

export const createCard = createAsyncThunk(
	"cards/createCard",
	async (payload: { card: Omit<Card, "id"> }, { rejectWithValue }) => {
		try {
			const response = await cardService.createNew(payload.card);

			if (response.status !== 201) {
				throw new Error("Failed to create a new card");
			}

			return response.data;
		} catch (error) {
			return rejectWithValue((error as Error).message);
		}
	}
);

export const updateCard = createAsyncThunk(
	"cards/updateCard",
	async (payload: { card: Card }, { rejectWithValue }) => {
		try {
			const response = await cardService.update(payload.card);

			if (response.status !== 200) {
				throw new Error(
					"Failed to edit card a new card " + payload.card.id
				);
			}

			return response.data;
		} catch (error) {
			return rejectWithValue((error as Error).message);
		}
	}
);

export const deleteCard = createAsyncThunk(
	"cards/deleteCard",
	async (payload: { cardId: string }, { rejectWithValue }) => {
		try {
			const response = await cardService.deleteCard(payload.cardId);

			if (response.status !== 200) {
				throw new Error("Failed to delete the card " + payload.cardId);
			}

			return response.data;
		} catch (error) {
			return rejectWithValue((error as Error).message);
		}
	}
);

export default cardSlice.reducer;
