export type Card = {
	id: string;
	content: string;
	column: string;
};

export interface CardPosition {
	x: number;
	y: number;
}

export interface Column {
	id: string;
	title: string;
}
