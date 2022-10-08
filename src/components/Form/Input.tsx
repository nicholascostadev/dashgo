import {
  FormControl,
  FormErrorMessage,
  FormLabel,
  Input as ChakraInput,
  InputProps as ChakraInputProps,
  useColorMode,
} from '@chakra-ui/react'
import { forwardRef, ForwardRefRenderFunction } from 'react'
import { FieldError } from 'react-hook-form/dist/types'

interface InputProps extends ChakraInputProps {
  name: string
  label?: string
  error: FieldError | undefined
}

const InputBase: ForwardRefRenderFunction<HTMLInputElement, InputProps> = (
  { name, label, error, ...rest }: InputProps,
  ref: any
) => {
  const { colorMode } = useColorMode()
  return (
    <FormControl isInvalid={!!error}>
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
        ref={ref}
        {...rest}
      />
      {error && <FormErrorMessage>{error.message}</FormErrorMessage>}
    </FormControl>
  )
}

export const Input = forwardRef(InputBase)
