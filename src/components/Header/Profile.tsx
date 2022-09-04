import { Avatar, Box, Flex, Text } from '@chakra-ui/react'

interface ProfileProps {
  isWideVersion?: boolean
}
export const Profile = ({ isWideVersion = true }: ProfileProps) => {
  return (
    <Flex align="center">
      {isWideVersion && (
        <Box mr="4" textAlign="right">
          <Text>Nicholas Costa</Text>
          <Text color="gray.300" fontSize="small">
            nicholascostadev@gmail.com
          </Text>
        </Box>
      )}
      <Avatar
        size="md"
        name="Nicholas Costa"
        src="https://github.com/nicholascostadev.png"
      />
    </Flex>
  )
}
