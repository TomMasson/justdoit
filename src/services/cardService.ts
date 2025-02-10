import { Card } from "@/utils/types";
import axios, { AxiosResponse } from "axios";

const baseUrl = "http://localhost:3003/cards";

interface CardService {
	getAll: () => Promise<AxiosResponse<Card[]>>;
	createNew: (card: Omit<Card, "id">) => Promise<AxiosResponse<Card>>;
	update: (card: Card) => Promise<AxiosResponse<Card>>;
	deleteCard: (cardId: string) => Promise<AxiosResponse<Card>>;
}

const getAll = async (): Promise<AxiosResponse<Card[]>> => {
	const response = await axios.get(baseUrl);

	return response;
};

const createNew = async (
	card: Omit<Card, "id">
): Promise<AxiosResponse<Card>> => {
	const response = await axios.post(baseUrl, card);

	return response;
};

const update = async (card: Card): Promise<AxiosResponse<Card>> => {
	const response = await axios.put(`${baseUrl}/${card.id}`, card);

	return response;
};

const deleteCard = async (cardId: string): Promise<AxiosResponse<Card>> => {
	const response = await axios.delete(`${baseUrl}/${cardId}`);

	return response;
};

const cardService: CardService = { getAll, createNew, update, deleteCard };

export default cardService;
