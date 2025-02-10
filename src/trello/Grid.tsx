import { ColumnRefsProvider } from "@/context/columnRefs";
import { useAppDispatch, useAppSelector } from "@/hooks/hooks";
import { fetchCards } from "@/reducer/cardReducer";
import { RootState } from "@/reducer/store";
import { Column } from "@/utils/types";
import { createSelector } from "@reduxjs/toolkit";
import { useEffect } from "react";
import TaskColumn from "./columns/Column";
import styles from "./Grid.module.scss";

const selectColumns = (state: RootState) => state.columns;
const selectCardState = (state: RootState) => state.cardState;

const selectGridData = createSelector(
	[selectColumns, selectCardState],
	(columns, cardState) => {
		return {
			columns,
			loading: cardState.loading,
			error: cardState.error,
		};
	}
);

const Grid = () => {
	const { columns, loading, error } = useAppSelector(selectGridData);
	const dispatch = useAppDispatch();

	useEffect(() => {
		dispatch(fetchCards());
	}, [dispatch]);

	return (
		<ColumnRefsProvider>
			<h1>GRID</h1>
			{loading && <div>Loading...</div>}
			{error && <div className="error">{error}</div>}
			<div className={styles.grid}>
				{columns.map((column: Column) => (
					<TaskColumn key={column.id} column={column}></TaskColumn>
				))}
			</div>
		</ColumnRefsProvider>
	);
};

export default Grid;
