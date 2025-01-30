import { Dispatch, SetStateAction, useEffect, useState } from "react";
import { DBObject, useDbConnector } from "./useDbConnector";

export interface ResourceService<T extends DBObject> {
	create: (newResource: Omit<T, "id">) => Promise<T>;
}

export function useResource<T extends DBObject>(
	resourceId: string
): [T[], Dispatch<SetStateAction<T[]>>, ResourceService<T>] {
	const [resource, setResource] = useState<T[]>([]);
	const { get, post } = useDbConnector<T>(resourceId);

	const getResources = async (): Promise<T[]> => {
		return await get();
	};

	useEffect(() => {
		getResources().then((resource) => {
			setResource(resource);
		});
	}, [resourceId]);

	const create = async (newResource: Omit<T, "id">): Promise<T> => {
		const response = await post(newResource);
		setResource([...resource, response]);
		return response;
	};

	const service: ResourceService<T> = { create };

	return [resource, setResource, service];
}
