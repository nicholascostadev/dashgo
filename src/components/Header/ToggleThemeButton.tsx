import { Button, Icon, useColorMode } from '@chakra-ui/react'
import { RiMoonLine, RiSunLine } from 'react-icons/ri'

export const ToggleThemeButton = () => {
  const { colorMode, toggleColorMode } = useColorMode()
  return (
    <Button
      h={10}
      w={10}
      rounded="full"
      size="sm"
      bg="transparent"
      onClick={toggleColorMode}
    >
      {colorMode === 'light' ? (
        <Icon h={5} w={5} as={RiMoonLine} />
      ) : (
        <Icon h={5} w={5} as={RiSunLine} />
      )}
    </Button>
  )
}
