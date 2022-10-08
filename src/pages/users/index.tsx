import {
  Box,
  Button,
  Center,
  Checkbox,
  Flex,
  Heading,
  Icon,
  LightMode,
  Link,
  Spinner,
  Table,
  Tbody,
  Td,
  Text,
  Th,
  Thead,
  Tr,
  useBreakpointValue,
  useColorMode,
} from '@chakra-ui/react'
import { GetServerSideProps } from 'next'
import NextLink from 'next/link'
import { useState } from 'react'
import { RiAddLine, RiPencilLine } from 'react-icons/ri'

import { Header } from '../../components/Header'
import { Pagination } from '../../components/Pagination'
import { Sidebar } from '../../components/Sidebar'
import { api } from '../../services/api'
import { getUsers, useUsers } from '../../services/hooks/useUsers'
import { queryClient } from '../../services/queryClient'

const UserList = ({ users }: any) => {
  const [currentPage, setCurrentPage] = useState(1)
  const { isLoading, isError, isFetching, data } = useUsers(currentPage, {
    initialData: users,
  })

  const isWideVersion = useBreakpointValue({
    base: false,
    lg: true,
  })
  const { colorMode } = useColorMode()

  const handlePrefetchUser = async (userId: string) => {
    await queryClient.prefetchQuery(
      ['user', userId],
      async () => {
        const response = await api.get(`users/${userId}`)

        return response.data
      },
      {
        staleTime: 1000 * 60 * 10, // 10 minutes
      }
    )
  }

  return (
    <Box>
      <Header />

      <Flex w="100%" my="6" maxW={1480} mx="auto" px="6">
        <Sidebar />

        <Box
          flex="1"
          borderRadius={8}
          bg={colorMode === 'dark' ? 'gray.800' : 'gray.50'}
          p="8"
        >
          <Flex mb="8" justify="space-between" align="center">
            <Heading size="lg" fontWeight="normal">
              Usuários
              {!isLoading && isFetching && (
                <Spinner size="sm" color="gray.500" ml="4" />
              )}
            </Heading>
            <LightMode>
              <NextLink href="/users/create" passHref>
                <Button
                  cursor="pointer"
                  as="a"
                  size="sm"
                  fontSize="sm"
                  colorScheme="pink"
                  leftIcon={<Icon as={RiAddLine} fontSize="20" />}
                >
                  Criar novo
                </Button>
              </NextLink>
            </LightMode>
          </Flex>
          {isLoading ? (
            <Center>
              <Spinner />
            </Center>
          ) : isError ? (
            <Center>
              <Text>Falha ao obter dados dos usuários</Text>
            </Center>
          ) : (
            <>
              <Table
                colorScheme={colorMode === 'dark' ? 'whiteAlpha' : 'blackAlpha'}
              >
                <Thead>
                  <Tr>
                    <Th px={['4', '4', '6']} color="gray.300" w="8">
                      <Checkbox colorScheme="pink" />
                    </Th>
                    <Th>Usuário</Th>
                    {isWideVersion && <Th>Data de Cadastro</Th>}
                    <Th></Th>
                  </Tr>
                </Thead>
                <Tbody>
                  {data?.users?.map((user) => (
                    <Tr key={user.id}>
                      <Td px={['4', '4', '6']}>
                        <Checkbox colorScheme="pink" />
                      </Td>
                      <Td px={['4', '4', '6']}>
                        <Box>
                          <Link
                            color="purple.400"
                            onMouseEnter={() => handlePrefetchUser(user.id)}
                            href={`/users/${user.id}`}
                          >
                            <Text as="a" fontWeight="bold">
                              {user.name}
                            </Text>
                          </Link>
                          <Text
                            fontSize="small"
                            color={
                              colorMode === 'dark' ? 'gray.300' : 'gray.400'
                            }
                          >
                            {user.email}
                          </Text>
                        </Box>
                      </Td>
                      {isWideVersion && <Td>{user.createdAt}</Td>}
                      <Td>
                        <LightMode>
                          <Button
                            as="a"
                            size="sm"
                            fontSize="sm"
                            cursor="pointer"
                            colorScheme="purple"
                            leftIcon={<Icon as={RiPencilLine} fontSize="16" />}
                          >
                            Editar
                          </Button>
                        </LightMode>
                      </Td>
                    </Tr>
                  ))}
                </Tbody>
              </Table>
              <Pagination
                totalCountOfRegisters={data?.totalCount ?? 0}
                currentPage={currentPage}
                onPageChange={setCurrentPage}
              />
            </>
          )}
        </Box>
      </Flex>
    </Box>
  )
}

export default UserList

export const getServersideProps: GetServerSideProps = async () => {
  const { users, totalCount } = await getUsers(1)

  return {
    props: {
      users,
      totalCount,
    },
  }
}
