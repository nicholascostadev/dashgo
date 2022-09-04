import {
  Box,
  Button,
  Checkbox,
  Flex,
  Heading,
  Icon,
  LightMode,
  Table,
  Tbody,
  Td,
  Text,
  Th,
  Thead,
  Tr,
  useColorMode,
} from '@chakra-ui/react'
import { RiAddLine, RiPencilLine } from 'react-icons/ri'
import { Header } from '../../components/Header'
import { Pagination } from '../../components/Pagination'
import { Sidebar } from '../../components/Sidebar'

const UserList = () => {
  const { colorMode } = useColorMode()
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
            </Heading>
            <LightMode>
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
            </LightMode>
          </Flex>
          <Table
            colorScheme={colorMode === 'dark' ? 'whiteAlpha' : 'blackAlpha'}
          >
            <Thead>
              <Tr>
                <Th px="6" color="gray.300" w="8">
                  <Checkbox colorScheme="pink" />
                </Th>
                <Th>Usuário</Th>
                <Th>Data de Cadastro</Th>
                <Th></Th>
              </Tr>
            </Thead>
            <Tbody>
              <Tr>
                <Td px="6">
                  <Checkbox colorScheme="pink" />
                </Td>
                <Td px="6">
                  <Box>
                    <Text fontWeight="bold">Nicholas Costa</Text>
                    <Text
                      fontSize="small"
                      color={colorMode === 'dark' ? 'gray.300' : 'gray.400'}
                    >
                      nicholascostadev@gmail.com
                    </Text>
                  </Box>
                </Td>
                <Td>25 de Janeiro, 2004</Td>
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
            </Tbody>
          </Table>
          <Pagination />
        </Box>
      </Flex>
    </Box>
  )
}

export default UserList
