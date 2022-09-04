import { Box, Flex, SimpleGrid, Text } from '@chakra-ui/react'
import dynamic from 'next/dynamic'
import { Header } from '../components/Header'
import { Sidebar } from '../components/Sidebar'
import { options, series } from '../utils/graphOptions'
const Chart = dynamic(() => import('react-apexcharts'), {
  ssr: false,
})

export const Dashboard = () => {
  return (
    <Flex flexDir="column" h="100vh">
      <Header />

      <Flex w="100%" my="6" maxW={1480} mx="auto" px="6">
        <Sidebar />
        <SimpleGrid
          flex="1"
          gap="4"
          minChildWidth="320px"
          alignItems="flex-start"
        >
          <Box p={['6', '8']} bg="gray.800" borderRadius={8} pb="4">
            <Text fontSize="large" mb="4">
              Inscritos da semana
            </Text>
            <Chart
              // @ts-ignore
              options={options}
              series={series}
              type="area"
              height={160}
            />
          </Box>
          <Box p={['6', '8']} bg="gray.800" borderRadius={8} pb="4">
            <Text fontSize="large" mb="4">
              Taxa de abertura
            </Text>
            <Chart
              // @ts-ignore
              options={options}
              series={series}
              type="area"
              height={160}
            />
          </Box>
        </SimpleGrid>
      </Flex>
    </Flex>
  )
}

export default Dashboard
