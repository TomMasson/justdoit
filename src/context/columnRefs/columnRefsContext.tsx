import { createContext } from "react";

export type ColumnRefs = {
	[columnId: string]: React.RefObject<HTMLDivElement>;
};

export const ColumnRefsContext = createContext<ColumnRefs>({});
