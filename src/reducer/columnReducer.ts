import { Column } from "@/utils/types";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

const initialState: Column[] = [
	{
		id: "1",
		title: "TODO",
	},
	{
		id: "2",
		title: "DOING",
	},
	{
		id: "3",
		title: "DONE",
	},
];

const columnSlice = createSlice({
	name: "columns",
	initialState,
	reducers: {
		setColumns: (_state, action: PayloadAction<Column[]>) => {
			return action.payload;
		},
	},
});

export const { setColumns } = columnSlice.actions;

export default columnSlice.reducer;
