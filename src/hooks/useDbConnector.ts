import axios from "axios";

export interface DBObject {
	id: number;
}

export interface DBService<T extends DBObject> {
	get: () => Promise<T[]>;
	post: (object: Omit<T, "id">) => Promise<T>;
}

export function useDbConnector<T extends DBObject>(
	resourceId: string
): DBService<T> {
	const baseUrl = "http://localhost:3003";

	const get = async () => {
		const response = await axios.get(`${baseUrl}/${resourceId}`);

		return response.data;
	};

	const post = async (object: Omit<T, "id">) => {
		const response = await axios.post(`${baseUrl}/${resourceId}`, object);

		return response.data;
	};

	return { get, post };
}
