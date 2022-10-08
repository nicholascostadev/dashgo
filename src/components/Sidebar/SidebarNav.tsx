import { Stack } from '@chakra-ui/react'
import {
  RiContactsLine,
  RiDashboardLine,
  RiGitMergeLine,
  RiInputMethodLine,
} from 'react-icons/ri'
import { useSidebarDrawer } from '../../contexts/SidebarDrawerContext'
import { SidebarLink } from './SidebarLink'
import { SidebarSection } from './SidebarSection'

export const SidebarNav = () => {
  const { onClose } = useSidebarDrawer()
  return (
    <Stack spacing="12" align="flex-start">
      <SidebarSection title="GERAL">
        <SidebarLink icon={RiDashboardLine} href="/dashboard" onClick={onClose}>
          Dashboard
        </SidebarLink>
        <SidebarLink icon={RiContactsLine} href="/users" onClick={onClose}>
          Usuários
        </SidebarLink>
      </SidebarSection>
      <SidebarSection title="AUTOMAÇÃO">
        <SidebarLink icon={RiInputMethodLine} href="/forms" onClick={onClose}>
          Formulários
        </SidebarLink>
        <SidebarLink icon={RiGitMergeLine} href="/automation" onClick={onClose}>
          Automação
        </SidebarLink>
      </SidebarSection>
    </Stack>
  )
}
