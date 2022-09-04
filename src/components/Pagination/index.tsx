import { useColorMode, HStack, Box } from '@chakra-ui/react'
import { PaginationButton } from './PaginationButton'

export const Pagination = () => {
  const { colorMode } = useColorMode()
  return (
    <HStack
      mt="8"
      justify="space-between"
      align="center"
      spacing="6"
      color={colorMode === 'dark' ? 'gray.50' : 'white'}
    >
      <Box color={colorMode === 'dark' ? 'gray.50' : 'gray.500'}>
        <strong>0</strong> - <strong>10</strong> de <strong>100</strong>
      </Box>
      <HStack spacing="2">
        <PaginationButton isCurrent pageNumber={1} />
        <PaginationButton pageNumber={2} />
        <PaginationButton pageNumber={3} />
      </HStack>
    </HStack>
  )
}
