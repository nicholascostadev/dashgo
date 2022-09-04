import {
  Box,
  Flex,
  Icon,
  IconButton,
  useBreakpointValue,
  useColorMode,
} from '@chakra-ui/react'
import { RiMenuLine } from 'react-icons/ri'
import { useSidebarDrawer } from '../../contexts/SidebarDrawerContext'
import { Logo } from './Logo'
import { NotificationsNavSection } from './NotificationsNavSection'
import { Profile } from './Profile'
import { SearchBox } from './SearchBox'
import { ToggleThemeButton } from './ToggleThemeButton'

export const Header = () => {
  const { onOpen } = useSidebarDrawer()
  const { colorMode } = useColorMode()

  const isWideVersion = useBreakpointValue({
    base: false,
    lg: true,
  })
  return (
    <Flex
      as="header"
      w="100%"
      maxW={1480}
      h="20"
      mx="auto"
      mt="4"
      align="center"
      px="6"
    >
      {!isWideVersion && (
        <IconButton
          aria-label="Open Navigation"
          icon={<Icon as={RiMenuLine} />}
          fontSize="24"
          variant="unstyled"
          onClick={onOpen}
          mr="2"
        ></IconButton>
      )}
      <Logo />
      {isWideVersion && <SearchBox />}
      <Flex align="center" ml="auto">
        <NotificationsNavSection />
        <Box
          mr="8"
          pr="4"
          color="gray.300"
          borderRightWidth={1}
          borderColor={colorMode === 'dark' ? 'gray.700' : 'gray.200'}
        >
          <ToggleThemeButton />
        </Box>
        <Profile isWideVersion={isWideVersion} />
      </Flex>
    </Flex>
  )
}
