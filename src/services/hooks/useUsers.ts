import { api } from './../api';
import { useQuery, UseQueryOptions } from 'react-query';

type User = {
	id: string;
	name: string;
	email: string;
	createdAt: string;
};

type GetUsersResponse = {
	totalCount: number;
	users: User[];
};

interface UserApiReturn {
	data: {
		users: User[];
	};
	headers: {
		'x-total-count': string;
	};
}

export async function getUsers(page: number): Promise<GetUsersResponse> {
	const { data, headers }: UserApiReturn = await api.get('users', {
		params: {
			page,
		},
	});

	const totalCount = Number(headers['x-total-count']);

	const users: User[] = data.users.map(user => {
		return {
			id: user.id,
			name: user.name,
			email: user.email,
			createdAt: new Date(user.createdAt).toLocaleDateString('pt-BR', {
				day: '2-digit',
				month: 'long',
				year: 'numeric',
			}),
		};
	});
	return {
		users,
		totalCount,
	};
}

export function useUsers(page: number) {
	return useQuery(['users', page], () => getUsers(page), {
		staleTime: 1000 * 60 * 10, // stale for 10 minutes
	});
}
