import { useRef } from "react";
import { ColumnRefs, ColumnRefsContext } from "./columnRefsContext";

export function ColumnRefsProvider({
	children,
}: {
	children: React.ReactNode;
}) {
	const columnRefs: ColumnRefs = {
		"1": useRef<HTMLDivElement>(null),
		"2": useRef<HTMLDivElement>(null),
		"3": useRef<HTMLDivElement>(null),
	};

	return (
		<ColumnRefsContext.Provider value={columnRefs}>
			{children}
		</ColumnRefsContext.Provider>
	);
}
