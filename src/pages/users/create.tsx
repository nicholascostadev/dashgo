import {
  Box,
  Button,
  Divider,
  Flex,
  Heading,
  HStack,
  SimpleGrid,
  useColorMode,
  VStack,
} from '@chakra-ui/react'
import { zodResolver } from '@hookform/resolvers/zod'
import Link from 'next/link'
import { SubmitHandler, useForm } from 'react-hook-form'
import { z } from 'zod'
import { Input } from '../../components/Form/Input'
import { Header } from '../../components/Header'
import { Sidebar } from '../../components/Sidebar'
import { useMutation } from 'react-query'
import { api } from '../../services/api'
import { queryClient } from '../../services/queryClient'
import { useRouter } from 'next/router'

const CreateUserFormSchema = z
  .object({
    name: z.string().min(1, 'Nome é obrigatório'),
    email: z.string().min(1, 'Email é obrigatório').email('Invalid email'),
    password: z.string().trim().min(8, 'Senha deve ter no mínimo 8 caracteres'),
    password_confirmation: z
      .string()
      .trim()
      .min(8, 'Confirmação de senha deve ter no mínimo 8 caracteres'),
  })
  .refine((data) => data.password === data.password_confirmation, {
    message: 'As senhas devem ser iguais',
    path: ['password_confirmation'],
  })

type TCreateUser = z.infer<typeof CreateUserFormSchema>

const CreateUser = () => {
  const router = useRouter()
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting, isValid },
  } = useForm<TCreateUser>({
    resolver: zodResolver(CreateUserFormSchema),
    mode: 'onBlur',
  })
  const { colorMode } = useColorMode()
  const { mutateAsync: createUser } = useMutation(
    async (user: TCreateUser) => {
      const response = await api.post('users', {
        user: {
          ...user,
          created_at: new Date(),
        },
      })

      return response
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries('users')
        router.push('/users')
      },
    }
  )

  const handleCreateUser: SubmitHandler<TCreateUser> = async (values) => {
    await createUser(values)
    console.log(values)
  }

  return (
    <Box>
      <Header />

      <Flex w="100%" my="6" maxW={1480} mx="auto" px="6">
        <Sidebar />

        <Box
          as="form"
          flex="1"
          borderRadius={8}
          bg={colorMode === 'dark' ? 'gray.800' : 'gray.100'}
          p={['6', '8']}
          onSubmit={handleSubmit(handleCreateUser)}
        >
          <Heading size="lg" fontWeight="normal">
            Criar usuário
          </Heading>
          <Divider my="6" borderColor="gray.700" />

          <VStack spacing="8">
            <SimpleGrid minChildWidth="240px" spacing={['6', '8']} w="100%">
              <Input
                label="Nome completo"
                {...register('name')}
                error={errors.name}
              />
              <Input
                label="E-mail"
                type="email"
                {...register('email')}
                error={errors.email}
              />
            </SimpleGrid>
            <SimpleGrid minChildWidth="240px" spacing={['6', '8']} w="100%">
              <Input
                label="Senha"
                type="password"
                {...register('password')}
                error={errors.password}
              />
              <Input
                label="Confirmação da senha"
                type="password"
                {...register('password_confirmation')}
                error={errors.password_confirmation}
              />
            </SimpleGrid>
          </VStack>

          <Flex mt="8" justify="flex-end">
            <HStack spacing="4">
              <Link href="/users" passHref>
                <Button
                  as="a"
                  colorScheme={
                    colorMode === 'dark' ? 'whiteAlpha' : 'blackAlpha'
                  }
                  bg={colorMode === 'dark' ? 'gray.700' : 'gray.400'}
                  color="white"
                  _hover={
                    colorMode === 'dark'
                      ? { bg: 'gray.500' }
                      : { bg: 'gray.500' }
                  }
                >
                  Cancelar
                </Button>
              </Link>
              <Button
                type="submit"
                colorScheme="pink"
                isLoading={isSubmitting}
                disabled={!isValid}
              >
                Salvar
              </Button>
            </HStack>
          </Flex>
        </Box>
      </Flex>
    </Box>
  )
}

export default CreateUser
