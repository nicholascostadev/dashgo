import { useDisclosure } from '@chakra-ui/react'
import { createContext, ReactNode, useContext } from 'react'

type SidebarDrawerContextData = ReturnType<typeof useDisclosure>

const SidebarDrawerContext = createContext<SidebarDrawerContextData>(
  {} as SidebarDrawerContextData,
)

export const SidebarDrawerProvider = ({
  children,
}: {
  children: ReactNode
}) => {
  const disclosure = useDisclosure()

  return (
    <SidebarDrawerContext.Provider value={disclosure}>
      {children}
    </SidebarDrawerContext.Provider>
  )
}

export const useSidebarDrawer = () => useContext(SidebarDrawerContext)
