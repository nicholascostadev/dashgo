import { Button, Flex, FormControl, Stack } from '@chakra-ui/react'
import type { NextPage } from 'next'
import { useForm } from 'react-hook-form'
import { SubmitHandler } from 'react-hook-form/dist/types'
import { z } from 'zod'
import { Input } from '../components/Form/Input'
import { zodResolver } from '@hookform/resolvers/zod'

const signInSchema = z.object({
  email: z.string().min(1, 'Email é obrigatório').email('Email inválido'),
  password: z.string().trim().min(8, 'Senha deve ter no mínimo 8 caracteres'),
})

type LoginProps = z.infer<typeof signInSchema>

const Home: NextPage = () => {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<LoginProps>({
    resolver: zodResolver(signInSchema),
  })

  const handleSignIn: SubmitHandler<LoginProps> = async (data: any) => {
    await new Promise((resolve) => setTimeout(resolve, 2000))
    console.log(data)
  }
  return (
    <Flex w="100vw" h="100vh" align="center" justify="center">
      <Flex
        flexDir="column"
        as="form"
        w="100%"
        maxW={360}
        bg="gray.800"
        p="8"
        borderRadius={8}
        onSubmit={handleSubmit(handleSignIn)}
      >
        <Stack spacing="4">
          <FormControl>
            <Input
              type="email"
              label="E-mail"
              {...register('email')}
              error={errors.email}
            />
            <Input
              type="password"
              label="Password"
              {...register('password')}
              error={errors.password}
            />
          </FormControl>
        </Stack>
        <Button
          type="submit"
          mt="6"
          colorScheme="pink"
          size="lg"
          isLoading={isSubmitting}
        >
          Entrar
        </Button>
      </Flex>
    </Flex>
  )
}

export default Home
