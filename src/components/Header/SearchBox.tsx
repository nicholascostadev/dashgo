import { Flex, Icon, Input, useColorMode } from '@chakra-ui/react'
import { useState } from 'react'
import { RiSearchLine } from 'react-icons/ri'

export const SearchBox = () => {
  const [search, setSearch] = useState()
  const { colorMode } = useColorMode()

  return (
    <Flex
      as="label"
      flex="1"
      py="4"
      px="8"
      ml="6"
      maxW={400}
      alignSelf="center"
      position="relative"
      bg={colorMode === 'light' ? 'gray.50' : 'gray.800'}
      borderRadius="full"
    >
      <Input
        color={colorMode === 'light' ? 'gray.500' : 'gray.50'}
        variant="unstyled"
        px="4"
        mr="4"
        placeholder="Buscar na plataforma"
        _placeholder={
          colorMode === 'light' ? { color: 'gray.500' } : { color: 'gray.400' }
        }
        value={search}
        onChange={(e: any) => setSearch(e.target.value)}
      />
      <Icon
        as={RiSearchLine}
        fontSize="20"
        color={colorMode === 'light' ? 'gray.500' : 'gray.400'}
      />
    </Flex>
  )
}
