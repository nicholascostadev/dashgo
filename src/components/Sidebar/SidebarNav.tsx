import { Stack } from '@chakra-ui/react'
import {
  RiContactsLine,
  RiDashboardLine,
  RiGitMergeLine,
  RiInputMethodLine,
} from 'react-icons/ri'
import { SidebarLink } from './SidebarLink'
import { SidebarSection } from './SidebarSection'

export const SidebarNav = () => {
  return (
    <Stack spacing="12" align="flex-start">
      <SidebarSection title="GERAL">
        <SidebarLink icon={RiDashboardLine}>Dashboard</SidebarLink>
        <SidebarLink icon={RiContactsLine}>Usuários</SidebarLink>
      </SidebarSection>
      <SidebarSection title="AUTOMAÇÃO">
        <SidebarLink icon={RiInputMethodLine}>Formulários</SidebarLink>
        <SidebarLink icon={RiGitMergeLine}>Automação</SidebarLink>
      </SidebarSection>
    </Stack>
  )
}
