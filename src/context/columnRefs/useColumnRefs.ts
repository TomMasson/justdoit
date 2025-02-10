import { useContext } from "react";
import { ColumnRefsContext } from "./columnRefsContext";

export const useColumnRefs = () => useContext(ColumnRefsContext);
