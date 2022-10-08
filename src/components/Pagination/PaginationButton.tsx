import { Button, useColorMode } from '@chakra-ui/react'

interface PaginationButtonProps {
  isCurrent?: boolean
  pageNumber: number
  onPageChange: (page: number) => void
}

export const PaginationButton = ({
  isCurrent = false,
  pageNumber,
  onPageChange,
}: PaginationButtonProps) => {
  const { colorMode } = useColorMode()
  if (isCurrent)
    return (
      <Button
        size="sm"
        fontSize="xs"
        w="4"
        colorScheme="pink"
        disabled
        _focus={{ bg: 'pink.200' }}
        _active={{ bg: 'pink.200' }}
        _hover={{ bg: 'pink.200' }}
        _disabled={{ bg: 'pink.200', cursor: 'default', _hover: 'pink.200' }}
      >
        {pageNumber}
      </Button>
    )

  return (
    <Button
      size="sm"
      fontSize="xs"
      w="4"
      bg={colorMode === 'dark' ? 'gray.700' : 'pink.400'}
      _hover={colorMode === 'dark' ? { bg: 'gray.500' } : { bg: 'pink.500' }}
      onClick={() => onPageChange(pageNumber)}
    >
      {pageNumber}
    </Button>
  )
}
