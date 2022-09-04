import {
  FormControl,
  FormLabel,
  Input as ChakraInput,
  InputProps as ChakraInputProps,
  useColorMode,
} from '@chakra-ui/react'

interface InputProps extends ChakraInputProps {
  name: string
  label?: string
}

export const Input = ({ name, label, ...rest }: InputProps) => {
  const { colorMode } = useColorMode()
  return (
    <FormControl>
      {!!label && <FormLabel htmlFor={name}>{label}</FormLabel>}
      <ChakraInput
        name={name}
        id={name}
        focusBorderColor="pink.500"
        bg={colorMode === 'dark' ? 'gray.900' : 'gray.200'}
        variant="filled"
        _hover={
          colorMode === 'dark'
            ? {
                bg: 'gray.900',
              }
            : { bg: 'gray.300' }
        }
        size="lg"
        {...rest}
      />
    </FormControl>
  )
}
