import { Icon, Link, LinkProps, Text } from '@chakra-ui/react'
import { ElementType } from 'react'

interface SidebarLinkProps extends LinkProps {
  icon: ElementType
  children: string
}

export const SidebarLink = ({ icon, children, ...rest }: SidebarLinkProps) => {
  return (
    <Link display="flex" alignItems="center" {...rest}>
      {' '}
      <Icon as={icon} fontSize="20" />
      <Text ml="4" fontWeight="medium">
        {children}
      </Text>
    </Link>
  )
}
