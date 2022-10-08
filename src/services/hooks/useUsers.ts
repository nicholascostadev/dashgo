import { useQuery, UseQueryOptions } from 'react-query'
import { api } from '../api'

type User = {
  id: string
  name: string
  email: string
  createdAt: string
}

type GetUsersResponse = {
  users: User[]
  totalCount: number
}

export const getUsers = async (
  currentPage: number
): Promise<GetUsersResponse> => {
  const { data, headers } = await api.get('users', {
    params: {
      page: currentPage,
    },
  })

  const totalCount = Number(headers['x-total-count'])

  const users = data.users.map((user: any) => {
    return {
      ...user,
      createdAt: new Date(user.createdAt).toLocaleDateString('pt-BR', {
        day: '2-digit',
        month: 'long',
        year: 'numeric',
      }),
    }
  })

  return {
    users,
    totalCount,
  }
}

export const useUsers = (currentPage: number, options: any) =>
  useQuery(['users', currentPage], () => getUsers(currentPage), {
    staleTime: 1000 * 60 * 10, // 10 minutes
    ...options,
  })
